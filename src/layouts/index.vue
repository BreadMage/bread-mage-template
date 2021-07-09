<template>
  <a-layout class="h-screen">
    <bm-layout-header />
    <a-layout>
      <bm-layout-sider />
      <a-layout class="p-6">
        <a-layout-content class="p-6 m-0 bg-white">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent, ref } from 'vue';
import BmLayoutHeader from './components/bm-layout-header.vue';
import BmLayoutSider from './components/bm-layout-sider/index.vue';

export default defineComponent({
  components: {
    BmLayoutHeader,
    BmLayoutSider,
  },
  setup() {
    return {
      collapsed: ref(false),
    };
  },
});
</script>
<style>
.trigger {
  line-height: 64px;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
