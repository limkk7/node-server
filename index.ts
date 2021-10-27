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
    
  switch(myUrl.pathname) {
    case '/index.html':
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      fs.readFile(p.resolve(publicDir, 'index.html'),(err, data) => {
        if(err) throw err;
        res.end(data.toString())
      })
      break;
    case '/style.css':
      res.setHeader('Content-Type', 'text/css; charset=utf-8')
      fs.readFile(p.resolve(publicDir, 'style.css'),(err, data) => {
        if(err) throw err;
        res.end(data.toString())
      })
      break;
      case '/main.js':
      res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
      fs.readFile(p.resolve(publicDir, 'main.js'),(err, data) => {
        if(err) throw err;
        res.end(data.toString())
      })
      break;
    default:
      res.statusCode = 404
      res.end()
  } 
})
const HOST = 'localhost';
const PORT = 7766;
server.listen(PORT) 
console.log(`Running on ${PORT}`);
