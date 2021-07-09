<template>
  <a-layout-sider
    class="bg-white"
    :width="200"
    :collapsedWidth="48"
    v-model:collapsed="collapsed"
  >
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      mode="inline"
      @click="handleClickMenu"
    >
      <template v-for="routeItem in routeList" :key="routeItem.path">
        <bm-layout-sider-item
          :route-item="routeItem"
          v-if="!routeItem.hidden"
        />
      </template>
    </a-menu>
    <div
      class="
        border-t
        px-4
        my-1
        absolute
        w-full
        bottom-0
        left-0
        h-10
        leading-10
        cursor-pointer
      "
      @click="() => (collapsed = !collapsed)"
    >
      <menu-unfold-outlined v-if="collapsed" />
      <menu-fold-outlined v-else />
    </div>
  </a-layout-sider>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { routeList } from '@/router';
import { slice } from 'lodash';
import BmLayoutSiderItem from './item.vue';

export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    BmLayoutSiderItem,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    // 菜单是否折叠
    const collapsed = ref(false);
    // 当前选中菜单
    const selectedKeys = ref([]);
    // 当前展开菜单
    const openKeys = ref([]);
    // 菜单点击
    const handleClickMenu = ({ key }) => {
      // 路由跳转
      router.push({ name: key });
    };
    // 设置选中菜单
    const setSelectedKeys = (key) => {
      selectedKeys.value = [key];
    };
    // 设置展开菜单
    const setOpenKeys = (keys) => {
      openKeys.value = keys;
    };
    // 路由跳转监听
    watch(
      () => route.name,
      (value) => {
        setSelectedKeys(value);
        setOpenKeys(
          slice(route.matched, 0, route.matched.length - 1).map((l) => l.path),
        );
      },
    );
    // layout-siderc初始化
    const defautInit = () => {
      setSelectedKeys(route.name);
      setOpenKeys(
        slice(route.matched, 0, route.matched.length - 1).map((l) => l.path),
      );
    };
    defautInit();
    return {
      collapsed,
      routeList,
      selectedKeys,
      openKeys,
      handleClickMenu,
    };
  },
});
</script>

<style>
</style>
