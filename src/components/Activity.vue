<template>
    <div :class="`background active-bg active-bg__page${dayProp}`">
        <div :class="`anit-occur__tooltip active-bg__tooltip active-bg__tooltip${dayProp}`"></div>
        <mt-button :class="dayProp === 3 ? 'anit-occur upload-btn upload-btn__diff' : ` anit-occur upload-btn upload-btn__sim` " v-show="showUpload && startAnitBtn" @click.native="uploadTrigger"></mt-button>
        <input id="upload" type="file" accept="image/*" @change="takePhoto($event)" style="visibility: hidden" />
        <div class="anit-firing active-bg__fire1" v-show="startAnit"></div>
        <div class="anit-firing active-bg__fire2"></div>
    </div>
</template>
<script>
import { getImgByDate, address } from '../req';
import { formatDate } from '../utils';
import { PERSON_CODE } from '../utils/consts'
import axios from 'axios';

const END_DAY_PROP = 6;

let activity_days = ['2021-02-11', '2021-02-12', '2021-02-13', '2021-02-14', '2021-02-15', '2021-02-16', '2021-02-17']

export default {
    name: 'activity',
    props: {
        dayProp: {
            type: Number,
            default: 0
        },
        showUpload: {
          type: Boolean,
          default: true
        }
    },
    data() {
      return {
        startAnit: false,
        startAnitBtn: false,
        dayNum: 0
      }
    },
    mounted() {
      console.log(this.dayProp);
      setTimeout(() => {
        this.startAnit = true;
      }, 1000);

      setTimeout(() => {
        this.startAnitBtn = true;
      }, 1000);

      let vvh = window.innerHeight* 0.01
    // // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vvh}px`)

    // // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vvh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vvh}px`)
      document.body.querySelector("#app").style.height = window.innerHeight + "px";
    })
    },
    methods: {
      uploadTrigger() {
        document.getElementById('upload').click();
      },
      async takePhoto(e){//拍照功能---上传头像
          Indicator.open({
              spinnerType: 'fading-circle'
          });
          let file=e.target.files[0]//获取文件对象
          let now = formatDate(new Date(), 'yyyy-MM-dd');
          let personCode = localStorage.getItem(PERSON_CODE);
          var formData = new FormData();
          formData.append('image', file);
          formData.append('personCode', personCode);
          formData.append('recordDate', now);

          let that = this;

            try {
              let info = await getImgByDate(formData);
              Indicator.close();
              if(info.success) {
                if(now === activity_days[END_DAY_PROP]) {
                  // window.href.location = '/complete';
                  this.$router.push('/complete');
                }else {
                  MessageBox.alert('', '上传成功！');
                }

              }else {
                MessageBox.alert(info.errMsg, '上传失败');
              }
            } catch(e) {
              Indicator.close();
              MessageBox.alert('请求失败', '上传失败！');
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
    }
}
</script>
<style lang="scss">
.active-bg {
  // position: relative;
  height: 100%;
  width: calc(100vw);
  background-color: $activity_color;
  // height: calc(100vh);
  overflow: scroll;
  margin: auto 0;
  height: calc(var(--vh, 1vh) * 100);
  z-index: -999;

    &__page0 {
        background-image: url('../assets/activity0.jpg');
    }

    &__page1 {
        background-image: url('../assets/activity1.jpg');
    }
    &__page2 {
        background-image: url('../assets/activity2.jpg');
    }

    &__page3 {
        background-image: url('../assets/activity3.jpg');
    }
    &__page4 {
        background-image: url('../assets/activity4.jpg');
    }
    &__page5 {
        background-image: url('../assets/activity5.jpg');
    }
    &__page6 {
        background-image: url('../assets/activity6.jpg');
    }

    &__fire1 {
      position: absolute;
      top: 28vh;
      left: 15vw;
      width: 30vw;
      height: 29vw;
      background-image: url('../assets/fires0.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
    }

    &__fire2 {
      position: absolute;
      top: 20vh;
      left: 40vw;
      width: 30vw;
      height: 40vw;
      background-image: url('../assets/fires1.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
    }

    &__themepic {
      position: absolute;
      top: 50vh;
      left: 30vw;
      animation: fadeInOut 4s 4s ease-in-out;
    }

    &__tooltip {
      position: absolute;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;

      &0 {
        // top: 80vh;
        bottom: 15%;
        left: 10vw;
        width: 80vw;
        height: 12vw;
        background-image: url('../assets/activity0_tooltip.png');
      }
      &1 {
        bottom: 15%;
        left: 10vw;
        width: 80vw;
        height: 12vw;
        background-image: url('../assets/activity1_tooltip.png');
      }
      &2 {
        bottom: 15%;
        left: 10vw;
        width: 80vw;
        height: 12vw;
        background-image: url('../assets/activity2_tooltip.png');
      }
      &3 {
        // top: 75vh;
        bottom: 15%;
        left: 25vw;
        width: 50vw;
        height: 15vw;
        background-image: url('../assets/activity3_tooltip.png');
      }
      &4 {
        // top: 80vh;
        bottom: 15%;
        left: 10vw;
        width: 80vw;
        height: 18vw;
        background-image: url('../assets/activity4_tooltip.png');
      }
      &5 {
        // top: 80vh;
        bottom: 15%;
        left: 20vw;
        width: 60vw;
        height: 12vw;
        background-image: url('../assets/activity5_tooltip.png');
      }
      &6 {
        // top: 80vh;
        bottom: 15%;
        left: 10vw;
        width: 80vw;
        height: 12vw;
        background-image: url('../assets/activity6_tooltip.png');
      }
    }

    .upload-btn {
      position: absolute;
      left: 30vw;
      width: 38vw;
      height: 11vw;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      background-color: transparent;
      z-index: 99999;

      &__sim {
        // top: 90vh;
        bottom: 5%;
        background-image: url('../assets/upload_btn.png');
      }

      &__diff {
        // top: 87vh;
        bottom: 5%;
        background-image: url('../assets/upload_btn_diff.png');
      }

    }
}



</style>
