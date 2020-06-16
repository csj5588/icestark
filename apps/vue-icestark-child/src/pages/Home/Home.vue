<template>
  <div>
    <div>小二：首页</div>
    <router-link to="/detail">detail</router-link>
    <br />
    <router-link to="/list">list</router-link>
    <br />
    <span @click="changeState">store=>{{info}} + {{outerState}}</span>
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
    ...mapState(['info', 'outerState'])
  },
  mounted() {
    console.log(this.$store)
  },
  methods: {
    handleClick: () => {
      appHistory.push('/');
    },
    changeState(){ 
      this.$store.commit('setInfo', +new Date())
    } 
  }
}
</script>
