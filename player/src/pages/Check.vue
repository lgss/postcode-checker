<template>
    <div>
        <router-link class="govuk-back-link" :to="{name: 'Start'}">Back</router-link>
        <main
            class="govuk-main-wrapper govuk-main-wrapper--auto-spacing"
            id="main-content"
            role="main">
            <div class="govuk-grid-row">
                <div class="govuk-grid-column-two-thirds">
                    <h1 class="govuk-heading-xl">Postcode Checker</h1>

                    <form class="form">
                        <div class="govuk-form-group">
                            <h1 class="govuk-heading-m">
                                <label for="width-10">
                                    What is the postcode you want to check?
                                </label>
                            </h1>
                            <div class="govuk-inset-text">
                                For example, SW1A 1AA
                            </div>
                            <span v-show="postcode === '' && postcode_invalid" id="postcode-error" class="govuk-error-message">
                                <span class="govuk-visually-hidden">Error:</span>The
                                postcode you entered is invalid. It must be a
                                postcode in the UK.
                            </span>
                            <input
                                v-model="postcode"
                                class="govuk-input govuk-input--width-10"
                                id="user_postcode"
                                name="user_postcode"
                                type="text"
                            />
                        </div>
                        <button class="govuk-button" data-module="govuk-button" @click="check">
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </main>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            postcode: "",
        };
    },
    computed: {
        postcode_invalid() {
            //return this.postcode.replace(/[^0-9a-zA-Z]/g, '').replace(/^(.*)(.{3})$/,'$1 $2')
            return false
        }
    },
    methods: {
        check(e) {
            e.preventDefault()
            if (this.postcode !== '' && !this.postcode_invalid) 
                this.$router.push({
                    name: "Result",
                    params: { postcode: this.postcode}
                })
        }
    }
};
</script>
