var port = 3000;
var serverUrl = "192.168.1.2";



var http = require("http");
var path = require("path");             //нужен для работы с файлами и папками
var fs = require("fs");



console.log("Starting web server at " + serverUrl + ":" + port);



http.createServer( function(req, res) {





    var filename = req.url || "head.html";        //url Html
    var ext = path.extname(filename);             //ext = расширение файла
    var localPath = __dirname;
    var validExtensions = {                       //все расширения файлов
        ".html" : "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".txt": "text/plain",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".png": "image/png",
        ".ico": "image/png"
    };
    var isValidExt = validExtensions[ext];



    if (isValidExt) {
        localPath += filename;



        fs.exists(localPath, function(exists) {                                //проверка расширения
            if(exists) {
                console.log("Serving file: " + localPath);
                getFile(localPath, res, ext);                                 //передача файла на сайт
            } else {
                console.log("File not found: " + localPath);
            }
        });



    } else {
         getFile(__dirname + '/head.html', res, 'text/html');
    }



}).listen(port, serverUrl);                                                    //получаем файлы с сервера



function getFile(localPath, res, validExtensions) {
    fs.readFile(localPath, function(err, contents) {
        if(!err) {
            res.setHeader("Content-Length", contents.length);
            res.statusCode = 200;
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}
