<template>
  <!-- <div class="background active-bg activity-bg__complete"></div> -->
  <Theme :complete="true" />
</template>
<script>
import Theme from './Theme';
import { getNumByDateEnd } from '../req';
  export default {
    name: 'complete',
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
