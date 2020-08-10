<template >
  <div class="ma-6 pa-6">
    <notice-editor :notice="activeNotice" v-if="activeNotice"/>
    <v-main v-else>
        <v-row>
          <v-col>
            <h1>Lockdown notices</h1>
          </v-col>
        </v-row>
        <v-row v-for="notice in notices" :key="notice.id" @click="loadNotice(notice)">
          <v-col>
            <v-card class="pa-2">
              <v-card-title>{{notice.name}}</v-card-title>
              <v-card-subtitle v-if="notice.default">
                Default content (will be shown when there is no match)
              </v-card-subtitle>            
              <v-card-subtitle v-else>
                Applies to {{notice.postcodes.length}} postcodes
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="newNotice">Add</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h1>Postcode groups</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-4">
            <v-text-field label="Filter" />
            <v-list shaped>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="postcodeGroup in postcodeGroups"
                  :key="postcodeGroup.id"
                  @click="loadGroup(postcodeGroup)"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="postcodeGroup.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col class="col-8">
          
            <div v-if="activeGroup">
              <v-textarea 
              v-model="activeGroup.postcodes"
              rows = "10"
              auto-grow>   
              </v-textarea>
            </div>
            <div v-else>
              Select a group ...
            </div>
          </v-col>
          <v-btn @click="newGroup">Add</v-btn>
        </v-row>
    </v-main>
  </div>
</template>

<script>
import NoticeEditor from '@/components/NoticeEditor.vue'
export default {
  components: {NoticeEditor},
  data() {
    return {
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

  },

  methods: {
    newNotice() {
      this.notices.push({
        id: 'a new guid', //TODO: generate Id
        name: 'New notice',
        default: false,
        content: '',
        postcodes: []
      })
    },
    loadNotice(notice) {
      this.activeNotice = notice;
    },
    deleteNotice(id) {
      id
      // comfirm delete
      // delete on API
      // then delete from collection
    },
    newGroup(){
      this.postcodeGroups.push({
        id: 'new guid',
        name: 'New group',
        content: ''
      })
    },
    loadGroup(group){
      this.activeGroup = group
    }
  }
}
</script>