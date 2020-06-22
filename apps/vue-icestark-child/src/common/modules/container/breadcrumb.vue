<!--
  面包屑
  姓名：xiaomo
  时间：2017-12-30
-->

<script>
import Vue from 'vue'
import VueClassDecorator from 'vue-class-component'
import Breadcrumb from 'iview-ui/breadcrumb'
import menuConfig from 'modules/menuconfig'

const classPrefix = 'cr-breadcrumb'

@VueClassDecorator({
  mixins: [],

  props: {

  },

  components: {
    BreadcrumbItem: Breadcrumb.Item
  },

  computed: {

  },

  watch: {

  },

  filters: {

  },

  methods: {

  }
})
export default class BreadcrumbTemplate extends Vue {
  classPrefix = classPrefix

  get breadcrumb () {
    let pathArr = this.$route.path.substring(1).split('/')
    let tempArr = []

    if (pathArr[0]) {
      menuConfig.find((item) => {
        if (pathArr[0] === item.name) {
          tempArr.push(item)
        }
      })
    }

    if (pathArr[1]) {
      tempArr[0].child.find((item) => {
        if (pathArr[1] === item.name) {
          return tempArr.push(item)
        }
      })
    }
    return tempArr
  }

  created () {
    
  }

  mounted () {
  
  }

  render (h) {
    const {breadcrumb} = this
    return <Breadcrumb>
      <Breadcrumb-Item href="/">种子视频</Breadcrumb-Item>
      {
        breadcrumb.length && breadcrumb.map((item, index) => {
          return <Breadcrumb-Item href={index === 0 ? `${item.path}` : ''}>{item.meta.title}</Breadcrumb-Item>
        })
      }
      
    </Breadcrumb>
  }
}

</script>

<style lang="less" scoped>
@class-prefix: ~'cr-breadcrumb';

.@{class-prefix} {}

.ivu-breadcrumb {
  padding: 16px 16px 0;
}

</style>