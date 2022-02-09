const http = require('https');


async function juejin(event, context) {
  let reulst = false;
  let msg = '';

  const req = http.request({
    // url: 'https://api.juejin.cn/growth_api/v1/check_in?aid=2608&uuid=6957681294839219724',
    host: 'api.juejin.cn',
    port: 443,
    path: '/growth_api/v1/check_in?aid=2608',
    method: 'POST',
    headers: {
      'cookie': 'sessionid='+ '3d1dd4cf22004e4cf4b4358b736af9d4',
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



  return {
    reulst,
    msg
  };
}

juejin();

exports.main = juejin;
