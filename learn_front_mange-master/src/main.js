import Vue from 'vue'
import './utils/dict'
import App from './App.vue'
import router from './router'
import './permission'
import store from './store'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
// 注册富文本编辑器
Vue.use(VueQuillEditor) 

Vue.config.productionTip = false
Vue.use(elementUI)

//EventBus事件中转
Vue.prototype.$bus = new Vue()  

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
