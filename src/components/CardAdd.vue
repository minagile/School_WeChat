<template>
  <div class="pay_fee">
    <!-- <header onclick="javascript :history.back(-1);">ㄑ添加银行卡</header> -->
    <div class="add" v-if="chooseShow">
      <div class="user">
        <img src="../assets/img/yinhangCard.png" alt="">
        <input type="text" placeholder="请选择你的银行卡号" v-model="bankCardNumber">
        <!-- <img src="" alt=""> -->
      </div>
      <div class="list">支持多家国内银行，<a style="color: #48abff;">查看支持银行列表</a></div>
      <div class="button" @click="next">下一步</div>
    </div>
    <!-- 储蓄卡 -->
    <div class="sendmsg" v-if="DCShow">
      <p>卡类型：中国银行 储蓄卡</p>
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
        <img src="../assets/img/phone.png" alt="">
        <input type="text" v-model="tel" placeholder="请输入银行卡绑定的手机号">
      </div>
      <div class="user code">
        <div class="w_code">
          <img src="../assets/img/code.png" alt="">
          <input type="text" v-model="code" placeholder="请输入验证码">
        </div>
        <a @click="getCode($event)">获取验证码<span v-if="codeshow">{{ count }}s</span></a>
      </div>
      <div class="button" @click="sure">确定</div>
    </div>
    <!-- 信用卡 -->
    <div class="sendmsg" v-if="CCShow">
      <p>卡类型：{{ bank }} {{ cardType }}</p>
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
        <img src="../assets/img/num.png" alt="">
        <input type="text" v-model="num" placeholder="请输入卡背面末三位">
      </div>
      <div class="user" @click="openPicker">
        <img src="../assets/img/yinhangCard.png" alt="">
        <input type="text" v-model="dateTime" placeholder="请选择银行卡有效期">
      </div>
      <div class="user">
        <img src="../assets/img/phone.png" alt="">
        <input type="text" v-model="tel" placeholder="请输入银行卡绑定的手机号">
      </div>
      <div class="user code">
        <div class="w_code">
          <img src="../assets/img/code.png" alt="">
          <input type="text" v-model="code" placeholder="请输入验证码">
        </div>
        <a @click="getCode($event)">获取验证码<span v-if="codeshow">{{ count }}s</span></a>
      </div>
      <div class="button" @click="sure">确定</div>
    </div>
    <mt-datetime-picker
      v-model="pickerVisible"
      type="date"
      ref="picker"
      yearFormat="{value} 年"
      monthFormat="{value} 月"
      @confirm="handleConfirm"
      :startDate="startDate">
    </mt-datetime-picker>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import $ from 'jquery'
import moment from 'moment'
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
      codeshow: false,
      pickerVisible: null,
      dateTime: '',
      startDate: new Date(),
      num: '',
      cardType: '',
      bank: '',
      CCShow: false,
      DCShow: false
    }
  },
  methods: {
    openPicker () {
      $('.picker-slot.picker-slot-center')[2].style.display = 'none'
      this.$refs.picker.open()
    },
    handleConfirm (data) {
      let date = moment(data).format('YYYY-MM')
      // console.log(date)
      this.dateTime = date
    },
    // 获取验证码
    getCode (e) {
      if (this.DCShow === true) {
        if (this.tel === '') {
          Toast({
            message: '卡号不能为空',
            duration: 2000
          })
        } else if (this.name === '') {
          Toast({
            message: '姓名不能为空',
            duration: 2000
          })
        } else if (this.idNumber === '') {
          Toast({
            message: '身份证不能为空',
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
      } else if (this.CCShow === true) {
        if (this.tel === '') {
          Toast({
            message: '卡号不能为空',
            duration: 2000
          })
        } else if (this.name === '') {
          Toast({
            message: '姓名不能为空',
            duration: 2000
          })
        } else if (this.idNumber === '') {
          Toast({
            message: '身份证不能为空',
            duration: 2000
          })
        } else if (this.dateTime === '') {
          Toast({
            message: '日期不能为空',
            duration: 2000
          })
        } else if (this.tel === '') {
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
      }
    },
    // 下一步
    next () {
      if (this.bankCardNumber === '') {
        Toast({
          message: '银行卡不能为空',
          duration: 2000
        })
      } else {
        // var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        var cardres = /^(\d{16}|\d{19})$/
        if (cardres.test(this.bankCardNumber) === false) {
          Toast({
            message: '银行卡不正确',
            duration: 2000
          })
        } else {
          this.$http.get('https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardBinCheck=true&cardNo=' + this.bankCardNumber).then(res => {
            this.cardType = cardTypeMap(res.data.cardType)
            this.bank = res.data.bank
            this.$post('/bankCard/bundling', {
              bankCardNumber: this.bankCardNumber
            }).then(res => {
              if (res.code) {
                Toast({
                  message: res.message,
                  duration: 2000
                })
              } else {
                this.chooseShow = false
                if (this.cardType === '储蓄卡') {
                  this.DCShow = true
                } else if (this.cardType === '信用卡') {
                  this.CCShow = true
                }
                this.id = res
              }
            })
          })
        }
      }
    },
    sure () {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (reg.test(this.idNumber) === false) {
        Toast({
          message: '请输入正确的身份证',
          duration: 2000
        })
      } else {
        if (this.DCShow === true) {
          if (this.code === '') {
            Toast({
              message: '验证码不能为空',
              duration: 2000
            })
          } else {
            var data = {
              id: this.id,
              tel: this.tel,
              code: this.code,
              type: 1,
              name: this.name,
              creditBack: '',
              creditEndDate: '',
              idNumber: this.idNumber
            }
            this.$post('/bankCard/validation', data).then(res => {
              if (res === true) {
                this.$router.push({name: 'Charge'})
              } else {
                Toast({
                  message: '验证码不正确',
                  duration: 2000
                })
              }
            })
          }
        } else if (this.CCShow === true) {
          if (this.code === '') {
            Toast({
              message: '验证码不能为空',
              duration: 2000
            })
          } else {
            this.$post('/bankCard/validation', {
              id: this.id,
              tel: this.tel,
              code: this.code,
              type: 2,
              creditBack: this.num,
              creditEndDate: this.dateTime,
              name: this.name,
              idNumber: this.idNumber
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
            })
          }
        }
      }
    }
  },
  filter: {
  }
}
function cardTypeMap (data) {
  // console.log(data)
  if (data === 'DC') return '储蓄卡'
  if (data === 'CC') return '信用卡'
  if (data === 'SCC') return '准贷记卡'
  if (data === 'PC') return '预付费卡'
  return data
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
    .list {
      font-size:3.73vw;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(81,81,81,1);
      margin-top: -4vw;
      margin-bottom: 4.6vw;
      // text-align: right;
      padding-left: 14.27vw;
    }
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
        height: 12.83vw;
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
