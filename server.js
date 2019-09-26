const https = require('https');
const stream = require('stream');

const request = https.get('https://www.google.com/', res => {
  // console.log('statusCode:', res.statusCode);
  // console.log('headers:', res.headers);
  res.setEncoding('utf8')
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    const bodyStart = data.indexOf('<body');
    const bodyEnd = data.lastIndexOf('</body>');
    const body = data.substring(bodyStart, bodyEnd);
    const moreParsedBody = body.replace(/\<script[\s\S]*?\/script>/g, '');
    console.log(moreParsedBody);
    // data.replace(new RegExp('(<body[\s\S]*/body>)'), (...args) => console.log(args));
  });
});

request.on('error', error => {
  console.error(error);
});
