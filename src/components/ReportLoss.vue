<template>
  <div class="report_loss">
    <!-- <header onclick="javascript :history.back(-1);">ㄑ校园卡挂失</header> -->
    <div class="safe">
      <img src="../assets/img/safe.png" alt="">
      <h4>瞬间保护账户资金</h4>
    </div>
    <p>请在一卡通丢失后，或者出现资金风险时及时挂失</p>
    <div class="button" @click="popupVisible = true">立即挂失</div>
    <mt-popup class="sharePopup" v-model="popupVisible" position="bottom">
      <ul class="shareUl">
        <div class="tit">
          <img src="../assets/img/close.png" @click="popupVisible = false">
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
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'ReportLoss',
  data () {
    return {
      popupVisible: false
    }
  },
  methods: {
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
          // POST /onecard/loss
          // 挂失
          this.$post('/onecard/loss', {cardPwd: password}).then(res => {
            if (res === false) {
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
            } else {
              this.$router.push('/Bind')
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.report_loss {
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
  .shareUl {
    height: 90vw;
    width: 100vw;
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
  }
  .safe {
    width: 92vw;
    background: #fff;
    margin: 0 auto;
    text-align: center;
    padding-top: 6.8vw;
    padding-bottom: 14.73vw;
    border-radius: 1.3vw;
    img {
      width: 19.2vw;
    }
    h4 {
      font-size:4.8vw;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(63,71,90,1);
      line-height:12vw;
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
  .button {
    width: 77.33vw;
    height: 13.33vw;
    line-height: 13.33vw;
    display: block;
    margin: 0 auto;
    border-radius: 13vw;
    border: 0;
    color: #fff;
    font-size: 5vw;
    background:rgba(63,71,90,1);
    outline: none;
    text-align: center;
  }
}
.keyboard {
  // position: absolute;
  width: 100%;
  // left: 0;
  // bottom: 0;
  height: 44vw;
  margin-top: 10vw;
  overflow: hidden;
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
