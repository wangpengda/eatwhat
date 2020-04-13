import Vue from 'vue'
import App from './index'
// import BaiduMap from 'vue-baidu-map'

// Vue.use(BaiduMap, {ak: 'x2U7TVg8w1xN8Mx7KdhGeZG603TCW9FL'})

// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}

const app = new Vue(App)
app.$mount()
