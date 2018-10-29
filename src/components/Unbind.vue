<template>
  <div class="unbind">
    <!-- <header onclick="javascript :history.back(-1);">ㄑ校园卡解绑</header> -->
    <div class="onecard" v-if="!psdShow">
      <h4>当前一卡通：</h4>
      <p>{{ data.cardNo }}</p>
      <div class="name">
        <span>姓名：{{ name }}</span>
        <span>学号：{{ num }}</span>
      </div>
    </div>
    <p class="tip" v-if="!psdShow">解绑本张校园卡后可重新绑定一张新的校园卡</p>
    <div class="button" v-if="!psdShow" @click="psdShow = !psdShow">立即解绑</div>
    <div class="pasd" v-if="psdShow">
      <p>请输入一卡通密码</p>
      <div class="phone_code">
        <input type="number" class="sixCode" @keyup="psdinput($event)"  @input="limit($event)">
        <input type="number" class="sixCode" @keyup="psdinput($event)"  @input="limit($event)" disabled>
        <input type="number" class="sixCode" @keyup="psdinput($event)"  @input="limit($event)" disabled>
        <input type="number" class="sixCode" @keyup="psdinput($event)"  @input="limit($event)" disabled>
        <input type="number" class="sixCode" @keyup="psdinput($event)"  @input="limit($event)" disabled>
        <input type="number" class="sixCode" @keyup="psdinput($event)"  @input="limit($event)" disabled>
      </div>
    </div>
    <div class="button" v-if="psdShow" @click="sure">确定</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Unbind',
  data () {
    return {
      psdShow: false,
      data: {},
      num: '',
      name: '',
      pwd: ''
    }
  },
  mounted () {
    // GET /onecard/oneCardInfo
    this.$fetch('/student/findByOpenId').then(res => {
      // this.school = res.schoolName
      this.num = res.studentNo
      // this.card = res.cardNo
      this.name = res.studentName
    })
    this.$fetch('/onecard/oneCardInfo').then(res => {
      // console.log(res)
      this.data = res
    })
  },
  methods: {
    sure () {
      this.pwd = ''
      for (var i = 0; i < 6; i++) {
        this.pwd += document.getElementsByClassName('phone_code')[0].children[i].value
      }
      console.log(this.pwd)
      // POST /onecard/unbinding
      this.$post('/onecard/unbinding', {cardPwd: this.pwd}).then(res => {
        console.log(res)
        if (res === false) {
          Toast({
            message: '密码错误，请重新输入',
            duration: 2000
          })
          this.pwd = ''
        } else {
          this.$router.push('/Bind')
        }
      })
    },
    psdinput (event) {
      if (event.target.value.length === 1) {
        if (event.target.nextElementSibling) {
          event.target.blur()
          event.target.disabled = true
          event.target.nextElementSibling.disabled = false
          event.target.nextElementSibling.focus()
        }
      } else if (event.target.value.length === 0) {
        if (event.target.previousElementSibling) {
          event.target.blur()
          event.target.disabled = true
          event.target.previousElementSibling.disabled = false
          event.target.previousElementSibling.focus()
        }
      } else {
        console.log(event.target.value.length)
      }
    },
    limit (e) {
      if (e.target.value.length > 1) e.target.value = e.target.value.slice(0, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.unbind {
  background: #f2f2f2;
  height: calc(100% - 1.5vw);
  padding-top: 1.5vw;
  .onecard {
    height: 50vw;
    margin: 3.2vw 3.73vw 0;
    background: #fff;
    border-radius: 10px;
    h4 {
      font-size:4.8vw;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(63,71,90,1);
      line-height:10.1vw;
      height:10.1vw;
      text-indent: 3.2vw;
    }
    p {
      // height:14px;
      font-size:6.5vw;
      font-family:PingFang-SC-Bold;
      // font-weight:bold;
      text-align: center;
      color:rgba(63,71,90,1);
      line-height:30vw;
      height:33vw;
      overflow: hidden;
    }
    .name {
      display: flex;
      padding: 0 2vw;
      justify-content: space-between;
    }
  }
  .tip {
    // height:3.5vw;
    font-size:4vw;
    font-family:PingFang-SC-Bold;
    // font-weight:bold;
    text-indent: 5vw;
    color:rgba(63,71,90,1);
    line-height:10.1vw;
  }
}
header {
  background: #fff;
  height: 11.7vw;
  font-size: 4.27vw;
  line-height: 11.7vw;
  margin-bottom: 1.5vw;
  font-family:PingFang-SC-Medium;
}
.pasd {
  margin: 3.2vw 3.73vw 0;
  height: 42.8vw;
  background: #fff;
  border-radius: 10px;
}
.pasd p {
  height: 17vw;
  font-size: 3.4vw;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(63,71,90,1);
  line-height:17vw;
  text-indent: 7.6vw;
}
.phone_code {
  overflow: hidden;
  padding-left: 7.6vw;
}
.phone_code input {
  width:8.8vw;
  height:8.8vw;
  background:rgba(255,255,255,1);
  border:1px solid rgba(154,154,154,1);
  margin-right: 4.8vw;
  display: block;
  text-align: center;
  float: left;
  outline: none;
}
.button {
  width: 77.33vw;
  height: 13.33vw;
  line-height: 13.33vw;
  display: block;
  text-align: center;
  margin: 0 auto;
  border-radius: 25px;
  border: 0;
  color: #fff;
  font-size: 5vw;
  background:rgba(63,71,90,1);
  outline: none;
  margin-top: 24.7vw;
}
</style>
