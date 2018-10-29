<template>
  <div class="bind">
    <!-- <header onclick="javascript :history.back(-1);">ㄑ 绑定学号</header> -->
    <div class="box">
      <div class="user" @click="chooseSchool">
        <img src="../assets/img/school.png" alt="">
        <input type="text" disabled v-model="schoolName"  @click="chooseSchool"  placeholder="请选择你的学校">
        <!-- <img src="" alt=""> -->
      </div>
      <mt-popup v-model="popupVisible" position="bottom">
        <header style="line-height:8vw;height:6vw;font-size:4vw;text-align:right;padding-right: 3vw;color: #26a2ff;" @click="sure">确定</header>
        <mt-picker :slots="slots" value-key="schoolName" @change="onValuesChange" ref="picker"></mt-picker>
      </mt-popup>
      <div class="user">
        <img src="../assets/img/person.png" alt="">
        <input type="text" v-model="studentName" placeholder="请输入你的姓名">
        <!-- <img src="" alt=""> -->
      </div>
      <div class="user">
        <img src="../assets/img/num.png" alt="">
        <input type="text" v-model="studentNo" placeholder="请输入你的学号">
        <!-- <img src="" alt=""> -->
      </div>
      <div class="user">
        <img src="../assets/img/card.png" alt="">
        <input type="text" v-model="cardNo" placeholder="请输入你的一卡通号">
        <!-- <img src="" alt=""> -->
      </div>
      <div class="user">
        <img src="../assets/img/lock.png" alt="">
        <input type="password" v-model="cardPwd" placeholder="请输入你的一卡通密码">
        <!-- <img src="" alt=""> -->
      </div>
      <div class="button" @click="bind">立即绑定</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Bind',
  data () {
    return {
      cardNo: '',
      cardPwd: '',
      schoolId: '23423',
      studentNo: '',
      studentName: '',
      schoolName: '',
      popupVisible: false,
      slots: [
        {
          flex: 1,
          values: [{
            schoolName: '',
            id: ''
          }],
          className: 'slot1',
          ids: []
        }
      ]
    }
  },
  methods: {
    sure () {
      this.popupVisible = false
    },
    chooseSchool () {
      this.popupVisible = true
      // POST /onecard/findSchool
      // var data = {pageNo: '1', pageSize: '10'}
      this.$fetch('/onecard/findSchool').then(res => {
        // console.log(res)
        this.slots[0].values = []
        res.forEach(v => {
          this.slots[0].values.push(v)
          // this.slots[0].ids.push(v.id)
        })
      })
    },
    onValuesChange (picker, values) {
      // console.log(picker, values)
      this.schoolName = values[0].schoolName
      this.schoolId = values[0].id
      // this.schoolId = this.$refs.picker.getValues()[0]
      // console.log(picker.getSlotValue(1))
    },
    bind () {
      if (this.schoolId === '') {
        Toast({
          message: '请选择你的学校',
          duration: 2000
        })
      } else if (this.studentName === '') {
        Toast({
          message: '请输入你的姓名',
          duration: 2000
        })
      } else if (this.studentNo === '') {
        Toast({
          message: '请输入你的学号',
          duration: 2000
        })
      } else if (this.cardNo === '') {
        Toast({
          message: '请输入你的一卡通号',
          duration: 2000
        })
      } else if (this.cardPwd === '') {
        Toast({
          message: '请输入你的一卡通密码',
          duration: 2000
        })
      } else {
        if (this.cardPwd.length !== 6) {
          Toast({
            message: '请输入6位有效密码',
            duration: 2000
          })
        } else {
          var data = {
            cardNo: this.cardNo,
            cardPwd: this.cardPwd,
            schoolId: this.schoolId,
            studentNo: this.studentNo,
            studentName: this.studentName
          }
          this.$post('/onecard/binding', data).then(res => {
            if (res === true) {
              this.$router.push({name: 'HelloWorld'})
            } else {
              let instance = Toast(res.message)
              setTimeout(() => {
                instance.close()
              }, 2000)
            }
          })
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bind {
  background: #f0efef;
  width: 100%;
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
  .mint-popup-bottom {
    width: 100%;
  }
  .box {
    width: 100%;
    background: #fff;
    padding: 6.4vw 0 8.8vw 0;
  }

  .box .user {
    width: 77.33vw;
    height: 13.33vw;
    margin: 0 auto 4.8vw;
    background: rgba(255,255,255,1);
    border: 1px solid rgba(142,142,142,1);
    border-radius: 25px;
    overflow: hidden;
  }

  .box .user img {
    width: 5vw;
    vertical-align: middle;
    margin-left: 3.3vw;
    margin-right: 2.9vw;
  }

  .box .user input {
    line-height: 13.33vw;
    height: 13.33vw;
    border: 0;
    outline: none;
    color: #333;
    width: 64vw;
    font-size: 3.5vw;
    &::-webkit-input-placeholder {
      color: #999;
    }
    &:disabled {
      background: #fff;
      color: #333;
    }
  }

  .box .button {
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
