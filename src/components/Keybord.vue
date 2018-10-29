<template>
  <div class="key">
    <div class="password">
      <span></span><span></span><span></span><span></span><span></span><span></span>
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
      <li style="background-color: #d5d8db;" @click="keybord($event)">f</li>
      <li @click="keybord($event)">0</li>
      <li style="background-color: #d5d8db;" @click="keybord($event)">删除</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Keybord',
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    keybord (e) {
      this.set_num(e.target.textContent)
    },
    set_num (num) {
      var spans = document.querySelector('.password').querySelectorAll('span')
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
          alert(password)
          setTimeout(function () {
            for (var k = 0; k < spans.length; k++) {
              spans[k].innerHTML = ''
              spans[k].setAttribute('data-num', '')
            }
          }, 300)
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

<style>
.key {
  width: 100%;
}
.content {
  margin: 60px 0 20px;
  text-align: center;
}
.password {
  height: 40px;
  line-height: 40px;
  /* width: 240px; */
  margin: 0 auto;
  background-color: #fff;
}
.password span {
  float: left;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  text-align: center;
}
.password span {
  border-right: none;
}
.password span:last-child {
  border-right: 1px solid #ccc;
}
.keyboard {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
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
