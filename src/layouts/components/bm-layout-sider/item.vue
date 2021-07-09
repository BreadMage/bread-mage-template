<template>
  <!-- 父路由可能没有name，实用path作为key -->
  <a-sub-menu :key="routeItem.path" v-if="isNestMenu">
    <template #icon v-if="routeItemIcon">
      <icon-font :type="routeItemIcon" />
    </template>
    <template #title>
      <span>{{ routeItemTitle }}</span>
    </template>
    <template v-for="nestMenuItem in nestMenuList" :key="nestMenuItem.path">
      <bm-layout-sider-item :route-item="nestMenuItem" />
    </template>
  </a-sub-menu>
  <a-menu-item :key="routeItemName" v-else>
    <template #icon v-if="routeItemIcon">
      <icon-font :type="routeItemIcon" />
    </template>
    <a
      :href="routeItem.link"
      target="_blank"
      v-if="routeItem.link"
      @click.stop
    >
      {{ routeItemTitle }}
    </a>
    <span v-else>{{ routeItemTitle }}</span>
  </a-menu-item>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { get, head, isArray } from 'lodash';

export default defineComponent({
  name: 'bm-layout-sider-item',
  props: {
    routeItem: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    // 嵌套路由列表
    const nestMenuList = computed(() => {
      const children = get(props.routeItem, 'children', []);
      // 如果没有子路由，或者子路由不是数组，或者子路由数组为空，则不是嵌套路由
      if (!isArray(children) || !children.length) return [];
      // 返回非隐藏的子路由
      return children.filter((l) => !l.hidden);
    });
    // 判定是否为真实的嵌套路由，嵌套路由长度大于1才为真实嵌套路由
    const isNestMenu = computed(() => nestMenuList.value.length > 1);
    // 路由标题
    const routeItemTitle = computed(() => get(props.routeItem, 'meta.title', '未知路由'));
    // 路由图标
    const routeItemIcon = computed(() => get(props.routeItem, 'meta.icon', null));
    // 路由名称，防止当父路由没有名称是无法获取的问题
    const routeItemName = computed(
      () => get(props.routeItem, 'name', null)
        || get(head(nestMenuList.value), 'name', null),
    );
    return {
      nestMenuList,
      isNestMenu,
      routeItemTitle,
      routeItemName,
      routeItemIcon,
    };
  },
});
</script>

<style>
</style>
