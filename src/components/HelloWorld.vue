<template>
  <div class="homePage">
    <!-- <header>ㄑ首页</header> -->
    <div class="body" v-if="jumpTo">
      <div class="img" @click="bindCard">
        <img src="../assets/img/组 7.png" v-if="isSchool">
        <img src="../assets/img/wbk.png" v-if="!isSchool">
        <div class="word" v-if="isSchool">
          <h2>{{ data.schoolName }}   <span>一卡通</span></h2>
          <p><span>余额：{{ data.balance }}</span><span>卡号：{{ data.cardNo }}</span></p>
        </div>
      </div>
      <ul>
        <a @click="jump(0)">
          <img src="../assets/img/pay.png" alt="">
          <span>缴学费</span>
        </a>
        <a @click="jump(1)">
          <img src="../assets/img/scholarship_and_grants.png" alt="">
          <span>水电网费</span>
        </a>
        <a @click="jump(2)">
          <img src="../assets/img/safety_insurance.png" alt="">
          <span>校园卡挂失</span>
        </a>
        <a @click="jump(3)">
          <img src="../assets/img/recharge.png" alt="">
          <span>一卡通充值</span>
        </a>
        <a @click="jump(4)">
          <img src="../assets/img/unbind.png" alt="">
          <span>一卡通解绑</span>
        </a>
        <a @click="jump(5)">
          <img src="../assets/img/lost_property.png" alt="">
          <span>奖助学金</span>
        </a>
        <a @click="jump(6)">
          <img src="../assets/img/score_inquiry.png" alt="">
          <span>订单查询</span>
        </a>
        <a @click="jump(7)">
          <img src="../assets/img/personal_information.png" alt="">
          <span>个人信息</span>
        </a>
        <!-- <a @click="$router.push({name: 'Error'})">
          <img src="../assets/img/scheldule.png" alt="">
          <span>课程表</span>
        </a>
        <a @click="$router.push({name: 'Error'})">
          <img src="../assets/img/message_notification.png" alt="">
          <span>消息通知</span>
        </a>
        <a @click="$router.push({name: 'Error'})">
          <img src="../assets/img/inform.png" alt="">
          <span>通知</span>
        </a>
        <a @click="$router.push({name: 'Error'})">
          <img src="../assets/img/calendar.png" alt="">
          <span>校历</span>
        </a> -->
      </ul>
    </div>
    <div class="jump" v-if="!jumpTo" @click="$router.push({name: 'Bind'})">
      <img src="../assets/img/jump.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      data: {},
      isSchool: false,
      jumpTo: true
    }
  },
  mounted () {
    let open = this.$route.query.openId
    // console.log(open)
    if (open) {
      sessionStorage.setItem('openId', open)
    }
    // GET /onecard/oneCardInfo
    this.$fetch('/onecard/oneCardInfo').then(res => {
      // console.log(res)
      this.data = res
      if (!this.data.schoolName) {
        this.isSchool = false
      } else {
        this.isSchool = true
      }
    })
  },
  methods: {
    jump (index) {
      if (this.data.schoolName) {
        // if (index === 0) this.$router.push({name: 'Tuition'})
        if (index === 0) this.$router.push({name: 'Error'})
        if (index === 1) this.$router.push({name: 'Error'})
        // if (index === 1) this.$router.push({name: 'PayFee'})
        if (index === 2) this.$router.push({name: 'ReportLoss'})
        if (index === 3) this.$router.push({name: 'Charge'})
        if (index === 4) this.$router.push({name: 'Unbind'})
        if (index === 5) this.$router.push({name: 'Error'})
        // if (index === 6) this.$router.push({name: 'OrderInquiry'})
        if (index === 6) this.$router.push({name: 'Error'})
        if (index === 7) this.$router.push({name: 'PeopleInfo', query: {id: this.data.id}})
      } else {
        this.jumpTo = false
      }
    },
    bindCard () {
      if (!this.data.schoolName) {
        this.$router.push({name: 'Bind'})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.homePage {
  background: #f0efef;
  height: calc(100% - 1.5vw);
  padding-top: 1.5vw;
}
.jump {
  background: #fff;
  height: 100%;
  img {
    width: 100%;
    display: block;
  }
}
.homePage header {
  width: 100%;
  height: 11.7vw;
  line-height: 11.7vw;
  background:rgba(255,255,255,1);
}
.body .img {
  height: 62.14vw;
}
.body img {
  width: 100%;
  display: block;
}

.body ul {
  width: 91.4vw;
  // height: 66.7vw;
  height: 44.4vw;
  overflow: hidden;
  background:rgba(255,255,255,1);
  border-radius: 2.67vw;
  box-shadow:0px 0.93vw 4vw 0px rgba(87,87,87,0.26);
  margin: 0 auto;
}

.body ul a {
  float: left;
  width: 25%;
  height: 22.27vw;
  box-sizing: border-box;
  border-right: 1px solid #F2F2F2;
  border-bottom: 1px solid #F2F2F2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.body ul a:nth-of-type(4n) {
  border-right: 0;
}

.body ul a img {
  width: 6.27vw;
}

.body ul a span {
  font-size: 3.47vw;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(101,101,101,1);
  padding-top: 2vw;
}
.img {
  position: relative;
}

.img .word {
  position: absolute;
  top: 20%; left: 15%;
  width: 70%;
  height: 63%;
  color:rgba(61,119,182,1);
}

.img .word h2 {
  font-size:5.07vw;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(61,119,182,1);
  line-height:24px;
}

.img .word h2 span {
  font-size: 0.32vw;
}

.img .word p {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1vw;
  width: calc(100% - 2vw);
}
</style>
