<!--
  侧边栏
  姓名 时间
-->
<script>
import Vue from 'vue'
import VueClassDecorator from 'vue-class-component'

import Menu from 'iview-ui/menu'
import Icon from 'iview-ui/icon'

import MenuConfig from '../menuconfig'
import { hasPermission } from 'index/permission'

const classPrefix = 'zzsp-sidebar'

@VueClassDecorator({
  mixins: [],

  props: {

  },

  components: {
    MenuSub: Menu.Sub,
    IvMenuItem: Menu.Item,
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
export default class SideBarTemplate extends Vue {
  priviteName = {}

  get activeName () {
    return this.$route.path.substring(1)
  }

  get openNames () {
    let name = this.activeName.split('/')[0]
    return [name]
  }

  get permissionRoutes () {
    return this.$user.get().permission.routes
  }

  selectHandler (name) {
    this.$router.push(`/${name}`)
  }

  hasPermission (item) {
    let { permission } = item.meta
    if (permission === undefined) return true
    return hasPermission(this.permissionRoutes, permission)
  }

  menuUpdate () {
    this.$nextTick(() => {
      this.$refs.menu.updateOpened()
      this.$refs.menu.updateActiveName()
    })
  }

  created () {
    // this.menuUpdate()
  }

  mounted () {
  
  }

  render (h) {
    const {
      activeName,
      openNames,
      selectHandler,
      hasPermission,
    } = this

    return <div class={classPrefix}>
      <Menu
        ref="menu"
        theme="dark"
        width="auto"
        accordion={true}
        active-name={activeName}
        open-names={openNames}
        on-on-select={selectHandler}
      >
        {
          MenuConfig.map((item) => {
            if (item.child && hasPermission(item)) {
              return <Menu-Sub name={item.name}>
                <span slot="title">
                  <Icon type={item.meta.icon}></Icon>
                  {item.meta.title}
                </span>
                {
                  item.child.map((childItem) => {
                    if (hasPermission(childItem)) {
                      return <Iv-Menu-Item name={`${item.name}/${childItem.name}`}>{childItem.meta.title}</Iv-Menu-Item>
                    }
                  })
                }
              </Menu-Sub>
            } else if (hasPermission(item)) {
              return <Iv-Menu-Item name={item.name}>
                <Icon type={item.meta.icon}></Icon>
                <span>{item.meta.title}</span>
              </Iv-Menu-Item>
            }
          })
        }
      </Menu>
    </div>
  }
}

</script>

<style lang="less" scoped>
@class-prefix: ~'zzsp-sidebar';

.@{class-prefix} {}

.ivu-menu-dark {
  background: none;
}
</style>