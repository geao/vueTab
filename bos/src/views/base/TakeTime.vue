 <template>
	<div>
		
		   <div style=" display: inline-block; width:100% ;margin: 20px 5px 0px 5px;padding: 5px;">
			   <el-row style="width:100%">
			     <el-col :span="12">
					 <div class="grid-content bg-purple">
						 <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="openWindow(null)" :disabled="validate.point.add?null:'disabled'">添加</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-edit" @click="openWindow('update')" :disabled="validate.point.update?null:'disabled'">修改</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-document-add" @click="saveTakeTime()">保存</el-button>
					 </div>
				 </el-col>
			   </el-row>			  
		   </div>		
			   <div style="margin: 5px;padding: 5px;">
			 <el-table
			  ref="handSelectTest_multipleTable"
				:data="TakeTimelist"
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
						<el-form-item label="平时下班时间">
							<span>{{ props.row.normalDutyTime }}</span>
						</el-form-item>
						<el-form-item label="平时上班时间">
							<span>{{ props.row.normalWorkTime }}</span>
						</el-form-item>
						<el-form-item label="周六下班时间">
							<span>{{ props.row.satDutyTime }}</span>
						</el-form-item>
						<el-form-item label="周六上班时间">
							<span>{{ props.row.satWorkTime }}</span>
						</el-form-item>
						<el-form-item label="周日下班时间">
							<span>{{ props.row.normalDutyTime }}</span>
						</el-form-item>
						<el-form-item label="周日上班时间">
							<span>{{ props.row.sunWorkTime }}</span>
						</el-form-item>
						<el-form-item label="状态">
							<span>
							{{props.row.status == 1 ? '禁用':'启用'}}
							</span>
						</el-form-item>
						<el-form-item label="所属单位">
							<span>{{ props.row.company }}</span>
						</el-form-item>
						<el-form-item label="操作单位">
							<span>{{ props.row.operatingCompany }}</span>
						</el-form-item>
						<el-form-item label="操作时间">
							<span>
								{{format(props.row.operatingTime)}}
							</span>
						</el-form-item>
						<el-form-item label="操作人">
							<span>{{ props.row.operator }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
						
			<el-table-column 
				prop="normalDutyTime"
				label="平时下班时间" 
				align="center"
				>
			</el-table-column>
			<el-table-column
				prop="normalWorkTime"
				label="平时上班时间" 
				align="center"
				>
			</el-table-column>
			<el-table-column
				prop="satDutyTime"
				label="周六下班时间" 
				align="center"
				>
			</el-table-column>
			<el-table-column
				prop="satWorkTime"
				label="周六上班时间" 
				align="center"
				>
			</el-table-column>
			<el-table-column
				prop="normalDutyTime"
				label="周日上班时间" 
				align="center"
				>
			</el-table-column>
			<el-table-column
				prop="normalDutyTime"
				label="周日下班时间" 
				align="center"
				>
			</el-table-column>
			<el-table-column
				prop="status"
				label="状态" 
				align="center">
				 <template slot-scope="scope">
					 <el-tag size="mini" :type="scope.row.status == '1' ? 'success' : 'warning'">{{scope.row.status == 1 ? '禁用':'启用'}}</el-tag></span>
				 </template>
			</el-table-column>
			 <el-table-column
			  label="操作"
			  align="center">
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="danger"
						@click="handleRev(scope.row)"
						icon="el-icon-delete-solid">启禁</el-button>
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
		 
		</div>
		
		<TakeTimeAddEdit ref="TakeTimeAddEdit"></TakeTimeAddEdit>
	</div>
</template>
<script>
	import { YearMonthDay } from '@/utils/tools.js'
	import {getTakeTimeList,disableTakeTime} from '@/api/base/takeTime.js'
export default {
	components:{
	      TakeTimeAddEdit:()=>import("@/views/base/child/takeTime-add-edit.vue")
	},
	data() {
		return {
			requestParameters:{
			  page:1,
			  size:10,
			  total:0
			},
			TakeTimelist: [],
			currentPage: 1,
			search:'',
			selectRow:{},			//选中当前行数据
			selectionLen:0			,//选中行数
			loading:false,
			validate:{
			  point:{
			    sub:this.$access.has_permission('POINT-TAKETIME-LIST'),
			    update:this.$access.has_permission('POINT-TAKETIME-UPDATE'),
			    add:this.$access.has_permission('POINT-TAKETIME-ADD')
			  },
			  api:{
			    list:this.$access.has_api_permission("API-TAKETIME-LIST")
			  }
			},
		};
	},
	methods: {
		format(data){
			return YearMonthDay(data);
		},
		//启禁
		handleRev(data){
			this.$confirm(`你确认要将“${data.status == 1 ? '禁用' : '启用'}”改为“${data.status == 1 ? '启用' : '禁用'}”么?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
			   disableTakeTime(data).then(res=>{
				   if(res.data.code == 10000){
						this.$message({message:res.data.message,type:"success"})
					}else{
						this.$message({message:res.data.message,type:"error"})
					}
					this.getTakeTimeList(this.requestParameters);
			   })
			}).catch(()=>{
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		 //点击行触发，选中或不选中复选框
		   	handleRowClick(row, column, event) {
		        this.$refs.handSelectTest_multipleTable.toggleRowSelection(row);
		  
		    },
		getTakeTimeList(data){
			//查询列表带分页参数
		  getTakeTimeList(data).then(res=>{			  
			  if(res.data.code===10000){				  
				  this.TakeTimelist = res.data.data.rows
					console.log(res.data.data.rows)
				  this.requestParameters.total = res.data.data.total;
			  }
		  })
		},
		handleSizeChange(val){
			//页容量发生改变时，重新查询数据
			this.requestParameters.size=val;
			this.getTakeTimeList(this.requestParameters);
		},
		handleCurrentChange(val){
			//页码发生改变时，重新查询数据
			this.requestParameters.page=val;
			this.getTakeTimeList(this.requestParameters);
		},
		openWindow(data){
		   if(data == null){
			   this.$refs['TakeTimeAddEdit'].TakeTimeData = {};
			      this.$refs['TakeTimeAddEdit'].TakeTime = true;
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
				   this.$refs['TakeTimeAddEdit'].TakeTimeData = this.selectRow;
				      this.$refs['TakeTimeAddEdit'].TakeTime = true;
			   }    
		   }
		},
		saveTakeTime(){
			//保存
			if(this.selectionLen>1){
			   this.$notify({
					 title: '警告',
					 message: '一次只能保存一条数据',
					 type: 'warning'
				 });
			}else if(this.selectionLen<1){	
				this.$notify({
					  title: '警告',
					  message: '请选择要保存的数据',
					  type: 'warning'
				  });
			}else{
				this.$confirm('此操作将保存该文件, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					// deleteTakeTime(this.selectRow).then(res=>{
					// 	if(res.data.code === 10000){
					
					// 	}else{
				
					// 	}
					// 	this.getList();
					// })
					
				  
				}).catch(() => {
					
				  this.$message({
					type: 'info',
					message: '已取消保存'
				  });          
				});		
			}
		},
		select(selection, row){
			//selection选中复选框的数组
			//选中行数
			this.selectionLen=selection.length;
			//选中时当前行数据
			[this.selectRow]=selection;
		}
	},
	created(){
		this.getTakeTimeList(this.requestParameters);
		this.loading=!this.validate.api.list;
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