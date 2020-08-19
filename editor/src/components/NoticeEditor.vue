<template>
  <v-container>
    <v-dialog v-model="selectGroup" width="450">
      <v-card >
        <v-card-title>
          Select group
        </v-card-title>
        <v-card-text>
          <v-radio-group column>
            <v-radio-group v-model="selectedGroup">
              <v-radio 
                v-for="postcode in postcodeGroups" 
                :key="postcode.id" 
                :value="postcode"
                :label="postcode.group_name">
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
          <v-text-field outlined label="Name" v-model="notice.notice_name"/>
          <tiptap-vuetify min-height="253px" v-model="notice.content" rows="10" :extensions="extensions" 
          placeholder="Write the notice content here…"/>
      </v-col>
      <v-col col="12" xs="12" sm="12" md="12" lg="4" xl="4">
        <v-switch pb-4 v-model="notice.notice_default">
          <template v-slot:label>
            <span>Default content</span>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-information</v-icon>
              </template>  
              <span>If this is enabled, this message will appear when there are no other messages available</span>
            </v-tooltip>
          </template>
        </v-switch>
        <label>{{postcodeCount}} postcodes</label>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-information</v-icon>
          </template>  
          <p>This is the list of postcodes that the notice will be displayed for. Enter one postcode per line, like this:<br/>
          CB1 1AA<br/>
          SW1A 0AA</p>
        </v-tooltip>
        <v-textarea outlined placeholder="CB1 1AA 
SW1A 0AA" v-model="postcodeBlock" rows="10"></v-textarea>
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
  </v-container>
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
import {parsePostcodes, displayPostcodes} from '@/utils/postcode.js'
export default {
  components: {
    TiptapVuetify
  },
  data() { 
    return {
      selectGroup: false,
      add: true,
      selectedGroup: null,
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [Heading, {
          options: {
            levels: [1, 2, 3]
          }
        }],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ],
    }
  },
  props: ['notice', 'postcodeGroups'],
  computed: {
    postcodeBlock: {
      get: function() {return displayPostcodes(this.notice.postcodes)},
      set: function(value) {this.notice.postcodes = parsePostcodes(value)}
    },
    postcodeCount() {return this.notice.postcodes.length}
  },
  methods: {
    save() {
      this.$emit('save', this.notice)
    },
    cancel() {this.$emit('cancel')},
    addGroup(){
      this.add = true
      this.selectGroup = true
      //get the group
      //this.notices.postcodes.concat(group.postcodes)
    },
    removeGroup(){
      this.add = false
      this.selectGroup = true
      // get the group
      //this.notice.postcodes = this.notice.postcodes.filter(x => !group.postcodes.contains(x))
    },
    processGroup() {
      if (this.add)
        this.notice.postcodes = this.notice.postcodes.concat(this.selectedGroup.postcodes)
      else
        this.notice.postcodes = this.notice.postcodes.filter(x => !this.selectedGroup.postcodes.includes(x))
      this.selectGroup = false
    }
  }
}
</script>