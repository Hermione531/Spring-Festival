<template>
  <!-- <Theme :foreshow="true" /> -->
    <div class="background background-full  theme-bg">
      <div class="background-full theme-bg__tooltip0"></div>
      <div class="theme-redpocket" :class="[active ? 'active' : '']" @click="changeRouter">
        <div class="background-full amin-rotate theme-redpocket__bg theme-redpocket__bg0">
        </div>
        <div class="background-full amin-rotate__delay theme-redpocket__bg theme-redpocket__bg1">
        </div>
        <div class="background-full amin-rotate  theme-redpocket__bg theme-redpocket__bg2">
        </div>
        <div class="background-full amin-rotate__delay theme-redpocket__bg theme-redpocket__bg3">
        </div>
        <div class="background-full amin-rotate theme-redpocket__bg theme-redpocket__bg4">
        </div>
        <div class="background-full amin-rotate__delay theme-redpocket__bg theme-redpocket__bg5">
        </div>
        <div class="background-full amin-rotate__delay theme-redpocket__bg theme-redpocket__bg6">
        </div>
      </div>
      <mt-button class="before-login" @click.native="login" id="enter_btn" plain>登录</mt-button>
  </div>
</template>
<script>
import { formatDate } from '../utils';
import { PERSON_CODE, ACTIVITY_START, ACTIVITY_END } from '../utils/consts';
import { getNumByDateEnd, getActivityPhoto } from '../req';
import Theme from './Theme';

export default {
  name: 'activityTheme',
  components: {
    Theme
  },
  data() {
    return {
      toTotal: false,
      active: true
    }
  },
  // mounted() {
  //   const personCode = sessionStorage.getItem(PERSON_CODE);
  //   if(!personCode) {
  //           this.$router.push('/login');
  //           return;
  //          }
  //    getActivityPhoto(personCode).then(json => {
  //     if(json.data.value.length < 7) {
  //           this.toTotal = false;
  //         } else {
  //           this.toTotal = true;
  //         }
  //       });
  // },
  methods: {
    changeRouter() {
      let now = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
      if(now < ACTIVITY_START) {
          this.active = false;
          MessageBox.alert('敬请期待！', '精彩活动将于除夕开启').then(() => {
            this.active = true;
          });
        } else if (now > ACTIVITY_END) {
          this.active = false;
          MessageBox.alert('感谢关注！', '活动已结束').then(() => {
            this.active = true;
          });
        } else {
          if(this.toTotal) {
            this.$router.push('/complete');
          } else {
            this.$router.push('/activity');
          }
        }
    },
     login() {
        let now = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
        if(now < ACTIVITY_START) {
          MessageBox.alert('敬请期待！', '精彩活动将于除夕开启');
        } else if (now > ACTIVITY_END) {
          MessageBox.alert('感谢关注！', '活动已结束');
        } else {
          // window.location.href = '/login';
          this.$router.push('/login');
        }
      },
  }
}
</script>
<style lang="scss" scoped>
.theme-bg {
    // position: absolute;
      display: flex;
      justify-content: center;
      width: calc(100vw);
      height: 100%;
      // height: calc(100vh);
      height: calc(var(--vh, 1vh) * 100);
      background-image: url('../assets/theme_bg.jpg');

      &__tooltip0 {
        position: absolute;
        width: 40vw;
        height: 20vw;
        left: 30vw;
        top: 10%;
        background-image: url('../assets/theme_tooltip.png');
      }

      &__tooltip1 {
        position: absolute;
        width: 80vw;
        height: 12vw;
        left: 10vw;
        top: 10%;
        background-image: url('../assets/complete_tooltip.png');
      }

  }
  .activity-info__complete {
    color: white;
  }
  .before-login {
     position: absolute;
      width: 45vw;
      height: 15vw;
      left: 28vw;

      bottom: 5%;
      background-image: url('../assets/enter_btn.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      z-index: 9999;
    // border: 1px solid black;
  }

  .theme-redpocket {
    display: flex;
    display: -webkit-flex;  // iphone6 flex兼容性
    width: 100%;
    height: 50%;
    margin: auto;
    box-sizing: border-box;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-between;
    z-index: 50;

    &__bg {
      width: 25vw;
      height: 25%;
      margin: 3vw;
      overflow: hidden;
      font-size: 0;
      input {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        font-size: 300px;
        opacity: 0;
      }
      &__img {
        width: 100%;
        height: 100%;
      }

      &0 {
        background-image: url('../assets/redpocket0.jpg');
      }
      &1 {
        background-image: url('../assets/redpocket1.jpg');
      }
      &2 {
        background-image: url('../assets/redpocket2.jpg');
      }
      &3 {
        background-image: url('../assets/redpocket3.jpg');
      }
      &4 {
        background-image: url('../assets/redpocket4.jpg');
      }
      &5 {
        background-image: url('../assets/redpocket5.jpg');
      }
      &6 {
        background-image: url('../assets/redpocket6.jpg');
      }
    }
  }
</style>
