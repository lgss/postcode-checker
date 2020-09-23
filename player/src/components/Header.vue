<template>
<header class="govuk-header " role="banner" data-module="govuk-header" :style="`--header_background_colour: ${config.header_background_colour}`">
  <div class="govuk-header__container govuk-width-container">
    
    <div class="govuk-header__content">
      <a :href="`${config.logo_url}`" 
      class="govuk-header__link govuk-header__link--service-name" 
      :style="`--header_text_colour: ${config.header_text_colour}`">
      <img class="header_logo" src="../assets/header_logo.png" :alt="`${config.header_text}`">
        {{config.header_text}}
      </a>
    </div>
  </div>
</header>
</template>

<script>
import config from '../../config.json'
export default {
  data () {
    return {
			items: config
    }
  },
  created() {
    this.config = config;
  },
}
</script>

<style scoped>
    .govuk-header__content a{
      --header_text_colour: #000000;
      color: var(--header_text_colour);
    }
    .govuk-header{
        --header_background_colour: #f3f2f1;
        background-color: var(--header_background_colour)
    }
    .govuk-header__container{
      border: none;
    }
    .header_logo{
      height: 60px;
    }
</style>