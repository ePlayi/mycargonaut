<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Meine Chats</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="chat in chats" :key="chat">
                  <router-link :to="{ name: 'chat', query: {id: chat.chatId, partnerid:chat.partnerId }}" class="nolink">
                    <v-list-item-content>
                      <v-list-item-title>{{ chat.chatPartner }}</v-list-item-title>
                    </v-list-item-content>
                  </router-link>
                  <hr>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  name: "chats",
  data() {
    return {
      //IF LOCAL TESTED USE THIS URL FOR THE API CALLS
      url: 'http://localhost:3001/',
      //url: 'https://mycargonaut.onrender.com/',

      chats: [],

    }
  },

  created() {
    // Fetch the chats from the backend
    this.getChats()
    document.title = "Chats";

  },
  methods:{
    getChats(){
      this.axios.get(this.url+'chats',{
      })
          .then((response) => {
            this.chats=response.data.chats
            console.log(this.chats)
          })
    }
  }
}
</script>

<style scoped>
.nolink{
  text-decoration: none;
  color: unset;
}
</style>
