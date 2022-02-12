// const http = require('http');
// const https = require('https');

const utils = require('./utils');

async function juejin(event, context) {
    const sessionid = process.env.juejin_sessionid;
    const aid = process.env.juejin_aid;

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
        if (body.err_no) {
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


    // 查询免费抽奖次数

    await utils.request({
        url: 'https://api.juejin.cn/growth_api/v1/lottery_config/get?aid=' + aid,
        headers: {
            'cookie': 'sessionid=' + sessionid,
        },
    }).then(res => {
        const body = JSON.parse(res);
        if (body.err_no) {
            result = false;
            msg = body.err_msg;
        } else {
            if (body.data.free_count) {
                result = true
            } else {
                result = false;
                msg = '没有免费次数';
            }
        }
    }).catch(error => {
        result = false;
        msg = error;
    })

    console.log({
        result,
        msg
    });

    if (!result) {
        return {
            result,
            msg
        };
    }


    // 继续抽奖吧

    await utils.request({
        url: 'https://api.juejin.cn/growth_api/v1/lottery/draw?aid=' + aid,
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
