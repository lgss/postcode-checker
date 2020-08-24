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
export default {
    name: "start"
}
</script>