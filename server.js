const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg'};
http.createServer((req,res)=>{
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file = path.join(root, pathname === '/' ? 'index.html' : pathname.replace(/^\/+/,''));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file,(err,data)=>{ if(err){res.writeHead(404);return res.end('Not found');} res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(data); });
}).listen(process.env.PORT || 4173, '0.0.0.0', ()=>console.log(`Cosmos em Formação em http://localhost:${process.env.PORT||4173}`));
