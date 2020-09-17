 <template>
	<div>
		<el-card class="box-card" shadow="hover">
		  <div slot="header" class="clearfix" >
		    <span>定区设置</span>
			 </div>
		   <div style=" display: inline-block; width:100%">
			   <el-row style="width:100%">
			     <el-col :span="12">
					 <div class="grid-content bg-purple">
						 <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="openWindow(null)" :disabled="validate.point.add?null:'disabled'">添加</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-edit" @click="openWindow('update')" :disabled="validate.point.update?null:'disabled'">修改</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteFixedArea()" :disabled="validate.point.update?null:'disabled'">删除</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-search" @click="selectFixedArea()">查询</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-connection" @click="relationSubArea()">关联分区</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-connection" @click="relationCustomer()">关联客户</el-button>
					 </div>
				 </el-col>
			   </el-row>			  
		   </div>
		   	<el-table 
			border
			v-loading="loading"
			element-loading-text="权限不足"
			 ref="handSelectTest_multipleTable"
			:data="FixedArealist" fit highlight-current-row style="width: 100%;"  empty-text="暂无数据" @select="select">
				</el-table-column>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column v-for="item in itemOptions" :key="item.id" :label="item.title" align="center"  :property="item.key">
							<template slot-scope="scope">
							       {{scope.row[scope.column.property]}}  
							</template>
		   		</el-table-column>				
		   	</el-table>
		   	<div class="block">
		   		<el-pagination 
				:current-page="requestParameters.page" 
				:page-sizes="[10, 20, 50, 100]" 
				:page-size="requestParameters.size" 
				background 
				:hide-on-single-page="true"
				layout="total, sizes, prev, pager, next, jumper" 
				:total="requestParameters.total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange">
		   		</el-pagination>
		   	</div>
		 
		
		</el-card>
		<FixedAreaAddEdit ref="FixedAreaAddEdit"></FixedAreaAddEdit>
		<SelectFixedArea ref="SelectFixedArea"></SelectFixedArea>
		<RelationSubArea ref="RelationSubArea"></RelationSubArea>
		<RelationCustomer ref="RelationCustomer"></RelationCustomer>
	</div>
</template>
<script>
	import {getFixedAreaList,deleteFixedArea} from '@/api/base/fixedArea.js'
export default {
	components:{
	      FixedAreaAddEdit:()=>import("@/views/base/child/fixedArea-add-edit.vue"),
	      SelectFixedArea:()=>import("@/views/base/select/select-fixedArea.vue"),
	      RelationSubArea:()=>import("@/views/base/relation/relation-subArea.vue"),
	      RelationCustomer:()=>import("@/views/base/relation/relation-customer.vue")
	},
	data() {
		return {
			requestParameters:{
			  page:1,
			  size:10,
			  total:0,
			  fixedAreaCode:'',
			  company:'',
			  areaId:''
			},
			itemOptions: [
				{ id: 0, title: '定区编码', type: 'text', key: 'fixedAreaCode' },
				{ id: 1, title: '定区名称', type: 'text', key: 'fixedAreaName' },
				{ id: 2, title: '定区负责人', type: 'text', key: 'fixedAreaLeader' },
				{ id: 3, title: '负责人电话', type: 'text', key: 'telephone' },
				{ id: 4, title: '所属公司', type: 'text', key: 'company' },
			],
			FixedArealist: [],
			currentPage: 1,
			search:'',
			selectRow:{},			//选中当前行数据
			selectionLen:0			,//选中行数
			loading:false,
			validate:{
			  point:{
			    sub:this.$access.has_permission('POINT-FIXEDAREA-LIST'),
			    update:this.$access.has_permission('POINT-FIXEDAREA-UPDATE'),
			    delete:this.$access.has_permission('POINT-FIXEDAREA-DELETE'),
			    add:this.$access.has_permission('POINT-FIXEDAREA-ADD')
			  },
			  api:{
			    list:this.$access.has_api_permission("API-FIXEDAREA-LIST")
			  }
			},
		};
	},
	methods: {
		relationSubArea(){//关联分区
			if(this.selectionLen>1){
			   this.$notify({
						 title: '警告',
						 message: '只能操作一条数据',
						 type: 'warning'
				 });
				}else if(this.selectionLen<1){
				this.$notify({
						  title: '警告',
						  message: '请选择要操作的数据',
						  type: 'warning'
				  });
				}else{
				//this.$refs['RelationSubArea'].showAddress =true;
				//this.$refs['RelationSubArea'].FixedAreaData = this.selectRow;
				this.$refs['RelationSubArea'].reSubArea= true;			  
			}    
		},
		relationCustomer(){//关联客户
			if(this.selectionLen>1){
			   this.$notify({
						 title: '警告',
						 message: '只能操作一条数据',
						 type: 'warning'
				 });
				}else if(this.selectionLen<1){
				this.$notify({
						  title: '警告',
						  message: '请选择要操作的数据',
						  type: 'warning'
				  });
				}else{
				//this.$refs['RelationCustomer'].showAddress =true;
				this.$refs['RelationCustomer'].FixedAreaData = this.selectRow;
				this.$refs['RelationCustomer'].FixedArea = true;			  
			}    
		},
		 //点击行触发，选中或不选中复选框
		   	handleRowClick(row, column, event) {
		        this.$refs.handSelectTest_multipleTable.toggleRowSelection(row);
		       
		    },
		getFixedAreaList(data){
			//查询列表带分页参数
		  getFixedAreaList(data).then(res=>{			  
			  if(res.data.code===10000){	
				  
				  this.FixedArealist = res.data.data.rows;
				  this.requestParameters.total = res.data.data.total;
			  }
		  })
		},
		handleSizeChange(val){
			//页容量发生改变时，重新查询数据
			this.requestParameters.size=val;
			this.getFixedAreaList(this.requestParameters);
		},
		handleCurrentChange(val){
			//页码发生改变时，重新查询数据
			this.requestParameters.page=val;
			this.getFixedAreaList(this.requestParameters);
		},
		openWindow(data){
		   if(data == null){
				  this.$refs['FixedAreaAddEdit'].showAddress =true;
				  this.$refs['FixedAreaAddEdit'].FixedAreaData = {};	  
			      this.$refs['FixedAreaAddEdit'].FixedArea = true;
		   } else{
				if(this.selectionLen>1){
				   this.$notify({
				             title: '警告',
				             message: '只能修改一条数据',
				             type: 'warning'
				     });
				}else if(this.selectionLen<1){
				this.$notify({
				          title: '警告',
				          message: '请选择要修改的数据',
				          type: 'warning'
				  });
				}else{
				this.$refs['FixedAreaAddEdit'].showAddress =true;
				this.$refs['FixedAreaAddEdit'].FixedAreaData = this.selectRow;
				this.$refs['FixedAreaAddEdit'].FixedArea = true;
					  
			   }    
		   }
		},
		selectFixedArea(){//条件查询SelectFixedArea
			this.$refs['SelectFixedArea'].selectFixedArea=true;
			this.$refs['SelectFixedArea'].selectFixedAreaData={};
			this.requestParameters.fixedAreaCode='';
			this.requestParameters.company='';
			this.requestParameters.areaId='';
		},
		select(selection, row){
			//selection选中复选框的数组
			//选中行数
			this.selectionLen=selection.length;
			//选中时当前行数据
			[this.selectRow]=selection;
		},
		deleteFixedArea(){
			if(this.selectionLen>1){
			   this.$notify({
			             title: '警告',
			             message: '只能删除一条数据',
			             type: 'warning'
			     });
			}else if(this.selectionLen<1){
			this.$notify({
			          title: '警告',
			          message: '请选择要删除的数据',
			          type: 'warning'
			  });
			}else{
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					  confirmButtonText: '确定',
					  cancelButtonText: '取消',
					  type: 'warning'
				}).then(() => {
					deleteFixedArea(this.selectRow.id).then(res=>{
						if(res.data.code === 10000){
						 this.$message({
						 					type: 'success',
						 					message: '删除成功!'
						 });
						}else{
						  this.$message({
						  					type: 'warning',
						  					message: '删除失败!'
						  });
						}
						this.getFixedAreaList(this.requestParameters);
					})
				 
				}).catch(() => {	
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});	
			}
		},
		
	},
	created(){
		this.loading=!this.validate.api.list;
		this.getFixedAreaList(this.requestParameters);
	}
};
</script>
<style scoped>
	  .box-card {
		margin: 10px;
	    width: 99%;
	  } 
</style>