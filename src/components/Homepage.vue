<template>
  <div class="background login-bg">
    <mt-field class="before-field"  placeholder="请输入工号" v-model="personCode" id='login_input'></mt-field>
    <mt-button class="before-button" @click.native="login" id="login_btn" plain>登录</mt-button>
  </div>
</template>

<script>
import { loginSystem, getActivityPhoto, getImgByDate, totalNum, getNumByDate, getNumByDateEnd, getStatistics } from '../req';
export default {
  name: 'homepage',
  data () {
    return {
      personCode: ''
    }
  },
  mounted() {

  },
  methods: {
     async login () {
      if(!this.personCode) {
      return;
    }
      try {
        let info = await loginSystem({'personCode': this.personCode});
        console.log(info);
      } catch (e) {

      }
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
