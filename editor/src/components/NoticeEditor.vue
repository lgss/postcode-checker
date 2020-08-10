<template>
  <v-main app>
    <v-text-field label="Name" v-model="notice.name"/>
    <v-btn @click="save">Save</v-btn>
    <v-btn @click="cancel">Cancel</v-btn> 
</v-main>
</template>

<script>
export default {
  props: ['notice'],
  data() {
    return {
      nothing: false
    }
  },
  methods: {
    save() {
      //this.$emit('input', )
    },
    cancel() {}
  }
}
</script>