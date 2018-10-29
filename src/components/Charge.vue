<template>
  <div class="charge">
    <!-- <header onclick="javascript :history.back(-1);">ㄑ充值金额</header> -->
    <div class="num">
      <li v-for="(o, i) in list" :key="i" :class="{active: num === i}" @click="tab(i)">{{ o }}</li>
      <div class="auto_input">
        <span>输入金额：</span>
        <input type="number" v-model="money">
      </div>
      <p>选择支付方式</p>
      <mt-radio align="right" v-model="value" :options="options"></mt-radio>
    </div>
    <div class="button" @click="next">下一步</div>
    <!-- 缴费弹窗 -->
    <mt-popup class="sharePopup" v-model="popupVisible" position="bottom">
      <ul class="shareUl">
        <div class="tit">
          <img src="../assets/img/close.png" @click="popupVisible = false">
          确认付款
        </div>
        <div class="money">{{ howMuch | money }}</div>
        <mt-cell title="订单信息" value="一卡通充值"></mt-cell>
        <div class="card" @click="popup">
          <mt-cell title="付款方式" is-link :value="cardNo"></mt-cell>
        </div>
      </ul>
      <div class="shareFooter">
        <div class="button" style="margin-bottom: 2vw;" @click="popupVisible = false, pwdVisible = true">立即付款</div>
      </div>
    </mt-popup>
    <!-- 银行卡选择 -->
    <mt-popup class="sharePopup" v-model="popupRight" position="bottom">
      <ul class="shareUl">
        <div class="tit">
          <img src="../assets/img/close.png" @click="popupRight = false,popupVisible = true">
          选择银行卡
        </div>
        <div class="card_cell">
          <li v-for="(o, i) in cardList" :key="i" @click="choosecard(o.cardNo)">{{ o.cardNo }}</li>
        </div>
      </ul>
      <!-- <div class="shareFooter">
        <button style="margin-bottom: 2vw;" @click="popupRight = false,popupVisible = true">确定</button>
      </div> -->
    </mt-popup>
    <!-- 密码填写 -->
    <mt-popup class="sharePopup" v-model="pwdVisible" position="bottom">
      <ul class="shareUl">
        <div class="tit">
          <img src="../assets/img/close.png" @click="pwdVisible = false, popupVisible = true">
          请输入一卡通密码
        </div>
        <p>请输入一卡通密码</p>
        <div class="phone_code">
          <span class="sixCode"></span>
          <span class="sixCode"></span>
          <span class="sixCode"></span>
          <span class="sixCode"></span>
          <span class="sixCode"></span>
          <span class="sixCode"></span>
        </div>
        <ul class="keyboard clearfix">
          <li class="bottom_border right_border top_border" @click="keybord($event)">1</li>
          <li class="bottom_border right_border top_border" @click="keybord($event)">2</li>
          <li class="bottom_border top_border" @click="keybord($event)">3</li>
          <li class="bottom_border right_border" @click="keybord($event)">4</li>
          <li class="bottom_border right_border" @click="keybord($event)">5</li>
          <li class="bottom_border" @click="keybord($event)">6</li>
          <li class="bottom_border right_border" @click="keybord($event)">7</li>
          <li class="bottom_border right_border" @click="keybord($event)">8</li>
          <li class="bottom_border" @click="keybord($event)">9</li>
          <li style="background-color: #d5d8db;" @click="keybord($event)">&nbsp;</li>
          <li @click="keybord($event)">0</li>
          <li style="background-color: #d5d8db;" @click="keybord($event)">删除</li>
        </ul>
      </ul>
    </mt-popup>
    <mt-popup class="img_show" v-model="imgShow">
      <img src="../assets/img/back.png" alt="">
      <div class="mark">恭喜你充值成功，{{ count }}S后回到首页</div>
    </mt-popup>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Charge',
  data () {
    return {
      num: 0,
      list: ['充200元', '充500元', '充300元', '充100元'],
      popupVisible: false,
      money: '',
      howMuch: '1',
      value: '银行卡支付',
      options: [
        {
          label: '银行卡支付',
          value: '银行卡支付'
        }
      ],
      popupRight: false,
      pwdVisible: false,
      imgShow: false,
      count: 3,
      cardList: [],
      cardNo: ''
    }
  },
  methods: {
    choosecard (no) {
      this.popupRight = false
      this.popupVisible = true
      this.cardNo = no
    },
    keybord (e) {
      this.set_num(e.target.textContent)
    },
    set_num (num) {
      var spans = document.querySelector('.phone_code').querySelectorAll('span')
      if (/[0-9]/.test(num)) {
        var index = 0
        for (var i1 = 0; i1 < spans.length; i1++) {
          var val1 = spans[i1].innerHTML
          index = i1
          if (!val1) {
            spans[i1].innerHTML = num
            spans[i1].setAttribute('data-num', num)
            setTimeout(function () {
              spans[i1].innerHTML = '*'
            }, 200)
            break
          }
        }
        if (index === 5) {
          var password = ''
          for (var j = 0; j < spans.length; j++) {
            var val2 = spans[j].getAttribute('data-num')
            password += val2
          }
          console.log(password)
          // POST /rechargeController/recharge
          // 付款接口
          this.$post('/rechargeController/recharge', {
            cardPassword: password,
            money: this.howMuch,
            cardNo: this.cardNo
          }).then(res => {
            // console.log(res)
            if (res === 200) {
              this.imgShow = true
              this.clock = window.setInterval(() => {
                this.count--
                if (this.count < 1) {
                  clearInterval(this.clock)
                  this.$router.push({name: 'HelloWorld'})
                }
              }, 1000)
            } else {
              setTimeout(function () {
                for (var k = 0; k < spans.length; k++) {
                  spans[k].innerHTML = ''
                  spans[k].setAttribute('data-num', '')
                }
              }, 300)
              Toast({
                message: '密码错误，请重新输入',
                duration: 2000
              })
            }
          })
        }
      } else if (num === '删除') {
        var index1 = 0
        for (var i2 = 0; i2 < spans.length; i2++) {
          var val3 = spans[i2].innerHTML
          if (val3) {
            index1 = i2
          }
        }
        spans[index1].innerHTML = ''
        spans[index1].setAttribute('data-num', '')
      }
    },
    // 选择银行卡
    popup () {
      this.popupVisible = false
      this.popupRight = true
      // GET /bankCard/getBankCard
      this.$fetch('/bankCard/getBankCard').then(res => {
        console.log(res)
        this.cardList = res
      })
    },
    next () {
      this.$fetch('/bankCard/getBankCard').then(res => {
        console.log(res)
        if (res.code === 4103) {
          Toast({
            message: res.message,
            duration: 2000
          })
          this.$router.push('/CardAdd')
        } else {
          this.popupVisible = true
          if (this.money !== '') {
            this.howMuch = this.money
          } else {
            this.howMuch = this.list[this.num].split('充')[1].split('元')[0]
          }
        }
      })
    },
    tab (i) {
      this.num = i
      this.money = ''
      this.howMuch = this.list[i].split('充')[1].split('元')[0]
    }
  },
  filters: {
    money (data) {
      if (data.indexOf('.') === -1) return data + '.00'
      return data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.charge {
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
  .num {
    background: #fff;
    overflow: hidden;
    width: 92vw;
    margin: 0 auto;
    padding-top: 6vw;
    li {
      float: left;
      width:40.2vw;
      height:17.6vw;
      line-height:17.6vw;
      text-align: center;
      border-radius:20px;
      border:1px solid rgba(0,0,0,0.21);
      margin: 3.6vw 0 3.6vw 3.6vw;
      &.active {
        background:rgba(63,71,90,1);
        color: #fff;
        border-color:rgba(63,71,90,1);
      }
    }
    .auto_input {
      clear: both;
      width:82vw;
      height:12.6vw;
      line-height:12.6vw;
      border:1px solid rgba(0,0,0,1);
      border-radius: 1.53vw;
      margin: 0 auto;
      padding-left: 2vw;
      overflow: hidden;
      input {
        border: 0;
        line-height:12vw;
        font-size: 3.5vw;
        outline: none;
        width: 60vw;
      }
    }
    p {
      line-height:20vw;
      height: 14vw;
      text-indent: 5vw;
      font-size:4vw;
      font-family:PingFang-SC-Medium;
      font-weight:bold;
      color:rgba(63,71,90,1);
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
    margin-top: 20vw;
    &:active {
      background:rgb(45, 51, 67);
    }
  }
  .img_show {
    background: rgba(0, 0, 0, 0);
    img {
      width: 60vw;
      display: block;
    }
    .mark {
      position: absolute;
      color: #fff;
      font-size:3.4vw;
      font-family:PingFang-SC-Medium;
      left: 6vw;
      bottom: 10vw;
    }
  }
  .shareUl {
    height: 90vw;
    width: 100vw;
    .card_cell {
      overflow: scroll;
      height: 80vw;
      li {
        background-image: -webkit-gradient(linear, left top, left bottom, from(#d9d9d9), color-stop(50%, #d9d9d9), color-stop(50%, transparent));
        background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: bottom left;
        font-size:3.5vw;
        min-height: 11.5vw;
        line-height: 11.5vw;
        text-indent: 8vw;
      }
    }
    .tit {
      text-align: center;
      height: 10vw;
      line-height: 10vw;
      border-bottom: 1px solid #E8E8E8;
      img {
        width: 3vw;
        float: left;
        margin: 3.5vw 0 0 3.5vw;
      }
    }
    p {
      font-size:3.5vw;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(63,71,90,1);
      line-height:16vw;
      text-indent: 6vw;
    }
    .money {
      text-align: center;
      height:31.47vw;
      line-height:31.47vw;
      font-size:10.5vw;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
    .card {
      margin-bottom: 12vw;
    }
  }
}
.phone_code {
  overflow: hidden;
  padding-left: 7.6vw;
}
.phone_code span {
  width:8.8vw;
  height:8.8vw;
  line-height:8.8vw;
  background:rgba(255,255,255,1);
  border:1px solid rgba(154,154,154,1);
  margin-right: 4.8vw;
  display: block;
  text-align: center;
  float: left;
  outline: none;
}
.keyboard {
  // position: absolute;
  width: 100%;
  height: 44vw;
  // left: 0;
  // bottom: 0;
  margin-top: 10vw;
}
.keyboard>li {
  float: left;
  line-height: 11vw;
  width: 33.1%;
  text-align: center;
  background-color: #fff;
}
.bottom_border {
  border-bottom: 1px solid #ccc;
}
.top_border {
  border-top: 1px solid #ccc;
}
.right_border {
  border-right: 1px solid #ccc;
}
</style>
