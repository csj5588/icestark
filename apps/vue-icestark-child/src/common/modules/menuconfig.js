import * as permissionRouteMap from 'index/permission/keys-route'
/**
 * 菜单配置文件
*/
export default [
  {
    path: '/home',
    name: 'home',
    meta: {
      icon: 'home',
      title: '首页',
    },
  },
  {
    path: '/operate',
    name: 'operate',
    meta: {
      icon: 'ios-cog',
      title: '运营管理',
      permission: [permissionRouteMap.operate]
    },
    child: [
      {
        path: 'dynamic-config',
        name: 'dynamic-config',
        meta: {
          title: '服务动态配置',
          permission: [permissionRouteMap.operate_dynamicconfig]
        },
      }, {
        path: 'auto-publish',
        name: 'auto-publish',
        meta: {
          title: '版本管理',
          permission: [permissionRouteMap.operate_autopublish]
        },
      },
      {
        path: 'banner-set',
        name: 'banner-set',
        meta: {
          title: 'banner管理',
          permission: [permissionRouteMap.operate_bannerset]
        },
      }, {
        path: 'offline-video',
        name: 'offline-video',
        meta: {
          title: '视频管理',
          permission: [permissionRouteMap.operate_offlinevideo]
        },
      }, {
        path: 'original-author-set',
        name: 'original-author-set',
        meta: {
          title: '视频作者黑名单',
          permission: [permissionRouteMap.operate_originalauthorset]
        },
      }, {
        path: 'index-icon',
        name: 'index-icon',
        meta: {
          title: '首页活动图标配置',
          permission: [permissionRouteMap.operate_indexicon]
        },
      }, {
        path: 'action-config',
        name: 'action-config',
        meta: {
          title: '活动中心配置',
          permission: [permissionRouteMap.operate_actionconfig]
        },
      }, {
        path: 'push-message',
        name: 'push-message',
        meta: {
          title: '消息中心',
          permission: [permissionRouteMap.operate_pushmessage]
        },
      }, {
        path: 'short-message',
        name: 'short-message',
        meta: {
          title: '短信发送',
          permission: [permissionRouteMap.operate_shortmessage]
        },
      }, {
        path: 'carousel-room',
        name: 'carousel-room',
        meta: {
          title: '轮播间配置',
          // permission: [permissionRouteMap.operate_pushmessage]
        },
      }]
  },
  {
    path: '/check',
    name: 'check',
    meta: {
      icon: 'person',
      title: '审核管理',
      permission: [permissionRouteMap.check]
    },
    child: [
      {
        path: 'aptitudecheck',
        name: 'aptitudecheck',
        meta: {
          title: '资质申请审核',
          permission: [permissionRouteMap.check_aptitudecheck]
        },
      }, {
        path: 'videocheck',
        name: 'videocheck',
        meta: {
          title: '视频审核',
          permission: [permissionRouteMap.check_videocheck]
        },
      }
    ]
  },
  {
    path: '/userbacks',
    name: 'userbacks',
    meta: {
      icon: 'soup-can',
      title: '用户数据',
      permission: [permissionRouteMap.userbacks]
    },
    child: [{
      path: 'feedback2',
      name: 'feedback2',
      meta: {
        title: '反馈数据',
        permission: [permissionRouteMap.userbacks_feedback2]
      },
    }, {
      path: 'report',
      name: 'report',
      meta: {
        title: '视频举报数据',
        permission: [permissionRouteMap.userbacks_report]
      },
    }, {
      path: 'user-watch',
      name: 'user-watch',
      meta: {
        title: '用户问题追踪',
        permission: [permissionRouteMap.userbacks_userwatch]
      },
    }, {
      path: 'user-watch2',
      name: 'user-watch2',
      meta: {
        title: '用户异常追踪',
        permission: [permissionRouteMap.userbacks_userwatch2]
      },
    }, {
      path: 'user-state',
      name: 'user-state',
      meta: {
        title: '用户状态查询',
        permission: [permissionRouteMap.userbacks_userstate]
      },
    }, {
      path: 'user-appeal',
      name: 'user-appeal',
      meta: {
        title: '用户申诉',
        permission: [permissionRouteMap.userbacks_userappeal]
      },
    }, {
      path: 'face-check',
      name: 'face-check',
      meta: {
        title: '人脸审核历史',
        permission: [permissionRouteMap.userbacks_facecheck]
      },
    }, {
      path: 'ldy-report',
      name: 'ldy-report',
      meta: {
        title: '落地页举报数据',
        permission: [permissionRouteMap.userbacks_ldyreport]
      },
    }]
  },
  {
    path: '/applet',
    name: 'applet',
    meta: {
      icon: 'ios-gear-outline',
      title: '小程序管理',
      permission: [permissionRouteMap.applet]
    },
    child: [{
      path: 'push',
      name: 'push',
      meta: {
        title: 'push配置',
        permission: [permissionRouteMap.applet_push]
      },
    }, {
      path: 'setmodel',
      name: 'setmodel',
      meta: {
        title: '模板配置',
        permission: [permissionRouteMap.applet_setmodel]
      },
    }, {
      path: 'setconfig',
      name: 'setconfig',
      meta: {
        title: '文案配置',
        permission: [permissionRouteMap.applet_setconfig]
      },
    }, {
      path: 'videorl',
      name: 'videorl',
      meta: {
        title: '视频排行榜',
        permission: [permissionRouteMap.applet_videorl]
      },
    }]
  },
  {
    path: '/shop',
    name: 'shop',
    meta: {
      icon: 'ios-people',
      title: '种子电商管理',
      permission: [permissionRouteMap.shop]
    },
    child: [{
      path: 'user',
      name: 'user',
      meta: {
        title: '用户管理',
        permission: [permissionRouteMap.shop_user]
      },
    }, {
      path: 'order',
      name: 'order',
      meta: {
        title: '订单管理',
        permission: [permissionRouteMap.shop_order]
      },
    }, {
      path: 'accounts',
      name: 'accounts',
      meta: {
        title: '结算管理',
        permission: [permissionRouteMap.shop_accounts]
      },
    }, {
      path: 'goods',
      name: 'goods',
      meta: {
        title: '商品管理',
        permission: [permissionRouteMap.shop_goods]
      },
    }]
  },
  {
    path: '/server-ab-test',
    name: 'server-ab-test',
    meta: {
      icon: 'stats-bars',
      title: '服务端A/B实验平台',
    },
  },
  {
    path: '/adabtest',
    name: 'adabtest',
    meta: {
      icon: 'funnel',
      title: '广告A/B实验平台',
      permission: [permissionRouteMap.adabtest]
    },
    child: [{
      path: 'query',
      name: 'query',
      meta: {
        title: '查询实验',
        permission: [permissionRouteMap.adabtest_query]
      },
    }, {
      path: 'edit',
      name: 'edit',
      meta: {
        title: '编辑实验',
        permission: [permissionRouteMap.adabtest_edit]
      },
    }]
  },
  {
    path: '/unionad',
    name: 'unionad',
    meta: {
      icon: 'android-apps',
      title: '联盟广告位管理',
      permission: [permissionRouteMap.unionad]
    },
    child: [{
      path: 'user',
      name: 'user',
      meta: {
        title: '用户对象',
        permission: [permissionRouteMap.unionad_user]
      },
    }, {
      path: 'code',
      name: 'code',
      meta: {
        title: '代码位',
        permission: [permissionRouteMap.unionad_code]
      },
    }, {
      path: 'flow',
      name: 'flow',
      meta: {
        title: '流量分配',
        permission: [permissionRouteMap.unionad_flow]
      },
    }, {
      path: 'statistics',
      name: 'statistics',
      meta: {
        title: '数据统计',
        permission: [permissionRouteMap.unionad_statistics]
      },
    }]
  },
  {
    path: '/rn',
    name: 'rn',
    meta: {
      icon: 'coffee',
      title: 'React Native',
      permission: [permissionRouteMap.rn_hot]
    }
  },
  {
    path: '/codestatistics',
    name: 'codestatistics',
    meta: {
      icon: 'stats-bars',
      title: '代码量统计',
    },
  }
]
