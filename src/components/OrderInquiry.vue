<template>
  <div class="order_inquiry">
    <div class="no_order" v-if="!order" @click="$router.push({name: 'HelloWorld'})"></div>
    <div class="order_list" v-for="(o, i) in 2" :key="i" @click="$router.push({name: 'OrderDetail'})" v-if="order">
      <p>
        <i>电费充值</i>
        <i>交易金额：10.00元</i>
      </p>
      <span>订单编号： 415257513567170998833</span>
      <span>下单时间： 2018-05-08 11:49 </span>
      <img src="../assets/img/next.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderInquiry',
  data () {
    return {
      order: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.order_inquiry {
  background: #f2f2f2;
  // height: calc(100% - 1.5vw);
  height: 100%;
  // padding-top: 1.5vw;
  .no_order {
    width: 100%;
    height: 100%;
    background: url(../assets/img/no_order.png) no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .order_list {
    background: #fff;
    margin-bottom: 2.67vw;
    padding: 4vw 4vw 2vw;
    position: relative;
    p {
      font-size:4vw;
      font-family:PingFang-SC-Regular;
      // font-weight:bold;
      color:rgba(0,0,0,1);
      display: flex;
      justify-content: space-between;
      margin-bottom: 6vw;
      i {
        font-style: normal;
      }
    }
    span {
      font-size:3.46vw;
      font-family:PingFang-SC-Regular;
      color:rgba(134,134,134,1);
      display: block;
      line-height: 6vw;
    }
    img {
      position: absolute;
      width: 6.4vw;
      bottom: 4vw;
      right: 4vw;
    }
  }
}
</style>
