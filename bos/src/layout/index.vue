<template>
	<!--属于首页的内容在这里展示-->
	<div class="layout" @click="close()">
		<el-container>
			<el-header>
				<div>
					<el-row :gutter="20">
						<el-col :span="3">
							<div style="font-size: 18px;margin-left:-5px ;" v-if="!isCollapse">
								<span class="el-icon-truck" style="font-size:25px ;margin-right:10px ;"></span>Bos物流管理系统
							</div>
							<div style="font-size: 18px;margin-left:-5px ;" v-else>
								<span class="el-icon-truck" style="font-size:25px ;"></span>
							</div>
						</el-col>
						<el-col :span="19">
							<div :style="{'marginLeft': (isCollapse==true) ? '-200px' : '-30px' }">
								<i class="iconFamily myiconindent" @click="he(true)" v-if="isCollapse"></i>
								<i class="iconFamily myiconoutdent" @click="he(false)" v-else></i>
							</div>
						</el-col>
						<!-- <el-col :span="10"> -->
							<!-- 是否全屏 -->
							<!-- <div class="" style="text-align: right;line-height: 60px">
								<i class="iconFamily myiconexpend" @click="handleChange" v-if="!handleChangeValue"></i>
								<i class="iconFamily myiconcompress" @click="handleChange" v-else></i>
							</div> -->
						<!-- </el-col> -->
						<el-col :span="2">
							<div style="text-align: center;">
								<el-dropdown trigger="click" @command="handleCommand">
									<span class="el-dropdown-link" style="line-height: 54px;color: white;font-size: 16px;font-family: '微软雅黑';">
										<!-- <el-image
											style="width: 40px; height: 40px;border-radius: 7px;margin-top: 7px;"
											src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
											fit="fit"
										></el-image> -->
										<span class="el-icon-user"></span>&nbsp;&nbsp;&nbsp;个人设置
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item command="a">个人中心</el-dropdown-item>
										<el-dropdown-item command="b">修改密码</el-dropdown-item>
										<el-dropdown-item command="c">注销</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-header>
			<el-container>
				
				<el-aside :style="{ width: zsideWidth }" class="tram">
					<!-- 左菜单 -->
					<el-menu
						class="el-menu-vertical-demo bigmenu"
						:collapse="isCollapse"
						unique-opened
						:collapse-transition="true"
						background-color="#324057"
						text-color="#fff"
						active-text-color="bule"
						:default-active="defaultActive"
						@select="menuSelect"
					>
						<!-- <el-menu-item index="home" v-if="!isCollapse" style="font-size: 14px;" @click="firstMenu()"><i class="el-icon-s-home" style="margin-right: 5px;" ></i>首页</el-menu-item>
						<el-menu-item index="home"  v-else @click="firstMenu()"><i class="el-icon-s-home" 	></i></el-menu-item> 
						 --><el-submenu :index="item.name" v-for="item in computed_Menu">
							<template slot="title">
								<i :class="item.meta.icon"></i>
								<span slot="title">{{ item.meta.title }}</span>
							</template>
							<el-menu-item :index="child.path" v-for="child in item.children" :route="item.path + '/' + child.path" @click="addTab(child)">
								{{ child.meta.title }}
							</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main style="padding: 0px;margin: 0px;">
					<!-- 标签页（选项卡） -->
					<div class="mycard" @contextmenu.prevent="closeTabs">
						<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" class="eltabs" @tab-click="onClickTab">
							<!--tab 被选中时触发,被选中的标签 tab 实例-->
							<el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name"></el-tab-pane>
						</el-tabs>
					</div>
					<div class="closeDiv" :style="{display:showCloseTabs}" ref="closeTabs">
						<div class="closeAll" @click="closeAll()">
							关闭所有标签页
						</div>
						<div class="closeOther" @click="closeOther()">
							关闭其它标签页 
						</div>
						<div class="close" @click="close()">
							取 消 
						</div>
					</div>
					<div :style="{display:isShowHome}">
						<div style="padding: 10px;">
							<el-row>
								<el-col :span="12">
									<el-card class="box-card" style="height: 35vh;margin:0px 2px 2px 0px;">
									  <div slot="header" class="clearfix">
									    <span class="el-icon-postcard">公众栏</span>
									    
									  </div>
									  <div><span class="el-icon-loading"></span></div>
									</el-card>
								</el-col>
								<el-col :span="12">
									<el-card class="box-card" style="height: 35vh;margin:0px 0px 2px 2px;">
									  <div slot="header" class="clearfix">
									    <span class="el-icon-chat-dot-round">预警信息</span>
									    
									  </div>
									  <div><span class="el-icon-loading"></span></div>
									</el-card>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-card class="box-card" style="height: 35vh;margin:2px 2px 0px 0px;">
									  <div slot="header" class="clearfix">
									    <span class="el-icon-chat-dot-square">待办事宜</span>
									    
									  </div>
									  <div><span class="el-icon-loading"></span></div>
									</el-card>
								</el-col>
								<el-col :span="12">
									<el-card class="box-card" style="height: 35vh;margin:2px 0px 0px 2px;">
									  <div slot="header" class="clearfix">
									    <span class="el-icon-warning-outline">系统BUG反馈</span>
									    
									  </div>
									  <div><span class="el-icon-loading"></span></div>
									</el-card>
								</el-col>
							</el-row>
						</div>	
					</div>
					<router-view :style="{display:showHome}"></router-view>
				</el-main>
				<!-- <el-footer>Footer</el-footer> -->
			</el-container>
		</el-container>
	</div>
</template>

<script>
export default {
	name: 'layout',
	data() {
		return {
			userMenus:[],
			showHome:'none',
			isShowHome:'',
			isCollapse: false, //是否水平折叠收起菜单
			menu: [],
			defaultActive: 'home', //当前激活菜单的 index
			mSelect: 'home', //记录当前选中的菜单title
			zsideWidth: '220px', //左菜单的宽度
			tabarrs: ['home'], //保存标签页的每一个对象的名字
			editableTabsValue: 'home', //当前选中的标签页的name
			// editableTabsTitle:'home',//记录当前选中的标签页的title
			editableTabs: [
				{
					title: '首页', //初始化的标签页--首页
					name: 'home',
					content: ''
				}
			],
			counttab: 0, //删除标签页时计数器
			confirmtab: 0, //当前删除标签页的记录数
			handleChangeValue: false ,//是否全屏
			showCloseTabs:'none'//自定义关闭标签页div是否显示
		};
	},
	watch: {},
	computed: {
		//计算属性计算出需要展示的菜单
		computed_Menu() {
			let	that=this;
			if(this.menu && this.menu.length > 0){	
			  that.menu.forEach(item=>{	
				//把所有的路由和用户所拥有的的菜单权限作比较------------没有就隐藏
			    if(that.userMenus.indexOf(item.name)<0){	//用户没有的一级菜单，应该隐藏，并且也隐藏该一级菜单下的二级菜单
									
			      item.meta.hideInMenu = true;				  
				  if(item.children){				  
					  item.children.forEach(item1=>{					  
					    if(that.userMenus.indexOf(item1.name)<0) {						
					      item1.meta.hideInMenu = true;					  
					    }						
					  })					  
				  }
			    }else{//用户有一级菜单，判断是否拥有该一级菜单下的二级菜单，没有则隐藏
					
					if(item.children){
						  item.children.forEach(item1=>{
							if(that.userMenus.indexOf(item1.name)<0) {
							  item1.meta.hideInMenu = true;
							}	
						  })
				  }
			    }
			})
			}
		
				
			let arr = [];
			let childrenArr = [];
			if (this.menu.length > 0) {
				//首先当前路由集合不能为空
				this.menu.forEach(item => {
					//遍历当前路由集合		
					if (item.meta.hideInMenu == false && item.children) {	
						//只有hideInMenu为true时和children不为空时才可以展示
						childrenArr = []; //初始化承载子级别子路由的集合
						item.children.forEach(itemMenu => {
							//遍历子路集合
							if (itemMenu.meta.hideInMenu == false) {
								//如果hideInMenu为true则显示
								childrenArr.push(itemMenu);
							}
						});	
						item.children = childrenArr;
						arr.push(item);				
					}
				});
				return arr;
			}
		}
	},
	
	methods: {
		closeAll(){
			// 初始化数据
			this.showCloseTabs='none';
			this.editableTabsValue='home';
			this.tabarrs= ['home'];
			this.$router.push({
				name: 'home'
			});	
			this.mSelect='home';
			this.defaultActive='home';	
			this.editableTabs=[
				{
					title: '首页', 
					name: 'home',
					content: ''
				}
			]
			this.isShowHome=''
		},
		closeOther(){
			let that =this;
			let newData=[{
					title: '首页', 
					name: 'home',
					content: ''
				}];
			this.editableTabs.map(item=>{
				if(item.name==that.editableTabsValue &&that.editableTabsValue!='home'){
					newData.push(item)
				}
				return item;
			})
			let newTabarrs=['home'];
			this.tabarrs.map(item=>{
				if(item==that.editableTabsValue &&that.editableTabsValue!='home'){
					newTabarrs.push(item)
				}
				return item;
			})
			this.tabarrs=newTabarrs;
			this.editableTabs=newData;
			this.showCloseTabs='none';	
		},
		close(){
			this.showCloseTabs='none';
		},
		
		closeTabs(e){//关闭标签	
		
			this.showCloseTabs='';
			this.$refs['closeTabs'].style.top = e.pageY + 'px';
			if(e.pageX>1780){
				this.$refs['closeTabs'].style.left = 1780 + 'px';
			}else{
			this.$refs['closeTabs'].style.left = e.pageX + 'px';
			}
			let a=this.$refs['closeTabs'].getBoundingClientRect().right;
			
		},
		handleCommand(command) {
			//下拉菜单的指令事件
			if (command == 'a') {
				alert('个人中心功能');
			} else if (command == 'b') {
				alert('修改密码功能');
			} else {
				alert('注销功能');
			}
		},
		menuSelect(index, indexPath) {
			//菜单激活回调	index: 选中菜单项的 index, indexPath: 选中菜单项的 index path
			//给记录当前选中的菜单title赋值
			this.mSelect = index;
		},
		firstMenu() {
			//菜单激活回调	index: 选中菜单项的 index, indexPath: 选中菜单项的 index path
			//给记录当前选中的菜单title赋值
			this.editableTabsValue ='home';
			this.$router.push({
				name: 'home'
			});
		},
		onClickTab(val) {
			//点击标签页触发
			//跳转页面
			this.$router.push({
				name: val.name
			});
			
			//选中左侧菜单
			this.defaultActive = val.name;
			//给记录当前选中的菜单title赋值
			this.mSelect = val.name;
			if(val.name=='home'){
				
				
				this.showHome='none';
				this.isShowHome='';
				//选中左侧菜单
				this.defaultActive = val.name;
				//给记录当前选中的菜单title赋值
				this.mSelect = val.name;
				
			}else{
				this.showHome='';
				this.isShowHome='none';
			}
			
		},
		he(val) {
			//左菜单的展示和隐藏
			if (!val) {
				this.zsideWidth = '56px';
			} else {
				this.zsideWidth = '220px';
			}
			this.isCollapse = !val;
		},
		addTab(child) {
			// console.log("添加的标签页名称：",child.name)
			//添加标签页
			if (this.tabarrs.indexOf(child.name) == -1) {
				//不存在则添加
				this.editableTabs.push({
					title: child.meta.title,
					name: child.name,
					content: child.name
				});
				this.tabarrs.push(child.name);
			}
			this.editableTabsValue = child.name;
			
			this.$router.push({
				name: child.name
			});
			this.showHome='';
			this.isShowHome='none';
		},
		Refresh(name,title) {
			//console.log("添加的标签页名称：",child.name)
			//添加标签页
			if (this.tabarrs.indexOf(name) == -1) {
				//不存在则添加
				this.editableTabs.push({
					title: title,
					name: name,
					content: name
				});
				this.tabarrs.push(name);
			}
			this.editableTabsValue = name;
			
			// this.$router.push({
			// 	name: name
			// });
			this.showHome='';
			this.isShowHome='none';
			//选中左侧菜单
			this.defaultActive = name;
			//给记录当前选中的菜单title赋值
			
			this.mSelect = name;
		},
		removeTab(targetName) {
			let tabs = this.editableTabs;
			//把当前选中的菜单title和要关闭的标签页name作比较
			if (this.mSelect.trim() === targetName.trim()) {
				//进去说明点击删除时当前页面就在要删除的标签页上
				//拿到选项卡数组遍历
				this.editableTabs.forEach(item => {
					this.counttab++;
					if (item.name == targetName.trim()) {
						this.confirmtab = this.counttab;
					}
				});

				if (this.editableTabs.length == this.confirmtab) {
					//说明是最后一个标签页
					this.$router.push({
						name: this.editableTabs[this.confirmtab - 2].name
					});
					this.mSelect = this.editableTabs[this.confirmtab - 2].name;
					this.editableTabsValue = this.editableTabs[this.confirmtab - 2].name;
					this.defaultActive = this.editableTabs[this.confirmtab - 2].name;
					this.isShowHome=''
				} else {
					this.$router.push({
						name: this.editableTabs[this.confirmtab].name
					});
					this.mSelect = this.editableTabs[this.confirmtab].name;
					this.editableTabsValue = this.editableTabs[this.confirmtab].name;
					this.defaultActive = this.editableTabs[this.confirmtab].name;
				}
			}
			//把要删除的标签页的name从自定义保存标签页name的数组中删除
			this.tabarrs = this.tabarrs.filter(item => item != targetName);
			//页面上的数组也要删除
			this.editableTabs = tabs.filter(tab => tab.name !== targetName);
			//清空两个值
			this.counttab = 0;
			this.confirmtab = 0;
		},
		handleChange() {
			let main = document.body;
			if (this.handleChangeValue) {
				//退出全屏
				if (document.exitFullscreen) {
					document.exitFullscreen();
					this.handleChangeValue = false;
				}
			} else {
				//全屏
				if (main.requestFullscreen) {
					main.requestFullscreen();
					this.handleChangeValue = true;
				}
			}
		}
	},
	created() {
		//禁用全局右击事件
		document.oncontextmenu = function(){
		  return false;
		}
		this.menu = this.$router.options.routes;
		this.userMenus=this.$store.state.user.access.roles.menus;
		
		// let two = this.$route.path.substring(this.$route.path.lastIndexOf("/")+1);
		// let one=this.$route.path.substring(this.$route.path.indexOf("/")+1,this.$route.path.lastIndexOf("/"));
		// let title="";
		// this.menu.forEach(item=>{
			
		// 	if(item.name==one){
		// 		item.children.forEach(item1=>{
		// 			if(item1.name==two){
		// 				title=item1.meta.title;
		// 			}
		// 		})
		// 	}
		// })
		
		// if(one=="/"){
			
		// }else{
		// 	this.Refresh(one,title);
		// }
		
		
	},
	mounted() {
		let that = this;
		window.onresize = function() {
			if (!that.checkFull()) {
				// 退出全屏后要执行的动作
				that.$emit('messages', false);
			}
		};
	}
};
</script>
<style></style>
<style scoped>
	/**
	 * 自定义关闭标签页样式
	 */
	.closeDiv{
		z-index:9999;
		position: absolute;
		 border: gray 1px solid; 
		width: 130px;
		height: 120px;
		/* padding: 5px; */
		background-color: #e9eff9;
		box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.5);
		/* border-radius: 2%; */
	}
	.closeAll{
		cursor:pointer;
		/* border: #409EFF 1px solid; */
		padding: 5px;
		width: 120px;
		height: 30px;
		
		/* text-align: center; */
		line-height: 30px;
		background-color: #e9eff9;
	}
	.closeAll:hover{
		cursor:pointer;
		/* border: #409EFF 1px solid; */
		padding: 5px;
		width: 120px;
		height: 30px;
		 
		/* text-align: center; */
		line-height: 30px;
		background-color: #acd6ff;
	}
	.closeOther{
		padding: 5px;
		cursor:pointer;
		/* border: #409EFF 1px solid; */
		border-bottom: 0px;
		border-top:0px;
		width: 120px;
		height: 30px;
		
		/* text-align: center; */
		line-height: 30px;
		background-color: #e9eff9;
	}
	.closeOther:hover{
		padding: 5px;
		cursor:pointer;
		/* border: #409EFF 1px solid; */
		border-bottom: 0px;
		border-top:0px;
		width: 120px;
		height: 30px;
		
		/* text-align: center; */
		line-height: 30px;
		background-color: #acd6ff;
	}
	.close{
		cursor:pointer;
		/* border: #409EFF 1px solid; */
		/* border-bottom: 0px;
		border-top:0px; */
		width: 120px;
		height: 30px;
		padding: 5px;
		/* text-align: center; */
		line-height: 30px;
		background-color: #e9eff9;
	}
	.close:hover{
		cursor:pointer;
		/* border: #409EFF 1px solid; */
		/* border-bottom: 0px;
		border-top:0px; */
		width: 120px;
		height: 30px;
		padding: 5px;
		/* text-align: center; */
		line-height: 30px;
		background-color: #acd6ff;
	}

	
/* 标签页样式改变其行高 */
.eltabs {
	width: 100%;
	line-height: 0px;
}

/* 布局 */
.tram {
	border: 0px;
	transition: all 0.5s ease;
}
/* 左菜单样式--及动画 */
.bigmenu {
	border: 0px;
	transition: all 0.001s ease;
	margin-left: -8px;
}
.iconFamily {
	font-size: 22px;
}
/* 整个页面的高度 */
.layout {
	height: 100vh;
}
/* 左侧样式 */
.el-aside {
	background-color: #324057;
	/* text-align: center; */
	line-height: 200px;
	height: 94vh;
}
/* 中间样式 */
.el-main {
	background-color: #e9eef3;
	color: #333;
}
/* 头部和尾部样式 */
.el-header,
.el-footer {
	background-color: #3c8dbc;
	color: #ffffff;
	line-height: 60px;
	height: 6vh!important;
	border-bottom: 0.5px solid rgba(0, 0, 0, 0.19);
}
/* 选项卡的阴影 */
.mycard {
	width: 100%;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
	margin-bottom: 4px;
}
</style>
<style>
/**
	 * 选项卡样式
	 */
.el-tabs--card > .el-tabs__header {
	border-bottom: 0px solid #e4e7ed !important;
}
.el-tabs__header {
	padding: 0;
	position: relative;
	margin: 0 0 3px !important;
}

.el-menu-item {
	background-color: #2d3a4b !important;
}
/* 设置左菜单选中的菜单的背景颜色 */
.el-menu-item.is-active {
	color: #fff !important;
	background-color: #1890ff !important;
}
/* 首页选项卡没有关闭按钮 */
.el-tabs__nav .el-tabs__item:nth-child(1) span {
	display: none;
}
/* 所有的选项卡的间距设置 */
.el-tabs__nav .el-tabs__item:nth-child(n) {
	margin: 3px !important;
	border: #acd6ff 1px solid !important;
}
/* 选项卡样式设置 */
.el-tabs__item {
	padding: 0 10px !important;
	box-sizing: border-box !important;
	height: 30px !important;
	line-height: 30px !important;
	display: inline-block !important;
	list-style: none !important;
	font-size: 14px !important;
	font-weight: 500 !important;
	color: #303133 !important;
	position: relative !important;
	margin: 0px !important;
}
/* 选项卡选中时的背景颜色 */
.el-tabs__item.is-active {
	background-color: #acd6ff;
}
/* 选项卡中前面的白圆圈 */
.el-tabs__item.is-active:before {
	content: '';
	background: #fff;
	display: inline-block;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	position: relative;
	margin-right: 4px;
}
</style>
