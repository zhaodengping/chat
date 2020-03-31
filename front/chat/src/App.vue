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
      }
    }else{
      console.log('浏览器暂不支持websocket')
    }
  },
}
</script>
