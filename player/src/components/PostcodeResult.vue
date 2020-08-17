<template>
  <div>    
  <router-link class="govuk-back-link" to='enter-postcode'>Back</router-link> 
  <a class="govuk-back-link" href="/enter_postcode">Back</a>
  <main class="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">Results for {{postcode}}</h1>
        <div class="standard" v-html="resultContent">
        </div>

        <!--h2 class="govuk-heading-m">The following are related to the postcode you entered:</h2>
          <p>
            </p><h3 class="Xgovuk-heading-m">
              Guidance 1
            </h3>
          <p></p>
          <p>
            <a href="https://www.gov.uk/coronavirus">Follow national lockdown guidelines.</a>
          </p><h3 class="Xgovuk-heading-m"> 
              Guidance 2
          </h3>
          <p>
            <a href="https://www.gov.uk/guidance/leicester-lockdown-what-you-can-and-cannot-do">
              There are currently localised lockdown measures in effect for the postcode you entered.</a><br>
              These measures will be reviewed on: Monday 17th August 2020.
            </p><p class="Xgovuk-!-font-weight-bold">
              DO:
            </p>
            <ul class="Xgovuk-list govuk-list--bullet">
            <li>Guidance note 1</li>
            <li>Guidance note 2</li>
            <li>Guidance note 3</li>
          </ul>
          <p></p>
          <p class="Xgovuk-!-font-weight-bold">
            DON'T:
          </p>
          <ul>
          <li>Guidance note 1</li>
          <li>Guidance note 2</li>
          <li>Guidance note 3</li>
        </ul>
          <p> <a href="/start" role="button" draggable="false" class="govuk-button govuk-button--start" data-module="govuk-button">
            Look for another postcode
            <svg width="17.5" height="19">
            </svg></a></p>

        <p style="padding-top: 50px; text-emphasis: bold;"><a href="https://www.gov.uk/coronavirus"><strong>Remember to always follow government guidelines.</strong> </a></p>
-->
      </div>
        <div class="govuk-grid-column-one-third">
          <aside class="app-related-items" role="complementary">
            <h2 class="govuk-heading-m" id="subsection-title">
              Useful links
            </h2>
            <nav role="navigation" aria-labelledby="subsection-title">
              <ul class="govuk-list govuk-!-font-size-16">
                <li>
                  <a href="https://www.gov.uk/government/collections/local-restrictions-areas-with-an-outbreak-of-coronavirus-covid-19">
                    Areas with local restrictions in place
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/guidance/governments-approach-to-managing-local-coronavirus-outbreaks"> Government's approach to managing local coronavirus outbreaks</a>
                </li>
                <li>
                  <a href="https://www.gov.uk/government/publications/coronavirus-outbreak-faqs-what-you-can-and-cant-do/coronavirus-outbreak-faqs-what-you-can-and-cant-do">Coronavirus outbreak FAQs</a>
                </li>
                <li>
                  <a href="https://www.gov.uk/coronavirus" class="govuk-!-font-weight-bold">
                    More on coronavirus <span class="govuk-visually-hidden">in Useful links</span>
                  </a>
                </li>
              </ul>
              <img src="/public/images/stay alert, control the virus, save lives.png" alt="stay alert, control the virus, save lives">
            </nav>
          </aside>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  created() {
    fetch(this.endpoint + '/query/' + this.postcode)
      .then((x) => this.resultContent = x)
  },
  data() {
    return {
      resultContent: 'Loading...',
      endpoint: process.env.VUE_APP_API_ENDPOINT
    }
  },
  props: {
    postcode: {
      type: String,
      default: 'CB3 0AP'
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "node_modules/govuk-frontend/govuk/all"

  .standard h1
    @extend .govuk-heading-xl
  .standard h2
    @extend .govuk-heading-l
  .standard h3
    @extend .govuk-heading-m
  .standard h4
    @extend .govuk-heading-s
  .standard ul
    @extend .govuk-list
    @extend .govuk-list--bullet
  .standard b
    @extend .govuk-\!-font-weight-bold 
</style>