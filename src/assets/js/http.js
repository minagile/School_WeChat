import axios from 'axios'
import router from '../../router'
import qs from 'qs'
// import { Message } from 'element-ui'
import { Toast } from 'mint-ui'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://47.92.53.81:80'
// openid=o5Rin1MChyLmwayeI-3XvyUm4ioM
// var openid = 'o5Rin1MChyLmwayeI-3XvyUm4ioM'
// var openid = sessionStorage.getItem('openId')

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // const openId = 'o5Rin1MChyLmwayeI-3XvyUm4ioM'
    // config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // if (openId) {
    //   config.query = { 'openId': openId }
    // }
    return config
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === 5000) {
      // Message({
      //   message: response.data.msg,
      //   type: 'info'
      // })
      Toast({
        message: '系统出错请稍后重试',
        duration: 2000
      })
      router.push({
        path: '/',
        querry: { redirect: router.currentRoute.fullPath }
        // 从哪个页面跳转
      })
    }
    // if (response.data.code === 102) {
    //   Message({
    //     message: response.data.msg,
    //     type: 'info'
    //   })
    //   router.push({
    //     path: '/MLogin',
    //     querry: { redirect: router.currentRoute.fullPath }
    //   })
    // }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch (url, params = {}) {
  // console.log(JSON.stringify(params).slice(':'))
  if (JSON.stringify(params).slice(':') !== -1) {
    // console.log(sessionStorage.getItem('openId'))
    params = JSON.parse(JSON.stringify(params).split('}')[0] + '"openId":"' + sessionStorage.getItem('openId') + '"}')
  } else {
    // console.log(12)
    params = JSON.parse(JSON.stringify(params).split('}')[0] + ',"openId":"' + sessionStorage.getItem('openId') + '"}')
  }
  console.log(sessionStorage.getItem('openId'))
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
      // params: JSON.parse(JSON.stringify(params).split('}')[0] + ',"openId":"o5Rin1MChyLmwayeI-3XvyUm4ioM"}')
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(JSON.parse(JSON.stringify(params).split('}')[0] + ',"openId":"' + sessionStorage.getItem('openId') + '"}'))).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
*/

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
*/

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, qs.stringify(data)).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export const Req = axios.defaults.baseURL

// PostFlie(url, data) {
//   return new Promise((resolve, reject) => {
//     //根据data对象生成FormData对象
//     var temp = new FormData();
//     for (var t in data) {
//       temp.append(t, data[t]);
//     }
//     axios.post(url, temp).then((res) => {
//       if (res) {
//           resolve(res.Data);
//       }
//     }).catch((error) => {
//       reject(error);
//     })
//   })
// }
