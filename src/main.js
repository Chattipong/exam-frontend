import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss';

import moment from 'moment';
import momentTH from "moment/src/locale/th";

import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

Vue.filter('formatDateFull', function (value) {
  if (value) {
    return moment(
      moment(value)
    ).format('DD/MM/YYYY H:mm')
  }
})

Vue.filter('formatDateTH', function (value) {
  if (value) {
    return moment(
      moment(value)
      .locale("th", momentTH).add(543, 'year')
    ).format("LL");
  }
})

Vue.filter('formatDaysInMonth', function (value) {
  if (value) {
    return moment(value).daysInMonth()
  }
})

Vue.filter('formatQuarter', function (value) {
  if (value) {
    return moment(value).quarter()
  }
})

Vue.filter('formatTimeStamp', function (value) {
  if (value) {
    return moment(value).unix()
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
