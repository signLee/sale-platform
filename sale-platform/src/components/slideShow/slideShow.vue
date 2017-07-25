<!--轮播图组件-->
<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">  <!--动画切换时的前一张隐藏到显示 经过10ms后nowIndex被赋予了新值-->
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src"> <!--动画切换时的后一张  显示到隐藏 此时的nowIndex尚未改变-->
          <!--v-if效果会在动画执行过后-->
        </transition>
      </a>
    </div>
    <h2>{{slides[nowIndex].title}}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item,index) in slides" @click="goto(index)">
        <a :class="{on:index===nowIndex}">{{index + 1}}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        nowIndex: 0,
        invId: 0,
        isShow: true
      }
    },
    props: {
      slides: {
        type: Array,
        default: []
      },
      inv: {
        type: Number,
        defalut: 1000
      }
    },
    methods: {
      goto(index){
        this.isShow = false;
        setTimeout(()=>{
          this.isShow=true;
          this.nowIndex = index;
          this.$emit('onchange',index)
        },10)
      },
      runInv(){
        this.invId = setInterval(() => {
          this.goto(this.nextIndex)
        }, this.inv)
      },
      clearInv(){
        clearInterval(this.invId);
      }
    },
    computed: {
      prevIndex(){
        if (this.nowIndex === 0) {
          return this.slides.length - 1;
        } else {
          return this.nowIndex - 1;
        }
      },
      nextIndex(){
        if (this.nowIndex == this.slides.length - 1) {
          return 0;
        } else {
          return this.nowIndex + 1;
        }
      }
    },
    mounted(){
      this.runInv();
    }
  }
</script>

<style scoped>
  .slide-trans-enter-active {
    transition: all .5s;
  }
  /*切换的时候从右往左*/
  .slide-trans-enter {
    transform: translateX(900px);
  }
/*切换的时候从右往左*/
  .slide-trans-old-leave-active {
    transition: all .5s;
    transform: translateX(-900px);
  }

  .slide-show {
    position: relative;
    margin: 15px 15px 15px 0;
    width: 900px;
    height: 500px;
    overflow: hidden;
  }

  .slide-show h2 {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 0;
    height: 30px;
    text-align: left;
    padding-left: 15px;
  }

  .slide-img {
    width: 100%;
  }

  .slide-img img {
    width: 100%;
    position: absolute;
    top: 0;
  }

  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }

  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
  }

  .slide-pages li .on {
    text-decoration: underline;
  }
</style>
