<style lang="less" scoped>
@import "~com-less/variable";

.layout-wrapper {
  height: 100%;
  border: 1px solid #d7dde4;
  border-top-color: @var-base-color;
  background-color: @var-gray-color;

  .lefthide {
    position: fixed;
    left: -200px;
  }
  .rightshowall{
    margin-left: 0px;
  }
}

.layout-left {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: @var-base-color;
  overflow-y: auto;
  box-shadow: 2px 0 2px rgba(0, 0, 0, .2);

  h1 {
    margin: 16px auto 16px;
    width: 86%;
    line-height: 30px;
    font-size: 18px;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.1);
  }

}

.layout-right {
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  width: 100%;
  height: 100%;

  .operate-static {
    position: absolute;
    top: 16px;
    width: 90px;
    height: 30px;
    font-size: 14px;
    border-radius: 9px;
    left: 10px;
    cursor: pointer;
  }
}

.layout-content {
  position: relative;
  flex-shrink: 0;
  flex-grow: 1;
  flex-basis: auto;
  margin: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 4px;
}
</style>

<template>
  <i-row type="flex" class-name="layout-wrapper">
    <i-col class-name="layout-left" :class="{ lefthide: !isShow }">
      <h1>种子视频</h1>
      <m-sidbar></m-sidbar>
    </i-col>
    <i-col class-name="layout-right" :class="{ rightshowall: !isShow }">
      <div :class="{ showclass: isShow }" class="operate-static" v-on:click="handleTextClick">
        <Icon v-if="isShow" type="arrow-expand" size="25"></Icon>
        <Icon v-else type="arrow-shrink" size="25"></Icon>
      </div>
      <m-header></m-header>
      <m-breadcrumb></m-breadcrumb>
      <div class="layout-content">
        <slot name="main-container"></slot>
      </div>
      <m-footer></m-footer>
    </i-col>
  </i-row>
</template>

<script>
import { Row as IRow, Col as ICol } from 'iview-ui/grid'
import { Icon } from 'iview'
import MSidbar from './sidebar'
import MBreadcrumb from './breadcrumb'
import MHeader from './header'
import MFooter from './footer'

export default {
  data() {
    return {
      isShow: true,
    }
  },

  created() {
    window.onresize = () => {}
  },
  components: {
    IRow,
    ICol,
    Icon,
    MSidbar,
    MBreadcrumb,
    MHeader,
    MFooter,
  },

  computed: {},

  watch: {},

  methods: {
    handleTextClick: function () {
      this.isShow = !this.isShow;
      var e = document.createEvent('Event');
      e.initEvent('resize', true, true);
      window.dispatchEvent(e);
    }
  },

  render(h) {}
}
</script>
