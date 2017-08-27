let http = require('http');
let url = require('url');
http.createServer((req, res) => {
    let {pathname} = url.parse(req.url);
    // 允许所有源跨域
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // 允许某一个源跨域
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:63342');
    if(pathname === '/getTime')  {
        res.end(`${new Date().toLocaleString()}`);
    }
}).listen(7000, () => console.log('监听7000端口'));