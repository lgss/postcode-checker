<template>
  <div id="app" class="govuk-template__body">
    <Header />
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="govuk-width-container ">
      <postcode-result/>
      <!--<router-view/>-->
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import PostcodeResult from './components/PostcodeResult.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    PostcodeResult,
    Footer
  }
}
</script>

<style lang="sass">
  @import "node_modules/govuk-frontend/govuk/all"
</style>