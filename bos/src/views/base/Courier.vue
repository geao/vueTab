 <template>
	<div>
		<el-card class="box-card" shadow="hover">
		  <div slot="header" class="clearfix" >
		    <span>快递员设置/替班</span>
			 </div>
		   <div style=" display: inline-block; width:100%">
			   <el-row style="width:100%">
			     <el-col :span="12">
					 <div class="grid-content bg-purple">
						 <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="openWindow(null)" :disabled="validate.point.add?null:'disabled'">添加</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-edit" @click="openWindow('update')" :disabled="validate.point.update?null:'disabled'">修改</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-bottom-right" @click="toVoidCourier()"  :disabled="validate.point.update?null:'disabled'">作废</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-search" @click="selectCourier()" :disabled="validate.point.list?null:'disabled'">查询</el-button>
						
					 </div>
				 </el-col>
			   </el-row>			  
		   </div>
			<el-table
			  ref="handSelectTest_multipleTable"
				:data="Courierlist"
				empty-text="暂无数据"
				fit
				highlight-current-row
				style="width: 100%" 
				max-height="640"
				v-loading="loading"
				@select="select"
				element-loading-text="权限不足"
				border> 
			<el-table-column type="selection" width="40" align="center"></el-table-column>
			<el-table-column type="index" width="60" label="序号" align="center"></el-table-column>
			<el-table-column type="expand" width="60" label="详情" align="center">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<!-- 手机号 -->
						<el-form-item label="查台密码">
							<span>{{ props.row.checkPwd }}</span>
						</el-form-item>
						<el-form-item label="所属单位">
							<span>{{ props.row.company }}</span>
						</el-form-item>
						<el-form-item label="快递员工号">
							<span>{{ props.row.courierNum }}</span>
						</el-form-item>
						<el-form-item label="是否作废">
							<span>{{ props.row.deltag }}</span>
						</el-form-item>
						<el-form-item label="快递员姓名">
							<span>{{ props.row.name }}</span>
						</el-form-item>
						<el-form-item label="快递员电话">
							<span>{{ props.row.telephone }}</span>
						</el-form-item>
						<el-form-item label="取件员类型">
							<span>
							{{props.row.type == 1 ? '小件快递员':'大件快递员'}}
							</span>
						</el-form-item>
						<el-form-item label="车牌号">
							<span>{{ props.row.carNum }}</span>
						</el-form-item>
						<el-form-item label="车辆类型">
							
							<span>
							{{props.row.carType == 1 ? '快递三轮车':'货车'}}
							</span>
						</el-form-item>
						<el-form-item label="取派标准">
							<span>
								{{props.row.standardName}}
							</span>
						</el-form-item>
						<el-form-item label="PDA号码">
							<span>{{ props.row.pda }}</span>
						</el-form-item>
						
					</el-form>
				</template>
			</el-table-column>				
			<el-table-column 
				prop="checkPwd"
				label="查台密码" 
				align="center"
				>
			</el-table-column>
			<el-table-column
				prop="company"
				label="所属单位" 
				align="center"
				>
			</el-table-column>
			
			<el-table-column
				prop="courierNum"
				label="快递员工号" 
				align="center"
				>
			</el-table-column>
			<el-table-column
				prop="deltag"
				label="是否作废" 
				align="center">
				 <template slot-scope="scope">
					 <el-tag size="mini" :type="scope.row.deltag == '1' ? 'success' : 'warning'">{{scope.row.deltag == 1 ? '不作废':'作废'}}</el-tag></span>
				 </template>
			</el-table-column>	
			<el-table-column
				prop="name"
				label="快递员姓名" 
				align="center"
				>
			</el-table-column>
			<el-table-column
				prop="telephone"
				label="快递员电话" 
				align="center"
				>
			</el-table-column>
			<el-table-column
				prop="type"
				label="取件员类型" 
				align="center"
				>
				<template slot-scope="scope">
					 <el-tag size="mini" :type="scope.row.type == '1' ? 'success' : 'warning'">{{scope.row.type == 1 ? '小件快递员':'大件快递员'}}</el-tag></span>
				</template>
			</el-table-column>
		
			<el-table-column
				prop="carNum"
				label="车牌号" 
				align="center"
				>
			</el-table-column>
			<el-table-column
				prop="carType"
				label="车辆类型" 
				align="center"
				>
				<template slot-scope="scope">
									 <el-tag size="mini" :type="scope.row.carType == '1' ? 'success' : 'warning'">{{scope.row.carType == 1 ? '快递三轮车':'货车'}}</el-tag></span>
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
		<CourierAddEdit ref="CourierAddEdit"></CourierAddEdit>
		<SelectCourier ref="SelectCourier"></SelectCourier>
	</div>
</template>
<script>
	import {getCourierList,toVoidCourier} from '@/api/base/courier.js'
export default {
	components:{
	      CourierAddEdit:()=>import("@/views/base/child/courier-add-edit.vue"),
	      SelectCourier:()=>import("@/views/base/select/select-courier.vue")
	},
	data() {
		return {
			requestParameters:{
			  page:1,
			  size:10,
			  total:0,
			  courierNum:'',
			  type:'',
			  standardId:'',
			  company:''
			},
			Courierlist: [],
			currentPage: 1,
			search:'',
			selectRow:{},			//选中当前行数据
			selectionLen:0			,//选中行数
			loading:false,
			validate:{
			  point:{
			    list:this.$access.has_permission('POINT-COURIER-LIST'),
			    update:this.$access.has_permission('POINT-COURIER-UPDATE'),
			    toVoid:this.$access.has_permission('POINT-COURIER-TOVOID'),
			    add:this.$access.has_permission('POINT-COURIER-ADD'),
			  },
			  api:{
			    list:this.$access.has_api_permission("API-COURIER-LIST")
			  }
			},
		};
	},
	methods: {
		 //点击行触发，选中或不选中复选框
		   	handleRowClick(row, column, event) {
		        this.$refs.handSelectTest_multipleTable.toggleRowSelection(row);
		        // console.log("this.selecTestContent", this.selectTestContent);
		    },
		getCourierList(data){
			//查询列表带分页参数
		  getCourierList(data).then(res=>{			  
			  if(res.data.code===10000){	
				  this.Courierlist = res.data.data.rows;
				  this.requestParameters.total = res.data.data.total;
			  }
		  })
		},
		handleSizeChange(val){
			//页容量发生改变时，重新查询数据
			this.requestParameters.size=val;
			this.getCourierList(this.requestParameters);
		},
		handleCurrentChange(val){
			//页码发生改变时，重新查询数据
			this.requestParameters.page=val;
			this.getCourierList(this.requestParameters);
		},
		openWindow(data){
		   if(data == null){
				  this.$refs['CourierAddEdit'].showAddress =true;
				  this.$refs['CourierAddEdit'].CourierData = {};	  
			      this.$refs['CourierAddEdit'].Courier = true;
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
				this.$refs['CourierAddEdit'].showAddress =true;
				this.$refs['CourierAddEdit'].CourierData = this.selectRow;
				this.$refs['CourierAddEdit'].Courier = true;
					  
			   }    
		   }
		},
		selectCourier(){//条件查询SelectCourier
			// this.$refs['SelectCourier'].selectCourier=true;
			// this.$refs['SelectCourier'].selectCourierData={};
			// this.requestParameters.province='';
			// this.requestParameters.city='';
			// this.requestParameters.district='';
		},
		select(selection, row){
			//selection选中复选框的数组
			//选中行数
			this.selectionLen=selection.length;
			//选中时当前行数据
			[this.selectRow]=selection;
		},
		toVoidCourier(){
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
					toVoidCourier(this.selectRow).then(res=>{
						if(res.data.code === 10000){
						  this.$message({
							type: 'success',
							message: '作废成功!'
						  });
						}else{
						  this.$message({
							type: 'warning',
							message: '作废失败!'
						  });
						}
						this.getCourierList(this.requestParameters);
					})
				  
				}).catch(() => {	
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});	
			}
		},
		importCourier(){
			//TODO 导入
			alert("导入")
		},
		exportCourier(){
			//TODO 导出
			alert("导出")
		}
	},
	created(){
		this.loading=!this.validate.api.list;
		this.getCourierList(this.requestParameters);
	}
};
</script>
<style scoped>
	  .box-card {
		margin: 10px;
	    width: 99%;
	  } 
	  .demo-table-expand {
	      font-size: 0;
	    }
	    .demo-table-expand label {
	      width: 90px;
	      color: #99a9bf;
	    }
	    .demo-table-expand .el-form-item {
	      margin-right: 0;
	      margin-bottom: 0;
	      width: 50%;
	    }
</style>