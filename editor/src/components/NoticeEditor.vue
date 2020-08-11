<template>
  <v-main app>
    <v-row>
      <v-col col="12" xs="12" sm="12" md="12" lg="8" xl="8">
          <v-text-field outlined label="Name" v-model="notice.name"/>
          <v-textarea label="Message" v-model="notice.content" rows = "10" auto-grow outlined></v-textarea>
      </v-col>
      <v-col col="12" xs="12" sm="12" md="12" lg="4" xl="4">
          <v-switch pb-4 label="Default content" hint="If this is enabled, this message will appear when there are no other messages available" v-model="notice.default"></v-switch>
          <v-textarea outlined label="Postcodes" v-model="notice.postcodes" rows = "10" auto-grow></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12" xs="12" sm="12" md="12" lg="8" xl="8">
        <v-btn @click="save">Save</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
      </v-col>
      <v-col col="12" xs="12" sm="12" md="12" lg="4" xl="4">
        <v-btn @click="addGroup">Add group</v-btn>
        <v-btn @click="removeGroup">Remove group</v-btn>
      </v-col>
    </v-row>     
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
    cancel() {this.$parent.clearActiveNotice()},
    addGroup(){},
    removeGroup(){}
  }
  
}
</script>