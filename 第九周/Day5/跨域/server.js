let http = require('http');
let fs = require('fs');
let url = require('url');
let mime = require('mime'); // 根据文件名解析mime类型
let resObj = { // 相应对象
    "errno": 0,
    "msg": "success"
};
http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url, true);
    console.log(pathname);


    // 根据不同请求路径（请求接口） 返回相应的内容/相应的处理
    if (pathname === '/') { // 返回首页
        let htmlStr = fs.readFileSync('./index.html');
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        // res.end('你好珠峰');
        res.end(htmlStr);
        return
    }

    if (pathname === '/user') { // 数据接口
        console.log(query.cb);
        let cb = query.cb;
        let obj = {id: 123, name: 'zhufeng'};
        res.end(`${cb}(${JSON.stringify(obj)})`)
    }



    // 处理静态资源请求
    let flag = fs.existsSync('.' + pathname); // 根据文件路径进行访问
    if (flag) { // 避免读取不存在文件 而导致服务器报错
        let staticStr = fs.readFileSync('.' + pathname); // ./index.css ./index.js
        res.setHeader('Content-Type', `${mime.lookup(pathname)};charset=utf-8`);
        res.end(staticStr);
    } else { // 访问的路径不存在 就报404
        res.statusCode = 404;
        res.end('404 NOTFOUND')
    }


}).listen(8020, () => console.log('监听8020端口'));