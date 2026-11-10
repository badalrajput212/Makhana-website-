/**
 * ROOTS 2 RETAILS — BULK ORDER CHATBOT BACKEND API
 * Node.js + Express | Nodemailer | Rate Limiting | Input Validation
 *
 * Endpoints:
 *   POST /api/bulk-order   — Submit bulk order enquiry, send emails
 *   GET  /api/health       — Server health check
 *
 * Environment Variables: see .env.example
 */

'use strict';

const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const rateLimit    = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const nodemailer   = require('nodemailer');
const path         = require('path');
const { v4: uuid } = require('uuid');
require('dotenv').config();

/* ============================================================
   APP SETUP
   ============================================================ */
const app  = express();
const PORT = process.env.PORT || 3001;

/* ── Security headers ──────────────────────────────────────── */
app.use(helmet({
  contentSecurityPolicy: false, // Allow the static frontend to load normally
}));

/* ── CORS ──────────────────────────────────────────────────── */
const ALLOWED_ORIGINS = (process.env.CORS_ALLOWED_ORIGINS || 'http://localhost:3000,http://127.0.0.1:5500,http://127.0.0.1:5501')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. local file, Postman)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: Origin ${origin} not permitted`));
  },
  methods:          ['GET', 'POST', 'OPTIONS'],
  allowedHeaders:   ['Content-Type', 'Authorization'],
  credentials:      false,
}));

app.use(express.json({ limit: '100kb' }));

/* ── Serve static frontend (when running as unified server) ── */
// The frontend files sit one level up from /backend/
app.use(express.static(path.join(__dirname, '..')));

/* ── Rate Limiting ─────────────────────────────────────────── */
const orderLimiter = rateLimit({
  windowMs:         15 * 60 * 1000, // 15 minutes
  max:              10,              // max 10 order submissions per window per IP
  standardHeaders:  true,
  legacyHeaders:    false,
  message: {
    success: false,
    message: 'Too many order submissions from this IP. Please wait 15 minutes before trying again.',
  },
  skip: req => process.env.NODE_ENV === 'test', // skip limit in test mode
});

/* ============================================================
   NODEMAILER TRANSPORTER
   ============================================================ */
function createTransporter() {
  // Gmail with App Password (recommended for production)
  if (process.env.SMTP_SERVICE === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASSWORD, // Gmail App Password (NOT your account password)
      },
    });
  }

  // Generic SMTP (SendGrid, Mailgun, Brevo, etc.)
  return nodemailer.createTransporter({
    host:   process.env.SMTP_HOST || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: process.env.NODE_ENV === 'production' },
  });
}

let transporter = null;

async function getTransporter() {
  if (!transporter) {
    transporter = createTransporter();
    // Verify connection on first use
    try {
      await transporter.verify();
      console.log('[Mail] SMTP connection verified ✓');
    } catch (err) {
      console.error('[Mail] SMTP verification failed:', err.message);
      transporter = null;
      throw err;
    }
  }
  return transporter;
}

/* ============================================================
   EMAIL BUILDERS
   ============================================================ */

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function buildBusinessEmailHTML(order) {
  const { enquiryId, customer, products, totalAmount, timestamp, language } = order;
  const date = new Date(timestamp).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata'
  });

  const productRows = products.map(p => `
    <tr style="border-bottom:1px solid #eee;">
      <td style="padding:10px 12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;">${p.productName}</td>
      <td style="padding:10px 12px;text-align:center;">${p.variant}</td>
      <td style="padding:10px 12px;text-align:center;">${p.qty}</td>
      <td style="padding:10px 12px;text-align:right;">${formatCurrency(p.unitPrice)}</td>
      <td style="padding:10px 12px;text-align:right;font-weight:600;color:#163A2D;">${formatCurrency(p.subtotal)}</td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Bulk Order Enquiry — ${enquiryId}</title>
</head>
<body style="margin:0;padding:0;background:#F7F1E5;font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;">
  <div style="max-width:640px;margin:32px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(22,58,45,0.12);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#163A2D,#235241);padding:28px 32px;text-align:center;">
      <h1 style="margin:0;color:#C9A45C;font-family:Georgia,serif;font-size:22px;letter-spacing:0.03em;">
        🌿 ROOTS 2 RETAILS
      </h1>
      <p style="margin:6px 0 0;color:rgba(247,241,229,0.8);font-size:13px;">Bulk Order Enquiry Received</p>
    </div>

    <!-- Order ID Banner -->
    <div style="background:rgba(201,164,92,0.12);border-bottom:2px dashed rgba(201,164,92,0.3);padding:14px 32px;text-align:center;">
      <span style="font-size:11px;color:#6B726B;letter-spacing:0.1em;text-transform:uppercase;">Order Enquiry ID</span><br>
      <strong style="font-size:18px;color:#163A2D;letter-spacing:0.05em;">${enquiryId}</strong>
      <br><span style="font-size:12px;color:#9DA39D;">${date} IST • Language: ${language === 'hi' ? 'हिंदी' : 'English'}</span>
    </div>

    <!-- Customer Details -->
    <div style="padding:24px 32px;">
      <h2 style="font-family:Georgia,serif;color:#163A2D;font-size:16px;margin:0 0 16px;border-bottom:1px solid #eee;padding-bottom:8px;">
        👤 Customer Details
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#6B726B;font-size:13px;width:120px;">Full Name</td><td style="padding:6px 0;font-size:14px;font-weight:600;">${customer.name}</td></tr>
        <tr><td style="padding:6px 0;color:#6B726B;font-size:13px;">Phone / WA</td><td style="padding:6px 0;font-size:14px;font-weight:600;">${customer.phone}</td></tr>
        <tr><td style="padding:6px 0;color:#6B726B;font-size:13px;">Address</td><td style="padding:6px 0;font-size:14px;">${customer.address}</td></tr>
        <tr><td style="padding:6px 0;color:#6B726B;font-size:13px;">City / State</td><td style="padding:6px 0;font-size:14px;">${customer.city}, ${customer.state} - ${customer.pin}</td></tr>
        ${customer.email ? `<tr><td style="padding:6px 0;color:#6B726B;font-size:13px;">Email</td><td style="padding:6px 0;font-size:14px;">${customer.email}</td></tr>` : ''}
      </table>
    </div>

    <!-- Products -->
    <div style="padding:0 32px 24px;">
      <h2 style="font-family:Georgia,serif;color:#163A2D;font-size:16px;margin:0 0 16px;border-bottom:1px solid #eee;padding-bottom:8px;">
        📦 Products Ordered
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#163A2D;color:#F7F1E5;">
            <th style="padding:10px 12px;text-align:left;border-radius:8px 0 0 0;">Product</th>
            <th style="padding:10px 12px;text-align:center;">Variant</th>
            <th style="padding:10px 12px;text-align:center;">Qty</th>
            <th style="padding:10px 12px;text-align:right;">Unit</th>
            <th style="padding:10px 12px;text-align:right;border-radius:0 8px 0 0;">Subtotal</th>
          </tr>
        </thead>
        <tbody>${productRows}</tbody>
        <tfoot>
          <tr style="background:rgba(22,58,45,0.04);">
            <td colspan="4" style="padding:12px;font-weight:700;font-size:15px;color:#163A2D;">Grand Total</td>
            <td style="padding:12px;font-weight:700;font-size:16px;color:#C9A45C;text-align:right;">${formatCurrency(totalAmount)}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Disclaimer -->
    <div style="margin:0 32px 24px;padding:14px;background:rgba(166,83,54,0.06);border-left:3px solid #A65336;border-radius:8px;">
      <p style="margin:0;font-size:12px;color:#A65336;line-height:1.5;">
        ⚠️ <strong>This is a bulk order enquiry only.</strong> Final price, availability, and shipping cost must be confirmed before any payment is collected.
      </p>
    </div>

    <!-- CTA -->
    <div style="padding:0 32px 28px;text-align:center;">
      <a href="https://wa.me/${process.env.WHATSAPP_NUMBER || '916205846653'}?text=Hi%20${encodeURIComponent(customer.name)}%2C%20we%20received%20your%20bulk%20order%20enquiry%20${enquiryId}.%20Let%27s%20finalize%20the%20details."
         style="display:inline-block;background:linear-gradient(135deg,#163A2D,#235241);color:#C9A45C;text-decoration:none;padding:12px 28px;border-radius:99px;font-weight:700;font-size:14px;">
        📱 Reply via WhatsApp
      </a>
    </div>

    <!-- Footer -->
    <div style="background:#163A2D;padding:16px 32px;text-align:center;">
      <p style="margin:0;font-size:11px;color:rgba(247,241,229,0.5);">
        Roots 2 Retails • Darbhanga, Mithila, Bihar • nayavayapar@gmail.com
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildCustomerConfirmationEmailHTML(order) {
  const { enquiryId, customer, products, totalAmount } = order;
  const productList = products.map(p =>
    `• ${p.productName} (${p.variant}) × ${p.qty} = ₹${p.subtotal}`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Order Enquiry Confirmed — ${enquiryId}</title></head>
<body style="margin:0;padding:0;background:#F7F1E5;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(22,58,45,0.1);">
    <div style="background:linear-gradient(135deg,#163A2D,#235241);padding:28px 32px;text-align:center;">
      <h1 style="margin:0;color:#C9A45C;font-family:Georgia,serif;font-size:20px;">🌿 Roots 2 Retails</h1>
      <p style="margin:6px 0 0;color:rgba(247,241,229,0.8);font-size:13px;">Thank you for your enquiry!</p>
    </div>
    <div style="padding:28px 32px;">
      <p style="font-size:15px;color:#17211D;">Dear <strong>${customer.name}</strong>,</p>
      <p style="color:#6B726B;font-size:14px;line-height:1.6;">
        We have received your bulk makhana order enquiry. Our team will review it and get back to you within
        <strong>4 business hours</strong> on <strong>${customer.phone}</strong>.
      </p>
      <div style="background:rgba(201,164,92,0.1);border-radius:10px;padding:14px 18px;margin:20px 0;border:1px dashed rgba(201,164,92,0.4);">
        <div style="font-size:11px;color:#9DA39D;letter-spacing:0.08em;">YOUR ENQUIRY ID</div>
        <div style="font-size:18px;font-weight:700;color:#163A2D;margin-top:4px;">${enquiryId}</div>
      </div>
      <p style="font-size:13px;color:#6B726B;line-height:1.6;">
        <strong>⚠️ Important:</strong> This confirmation is for your enquiry only. No payment has been collected.
        Final pricing, availability and shipping will be communicated separately.
      </p>
    </div>
    <div style="background:#163A2D;padding:16px 32px;text-align:center;">
      <p style="margin:0;font-size:11px;color:rgba(247,241,229,0.5);">
        Roots 2 Retails • +91 62058 46653 • nayavayapar@gmail.com
      </p>
    </div>
  </div>
</body>
</html>`;
}

/* ============================================================
   IN-MEMORY ORDER STORE (replace with DB in production)
   ============================================================ */
// Simple in-memory store to prevent duplicate submissions
// In production: replace with MongoDB / PostgreSQL / Supabase / Firebase
const orderStore = new Map();

/* ============================================================
   VALIDATION RULES
   ============================================================ */
const orderValidationRules = [
  body('enquiryId').isString().trim().isLength({ min: 5, max: 40 }).escape(),
  body('language').isIn(['en', 'hi']),
  body('timestamp').isISO8601(),
  body('customer.name').trim().isLength({ min: 2, max: 100 }).escape(),
  body('customer.phone').trim().matches(/^[+\d\s\-().]{7,20}$/),
  body('customer.address').trim().isLength({ min: 5, max: 300 }).escape(),
  body('customer.city').trim().isLength({ min: 2, max: 60 }).escape(),
  body('customer.state').trim().isLength({ min: 2, max: 60 }).escape(),
  body('customer.pin').trim().matches(/^\d{6}$/),
  body('customer.email').optional({ checkFalsy: true }).isEmail().normalizeEmail(),
  body('products').isArray({ min: 1, max: 10 }),
  body('products.*.productId').isString().trim().isLength({ min: 3, max: 30 }).escape(),
  body('products.*.productName').isString().trim().isLength({ min: 2, max: 80 }).escape(),
  body('products.*.variant').isString().trim().isLength({ min: 2, max: 80 }).escape(),
  body('products.*.qty').isInt({ min: 1, max: 10000 }),
  body('products.*.unitPrice').isInt({ min: 0, max: 100000 }),
  body('products.*.subtotal').isInt({ min: 0, max: 10000000 }),
  body('totalAmount').isInt({ min: 0, max: 10000000 }),
];

/* ============================================================
   ROUTES
   ============================================================ */

/* GET /api/health ─────────────────────────────────────────── */
app.get('/api/health', (_req, res) => {
  res.json({
    status:    'ok',
    service:   'Roots 2 Retails Bulk Order API',
    timestamp:  new Date().toISOString(),
    smtpConfigured: !!(process.env.SMTP_USER && (process.env.SMTP_APP_PASSWORD || process.env.SMTP_PASS)),
  });
});

/* POST /api/bulk-order ─────────────────────────────────────── */
app.post('/api/bulk-order', orderLimiter, orderValidationRules, async (req, res) => {

  // 1 — Validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed. Please check your order details.',
      errors:  errors.array().map(e => ({ field: e.path, msg: e.msg })),
    });
  }

  const order = req.body;

  // 2 — Duplicate submission guard
  if (orderStore.has(order.enquiryId)) {
    return res.status(409).json({
      success:   true,
      emailSent: orderStore.get(order.enquiryId).emailSent,
      message:   'Order already submitted.',
      enquiryId: order.enquiryId,
    });
  }

  // 3 — Verify subtotals server-side (tamper protection)
  let computedTotal = 0;
  for (const p of order.products) {
    const expected = p.qty * p.unitPrice;
    if (Math.abs(expected - p.subtotal) > 1) {
      return res.status(422).json({
        success: false,
        message: `Price mismatch detected for product ${p.productId}. Please restart your order.`,
      });
    }
    computedTotal += expected;
  }
  if (Math.abs(computedTotal - order.totalAmount) > 1) {
    return res.status(422).json({
      success: false,
      message: 'Total amount mismatch. Please restart your order.',
    });
  }

  // 4 — Store the order (before sending email, to prevent duplicates)
  const record = { ...order, receivedAt: new Date().toISOString(), emailSent: false };
  orderStore.set(order.enquiryId, record);

  // 5 — Send emails
  let emailSent = false;
  let emailError = null;

  if (process.env.SMTP_USER && (process.env.SMTP_APP_PASSWORD || process.env.SMTP_PASS)) {
    try {
      const mailer = await getTransporter();
      const businessEmail = process.env.BUSINESS_EMAIL || 'nayavayapar@gmail.com';

      // Email to business
      await mailer.sendMail({
        from:    `"Roots 2 Retails Chatbot" <${process.env.SMTP_USER}>`,
        to:      businessEmail,
        subject: `New Bulk Makhana Order – Roots 2 Retails – ${order.enquiryId}`,
        html:    buildBusinessEmailHTML(order),
        replyTo: order.customer.email || order.customer.phone,
      });

      // Confirmation to customer (only if email provided)
      if (order.customer.email) {
        await mailer.sendMail({
          from:    `"Roots 2 Retails" <${process.env.SMTP_USER}>`,
          to:      order.customer.email,
          subject: `Your Bulk Order Enquiry Received — ${order.enquiryId} | Roots 2 Retails`,
          html:    buildCustomerConfirmationEmailHTML(order),
        });
      }

      emailSent = true;
      record.emailSent = true;
      console.log(`[Order] ${order.enquiryId} — Emails sent ✓`);

    } catch (err) {
      emailError = err.message;
      console.error(`[Order] ${order.enquiryId} — Email failed:`, err.message);
      // Order is still saved — we can retry or follow up manually
    }
  } else {
    console.warn('[Mail] SMTP not configured — email skipped. Order saved to memory store.');
  }

  // 6 — Respond to frontend
  const responsePayload = {
    success:   true,
    enquiryId: order.enquiryId,
    emailSent,
    message:   emailSent
      ? 'Order enquiry submitted and email notification sent.'
      : 'Order enquiry saved. Email notification could not be sent — our team will follow up via WhatsApp.',
  };

  if (emailError && process.env.NODE_ENV !== 'production') {
    responsePayload.emailError = emailError; // Only expose in dev
  }

  // 7 — Log for audit trail (console only — replace with DB in production)
  console.log('[Order Saved]', JSON.stringify({
    enquiryId:   order.enquiryId,
    customer:    `${order.customer.name} / ${order.customer.phone}`,
    products:    order.products.length,
    totalAmount: order.totalAmount,
    emailSent,
  }, null, 2));

  return res.status(201).json(responsePayload);
});

/* GET /api/orders — Admin endpoint (protect in production) */
app.get('/api/orders', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }
  const orders = Array.from(orderStore.values()).sort((a, b) =>
    new Date(b.receivedAt) - new Date(a.receivedAt)
  );
  res.json({ success: true, count: orders.length, orders });
});

/* 404 handler */
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

/* Global error handler */
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred. Please try again.'
      : err.message,
  });
});

/* ============================================================
   START SERVER
   ============================================================ */
app.listen(PORT, () => {
  console.log(`\n🌿 Roots 2 Retails Bulk Order API`);
  console.log(`   Running on: http://localhost:${PORT}`);
  console.log(`   Health:     http://localhost:${PORT}/api/health`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   SMTP:       ${process.env.SMTP_USER ? '✓ Configured' : '⚠️  Not configured'}\n`);
});

module.exports = app; // for testing
