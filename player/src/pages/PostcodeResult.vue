<template>
    <div>
        <router-link class="govuk-back-link" :to='{name: "Enter Postcode"}'>Back</router-link>
        <main
            class="govuk-main-wrapper govuk-main-wrapper--auto-spacing"
            id="main-content"
            role="main">
            <div class="govuk-grid-row">
                <div class="govuk-grid-column-two-thirds">
                    <h1 class="govuk-heading-xl">Results for {{ dispPostcode }}</h1>
                    <div class="standard" v-html="resultContent"></div>

            <p><router-link 
                role="button" 
                draggable="false" 
                class="govuk-button govuk-button--start" 
                data-module="govuk-button" 
                :to='{name: "Enter Postcode"}'>
                Look for another postcode
            </router-link></p>

                </div>
                <div class="govuk-grid-column-one-third">
                    <aside class="app-related-items" role="complementary">
                        <h2 class="govuk-heading-m" id="subsection-title">
                            Useful links
                        </h2>
                        <nav
                            role="navigation"
                            aria-labelledby="subsection-title"
                        >
                            <ul class="govuk-list govuk-!-font-size-16">
                                <li>
                                    <a
                                        href="https://www.gov.uk/government/collections/local-restrictions-areas-with-an-outbreak-of-coronavirus-covid-19"
                                    >
                                        Areas with local restrictions in place
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.gov.uk/guidance/governments-approach-to-managing-local-coronavirus-outbreaks"
                                    >
                                        Government's approach to managing local
                                        coronavirus outbreaks</a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="https://www.gov.uk/government/publications/coronavirus-outbreak-faqs-what-you-can-and-cant-do/coronavirus-outbreak-faqs-what-you-can-and-cant-do"
                                        >Coronavirus outbreak FAQs</a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="https://www.gov.uk/coronavirus"
                                        class="govuk-!-font-weight-bold"
                                    >
                                        More on coronavirus
                                        <span class="govuk-visually-hidden"
                                            >in Useful links</span
                                        >
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    computed: {
      dispPostcode() {return this.resultPostcode || this.postcode}
    },
    name: "postcodeResult",
    props: ["postcode"],
    created() {
        fetch(this.endpoint + "/query/" + this.postcode)
            .then((x) => {
                x.text().then((y) => this.resultContent = y)
                this.resultPostcode = x.headers.get("Postcode")
            });
    },
    data() {
        return {
            resultContent: "Loading...<br/><br/><br/><br/><br/><br/>",
            resultPostcode: '',
            endpoint: process.env.VUE_APP_API_ENDPOINT,
        };
    },
};
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
.standard ol
  @extend .govuk-list
  @extend .govuk-list--number
.standard strong
  @extend .govuk-\!-font-weight-bold
notice
  border-top: 1px solid #f0000d
</style>
