<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>
      <h1>Local Lockdown Editor</h1> 
      <h3 style="padding-left: 5px;">by LGSS Digital</h3>
      <v-btn class="pa-0" min-width="32px" href="https://www.lgss-digital.co.uk" target="_blank" text>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <content-home/>
    </v-main>
  </v-app>
</template>

<script>
import ContentHome from './components/ContentHome.vue';

export default {
  name: 'App',

  components: {
    ContentHome,
  },

  data: () => ({
  }),
};
</script>
