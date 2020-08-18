<template>
  <div id="app" class="govuk-template__body">
    <Header />
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div class="govuk-width-container ">
      <router-view id="router-view"/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="sass">
  @import "node_modules/govuk-frontend/govuk/all"
</style>