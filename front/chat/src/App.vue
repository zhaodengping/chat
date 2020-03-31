<template>
    <div class="chatroom">
        <div class="title">聊天室</div>
        <div class="chat">---------以下为聊天内容---------</div>
        <div class="message">
          <div v-for='(item,index) in messageList' :key="index">
            <div v-if='item.type=="me"'>我：{{item.text}}</div>
            <div v-if='item.type=="robot"'>机器人：{{item.text}}</div>
          </div>
        </div>
        <div>
            <el-form :model="form" label-width="100px">
                <el-form-item label="消息">
                    <el-input v-model="form.message" placeholder="请输入消息"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="send">发送</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messageList: [],
            form: {
                message: ""
            },
            isSendName:true
        }
    },
    mounted() {
        this.socket()

    },
    methods: {
        socket() {
            let that = this;
            if (window.WebSocket) {
                let nickName = "Alice"
                let ws = new WebSocket("ws://localhost:8081");
                ws.onopen = function() {
                    if(that.isSendName){
                      ws.send(nickName)
                    }
                    that.isSendName=false
                    if(that.form.message!=''){
                      ws.send(that.form.message)
                    }
                }

                ws.onmessage = function(e) {
                    that.messageList.push({text:e.data,type:'robot'})
                    that.form.message=''
                }
                ws.onclose = function() {
                    console.log('连接关闭')
                }
                ws.onerror = function() {
                    console.log('发生错误')
                }
            } else {
                console.log('浏览器暂不支持websocket')
            }
        },
        send() {
          this.messageList.push({text:this.form.message,type:"me"});
          this.socket()
        }
    },
}
</script>
<style lang="scss" scoped>
  .chatroom{
    margin: auto;
    padding: 20px;
    width: 70%;
    border: 1px solid #666;
    .title{
      margin-bottom: 20px;
      text-align: center;
      font-size:20px;
    }
    .chat{
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    .message{
      margin: 10px 10px 10px 15%;
      font-size: 12px;
      color: #666;
    }
  }
</style>