<template>
  <!-- <div class="background active-bg activity-bg__complete"></div> -->
  <Theme :complete="true" :uploadedPics="uploadedPics" :addPic="addPic" />
</template>
<script>
import Theme from './Theme';
import { getNumByDateEnd, getActivityPhoto } from '../req';
import { PERSON_CODE } from '../utils/consts';
  export default {
    name: 'complete',
    data () {
      return {
        uploadedPics: []
      }
    },
    components: {
      Theme
    },
    mounted() {
     getNumByDateEnd().then(info => {
      if(info.success) {

        MessageBox.alert('', `已有${info.data.completeNum}人完成任务`);
      } else {
        MessageBox.alert('', info.errMsg);
      }
     }).catch(e => {
        MessageBox.alert('', `获取数据失败`);
     })
     const personCode = localStorage.getItem(PERSON_CODE);
     getActivityPhoto(personCode).then(json => {
        const pics = [{'id': '', 'pictureUrl': ''}, {'id': '', 'pictureUrl': ''}, {'id': '', 'pictureUrl': ''}, {'id': '', 'pictureUrl': ''}, {'id': '', 'pictureUrl': ''}, {'id': '', 'pictureUrl': ''}, {'id': '', 'pictureUrl': ''}]

        const refer = {
          '2021-02-11': 0,
          '2021-02-12': 1,
          '2021-02-13': 2,
          '2021-02-14': 3,
          '2021-02-15': 4,
          '2021-02-16': 5,
          '2021-02-17': 6,
        }
        json.data.value && json.data.value.forEach(item => {
          const index = refer[item.recordDate];
          console.log(item.recordDate, index)
          pics[index] = {'id': item.id, 'pictureUrl': item.pictureUrl};
        })
        this.uploadedPics = pics;
        console.log(pics)

     })
    },
    methods: {
      addPic (id, path, imgId) {
        const uploadedPics = [...this.uploadedPics];
        uploadedPics[id] = {'id': imgId, 'pictureUrl': path};
        this.uploadedPics = uploadedPics;
      }
    }
  }
</script>
<style>
  .activity-bg__complete {
    background-image: url('../assets/activity_complete.jpg');
  }
  .activity-info__complete {
    color: white;
  }
</style>
