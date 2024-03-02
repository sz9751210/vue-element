<template>
  <el-aside :width="asideWidth">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <h3>{{ isCollapse ? "後台" : "後台管理" }}</h3>
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="item.path"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem)"
          >
            <component class="icons" :is="item.icon"></component>
            <span>{{ subItem.label }}</span></el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "../store/index";
import { computed } from "vue";
const store = useStore();
const isCollapse = computed(() => store.isCollapse);
const asideWidth = computed(() => (store.isCollapse ? "64px" : "180px"));
const router = useRouter();
const list = [
  {
    path: "/user",
    name: "user",
    label: "用戶管理",
    icon: "user",
    url: "UserManage/UserManage",
  },
  {
    label: "其他",
    icon: "location",
    path: "/other",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "Other/PageOne",
      },
      {
        path: "/page2",
        name: "page2",
        label: "页面2",
        icon: "setting",
        url: "Other/PageTwo",
      },
    ],
  },
];

const asyncList = store.menu

// 是否有二級菜單
const noChildren = () => {
  return asyncList.filter((item) => !item.children);
};

const hasChildren = () => {
  return asyncList.filter((item) => item.children);
};

const clickMenu = (item) => {
  router.push({
    name: item.name,
  });
  // pinia管理麵包屑
  store.selectMenu(item);
};
</script>

<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
}
.el-menu {
  border-right: none;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
</style>
