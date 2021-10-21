import { createApp, h } from 'vue';
import App from './App.vue';
import Menu from './Menu.vue';
import Roll from './Roll.vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './main.css';

import AV from 'leancloud-storage';
AV.init({
    appId: "vtER7D6JpKij1KFnpwGN3vBf-MdYXbMMI",
    appKey: "HS1vymOOr2ULMi7t2D9XHCj0"
});

function getUrlParam(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null; 
} 

const routes = {
    '': App,
    'menu': Menu,
    'roll': Roll,
}
  
const Router = {
    data: () => ({
        currentRoute: getUrlParam('mode')
    }),
    computed: {
        CurrentComponent() {
            return routes[this.currentRoute] || App
        }
    },
    render() {
        return h(this.CurrentComponent);
    }
}
  
createApp(Router).use(ElementPlus).mount('#app');