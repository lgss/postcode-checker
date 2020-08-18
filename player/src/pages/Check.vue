<template>
    <main
        class="govuk-main-wrapper govuk-main-wrapper--auto-spacing"
        id="main-content"
        role="main"
    >
        <div class="govuk-grid-row">
            <div class="govuk-grid-column-two-thirds">
                <h1 class="govuk-heading-xl">Postcode Checker</h1>

                <form class="form" action="/results" method="post">
                    <div class="govuk-form-group">
                        <h1 class="govuk-heading-m">
                            <label for="width-10">
                                What is the postcode you want to check?
                            </label>
                        </h1>
                        <div class="govuk-inset-text">
                            For example, SW1A 1AA
                        </div>
                        <span id="postcode-error" class="govuk-error-message">
                            <span class="govuk-visually-hidden">Error:</span>The
                            postcode you entered is invalid. It must be a
                            postcode in the UK.
                        </span>
                        <input
                            class="govuk-input govuk-input--width-10"
                            id="user_postcode"
                            name="user_postcode"
                            type="text"
                        />
                    </div>
                    <button class="govuk-button" data-module="govuk-button">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    </main>
</template>
