import * as fs from 'fs';
import * as http from 'http'
import * as url from 'url';
import * as p from 'path';

const server = http.createServer()
const publicDir = p.resolve(__dirname, 'public')

server.on('request', (req: http.IncomingMessage, res: http.ServerResponse) => {
  const {method, url: path, headers} = req;
  const baseURL = 'http://' + req.headers.host + '/';
  const myUrl = new URL(path, baseURL)
  let fileName = myUrl.pathname.slice(1)
  if(fileName === '') {
    fileName = 'index.html'
  }
  // res.setHeader('Content-Type', 'text/html; charset=utf-8')
  fs.readFile(p.resolve(publicDir, fileName),(err, data) => {
    if(err) {
      if(err.errno === -2){
        res.statusCode = 404
        fs.readFile(p.resolve(publicDir, '404.html'), (e, d) => {
          res.end(d)
        })
      } else if(err.errno === -21){
        res.statusCode = 403
        res.end('403 forbidden')
      }else{
        res.statusCode = 500
        res.end('服务器繁忙')
      }
    }else{
      res.end(data)
    }
  })
})
const HOST = 'localhost';
const PORT = 7767;
server.listen(PORT) 
console.log(`Running on ${PORT}`);
