const http = require('http');
const https = require('https');

const utils = {
    request: function (config) {
        const url = config.url;
        const method = config.method || 'GET';
        const headers = config.headers;
        const isHttpsRequest = url.startsWith('https');
        const transport = isHttpsRequest ? https : http;

        // 先替换https:// http://  后第一个/前是  host  后面是path
        // const host = ;
        // let path;

        const tmpHeaders = {
            'Content-Type': 'application/json',
            ...headers,
        };
        let data = config.data;
        if (data) {
            data = JSON.stringify(data);
        }
        if (data) {
            tmpHeaders['Content-Length'] = Buffer.byteLength(data);
        }

        return new Promise((resolve, reject) => {
            var responseBuffer = [];
            const req = transport.request(url, {
                // host,
                // path,
                method,
                headers: tmpHeaders,
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

            // req.write();
            req.end(data);
        })
    }
}

module.exports = utils