const https = require('https');

https.get('https://maps.app.goo.gl/HwzqmRLZEv9qi22a7', (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Redirect Location:', res.headers.location);
  
  if (res.headers.location) {
    https.get(res.headers.location, (res2) => {
      console.log('Second Status Code:', res2.statusCode);
      console.log('Second Redirect Location:', res2.headers.location);
    });
  }
}).on('error', console.error);
