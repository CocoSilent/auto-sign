// const http = require('http');
// const https = require('https');

const utils = require('./utils');

async function juejin(event, context) {
    const sessionid = process.env.juejin_sessionid || '4575cc41201bd68dd3cb882ab1ea5a13';
    const aid = process.env.juejin_aid || '2608';

    let result = false;
    let msg = '';

    await utils.request({
        url: 'https://api.juejin.cn/growth_api/v1/check_in?aid=' + aid,
        method: 'POST',
        headers: {
            'cookie': 'sessionid=' + sessionid,
        },
    }).then(res => {
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

exports.main = juejin;
