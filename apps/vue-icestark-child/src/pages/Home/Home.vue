<template>
  <div>
    <div>小二：首页</div>
    <router-link to="/detail">detail</router-link>
    <br />
    <router-link to="/list">list</router-link>
    <br />
    <span @click="changeState">store=>{{info}} + {{stark.user && stark.user.count}}</span>
    <el-alert
      title="这是一个 Element 6的组件"
      type="success"
    >
    </el-alert>
    <el-button @click="changeStark">点我改变stark</el-button>
  </div>
</template>

<script>
import { appHistory } from '@ice/stark-app';
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['info', 'stark'])
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
    },
    changeStark() {
      this.$store.commit('syncStarkUp', {
        starkAction: 'changeStarkCount',
        payload: this.stark.user.count + 1
      })
    }
  }
}
</script>
