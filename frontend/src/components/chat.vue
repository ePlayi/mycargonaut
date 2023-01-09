<template>
  <v-container>
    <h1>Chat</h1>
    <v-card v-for="message in messages" :key="message.id" class="mb-3"
            :class="{ 'text-end': message.youId === yourId, 'text-start': message.youId !== yourId }"
    >
      <v-card-title>{{ message.chatPartner }}</v-card-title>
      <v-card-text>{{ message.message }}</v-card-text>
      <v-card-subtitle>{{ message.date }}</v-card-subtitle>
    </v-card>
    <v-form @submit.prevent="sendMessage()" >
      <v-text-field v-model="newMessage" label="Message"></v-text-field>
      <v-btn type="submit" color="primary">Send</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "chat",
  created() {
    document.title = "Chat";
  },
  beforeMount() {
    this.getOwnId()
    this.getMessages()
  },

  data(){
    return{
      //IF LOCAL TESTED USE THIS URL FOR THE API CALLS
      url: 'http://localhost:3001/',
      //url: 'https://mycargonaut.onrender.com/',

      chatId: new URLSearchParams(window.location.search).get('id'),
      partnerid: new URLSearchParams(window.location.search).get('partnerid'),


      messages:[],
      newMessage:'',
      yourId:0,
    }
  },
  mounted() {
    setInterval(()=>{
      this.getMessages()
    },5000)
  },
  methods:{
    sendMessage(){
      if(this.newMessage!==''){
          this.axios.request({
            method: 'POST',
            url: this.url+'chat',
            data: {
              message: this.newMessage,
              sessionId: this.chatId,
              receiverId: this.partnerid

            },
          })
              .then(response => {
                console.log(response.data)
                this.newMessage=''
                this.getMessages()
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        else{
          alert("Leere Nachricht blockiert")
        }
      },
    getMessages(){
      this.axios.get(this.url+'chat/'+this.chatId,{
      })
          .then((response) => {
            this.messages=response.data.messages
            console.log(this.messages)
          })
    },
    getOwnId(){
      this.axios.get(this.url+'onlyUserId',{
      })
          .then((response) => {
            this.yourId=response.data.id
            console.log(this.yourId)
          })
    }
  }
}
</script>

<style scoped>
.text-end{
  text-align: right;
  background-color: #055234;
  color: white;
}
.text-start{
  text-align: left;
  background-color: #464646;
  color: white;
}

</style>
