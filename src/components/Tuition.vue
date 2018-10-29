<template>
  <div class="tuition">
    <!-- <header onclick="javascript :history.back(-1);">ㄑ水电网费</header> -->
    <div class="payment">
      <div class="input">
        <mt-field label="姓名" placeholder="请输入姓名" v-model="name"></mt-field>
        <mt-field label="学号" placeholder="请输入学号" v-model="num"></mt-field>
        <mt-field label="分院" placeholder="请输入分院" v-model="branch"></mt-field>
        <mt-field label="班级" placeholder="请输入班级" v-model="classroom"></mt-field>
        <mt-field label="金额" placeholder="请输入金额" type="number" v-model="sum"></mt-field>
      </div>
    </div>
    <div class="button" @click="tuition">确定</div>
    <!-- 缴费弹窗 -->
    <mt-popup class="sharePopup" v-model="popupVisible" position="bottom">
      <ul class="shareUl">
        <div class="tit">
          <img src="../assets/img/close.png" @click="popupVisible = false">
          确认付款
        </div>
        <div class="money">{{ howMuch | money }}</div>
        <mt-cell title="订单信息" value="缴学费"></mt-cell>
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
  name: 'Tuition',
  data () {
    return {
      name: '凌凌漆',
      num: '2014050505',
      branch: '环境与能源',
      classroom: '光伏12班',
      sum: '',
      popupVisible: false,
      money: '',
      howMuch: '1',
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
  mounted () {
    // POST /onecard/binding
    // this.$http.post('http://192.168.1.128:80/onecard/binding', {
    //   'openid': 'o5Rin1MChyLmwayeI-3XvyUm4ioM'
    // }).then(res => {
    //   console.log(res)
    // })
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
    // 确认付款
    tuition () {
      if (this.name === '') {
        Toast({message: '姓名不能为空', duration: 2000})
      } else if (this.num === '') {
        Toast({message: '学号不能为空', duration: 2000})
      } else if (this.branch === '') {
        Toast({message: '分院不能为空', duration: 2000})
      } else if (this.classroom === '') {
        Toast({message: '班级不能为空', duration: 2000})
      } else if (this.sum === '') {
        Toast({message: '金额不能为空', duration: 2000})
      } else {
        this.$fetch('/bankCard/getBankCard').then(res => {
          // console.log(res)
          if (res.code === 4103) {
            Toast({
              message: res.message,
              duration: 2000
            })
            this.$router.push('/CardAdd')
          } else {
            this.popupVisible = true
            if (this.sum !== '') {
              this.howMuch = this.sum
            } else {
              this.howMuch = this.list[this.num].split('充')[1].split('元')[0]
            }
            // var data = {
            //   // cardNo: '',
            //   // cardPwd
            //   // schoolId
            //   // studentNo
            //   // studentName
            // }
            // this.$post('/onecard/binding', data).then(res => {
            //   console.log(res)
            // })
          }
        })
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
.tuition {
  background: #f2f2f2;
  height: calc(100% - 1.5vw);
  padding-top: 1.5vw;
  .payment {
    background:rgba(255,255,255,1);
    width: 92vw;
    margin: 2.6vw auto 0;
    border-radius: 5px;
    overflow: hidden;
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
    margin-top: 20.7vw;
  }
  .shareUl {
    min-height: 70vw;
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
    p {
      font-size:3.5vw;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(63,71,90,1);
      line-height:16vw;
      text-indent: 6vw;
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
p {
  font-size:3.5vw;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(63,71,90,1);
  line-height:16vw;
  text-indent: 6vw;
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
