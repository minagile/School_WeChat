<template>
  <div class="pay_fee">
    <!-- <header onclick="javascript :history.back(-1);">ㄑ水电网费</header> -->
    <div class="payment">
      <div class="radio">
        <mt-radio v-model="value" :options="['水', '电费', '网费']"></mt-radio>
      </div>
      <div class="input">
        <mt-field label="楼号" placeholder="请输入楼号" v-model="number"></mt-field>
        <mt-field label="宿舍号" placeholder="请输入宿舍号" v-model="zhunum"></mt-field>
        <mt-field label="输入金额" placeholder="请输入金额" v-model="howMuch"></mt-field>
      </div>
    </div>
    <!-- <button @click="$router.push({name: 'CardAdd'})">缴费</button> -->
    <div class="button" @click="pay">缴费</div>
    <mt-popup class="sharePopup" v-model="popupVisible" position="bottom">
      <ul class="shareUl">
        <div class="tit">
          <img src="../assets/img/close.png" @click="popupVisible = false">
          确认付款
        </div>
        <div class="money">{{ howMuch | money }}</div>
        <mt-cell title="订单信息" :value="number + '栋' + zhunum + '室' + value"></mt-cell>
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
import $ from 'jquery'
import { Toast } from 'mint-ui'
export default {
  name: 'PayFee',
  data () {
    return {
      value: '水',
      popupVisible: false,
      number: '',
      zhunum: '',
      howMuch: '',
      popupRight: false,
      pwdVisible: false,
      imgShow: false,
      count: 3,
      cardList: [],
      cardNo: ''
    }
  },
  created () {
    setTimeout(() => {
      $('.payment .radio a').css({
        'float': 'left',
        'padding': '0',
        'backgroundColor': 'none',
        'border': 'none',
        'marginRight': '0.5vw'
      })
      $('.radio .mint-cell-wrapper').css({
        'min-height': '11.5vw',
        'background': 'rgba(0,0,0,0)'
      })
      $('.input a').css({
        'width': '74.13vw',
        'margin': '8vw auto'
      })
      $('.input .mint-cell-wrapper').css({
        'background-image': '-webkit-gradient(linear, left top, left bottom, from(#d9d9d9), color-stop(50%, #d9d9d9), color-stop(50%, transparent))',
        'background-size': '120% 1px',
        'background-repeat': 'no-repeat',
        'background-position': 'bottom left'
      })
    })
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
          // this.$post('/rechargeController/recharge', {
          //   cardPassword: password,
          //   money: this.howMuch,
          //   cardNo: this.cardNo
          // }).then(res => {
          //   console.log(res)
          //   if (res === false) {
          //     setTimeout(function () {
          //       for (var k = 0; k < spans.length; k++) {
          //         spans[k].innerHTML = ''
          //         spans[k].setAttribute('data-num', '')
          //       }
          //     }, 300)
          //     Toast({
          //       message: '密码错误，请重新输入',
          //       duration: 2000
          //     })
          //   } else {
          //     this.imgShow = true
          //     this.clock = window.setInterval(() => {
          //       this.count--
          //       if (this.count < 1) {
          //         clearInterval(this.clock)
          //         this.$router.push({name: 'HelloWorld'})
          //       }
          //     }, 1000)
          //   }
          // })
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
    pay () {
      if (this.number === '') {
        Toast({
          message: '请输入楼号',
          duration: 2000
        })
      } else if (this.zhunum === '') {
        Toast({
          message: '请输入你的宿舍号',
          duration: 2000
        })
      } else if (this.howMuch === '') {
        Toast({
          message: '请输入你要充值的金额',
          duration: 2000
        })
      } else {
        this.popupVisible = true
      }
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
  .payment {
    background:rgba(255,255,255,1);
    width: 92vw;
    margin: 2.6vw auto 0;
    border-radius: 5px;
    overflow: hidden;
  }
  .radio {
    margin-bottom: 3vw;
    overflow: hidden;
    width: 80vw;
    margin: 0 auto
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
    margin-top: 5.7vw;
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
  // width: 100%;
  // left: 0;
  // bottom: 0;
  margin-top: 10vw;
}
.keyboard>li {
  float: left;
  line-height: 50px;
  width: 33%;
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
