/**
 * Manual API test — run with: node test-api.js
 * Tests the /api/bulk-order endpoint locally.
 * Make sure server.js is running first: node server.js
 */

const http = require('http');

const testPayload = {
  enquiryId:   'R2R-TEST-0001',
  language:    'en',
  timestamp:   new Date().toISOString(),
  customer: {
    name:    'Test Customer',
    phone:   '+91 98765 43210',
    address: '123 Test Lane, Sector 4',
    city:    'Patna',
    state:   'Bihar',
    pin:     '800001',
    email:   '',
  },
  products: [
    {
      productId:   'prod-classic',
      productName: 'Classic Roasted',
      variantId:   'classic-150',
      variant:     '150g — Jumbo 6-Sut',
      qty:         5,
      unitPrice:   299,
      subtotal:    1495,
    },
    {
      productId:   'prod-truffle',
      productName: 'Truffle Herb',
      variantId:   'truffle-150',
      variant:     '150g — Jumbo 6-Sut',
      qty:         3,
      unitPrice:   499,
      subtotal:    1497,
    },
  ],
  totalAmount: 2992,
};

const data = JSON.stringify(testPayload);

const options = {
  hostname: 'localhost',
  port:     process.env.PORT || 3001,
  path:     '/api/bulk-order',
  method:   'POST',
  headers: {
    'Content-Type':   'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

console.log('\n🧪 Testing POST /api/bulk-order…\n');

const req = http.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log(`Status:  ${res.statusCode}`);
    try {
      const json = JSON.parse(body);
      console.log('Response:', JSON.stringify(json, null, 2));
      if (json.success) {
        console.log('\n✅ Test PASSED — Order accepted');
      } else {
        console.log('\n❌ Test FAILED —', json.message);
      }
    } catch (_) {
      console.log('Raw:', body);
    }
  });
});

req.on('error', err => {
  console.error('\n❌ Connection error:', err.message);
  console.error('   Is the server running? → node server.js');
});

req.write(data);
req.end();
