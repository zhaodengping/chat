let ws=require('nodejs-websocket');

console.log("建立连接")
let name1=false,name2=null;
let fromName1Msg='',fromName2Msg=''
let server=ws.createServer(function(conn){
    conn.on("text",function(str){
        if(str=='web1'){
            name1=true;
        }
        if(name1){
            fromName1Msg=str;
            conn.sendText(JSON.stringify({to:"web2",message:fromName1Msg}))
        }
    });
    conn.on("close",function(str){
        console.log('服务器关闭')
    })
    conn.on('error',function(str){
        console.log('关闭异常')
    })
}).listen(8081)