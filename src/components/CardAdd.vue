<template>
  <div class="pay_fee">
    <!-- <header onclick="javascript :history.back(-1);">ㄑ添加银行卡</header> -->
    <div class="add" v-if="chooseShow">
      <div class="user">
        <img src="../assets/img/person.png" alt="">
        <input type="text" placeholder="请选择你的姓名" v-model="name">
        <!-- <img src="" alt=""> -->
      </div>
      <div class="user">
        <img src="../assets/img/card.png" alt="">
        <input type="text" placeholder="请选择你的身份证号" v-model="idNumber">
        <!-- <img src="" alt=""> -->
      </div>
      <div class="user">
        <img src="../assets/img/yinhangCard.png" alt="">
        <input type="text" placeholder="请选择你的银行卡号" v-model="bankCardNumber">
        <!-- <img src="" alt=""> -->
      </div>
      <div class="button" @click="next">下一步</div>
    </div>
    <div class="sendmsg" v-if="!chooseShow">
      <p>卡类型：中国银行 储蓄卡</p>
      <div class="user">
        <img src="../assets/img/school.png" alt="">
        <input type="text" v-model="tel" placeholder="请输入银行卡绑定的手机号">
        <!-- <img src="" alt=""> -->
      </div>
      <div class="user code">
        <div class="w_code">
          <img src="../assets/img/school.png" alt="">
          <input type="text" v-model="code" placeholder="请输入验证码">
        </div>
        <a @click="getCode($event)">获取验证码<span v-if="codeshow">{{ count }}s</span></a>
      </div>
      <div class="button" @click="sure">确定</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'PayFee',
  data () {
    return {
      chooseShow: true,
      name: '',
      idNumber: '',
      bankCardNumber: '',
      id: 1,
      tel: '',
      code: '',
      count: 60,
      codeshow: false
    }
  },
  methods: {
    // 获取验证码
    getCode (e) {
      if (this.tel === '') {
        Toast({
          message: '手机号不能为空',
          duration: 2000
        })
      } else {
        if (!(/^1[34578]\d{9}$/.test(this.tel))) {
          Toast({
            message: '请输入正确的手机号',
            duration: 2000
          })
        } else {
          if (this.codeshow === false) {
            this.codeshow = true
            e.target.style.backgroundColor = '#ccc'
            this.clock = window.setInterval(() => {
              this.count--
              if (this.count < 1) {
                this.codeshow = false
                e.target.style.backgroundColor = 'rgba(142,142,142,1)'
                clearInterval(this.clock)
              }
            }, 1000)
            this.$post('/bankCard/getAuthCode', {
              tel: this.tel
            }).then(res => {
              console.log(res)
            })
          }
        }
      }
    },
    // 下一步
    next () {
      if (this.name === '') {
        Toast({
          message: '姓名不能为空',
          duration: 2000
        })
      } else if (this.idNumber === '') {
        Toast({
          message: '身份证不能为空',
          duration: 2000
        })
      } else if (this.bankCardNumber === '') {
        Toast({
          message: '银行卡不能为空',
          duration: 2000
        })
      } else {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        var cardres = /^([1-9]{1})(\d{14}|\d{18})$/
        if (reg.test(this.idNumber) === false) {
          Toast({
            message: '身份证不不正确',
            duration: 2000
          })
        } else if (cardres.test(this.bankCardNumber) === false) {
          Toast({
            message: '银行卡不正确',
            duration: 2000
          })
        } else {
          this.$post('/bankCard/bundling', {
            name: this.name,
            idNumber: this.idNumber,
            bankCardNumber: this.bankCardNumber
          }).then(res => {
            this.chooseShow = false
            // console.log(res)
            this.id = res
          })
        }
      }
    },
    sure () {
      if (this.code === '') {
        Toast({
          message: '验证码不能为空',
          duration: 2000
        })
      } else {
        // POST /bankCard/validation
        this.$post('/bankCard/validation', {
          id: this.id,
          tel: this.tel,
          code: this.code
        }).then(res => {
          // this.chooseShow = false
          if (res === true) {
            this.$router.push({name: 'Charge'})
          } else {
            Toast({
              message: '验证码不正确',
              duration: 2000
            })
          }
          // console.log(res)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.pay_fee {
  background: #f2f2f2;
  height: calc(100% - 1.5vw);
  padding-top: 1.5vw;
  header {
    background: #fff;
    height: 11.7vw;
    font-size: 4.27vw;
    line-height: 11.7vw;
    margin-bottom: 1.5vw;
    font-family:PingFang-SC-Medium;
  }
  .add {
    background:rgba(255,255,255,1);
    width: 100%;
    // margin: 2.6vw auto 0;
    padding: 9vw 0;
    border-radius: 5px;
    overflow: hidden;
  }
  .sendmsg {
    background:rgba(255,255,255,1);
    width: 100%;
    padding: 9vw 0 0;
    overflow: hidden;
    p {
      width: 77.33vw;
      // height: 13.33vw;
      margin: 0 auto 4.8vw;
      text-indent: 2vw;
      font-size:4.8vw;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(63,71,90,1);
    }
    .code {
      border: 0;
      // display: flex;
      .w_code {
        float: left;
        width: 45vw;
        border: 1px solid rgba(142,142,142,1);
        border-radius: 13.33vw;
        overflow: hidden;
        input {
          width: 30vw;
        }
      }
      a {
        float: right;
        width: 30.93vw;
        height:13.37vw;
        line-height:13.37vw;
        text-align: center;
        background:rgba(63,71,90,1);
        border-radius:6.53vw;
        color: #fff;
        // display: inline-block;
      }
    }
    .button {
      margin: 15vw auto;
    }
  }
  .user {
    width: 77.33vw;
    height: 13.33vw;
    margin: 0 auto 4.8vw;
    background: rgba(255,255,255,1);
    border: 1px solid rgba(142,142,142,1);
    border-radius: 13.33vw;
    overflow: hidden;
    img {
      width: 5vw;
      vertical-align: middle;
      margin-left: 3.3vw;
      margin-right: 2.9vw;
    }
    input {
      line-height: 13.33vw;
      height: 13.33vw;
      width: 63vw;
      border: 0;
      font-size: 3.5vw;
      outline: none;
    }
  }
  .button {
    width: 77.33vw;
    height: 13.33vw;
    line-height: 13.33vw;
    display: block;
    margin: 0 auto;
    border-radius: 25px;
    border: 0;
    color: #fff;
    font-size: 5vw;
    background:rgba(63,71,90,1);
    outline: none;
    text-align: center;
    &:active {
      background:rgb(45, 51, 67);
    }
  }
}
</style>
