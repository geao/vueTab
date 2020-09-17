<template>
    <div>
		<div style="margin: 20px 5px 10px 5px;padding: 5px;">
			<el-button size="mini" type="primary" @click="openWindow('permissionChild',null)" :disabled="validate.point.add?null:'disabled'"> <span class="el-icon-plus"></span> 新增菜单</el-button>
		</div>
		
		<div style="margin: 5px;padding: 5px;">
			<el-table :data="data" row-key="id" :tree-props="{children: 'children'}" v-loading="loading" element-loading-text="权限不足">
				<el-table-column type="index"></el-table-column>
				<el-table-column label="权限名称" prop="name" >
					<template slot-scope="scope">
						<span :style="{'color': (scope.row.type == 1 && scope.row.pid == 0) ? '#67C23A' :(scope.row.type == 1 && scope.row.pid != 0) ? '#E6A23C' : ( scope.row.type == 2 ? '#F56C6C' : '#909399' ) }">{{scope.row.name}}</span>
					</template>
				</el-table-column>
				<el-table-column label="权限编码" prop="code" >
					<template slot-scope="scope">
						<span :style="{'color': (scope.row.type == 1 && scope.row.pid == 0) ? '#67C23A' :(scope.row.type == 1 && scope.row.pid != 0) ? '#E6A23C' : ( scope.row.type == 2 ? '#F56C6C' : '#909399' ) }">{{scope.row.code}}</span>
					</template>
				</el-table-column>
				<el-table-column label="权限类型" prop="type">
					<template slot-scope="scope">
						<span :style="{'color': (scope.row.type == 1 && scope.row.pid == 0) ? '#67C23A' :(scope.row.type == 1 && scope.row.pid != 0) ? '#E6A23C' : ( scope.row.type == 2 ? '#F56C6C' : '#909399' ) }">
						{{(scope.row.type == '1' && scope.row.pid == 0 ) ? '顶级菜单' : ((scope.row.type == '1' && scope.row.pid != 0) ? "子级菜单" : ( scope.row.type == '2' ? "按钮" : "API"))}}
						</span>
					</template>
				</el-table-column>
				<el-table-column label="是否可见" prop="enVisible" align="center" >
					<template slot-scope="scope">
						<span :style="{'color': (scope.row.type == 1 && scope.row.pid == 0) ? '#67C23A' :(scope.row.type == 1 && scope.row.pid != 0) ? '#E6A23C' : ( scope.row.type == 2 ? '#F56C6C' : '#909399' ) }">{{scope.row.enVisible == 1 ? '可见':'不可见'}}</span>
					</template>
				</el-table-column>
				
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button @click="openWindow('permissionChild',scope.row)" :type="(scope.row.type == 1 && scope.row.pid == 0) ? 'primary' :(scope.row.type == 1 && scope.row.pid != 0) ? 'warning' : ( scope.row.type == 2 ? 'danger' : 'info' ) " size="mini" :disabled="validate.point.update?null:'disabled'">
							<span class="el-icon-edit"></span>修改
						</el-button>
						
						<el-button @click="remove(scope.row)" :type="(scope.row.type == 1 && scope.row.pid == 0) ? 'primary' :(scope.row.type == 1 && scope.row.pid != 0) ? 'warning' : ( scope.row.type == 2 ? 'danger' : 'info' ) " size="mini" :disabled="validate.point.update?null:'disabled'">
							<span class="el-icon-delete"></span>删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<permission-child ref="permissionChild"></permission-child>
    </div>
</template>

<script>
	
	import * as permissionApi  from '../../api/system/permission.js'
	
    export default {
        name: "permission",
		data(){
			return {
				data:[],
				loading:false,
				validate:{
				  point:{
				    sub:this.$access.has_permission('POINT-PERMISSION-LIST'),
				    update:this.$access.has_permission('POINT-PERMISSION-UPDATE'),
				    add:this.$access.has_permission('POINT-PERMISSION-ADD')
				  },
				  api:{
				    list:this.$access.has_api_permission("API-PERMISSION-LIST")
				  }
				},
			}
		},
		components:{
			PermissionChild:()=> import ("@/views/system/child/permission-child.vue")
		},
		methods:{
			openWindow(name,data){
				if(data == null) {
					this.$refs[name].data = {};
				} else {
					this.$refs[name].tree = {expandedKeys:[],currentNodeKey:''};
					this.$refs[name].data = data;
				}
				this.$refs[name].value = true;
			},
			remove(data){
				//向下查看是否有子类 ,如果有则不可删除
				if(data.children && data.children.length > 0){
					this.$message.error("有子类无法删除");
					return false;
				}
				
				this.$confirm("确定要删除吗?","友情提示",{type:'warning'}).then(()=>{
					permissionApi.remove({id:data.id}).then(res=>{
						this.$message({
							type:res.data.success?'success':'error',
							message:res.data.message
						});
						this.findAll();
					});
				});
				
			},
			findAll(){
				permissionApi.all().then(res=>{
					this.data = res.data.data;
				});
			}
		},
		created(){
			this.loading=!this.validate.api.list;
			this.findAll();
		}
    }
</script>

<style scoped>

</style>