import Vue from 'vue'
import VueClassDecorator from 'vue-class-component'
import { Pagination } from 'element-ui'

@VueClassDecorator({
  mixins: [],

  props: {
    tableTotal: {
      type: Number,
      default: () => 0
    },
    searchData: {
      type: Object,
      default: () => ({})
    }
  },

  components: {
    [Pagination.name]: Pagination
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
export default class PagePagination extends Vue {
  created () {

  }

  mounted () {

  }

  render (h) {
    const { tableTotal, searchData: { page, size } } = this

    return <el-pagination
      total={ tableTotal }
      current-page={ page }
      page-size={ size }
      layout="total, sizes, prev, pager, next, jumper"
      on-current-change={ e => { this.$emit('handleSearch', {page: e}) } }
      on-size-change={ e => { this.$emit('handleSearch', {page: 1, size: e}) } }
    >
    </el-pagination>
  }
}
