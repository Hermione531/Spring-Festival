<template>
  <div class="background active-bg activity-bg__end">
  </div>
</template>
<script>
import { totalNum } from '../req';
  export default {
    name: 'complete',
    data() {
      return {
        num: 0
      }
    }
  }
</script>
<style>
  .activity-bg__end {
    background-image: url('../assets/activity_end.jpg');
  }
  .activity-info__complete {
    color: white;
  }
</style>

