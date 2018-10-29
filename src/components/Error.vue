<template>
  <div class="error" onclick="javascript:history.back(-1);">
    <!-- <header>ㄑ 首页</header> -->
    <img src="../assets/img/bg.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'Error',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.error {
  // height: 100%;
  background: #3d4659;
  background-size: cover;
  width: 100%;
  height: 100%;
  img {
    width: 100%;

  }
  header {
    // background: #fff;
    height: 11.7vw;
    font-size: 4.27vw;
    line-height: 11.7vw;
    margin-bottom: 1.5vw;
    font-family:PingFang-SC-Medium;
  }
}
</style>
