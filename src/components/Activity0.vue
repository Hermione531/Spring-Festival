<template>
    <div :class="`active-bg`">
        <div class="upload-btn" @click="uploadTrigger"></div>
        <input v-if="showUpload" id="upload" type="file" accept="image/*" @change="takePhoto($event)" style="visibility: hidden" />

        <!-- <div class="anim-diffusion">扩散</div> -->
        <div class="amin-rotate">旋转</div>

        <div class="anit-firing active-bg0__fire1">大烟花</div>
        <div class="anit-firing active-bg0__fire2">小烟花</div>

        <div class="active-bg__themepic">主题图片效果</div>
    </div>
</template>
<script>
import { getImgByDate } from '../req';
import { formatDate } from '../utils';
import { PERSON_CODE } from '../utils/consts'
const END_DAY_PROP = 7;
export default {
    name: 'activity0',
    props: {
        showUpload: {
          type: Boolean,
          default: true
        }
    },
    data() {
      return {
        uploadJson: {
          file: '',
          personCode: sessionStorage.getItem(PERSON_CODE),
          recordDate: ''
        }
      }
    },
    methods: {
      uploadTrigger() {
        document.getElementById('upload').click();
      },
      takePhoto(e){//拍照功能---上传头像
          let file=e.target.files[e.target.files.length - 1]//获取文件对象
          let fileImg = new FileReader();
          fileImg.readAsBinaryString(file);
          let that = this;
          fileImg.onload =async function() {
            that.uploadJson.file = this.result;
            that.uploadJson.recordDate = formatDate(new Date(), 'yyyy-MM-dd');
            try {
              let info = await getImgByDate(that.uploadJson);
              console.log(info);

              if(that.dayProp === END_DAY_PROP) {
                window.location.href = '/complete';
              }
            } catch(e) {
              console.log(e);
              if(e.errMsg) {
                MessageBox.alert('错误', e.errMsg);
              } else {
                MessageBox.alert('请求错误', '图片上传失败');
              }
            }
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
.active-bg0 {
    &__fire1 {
      position: absolute;
      width: 20vw;
      height: 10vh;
      background-image: url('../assets/fires1.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      top: 10vh;
      left: 20vw;
    }

    &__fire2 {
      position: absolute;
      top: 50vh;
      left: 10vw;
    }

    &__themepic {
      position: absolute;
      top: 50vh;
      left: 30vw;
      animation: fadeInOut 2s 4s ease-in-out;
    }

    .upload-btn {
      position: absolute;
      top: 88vh;
      left: 30vw;
      width: 38vw;
      height: 11vw;
      border: 1px solid black;
      background-color: transparent
    }
}



</style>
