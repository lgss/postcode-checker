<template>
  <v-main app fluid>
    <v-dialog v-model="selectGroup" width="450">
      <v-card >
        <v-card-title>
          Select group
        </v-card-title>
        <v-card-text>
          //list of groups go here
          <v-radio-group v-model="dialogm1" column>
            <v-radio-group v-model="postcodeGroups.postcodes">
              <v-radio 
                v-for="postcode in postcodeGroups" 
                :key="postcode.id" 
                :label="postcode.name">
                </v-radio>
            </v-radio-group>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="success" @click="processGroup">Select group</v-btn>
          <v-btn color="grey" @click="selectGroup = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col col="12" xs="12" sm="12" md="12" lg="8" xl="8">
          <v-text-field outlined label="Name" v-model="notice.name"/>
          <v-textarea label="Message" v-model="notice.content" rows = "10" outlined></v-textarea>
      </v-col>
      <v-col col="12" xs="12" sm="12" md="12" lg="4" xl="4">
          <v-switch pb-4 label="Default content" hint="If this is enabled, this message will appear when there are no other messages available" v-model="notice.default"></v-switch>
          <v-textarea outlined label="Postcodes" v-model="notice.postcodes" rows = "10"></v-textarea>
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
  data() { 
      return {
      selectGroup: false,
      add: true,
      selectedGroup: null
    }
  },
  props: ['notice', 'postcodeGroups'],
  methods: {
    save() {
      this.notice.postcodes = this.notice.postcodes.replace(',', '\n')
      this.notice.postcodes = this.notice.postcodes.split('\n')
      this.$emit('save', this.notice)
    },
    cancel() {this.$emit('cancel')},
    addGroup(){
      this.addGroup = true
      this.selectGroup = true
      //get the group
      //this.notices.postcodes.concat(group.postcodes)
    },
    removeGroup(){
      this.addGroup = false
      this.selectGroup = true
      // get the group
      //this.notice.postcodes = this.notice.postcodes.filter(x => !group.postcodes.contains(x))
    },
    processGroup() {
      if (this.add)
        this.notices.postcodes.concat(this.selectedGroup.postcodes)
      else
        this.notice.postcodes = this.notice.postcodes.filter(x => !this.selectedGroup.postcodes.contains(x))
    }
  }
}
</script>