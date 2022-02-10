const http = require('https');

async function juejin(event, context) {
    const sessionid = process.env.juejin_sessionid;
    const aid = process.env.juejin_aid;

    let result = false;
    let msg = '';

    const postData = JSON.stringify({});

    const request = new Promise((resolve, reject) => {
        var responseBuffer = [];
        const req = http.request({
            host: 'api.juejin.cn',
            path: '/growth_api/v1/check_in?aid=' + aid,
            method: 'POST',
            headers: {
                'cookie': 'sessionid=' + sessionid,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            },
        }, function (res) {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                responseBuffer.push(chunk);
            });
            res.on('end', () => {
                const responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
                resolve(responseData);
            });
        })

        req.on('error', (e) => {
            reject(`problem with request: ${e.message}`);
        });

        req.write(postData);
        req.end();
    })

    await request.then(res => {
        const body = JSON.parse(res);
        if (body.err_msg) {
            result = false;
            msg = body.err_msg;
        } else {
            result = true;
        }
    }).catch(error => {
        result = false;
        msg = error;
    })

    console.log({
        result,
        msg
    });

    return {
        result,
        msg
    };
}

juejin();

exports.main = juejin;
