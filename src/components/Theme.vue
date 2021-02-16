<template>
  <div class="background background-full  theme-bg">
      <div v-if="foreshow" class="background-full theme-bg__tooltip0"></div>
      <div v-if="complete && showComplete" class="background-full theme-bg__tooltip1"></div>
      <div class="theme-redpocket">
        <div class="background-full amin-rotate theme-redpocket__bg theme-redpocket__bg0">
          <img v-show="uploadedPics[0].pictureUrl" class="theme-redpocket__bg__img" :src="uploadedPics[0].pictureUrl" alt="加载失败……">
          <input id="upload" type="file" accept="image/*" @change="takePhoto($event, '2021-02-11', 0)" />
        </div>
        <div class="background-full amin-rotate__delay theme-redpocket__bg theme-redpocket__bg1">
          <img v-show="uploadedPics[1].pictureUrl" class="theme-redpocket__bg__img" :src="uploadedPics[1].pictureUrl" alt="加载失败……">
          <input id="upload" type="file" accept="image/*" @change="takePhoto($event, '2021-02-12', 1)" />
        </div>
        <div class="background-full amin-rotate  theme-redpocket__bg theme-redpocket__bg2">
          <img v-show="uploadedPics[2].pictureUrl" class="theme-redpocket__bg__img" :src="uploadedPics[2].pictureUrl" alt="加载失败……">
          <input id="upload" type="file" accept="image/*" @change="takePhoto($event, '2021-02-13', 2)" />
        </div>
        <div class="background-full amin-rotate__delay theme-redpocket__bg theme-redpocket__bg3">
          <img v-show="uploadedPics[3].pictureUrl" class="theme-redpocket__bg__img" :src="uploadedPics[3].pictureUrl" alt="加载失败……">
          <input id="upload" type="file" accept="image/*" @change="takePhoto($event, '2021-02-14', 3)" />
        </div>
        <div class="background-full amin-rotate theme-redpocket__bg theme-redpocket__bg4">
          <img v-show="uploadedPics[4].pictureUrl" class="theme-redpocket__bg__img" :src="uploadedPics[4].pictureUrl" alt="加载失败……">
          <input id="upload" type="file" accept="image/*" @change="takePhoto($event, '2021-02-15', 4)" />
        </div>
        <div class="background-full amin-rotate__delay theme-redpocket__bg theme-redpocket__bg5">
          <img v-show="uploadedPics[5].pictureUrl" class="theme-redpocket__bg__img" :src="uploadedPics[5].pictureUrl" alt="加载失败……">
          <input id="upload" type="file" accept="image/*" @change="takePhoto($event, '2021-02-16', 5)" />
        </div>
        <div class="background-full amin-rotate__delay theme-redpocket__bg theme-redpocket__bg6">
          <img v-show="uploadedPics[6].pictureUrl" class="theme-redpocket__bg__img" :src="uploadedPics[6].pictureUrl" alt="加载失败……">
          <input id="upload" type="file" accept="image/*" @change="takePhoto($event, '2021-02-17', 6)" />
        </div>
      </div>
      <mt-button v-if="foreshow" class="before-login" @click.native="login" id="enter_btn" plain>登录</mt-button>
  </div>
</template>
<script>
import { PERSON_CODE, ACTIVITY_START, ACTIVITY_END } from '../utils/consts';
import { formatDate } from '../utils';
import { getImgByDate, updateImg } from '../req';

  export default {
    name: 'theme',
    props: {
       uploadedPics: {
        type: Array,
        default: function() {
          return [{'id': '', 'pictureUrl': ''}, {'id': '', 'pictureUrl': ''}, {'id': '', 'pictureUrl': ''}, {'id': '', 'pictureUrl': ''}, {'id': '', 'pictureUrl': ''}, {'id': '', 'pictureUrl': ''}, {'id': '', 'pictureUrl': ''}];
        }
      },
      foreshow: {
        type: Boolean,
        default: false
      },
      complete: {
        type: Boolean,
        default: false
      },
      addPic: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        showComplete: false,
      }
    },
    mounted() {
      console.log(this.uploadedPics);
    },
    watch: {
      uploadedPics() {
        this.ifShowComplete();
      }
    },
    methods: {
      ifShowComplete() {
        let flag = true;
        for(let i = 0; i < this.uploadedPics.lenght; i++) {
          if (!this.uploadedPics[i].id) {
            flag = false;
            break;
          }
        }
        if(!flag) {
          this.showComplete = false;
        } else {
          this.showComplete = true;
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
      async takePhoto(e, date, idx){//拍照功能---上传头像
          Indicator.open({
              spinnerType: 'fading-circle'
          });
          let file=e.target.files[0]//获取文件对象
          let personCode = localStorage.getItem(PERSON_CODE);
          var formData = new FormData();
          formData.append('image', file);
          formData.append('personCode', personCode);
          formData.append('recordDate', date);
          try {
            let info;
            let imgId = this.uploadedPics[idx].id
            if(imgId) {
              formData.append('id', imgId)
              info = await updateImg(formData);
            } else {
              info = await getImgByDate(formData);
            }
            Indicator.close();
            if(info.success) {
              var reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (res) => {
                const index = date.replace(/-/g, '') - '20210211';
                if(!imgId) {
                  imgId = info.data.value;
                }
                this.addPic(index, res.target.result, imgId);
              }
              MessageBox.alert('', '上传成功！');
              this.ifShowComplete();
            }else {
              MessageBox.alert(info.errMsg, '上传失败');
            }
          } catch(e) {
            Indicator.close();
            MessageBox.alert('请求失败', '上传失败！');
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

    transform-style:preserver-3d;
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
