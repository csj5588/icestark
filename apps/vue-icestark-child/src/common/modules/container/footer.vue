<style lang="less" scoped>
footer {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
</style>

<template>
  <footer>{{this.createdYear}}-{{this.currentYear}} &copy; www.imilive.cn 种子视频</footer>
</template>
<script>

export default {

  mixins: [],

  props: {

  },

  components: {

  },

  data() {
    return {
      currentYear: new Date().format('yyyy'),
      createdYear: 2015
    }
  },

  watch: {

  },

  computed: {

  },

  methods: {

  },

  filters: {

  },

  created() {

  },

  mounted() {

  },

  render(h) {

  }
}

</script>