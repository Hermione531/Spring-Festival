<template>
    <div class="background active-bg active-bg__page0">
        <div class="anit-occur active-bg__tooltip active-bg__tooltip0"></div>
        <div class="anit-occur upload-btn" v-show="startAnit" @click="uploadTrigger"></div>
        <input v-if="showUpload" id="upload" type="file" accept="image/*" @change="takePhoto($event)" style="visibility: hidden" />

        <div class="anit-firing active-bg__fire1" v-show="startAnit"></div>
        <div class="anit-firing active-bg__fire2"></div>
    </div>
</template>
<script>
import { getImgByDate, address } from '../req';
import { formatDate } from '../utils';
import { PERSON_CODE } from '../utils/consts'
import axios from 'axios';

const END_DAY_PROP = 5;
export default {
    name: 'activityFirst',
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
        startAnit: false
      }
    },
    mounted() {
      setTimeout(() => {
        this.startAnit = true;
      }, 1000)
    },
    methods: {
      uploadTrigger() {
        document.getElementById('upload').click();
      },
      takePhoto(e){//拍照功能---上传头像
          let file=e.target.files[0]//获取文件对象
          let now = formatDate(new Date(), 'yyyy-MM-dd');
          let personCode = sessionStorage.getItem(PERSON_CODE);
          if(!personCode) {
            this.$router.push('/login');
            return;
           }
          var formData = new FormData();
          formData.append('image', file);
          formData.append('personCode', personCode);
          formData.append('recordDate', now);

          let that = this;
          (async () => {
            try {
              let info = await getImgByDate(formData);
              if(info.success) {
                window.href.location = '/complete';
              }else {
                MessageBox.alert(info.errMsg, '上传失败');
              }
            } catch(e) {
              MessageBox.alert('请求失败', '上传失败！');
            }

          })();
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
<style lang="scss" scoped>
.active-bg {

   &__page0 {
    position: relative;
        background-image: url('../assets/activity3.jpg');
    }

    &__tooltip {
      top: 80vh;
      left: 10vw;
      width: 80vw;
      height: 12vw;
      background-image: url('../assets/activity3_tooltip.png');
    }
    &__fire1 {
      background-image: url('../assets/fires0.png');
    }
    &__fire2 {
      background-image: url('../assets/fires1.png');
    }
    .upload-btn {
      background-image: url('../assets/upload_btn.png');
    }
}


</style>
