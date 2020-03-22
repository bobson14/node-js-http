'use strict';
const http = require('http');

const server = http.createServer((req, res) => {
    const now = new Date();
    console.info(`[${now}] Requested by ${req.connection.remoteAddress}`);
    res.writeHead(200, {
        'Content-type': 'text/html; charset=utf8'
    });
    
    switch (req.method) {
        case 'GET':
            const fs = require('fs');
            const rs = fs.createReadStream('./form.html');
            rs.pipe(res);
            break;
        case 'POST':
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            }).on('end', () => {
                const decoded = decodeURIComponent(body);
                console.info(`[${now}] 投稿: ${body}`);
                res.write(`<h1>${decoded} が投稿されました。</h1>`);
                res.end();
            });
            break;
        default:
            break;
    }
}).on('error', (e) => {
    console.error(`[${new Date()}] Server Error`, e);
}).on('clientError', (e) => {
    console.error(`[${new Date()}] Client Error`, e);
});
const port = 8000;
server.listen(port, () => {
    console.info(`[${new Date()}] Listening on ${port}`);
});