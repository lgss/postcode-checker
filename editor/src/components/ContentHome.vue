<template>
  <div>
    <notice-editor :notice="activeNotice" v-if="activeNotice"/>
    <v-content v-else>
      <div class="ma-6 pa-6">
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
      </div>
      <v-row>
        <v-col>
          <h1>Postcode groups</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="md-4">
          <v-text-field label="Filter" />
          <v-textarea/>
        </v-col>
        <v-col class="md-8">
          <v-text-field label="Group name" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>

        </v-col>
      </v-row>
    </v-content>
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
      activeNotice: null
    }
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
      this.activeNotice = notice
    },
    deleteNotice(id) {
      id
      // comfirm delete
      // delete on API
      // then delete from collection
    }
  }
}
</script>