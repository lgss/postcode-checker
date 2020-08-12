<template >
  <div class="ma-6 pa-6">
    <notice-editor 
      :notice="activeNotice" 
      v-if="activeNotice" 
      @save="saveNotice"
      @cancel="activeNotice=null"/>
    <v-main v-else>
        <v-row> <!--Lockdown header-->
          <v-col>
            <h1>Lockdown notices</h1>
          </v-col>
        </v-row>
        <v-row v-if="notices.length == 0"> <!--Lockdown notices warning-->
          <v-col>
            <v-card class="pa-2">
                  <v-card-title>You require at least 1 lockdown notice</v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else v-for="notice in notices" :key="notice.id"> <!--Lockdown notices-->
          <v-col>
            <v-card class="pa-2">
              <v-card-actions >
                <v-container left @click="loadNotice(notice)" style="cursor: pointer">
                  <v-card-title>{{notice.name}}</v-card-title>
                  <v-card-subtitle v-if="notice.default">Default content (will be shown when there is no match)</v-card-subtitle>            
                  <v-card-subtitle v-else>Applies to {{notice.postcodes.length}} postcodes</v-card-subtitle>
                </v-container>
                <v-spacer></v-spacer>
                <v-btn right icon @click="deleteNotice(notice.id)"><v-icon>mdi-delete</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row> <!--Lockdown notices buttons-->
          <v-col>
            <v-btn @click="newNotice">Add</v-btn>
          </v-col>
        </v-row>
        <v-row><!--Postcode groups header-->
          <v-col>
            <h1>Postcode groups</h1>
          </v-col>
        </v-row>
        <v-row><!--Postcode groups-->
          <v-col cols="12" md="8" lg="8">
            <v-row> <!--Postcode groups container-->
              <v-col cols="12" md="4" lg="4"> <!--Postcode groups-->
                <v-text-field label="Filter ..." outlined v-model="groupFilter" />
                <v-list outlined>
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="postcodeGroup in filteredPostcodeGroups"
                      :key="postcodeGroup.id"
                      @click="loadGroup(postcodeGroup)">
                        <v-list-item-content>
                          <v-list-item-title v-text="postcodeGroup.name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
              <v-col cols="12" md="8" lg="8"> <!--Active group postcodes-->
                  <v-text-field outlined :disabled="!activeGroup" v-model="activeGroupName"></v-text-field>
                  <v-textarea 
                    v-model="activeGroupCodes"
                    :disabled="!activeGroup"
                    rows = "10"
                    auto-grow
                    outlined>   
                  </v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row> <!--Postcode group buttoms-->
          <v-col class="col-4">
            <v-btn @click="newGroup">Add</v-btn>
            <v-btn @click="delGroup(activeGroup.id)">Delete</v-btn>
          </v-col>
          <v-col class="col-8">
            <v-btn @click="saveGroup">Save</v-btn>
            <v-btn @click="cancelGroup">Cancel</v-btn>
          </v-col>
        </v-row>     
    </v-main>
  </div>
</template>

<script>
import NoticeEditor from '@/components/NoticeEditor.vue'
import { v4 as uuidv4 } from 'uuid';

export default {
  components: {NoticeEditor},
  data() {
    return {
      groupFilter: '',
      notices: [
        {
          id: '1',
          name: 'Default notice',
          default: true,
          content: 'This is some content',
          postcodes: []
        },
        {
          id: '2',
          name: 'Fenland outbreak',
          default: false,
          content: 'This is some other content',
          postcodes: ['CB4 2XY', 'TN22 3BU']
        }
      ],
      postcodeGroups:[
        {
          id: '1',
          name: 'NCC properties',
          postcodes: ['NN1 1ED', 'NN16 0LL']
        },
         {
          id: '2',
          name: 'NCC Schools',
          postcodes: ['NN9 6PA']
        }
      ],
      activeNotice: null,
      activeGroup: null
    }
  },


  computed:{
    filteredPostcodeGroups() {
      const filstr = this.groupFilter.toLowerCase()
      return this.postcodeGroups.filter(x => filstr.length === 0 || x.name.toLowerCase().includes(filstr))
    },
    activeGroupName() {
      if (this.activeGroup) 
        return this.activeGroup.name
        
      return 'Select a group...'
    },
    activeGroupCodes: {
      get: function () {
        if (!this.activeGroup)
          return "Select a group ..."
        return this.activeGroup.postcodes.join('\n')
      },
      set: function (newValue) {
        //TODO: fix post code format, e.g. only valid chars and correct spaces
        this.activeGroup.postcodes = newValue.split('\n').map(x => x.toUpperCase()) 
      } 
    }
  },

  methods: {

    /* -- NOTICES -- */
    newNotice() {
      var uid = uuidv4();
      this.notices.push({
        id: uid, 
        name: 'New notice',
        default: false,
        content: '',
        postcodes: []
      })
    },
    loadNotice(notice) {
      this.activeNotice = Object.assign({}, notice); // edit a copy
    },
    saveNotice(notice) {
      // save to DB
      // if unsuccessful, error, exit
      const idx = this.notices.findIndex(x => x.id === notice.id)
      this.notices[idx] = notice
      this.activeNotice = null
    },
    deleteNotice(id) {
      // comfirm delete
      // delete on API
      const idx = this.notices.findIndex(x => x.id === id)
      this.notices.splice(idx, 1)
    },
    groupIndexById(id) {
      return this.postcodeGroups.findIndex(x => x.id === id)
    },
    
    /* -- POSTCODE GROUPS -- */
    loadGroup(group){
      this.activeGroup = Object.assign({}, group)
    },
    newGroup(){
      var uid = uuidv4();
      this.postcodeGroups.push({
        id: uid,
        name: 'New group',
        content: ' '
      })
    },
    delGroup(id){
      // comfirm delete
      // delete on API
      const idx = this.postcodeGroups.findIndex(x => x.id === id)
      this.postcodeGroups.splice(idx, 1)
      this.activeGroup = null
    },
    saveGroup(){
      // TODO: save to web service
      this.postcodeGroups[this.groupIndexById(this.activeGroup.id)] = this.activeGroup
      this.activeGroup = null
    },
    cancelGroup(){
      this.activeGroup = null
    }
    
  }
}
</script>