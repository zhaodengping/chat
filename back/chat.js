let ws=require('nodejs-websocket');

console.log("建立连接")
let isName=true
let server=ws.createServer(function(conn){
    console.log(isName)
    conn.on("text",function(str){
        console.log(str)
        if(isName){
            conn.sendText(str+'上线了')
            isName=false
        }else{
            conn.sendText(str)
        }
    });
    conn.on("close",function(str){
        console.log('服务器关闭')
    })
    conn.on('error',function(str){
        console.log('关闭异常')
    })
}).listen(8081)