<template>
    <main
        class="govuk-main-wrapper govuk-main-wrapper--auto-spacing"
        id="main-content"
        role="main"
    >
        <div class="govuk-grid-row">
            <div class="govuk-grid-column-two-thirds">
                <h1 class="govuk-heading-xl">
                    Postcode Checker
                </h1>

                <h2 class="govuk-heading-m">
                    <label for="width-10">
                        Use this service to check any postcode for:
                    </label>
                </h2>
                <ul class="govuk-list govuk-list--bullet">
                    <li>
                        Guidelines, restrictions and other information about
                        Covid-19.
                    </li>
                </ul>

                <router-link
                    to="/enter_postcode"
                    role="button"
                    draggable="false"
                    class="govuk-button govuk-button--start govuk-!-margin-top-2 govuk-!-margin-bottom-8"
                    data-module="govuk-button"
                    id="btn-start"
                    :style="`--button_colour: ${config.button_colour};
                     --button_hover_colour: ${config.button_hover_colour};
                     --button_text_colour: ${config.button_text_colour}`"
                >
                    Start now
                    <svg
                        class="govuk-button__start-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.5"
                        height="19"
                        viewBox="0 0 33 40"
                        role="presentation"
                        focusable="false"
                    >
                        <path
                            fill="currentColor"
                            d="M0 0h13l20 20-20 20H0l20-20z"
                        ></path>
                    </svg>
                </router-link>
                <p>This tool does not store any of your personal data.</p>
            </div>
        </div>
    </main>
</template>

<script>
import config from '../../config.json'

export default {
    name: "start",
    data () {
    return {
			items: config
    }
  },
  created() {
    this.config = config;
  }
}
</script>

<style>
    .govuk-button{
        --button_colour: #00703c;
        background-color: var(--button_colour);
    }
    .govuk-button:hover{
        --button_hover_colour: #002d18;
        background-color: var(--button_hover_colour);
    }
    .govuk-button:link, .govuk-button:visited, .govuk-button:active, .govuk-button:hover{
        --button_text_colour: #FFFFFF;
        color: var(--button_text_colour);
    }
</style>