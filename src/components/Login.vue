<template>
  <div>
    <div class="background login-bg">
      <!-- <mt-field class="before-field"  placeholder="请输入工号" v-model="loginJson.personCode" id='login_input'></mt-field> -->
      <mt-button class="before-button" @click.native="login" id="login_btn" plain>登录</mt-button>
      <input class="before-field" type="text" v-model="loginJson.personCode">
        <!--<el-input v-model="loginJson.personCode" class="login-bg_input"></el-input>
         <el-button class="login-bg_button" @click="login">开始打卡</el-button>
        <el-button @click="getPhoto">活动主页</el-button>
        <el-button @click="uploadImg">活动图片添加&更新</el-button>

        <el-button @click="getTotalNum">流量统计</el-button>
        <el-button @click="getDayNum">完成情况统计（每日情况）</el-button>
        <el-button @click="getDayNumEnd">完成情况统计（结束情况）</el-button>
        <el-button @click="exportData">统计结果导出</el-button> -->
    </div>


  </div>
</template>
<script>
import { loginSystem, getActivityPhoto, getImgByDate, totalNum, getNumByDate, getNumByDateEnd, getStatistics } from '../req';
import { formatDate } from '../utils';
import { PERSON_CODE } from '../utils/consts'
export default {
  name: 'login',
  data () {
    return {
      loginJson: {
        personCode: ''
      },
       showHeight: document.documentElement.clientHeight,
    }
  },
  methods: {
    mounted() {
      if(localStorage.getItem(PERSON_CODE)) {
        this.$router.push('/activity');
      }
    },
    async login () {
      if(!this.loginJson.personCode) {
        MessageBox.alert('工号不能为空', '请输入工号');
        return;
      }
      Indicator.open({
        spinnerType: 'fading-circle'
      });
      try {
        let info = await loginSystem(this.loginJson);
        Indicator.close();
        if(info.success) {
          localStorage.setItem(PERSON_CODE, this.loginJson.personCode)
          // window.location.href = '/activity';
          this.$router.push('/activity');
        } else {
           MessageBox.alert(info.errMsg, '登录失败');
        }

      } catch (e) {
          console.log(e);
          Indicator.close();
          MessageBox.alert('请求错误', '登录失败');
      }
    },
    async getPhoto () {
      try {
        let info = await getActivityPhoto(this.loginJson.personCode);
        console.log(info);
      } catch (e) {

      }
    },
    async uploadImg () {
      try {
        let now = formatDate(new Date(), 'yyyy-MM-dd');
        let info = await getImgByDate(now);
        console.log(info);
      } catch (e) {

      }
    },

    async getDayNum () {
      try {
        let now = formatDate(new Date(), 'yyyy-MM-dd');
        let info = await getNumByDate(now);
        console.log(info);
      } catch (e) {

      }
    },
    async getDayNumEnd () {
      try {
        let info = await getNumByDateEnd();
        console.log(info);
      } catch (e) {

      }
    },
    async exportData () {
      try {
        let info = await getStatistics();
        console.log(info);
      } catch (e) {

      }
    }
  }
}
</script>
<style lang="scss">
.login-bg {
  background-image: url('../assets/login.jpg');
  width: calc(100vw);
  height: calc(217vw);
}
.login-front {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
input{
  background:none;
  outline:none;
  border:none;
}
</style>

