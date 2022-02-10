const http = require('https');

async function juejin(event, context) {
  let reulst = false;
  let msg = '';

  const postData = JSON.stringify({

  });

  const req = http.request({
    host: 'api.juejin.cn',
    path: '/growth_api/v1/check_in?aid=2608',
    method: 'POST',
    headers: {
      'cookie': 'sessionid='+ '3d1dd4cf22004e4cf4b4358b736af9d4',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    },
  }, function (res) {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  })

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();


  return {
    reulst,
    msg
  };
}

juejin();

exports.main = juejin;
