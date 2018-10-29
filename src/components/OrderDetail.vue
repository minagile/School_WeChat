<template>
  <div class="order_detail">
    <div class="info">
      <h2>电费充值</h2>
      <div class="progress">
        <div class="success p">
          <span>提交订单</span>
          <span>提交订单</span>
          <span>提交订单</span>
        </div>
        <div class="suc_img p">
          <img src="../assets/img/success.png" alt="">
          <img src="../assets/img/success.png" alt="">
          <img src="../assets/img/success.png" alt="">
        </div>
        <div class="bar"></div>
      </div>
      <mt-cell title="交易订单：" :value="order"></mt-cell>
      <mt-cell title="交易时间：" :value="time"></mt-cell>
      <mt-cell title="交易状态：" :value="status"></mt-cell>
      <mt-cell title="交易寝室：" :value="room"></mt-cell>
      <mt-cell title="交易金额：" :value="sum"></mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  data () {
    return {
      order: '123123123',
      time: '2018-08-04 22:33',
      status: '交易成功',
      room: '天宫小区14栋X6层123',
      sum: '10.00元'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.order_detail {
  background: #f2f2f2;
  height: calc(100% - 1.5vw);
  padding-top: 1.5vw;
  .info {
    box-sizing: border-box;
    width:92vw;
    // height:92vw;
    margin: 0 auto 20vw;
    background:#fff;
    border-top: 1.2vw solid rgba(63,71,90,1);
    border-bottom: 1.2vw solid rgba(63,71,90,1);
    border-radius:1.33vw;
    h2 {
      font-size:4.8vw;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(63,71,90,1);
      padding: 5.7vw 0 9.6vw 0;
      text-align: center;
    }
  }
  .progress {
    position: relative;
    width: 74.93vw;
    margin: 0 auto;
    .p {
      width: 74.93vw;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }
    .success {
      span {
        font-size:3.2vw;
        font-family:PingFang-SC-Regular;
        color:rgba(102,102,102,1);
      }
    }
    .suc_img {
      padding: 3.7vw 0 4.9vw 0;
      position: relative;
      z-index: 111;
      img {
        width: 6.8vw;
        height: 6.8vw;
      }
    }
    .bar {
      position: absolute;
      width: 100%;
      height:1.6vw;
      background:rgba(229,229,229,1);
      bottom: 7.46vw;
      left: 0;
    }
  }
}
</style>
