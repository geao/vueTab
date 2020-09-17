import Main from '@/layout/index.vue'

export default [
  /************ 以上为水平导航  ***********/
  {
    path:"/login",
    name:'login',
    component:()=>import("@/views/login/index.vue"),
    meta:{
      title: "登录页",
      icon:'md-add',
      hideInMenu: true,
      isParent: false
    }
  },
  {
    path: "/",
    name: 'home',
    component: Main,
    meta: {
      title: "#",
      icon:'',
      hideInMenu: false,
    }
  },
  // {
  //   path: "/home",
  //   name: 'home',
  //   component: import("@/views/home/index.vue"),
  //   meta: {
  //     title: "首页",
  //     icon:'md-add',
  //     hideInMenu: false,
  //     isParent: true
  //   }
  // },
  /************ 以上为垂直导航  ***********/

  //综合管理
 
  {
    path:'/base',
    name:'base',
    component:Main,
    meta:{
      title:'基础数据',
      icon:'el-icon-s-data',
      hideInMenu:false,
    },
    children:[
      {
        path:'vehicle',
        name:'vehicle',
        component:()=>import("@/views/base/Vehicle.vue"),
        meta:{
          title:'班车管理',
          icon:'',
          hideInMenu:false
        }
      },
      {
        path:'subArea',
        name:'subArea',
        component:()=>import("@/views/base/SubArea.vue"),
        meta:{
          title:'管理分区',
          icon:'',
          hideInMenu:false
        }
      },
      {
        path:'fixedArea',
        name:'fixedArea',
        component:()=>import("@/views/base/FixedArea.vue"),
        meta:{
          title:'管理定区/调度排班',
          icon:'',
          hideInMenu:false
        }
      },
      {
        path:'archive',
        name:'archive',
        component:()=>import("@/views/base/Archive.vue"),
        meta:{
          title:'基础档案设置',
          icon:'',
          hideInMenu:false
        }
      },
      {
        path:'courier',
        name:'courier',
        component:()=>import("@/views/base/Courier.vue"),
        meta:{
          title:'快递员设置-替班',
          icon:'',
          hideInMenu:false
        }
      },
      {
        path:'area',
        name:'area',
        component:()=>import("@/views/base/Area.vue"),
        meta:{
          title:'区域设置',
          icon:'',
          hideInMenu:false
        }
      },
      {
        path:'standard',
        name:'standard',
        component:()=>import("@/views/base/Standard.vue"),
        meta:{
          title:'取派标准',
          icon:'',
          hideInMenu:false
        }
      },
      {
        path:'sendTime',
        name:'sendTime',
        component:()=>import("@/views/base/TakeTime.vue"),
        meta:{
          title:'收派时间管理',
          icon:'',
          hideInMenu:false
        }
      }
    ]
  },
  {
    path:'/accept',
    name:'accept',
    component:Main,
    meta:{
      title:'受理',
      icon:'el-icon-s-finance',
      hideInMenu:false,
    },
    children:[
      {
        path:'order',
        name:'order',
        component:()=>import("@/views/accept/Order.vue"),
        meta:{
          title:'订单',
          icon:'',
          hideInMenu:false
        }
      },
	  {
	    path:'soldNote',
	    name:'soldNote',
	    component:()=>import("@/views/accept/SoldNote.vue"),
	    meta:{
	      title:'销售记录管理',
	      icon:'',
	      hideInMenu:false
	    }
	  }
	]
  },
  {
    path:'/sorting',
    name:'sorting',
    component:Main,
    meta:{
      title:'分拣管理',
      icon:'el-icon-s-flag',
      hideInMenu:false,
    },
    children:[
      {
        path:'sortPink',
        name:'sortPink',
        component:()=>import("@/views/sorting/sortPink.vue"),
        meta:{
          title:'快件挑选',
          icon:'',
          hideInMenu:false
        }
      }
	]
  },
  {
    path:'/dispatch',
    name:'dispatch',
    component:Main,
    meta:{
      title:'调度',
      icon:'el-icon-s-management',
      hideInMenu:false,
    },
    children:[
      {
        path:'propagandaTake',
        name:'propagandaTake',
        component:()=>import("@/views/dispatch/PropagandaTask.vue"),
        meta:{
          title:'宣传任务',
          icon:'',
          hideInMenu:false
        }
      },
	  {
	    path:'timingTask',
	    name:'timingTask',
	    component:()=>import("@/views/dispatch/TimingTask.vue"),
	    meta:{
	      title:'定时任务',
	      icon:'',
	      hideInMenu:false
	    }
	  }
	]
  },
  {
    path:'/system',
    name:'system',
    component:Main,
    meta:{
      title:'系统管理',
      icon:'el-icon-s-tools',
      hideInMenu:false,
    },
    children:[
      {
        path:'permission',
        name:'permission',
        component:()=>import("@/views/system/permission.vue"),
        meta:{
          title:'权限管理',
          icon:'',
          hideInMenu:false
        }
      },
      {
        path:'role',
        name:'role',
        component:()=>import("@/views/system/role.vue"),
        meta:{
          title:'角色管理',
          icon:'',
          hideInMenu:false
        }
      },
      {
        path:'user',
        name:'user',
        component:()=>import("@/views/system/user.vue"),
        meta:{
          title:'用户管理',
          icon:'',
          hideInMenu:false
        }
      }
	]
  }
  
]
