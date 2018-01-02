import Vue from 'vue'
import select from '../components/select.vue'
import viewer from '../components/viewer/viewer.vue'
// 组件注册
Vue.component('v-select',select)
Vue.component('v-viewer',viewer)
//指令
Vue.directive('filePreview', {
    bind() { },
    inserted(el, binding, vnode) {
        var Vue = vnode.context.$root.constructor;
        var Preview = Vue.extend(viewer);
        var hook = document.createElement('div');
        document.body.appendChild(hook);
        var instance = new Preview({
            el: hook,
            propsData: {
                viewerList: [
                    {
                        filePath: binding.value.dataUrl,
                        fileName: binding.value.name,
                    }
                ]
            }
        });
        el.addEventListener('click', () => {
            instance.showFn();
        })
        el.instance = instance;
    },
    update(el, binding, vnode) {
        el.instance.viewerList = [
            {
                filePath: binding.value.dataUrl,
                fileName: binding.value.name,
                marginTop: 0
            }
        ];
    },
    unbind(el, binding, vnode) {
        el.instance.$el.remove();
        el.instance.$destroy();
    }
})
