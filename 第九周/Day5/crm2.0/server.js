let http = require('http');
let fs = require('fs');
let url = require('url');
let mime = require('mime');
let resObj = {
    "errno": 0,
    "msg": "success",
};
http.createServer((req, res) => {
   let {pathname, query} = url.parse(req.url, true);
   if(pathname === '/'){
       let htmlStr = fs.readFileSync('./index.html');
       res.setHeader('Content-Type', 'text/html;charset=utf-8');
       res.end(htmlStr);
       return;
   }
    let users = JSON.parse(fs.readFileSync('./data/users.json'));
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
   // 获取用户数据
    if(pathname === '/getUserInfo') {
       if(query.id){

       }else { // 返回所有用户数据
           resObj.data = users;
           res.end(JSON.stringify(resObj));
       }
      return;
    }

   // 用户信息添加
    if(pathname === '/addUserInfo'&& req.method === 'POST') {
       let str = '';
       req.on('data', (data) => {
           str += data;
       });
       req.on('end', () => {
           let user = JSON.parse(str);
           user.id = users[users.length-1].id + 1;
           users.push(user);
           fs.writeFileSync('./data/users.json', JSON.stringify(users));
           resObj.data = user;
           resObj.msg = '用户添加成功！';
           res.end(JSON.stringify(resObj));
       });
       return;
    }

   // 处理静态资源请求
    let flag = fs.existsSync('.' + pathname);
   if(flag) {
       let staticRes = fs.readFileSync('.' + pathname);
       res.setHeader('Content-Type', `${mime.lookup(pathname)};charset=utf-8`);
       res.end(staticRes);
   } else {
      res.statusCode = 404;
      res.end('404 NOT FOUND!');
   }

}).listen(7070, () => console.log('监听7070端口'));
