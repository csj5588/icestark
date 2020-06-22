<style lang="less">
@import "~com-less/variable";
@class-prefix: ~"layout-header";

.@{class-prefix} {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  &-lf {
    z-index: 10;
    position: relative;
    float: left;
  }

  &-rg {
    float: right;
    padding-top: 10px;
    padding-right: 16px;
  }

  .btn-iview-logout {
    width: 100%;
    height: 100%;
    border: 0;
    background: none;
    outline: 0;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="layout-header">
    <div class="layout-header-lf"></div>
    <div class="layout-header-rg">
      <Dropdown :placement="'bottom-end'">
        <Avatar icon="person" size="large" v-if="!userInfo.user_info" />
        <Avatar style="background-color: #00d8c9;display:inline-block;" size="large" v-if="userInfo.user_info">{{userInfo.user_info.chinese_name || '管理员'}}</Avatar>
        <DropdownMenu slot="list" v-if="userInfo.user_info">
          <DropdownItem disabled>用户信息</DropdownItem>
          <DropdownItem name="username">欢迎你，{{userInfo.user_info['email'] || '管理员'}}</DropdownItem>
          <DropdownItem divided name="logout">
            <Button class="btn-iview-logout" v-on:click="handleLogout()">退出</Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import IIcon from 'iview-ui/icon'
// import IDropdown from 'iview-ui/dropdown'
// import IAvatar from 'iview-ui/avatar'
import S from 'service'
import * as apis from '../../entry/apis'

import { Dropdown, Avatar, DropdownMenu, DropdownItem } from 'iview'

import user, { userPromise, userReady } from 'user'

export default {
  mixins: [],

  props: {},

  components: {
    // IIcon,
    // IDropdown,
    // IDropdownMenu: IDropdown.Menu,
    // IDropdownItem: IDropdown.Item,
    // IAvatar,
    Dropdown,
    Avatar,
    DropdownMenu,
    DropdownItem
  },

  data() {
    return {
      userInfo: {
        user_info: {

        }
      }
    }
  },

  watch: {},

  computed: {
    // 激活菜单的 name 值
    activeName () {
      return this.$route.path.substring(1)
    }
  },

  methods: {
    handleLogout() {
      this.$user.logout()
    }
  },

  filters: {},

  created() {
    this.$user.ready(() => {
      this.userInfo = this.$user.get()
    })
    // userPromise.then(() => {
    //   console.log('User', this.$user.get())
    // })
  },

  mounted() {
  },

  render(h) {}
};
</script>