 <template>
	<div>
		<el-card class="box-card" shadow="hover">
		  <div slot="header" class="clearfix" >
		    <span>班车管理</span>
			 </div>
		   <div style=" display: inline-block; width:100%">
			   <el-row style="width:100%">
			     <el-col :span="12">
					 <div class="grid-content bg-purple">
						 <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="openWindow(null)" :disabled="validate.point.add?null:'disabled'">添加</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-edit" @click="openWindow('update')" 	>修改</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-document-add" @click="saveVehicle()">保存</el-button>
					 </div>
				 </el-col>
			   </el-row>			  
		   </div>
		   	<el-table 
			border
			 ref="handSelectTest_multipleTable"
			 v-loading="loading"
			 element-loading-text="权限不足"
			:data="Vehiclelist" fit highlight-current-row style="width: 100%;"  empty-text="暂无数据" @select="select">
				</el-table-column>
				<el-table-column type="selection" width="40" align="center"></el-table-column>
				<el-table-column v-for="item in itemOptions" :key="item.id" :label="item.title" :prop="item.key" align="center">

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
		<VehicleAddEdit ref="VehicleAddEdit"></VehicleAddEdit>
	</div>
</template>
<script>
	import {getVehicleList} from '@/api/base/vehicle.js'
export default {
	components:{
	      VehicleAddEdit:()=>import("@/views/base/child/vehicle-add-edit.vue")
	},
	data() {
		return {
			requestParameters:{
			  page:1,
			  size:10,
			  total:0
			},
			loading:false,
			itemOptions: [
				{ id: 0, title: '线路名称', type: 'text', key: 'routeName' },
				{ id: 1, title: '线路类型', type: 'text', key: 'routeType',opt:true },
				{ id: 2, title: '承运商', type: 'text', key: 'shipper' },
				{ id: 3, title: '司机', type: 'text', key: 'driver' },
				{ id: 4, title: '车型', type: 'text', key: 'vehicleType' },
				{ id: 5, title: '车牌号', type: 'text', key: 'vehicleNum' },
				{ id: 6, title: '吨控', type: 'text', key: 'ton' },
				{ id: 7, title: '描述', type: 'text', key: 'remark' }						
			],
			Vehiclelist: [],
			currentPage: 1,
			search:'',
			selectRow:{},			//选中当前行数据
			selectionLen:0			,//选中行数
			validate:{
			  point:{
			    sub:this.$access.has_permission('POINT-VEHICLE-LIST'),
			    update:this.$access.has_permission('POINT-VEHICLE-UPDATE'),
			    add:this.$access.has_permission('POINT-VEHICLE-ADD')
			  },
			  api:{
			    list:this.$access.has_api_permission("API-VEHICLE-LIST")
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
		getVehicleList(data){
			//查询列表带分页参数
		  getVehicleList(data).then(res=>{			  
			  if(res.data.code===10000){				  
				  this.Vehiclelist = res.data.data.rows;
				  this.requestParameters.total = res.data.data.total;
			  }
		  })
		},
		handleSizeChange(val){
			//页容量发生改变时，重新查询数据
			this.requestParameters.size=val;
			this.getVehicleList(this.requestParameters);
		},
		handleCurrentChange(val){
			//页码发生改变时，重新查询数据
			this.requestParameters.page=val;
			this.getVehicleList(this.requestParameters);
		},
		openWindow(data){
		   if(data == null){
			   this.$refs['VehicleAddEdit'].VehicleData = {};
			   this.$refs['VehicleAddEdit'].Vehicle = true;
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
				   this.$refs['VehicleAddEdit'].VehicleData = this.selectRow;
				   this.$refs['VehicleAddEdit'].Vehicle = true;
			   }    
		   }
		},
		saveVehicle(){
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
					// deleteVehicle(this.selectRow).then(res=>{
					// 	if(res.data.code === 10000){
					// 	  console.log(res.data.message);
					// 	}else{
					// 	   console.log(res.data.message);
					// 	}
					// 	this.getList();
					// })
					console.log("保存功能")
				  this.$message({
					type: 'success',
					message: '删除成功!'
				  });
				}).catch(() => {
					
				  this.$message({
					type: 'info',
					message: '已取消删除'
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
		this.getVehicleList(this.requestParameters);
		//是否加载列表
		this.loading=!this.validate.api.list;
	}
};
</script>
<style scoped>
	  .box-card {
		margin: 10px;
	    width: 99%;
	  } 
</style>