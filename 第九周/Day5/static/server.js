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
        let users = fs.readFileSync('./database/data.json', 'utf8');
        users = JSON.parse(users);
        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        if (query.id) {
            let i = query.id; // 2
            resObj.data = users.filter((item) => {
                return item.id === Number(query.id);
            });
            res.end(JSON.stringify(resObj));
        } else {
            resObj.data = users;
            res.end(JSON.stringify(resObj));
        }
        return;
    }
    if (pathname === '/addUser') { // 用户添加接口
        let str = '';
        req.on('data', (data) => { // 接收响应体一点一点传输过来的数据
            str += data;
        });
        req.on('end', () => { // 接收完毕后 触发
            let user = JSON.parse(str); // 接收到用户数据对象
            let users = fs.readFileSync('./database/data.json', 'utf8');
            users = JSON.parse(users);
            user.id = users[users.length - 1].id + 1; // 给提交过来的用户分配id
            resObj.data = [user];
            users.push(user);
            // 将users 写入到data.json 中
            fs.writeFileSync('./database/data.json', JSON.stringify(users));
            res.end(JSON.stringify(resObj));
        });
        return;
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


}).listen(8010, () => console.log('监听8010端口'));