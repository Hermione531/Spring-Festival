<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>
      <Activity :dayProp="0" :showUpload="curDate == '2021-02-11'" />
    </swiper-slide>
    <swiper-slide>
      <Activity :dayProp="1" :showUpload="curDate == '2021-02-12'" />
    </swiper-slide>
    <swiper-slide>
      <Activity :dayProp="2" :showUpload="curDate == '2021-02-13'" />
    </swiper-slide>
    <swiper-slide>
      <Activity :dayProp="3" :showUpload="curDate == '2021-02-14'" />
    </swiper-slide>
    <swiper-slide>
      <Activity :dayProp="4" :showUpload="curDate == '2021-02-15'" />
    </swiper-slide>
    <swiper-slide>
      <Activity :dayProp="5" :showUpload="curDate == '2021-02-16'" />
    </swiper-slide>
    <swiper-slide>
      <Activity :dayProp="6" :showUpload="curDate == '2021-02-17'"/>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import {swiperAnimateCache,swiperAnimate} from "../assets/lib/swiper.animate.min.js"
import { formatDate } from '../utils';
import { PERSON_CODE } from '../utils/consts'
import Activity from './Activity'

let activity_days = ['2021-02-11', '2021-02-12', '2021-02-13', '2021-02-14', '2021-02-15', '2021-02-16', '2021-02-17']
export default {
  name: 'ActivitySwiper',
  components: {
    Activity
  },
  directives: {
    // swiper: directive
  },
  data() {
      return {
        curDate: '',
        swiperOptions: {
          notNextTick: true,
          direction : 'vertical',
          pagination: '.swiper-pagination',
          mousewheelControl : true,
          spaceBetween:0,
          observer:true,
          loop: false,
          circular: true,
          height: window.innerHeight,
          // hashNavigation:true,
          // allowSlidePrev : false, //禁止上滑
          autoHeight: true,
          on:{
            init:function(){
              swiperAnimateCache(this);
              swiperAnimate(this);
            },
            progress: function (progress) {
              for (let i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i);
                var slideProgress = this.slides[i].progress;

              }
            },
            slideChangeTransitionStart:function(){
              swiperAnimate(this);
            },
            slideChangeTransitionEnd:function(){
              swiperAnimate(this);
            },
            slideChange:function(){
              swiperAnimate(this);
            },
          },
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      let personCode = sessionStorage.getItem(PERSON_CODE);
       if(!personCode) {
        this.$router.push('login');
        return;
       }
      this.curDate = formatDate(new Date(), 'yyyy-MM-dd');
      let idx = activity_days.indexOf(this.curDate);
      this.swiper.slideTo(idx, 0, false)
    },
  methods: {
      onSwiper(swiper) {
        console.log(swiper);
      },
      onSlideChange() {
        console.log('slide change');
      },
    },
}
</script>
<style>
  .swiper-wrapper{
  transition-timing-function:linear!important;
}

</style>
