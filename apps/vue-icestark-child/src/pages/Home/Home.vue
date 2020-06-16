<template>
  <div>
    <div>小二：首页</div>
    <router-link to="/detail">detail</router-link>
    <br />
    <router-link to="/list">list</router-link>
    <br />
    <span>store=>{{info}}</span>
    <el-alert
      title="这是一个 Element 6的组件"
      type="success"
    >
    </el-alert>
  </div>
</template>

<script>
import { appHistory } from '@ice/stark-app';
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['info'])
  },
  mounted() {
    console.log(this.$store)
  },
  methods: {
    handleClick: () => {
      appHistory.push('/');
    }
  }
}
</script>
