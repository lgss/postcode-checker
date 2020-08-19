<template>
  <v-container fluid>
    <div class="text-center" v-if="loading"> <!--Page Loading spinner -->
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
    </div>
    <notice-editor 
      :notice="activeNotice" 
      :postcodeGroups="postcodeGroups"
      v-if="activeNotice" 
      @save="saveNotice"
      @cancel="activeNotice=null" />
    <v-container v-else>
        <v-row> <!--Lockdown header-->
          <v-col>
            <h1>Lockdown notices</h1>
          </v-col>
        </v-row>
        <v-row v-if="notices.length == 0"> <!--Lockdown notices warning-->
          <v-col>
            <v-card class="pa-2">
              <v-card-title>You don't have any notices :(</v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else v-for="notice in notices" :key="notice.id"> <!--Lockdown notices-->
        <v-dialog v-model="noticeDialog" max-width="290">
            <v-card>
              <v-card-title class="headline">Are you sure?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="noticeDialog = false">No</v-btn>
                <v-btn color="danger" text @click="deleteNotice(deletingNoticeID); noticeDialog = false">Yes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-col>
            <v-card class="pa-2">
              <v-card-actions >
                <v-container left @click="loadNotice(notice)" style="cursor: pointer">
                  <v-card-title>{{notice.notice_name}}</v-card-title>
                  <v-card-subtitle v-if="notice.notice_default">Default content (will be shown when there is no match)</v-card-subtitle>            
                  <v-card-subtitle v-else>Applies to {{notice.postcodes.length}} postcodes</v-card-subtitle>
                </v-container>
                <v-spacer></v-spacer>
                <v-btn right icon @click="deletingNoticeID=notice.id; noticeDialog = true"><v-icon >mdi-delete</v-icon></v-btn>
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
                <v-text-field label="Filter" outlined v-model="groupFilter" />
                <v-list max-height="289px" class="limited-height" outlined>
                  <v-list-item-group max-height="50px" color="primary">
                    <v-list-item
                      v-for="postcodeGroup in filteredPostcodeGroups"
                      :key="postcodeGroup.id"
                      @click="loadGroup(postcodeGroup)">
                        <v-list-item-content>
                          <v-list-item-title v-text="postcodeGroup.group_name"></v-list-item-title>
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
                    outlined>   
                  </v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row> <!--Postcode group buttoms-->
          <v-col class="col-4">
            <v-btn @click="newGroup">Add</v-btn>
            <v-btn :disabled="!activeGroup" @click.stop="postcodeGroupDialog = true">Delete</v-btn>
          </v-col>
          <v-col class="col-8">
            <v-btn :disabled="!activeGroup" @click="saveGroup">Save</v-btn>
            <v-btn :disabled="!activeGroup" @click="cancelGroup">Cancel</v-btn>
          </v-col>
          <v-dialog v-model="postcodeGroupDialog" max-width="290">
            <v-card>
              <v-card-title class="headline">Are you sure?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="postcodeGroupDialog = false">No</v-btn>
                <v-btn color="danger" text @click="delGroup(activeGroup.id); postcodeGroupDialog = false">Yes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>     
    </v-container>
  </v-container>
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
      deletingNoticeID: null,
      activeGroup: null,
      noticeDialog: false,
      postcodeGroupDialog: false
    }
  },


  computed:{
    filteredPostcodeGroups() {
      const filstr = this.groupFilter.toLowerCase()
      return this.postcodeGroups.filter(x => filstr.length === 0 || x.group_name.toLowerCase().includes(filstr))
    },
    activeGroupName: {
      get: function() {
        if (this.activeGroup) 
          return this.activeGroup.group_name
        
        return 'Select a group...'
      },
      set: function (value) {
        this.activeGroup.group_name = value
      }
    },
    activeGroupCodes: {
      get: function () {
        if (!this.activeGroup)
          return ""
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
        notice_name: 'New notice',
        notice_default: false,
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
        group_name: 'New group',
        content: '',
        postcodes: []
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
      Object.assign(this.postcodeGroups[this.groupIndexById(this.activeGroup.id)], this.activeGroup)
      this.activeGroup = null
    },
    cancelGroup(){
      this.activeGroup = null
    }
    
  }
}
</script>

<style>
  textarea {
    text-transform: uppercase;
  }

  .limited-height {
    overflow-y: scroll;
  }
</style>