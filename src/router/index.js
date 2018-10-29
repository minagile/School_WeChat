import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Bind from '@/components/Bind'
import Unbind from '@/components/Unbind'
import PayFee from '@/components/PayFee'
import CardAdd from '@/components/CardAdd'
import Error from '@/components/Error'
import ReportLoss from '@/components/ReportLoss'
import Keybord from '@/components/Keybord'
import Charge from '@/components/Charge'
import PeopleInfo from '@/components/PeopleInfo'
import OrderInquiry from '@/components/OrderInquiry'
import OrderDetail from '@/components/OrderDetail'
import Tuition from '@/components/Tuition'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: '首页'
      }
    },
    // 绑定学号
    {
      path: '/Bind',
      name: 'Bind',
      component: Bind,
      meta: {
        title: '绑定学号'
      }
    },
    // 校园卡解绑
    {
      path: '/Unbind',
      name: 'Unbind',
      component: Unbind,
      meta: {
        title: '校园卡解绑'
      }
    },
    // 水电费缴费
    {
      path: '/PayFee',
      name: 'PayFee',
      component: PayFee,
      meta: {
        title: '水电费缴费'
      }
    },
    // 添加银行卡
    {
      path: '/CardAdd',
      name: 'CardAdd',
      component: CardAdd,
      meta: {
        title: '添加银行卡'
      }
    },
    // 报错页面
    {
      path: '/Error',
      name: 'Error',
      component: Error,
      meta: {
        title: '开发中'
      }
    },
    // 校园卡挂失
    {
      path: '/ReportLoss',
      name: 'ReportLoss',
      component: ReportLoss,
      meta: {
        title: '校园卡挂失'
      }
    },
    {
      path: '/Keybord',
      name: 'Keybord',
      component: Keybord,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/Charge',
      name: 'Charge',
      component: Charge,
      meta: {
        title: '充值'
      }
    },
    {
      path: '/PeopleInfo',
      name: 'PeopleInfo',
      component: PeopleInfo,
      meta: {
        title: '个人信息'
      }
    },
    {
      path: '/OrderInquiry',
      name: 'OrderInquiry',
      component: OrderInquiry,
      meta: {
        title: '订单查询'
      }
    },
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/Tuition',
      name: 'Tuition',
      component: Tuition,
      meta: {
        title: '学费'
      }
    }
  ]
})
