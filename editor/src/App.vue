<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h1>Local Lockdown Editor by LGSS Digital</h1>
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
