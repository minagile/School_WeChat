<template>
  <div class="people_info">
    <div class="info">
      <img src="../assets/img/header.png" alt="">
      <h2>{{ name }}</h2>
      <mt-cell title="学校：" :value="school"></mt-cell>
      <mt-cell title="学号：" :value="num"></mt-cell>
      <mt-cell title="一卡通：" :value="card"></mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PeopleInfo',
  data () {
    return {
      school: 'huaqiao',
      num: '2018010102',
      card: '688181222222222222',
      name: ''
    }
  },
  mounted () {
    // GET /student/findByOpenId
    this.$fetch('/student/findByOpenId').then(res => {
      this.school = res.schoolName
      this.num = res.studentNo
      this.card = res.cardNo
      this.name = res.studentName
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.people_info {
  background: #f2f2f2;
  height: calc(100% - 1.5vw);
  padding-top: 1.5vw;
  .info {
    box-sizing: border-box;
    width:92vw;
    // height:62.53vw;
    margin: 0 auto 20vw;
    background:#fff;
    border-top: 1.2vw solid rgba(63,71,90,1);
    border-bottom: 1.2vw solid rgba(63,71,90,1);
    border-radius:1.33vw;
    img {
      width: 14.8vw;
      display: block;
      margin: 5.86vw auto 4.26vw;
    }
    h2 {
      font-size:4.8vw;
      text-align: center;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      margin-bottom: 10vw;
      color:rgba(63,71,90,1);
    }
  }
}
</style>
