<template>
  <div>正在连接着...</div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  created() {
    if(window.WebSocket){
      let ws=new WebSocket("ws://localhost:8081");
      ws.onopen=function(){
        console.log('服务器连接成功')
        ws.send("页面1服务器发消息了")
      }
      
      ws.onmessage=function(e){
        console.log(e)
      }
      ws.onclose=function(){
         console.log('连接关闭')
      }
      ws.onerror=function(){
        console.log('发生错误')
      }
    }else{
      console.log('浏览器暂不支持websocket')
    }
  },
}
</script>
