 <template>
	<div>
		<el-card class="box-card" shadow="hover">
		  <div slot="header" class="clearfix" >
		    <span>管理分区</span>
			 </div>
		   <div style=" display: inline-block; width:100%">
			   <el-row style="width:100%">
			     <el-col :span="12">
					 <div class="grid-content bg-purple">
						 <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="openWindow(null)" :disabled="validate.point.add?null:'disabled'">添加</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-edit" @click="openWindow('update')" :disabled="validate.point.update?null:'disabled'">修改</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteSubArea()" :disabled="validate.point.delete?null:'disabled'">删除</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-bottom-right" @click="importSubArea()">导入</el-button>
						 <el-popover placement="bottom" @after-leave="hide">
							 <p>是否要加入大标题?</p >
							 <el-radio-group v-model="showOrHideHeader">
							 	<el-radio :label="'2'">是</el-radio>
							 	<el-radio :label="'1'">否</el-radio>
							 </el-radio-group>
							 </br>
							 <el-input v-model="headerContent" placeholder="请输入大标题名称" size="mini" style="width: 230px;margin: 10px 0px 0px 0px;"></el-input>
							 
						     <p>请选择要导出的字段?</p >
						     <el-checkbox-group v-model="popoverList">
						         <el-checkbox label="sortingNum">分拣编号</el-checkbox>
						 		<br/>
						 		<el-checkbox label="province">省</el-checkbox>
						 		<br/>
						 		<el-checkbox label="city">市</el-checkbox>
						 		<br/>
						 		<el-checkbox label="district">区</el-checkbox>
						         <br/>
						 		<el-checkbox label="keyWords">关键字</el-checkbox> 
						 		<br/>
						 		<el-checkbox label="startNum">起始号</el-checkbox>
						         <br/>
						         <el-checkbox label="endNum">终止号</el-checkbox>
						         <br/>
						         <el-checkbox label="single">单双号</el-checkbox>
						 		<br/>
						 		<el-checkbox label="assistKeyWords">辅助关键字</el-checkbox>
						     </el-checkbox-group>
						     <el-button size="mini" type="warning" plain @click="exportData"
						                v-loading.fullscreen.lock="fullscreenLoading" style="margin-top: 10px">确定
						     </el-button>
							 <el-button type="primary" slot="reference" size="mini" icon="el-icon-top-right" style="margin:0px 10px">导出</el-button>
						 </el-popover>
						 
						 
						
						 <el-button type="primary" size="mini" icon="el-icon-search" @click="selectSubArea()">查询</el-button>
						
					 </div>
				 </el-col>
			   </el-row>			  
		   </div>
		   	<el-table 
			border
			 ref="handSelectTest_multipleTable"
			 v-loading="loading"
			 element-loading-text="权限不足"
			:data="SubArealist" fit highlight-current-row style="width: 100%;"  empty-text="暂无数据" @select="select">
				</el-table-column>
				<el-table-column type="selection" width="40" align="center"></el-table-column>
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
		<SubAreaAddEdit ref="SubAreaAddEdit"></SubAreaAddEdit>
		<SelectSubArea ref="SelectSubArea"></SelectSubArea>
		
		
		

		
		
		
		
		
	</div>
</template>
<script>
	import {getSubAreaList,deleteSubArea,exportSubArea} from '@/api/base/subArea.js'
export default {
	components:{
	      SubAreaAddEdit:()=>import("@/views/base/child/subArea-add-edit.vue"),
	      SelectSubArea:()=>import("@/views/base/select/select-subArea.vue")
	},
	data() {
		return {
			requestParameters:{
			  page:1,
			  size:10,
			  total:0,
			  province:'',
			  city:'',
			  district:''
			},
			fullscreenLoading: false,
			popoverList: [],
			showOrHideHeader:'',
			headerContent:'',
			itemOptions: [
				{ id: 0, title: '分拣编号', type: 'text', key: 'sortingNum' },
				{ id: 1, title: '省', type: 'text', key: 'province' },
				{ id: 2, title: '市', type: 'text', key: 'city' },
				{ id: 3, title: '区', type: 'text', key: 'district' },
				{ id: 4, title: '关键字', type: 'text', key: 'keyWords' },
				{ id: 6, title: '起始号', type: 'text', key: 'startNum' },				
				{ id: 7, title: '终止号', type: 'text', key: 'endNum' },				
				{ id: 8, title: '单双号', type: 'text', key: 'single' },				
				{ id: 9, title: '辅助关键字', type: 'text', key: 'assistKeyWords' },				
			],
			SubArealist: [],
			currentPage: 1,
			search:'',
			selectRow:{},			//选中当前行数据
			selectionLen:0			,//选中行数
			loading:false,
			validate:{
			  point:{
			    sub:this.$access.has_permission('POINT-SUBAREA-LIST'),
			    update:this.$access.has_permission('POINT-SUBAREA-UPDATE'),
			    delete:this.$access.has_permission('POINT-SUBAREA-DELETE'),
			    add:this.$access.has_permission('POINT-SUBAREA-ADD')
			  },
			  api:{
			    list:this.$access.has_api_permission("API-SUBAREA-LIST")
			  }
			},
		};
	},
	methods: {
		
		exportData() {   //导出
		if (this.popoverList && this.popoverList.length == 0) {
		    this.$message.info("请选择要导出的数据");
		    return false;
		}
		    this.$confirm("确定要导出吗?", "友情提示", {type: 'warning'}).then(() => {
		        // this.fullscreenLoading = true;
		        let testData = {
		            "execelOptions": this.popoverList,
					"showOrHideHeader": this.showOrHideHeader,
					"headerContent": this.headerContent
		        }
				console.log("--------------1-------",this.popoverList)
				console.log("---------------2------",this.showOrHideHeader)
				console.log("---------------3------",this.headerContent)
				console.log("------sss---------------",testData)
		        exportSubArea(testData).then(res => {
			
		            const blob = new Blob([res.data]);
		            const fileName = "分区.xlsx";
		            const elink = document.createElement("a");
		            elink.download = fileName;
		            elink.style.display = 'none';
		            elink.href = URL.createObjectURL(blob);
		            document.body.appendChild(elink);
		            elink.click();
		            URL.revokeObjectURL(elink.href);
		            document.body.removeChild(elink);
		
		            this.$message.success("导出成功");
		            this.fullscreenLoading = false;
		        }).catch(() => {
		            this.$message.error("导出失败");
		        })
		    }).catch(() => {
		        this.$message.info("已取消导出");
		        return false;
		    })
		},
		hide() {
		    this.popoverList = [];
			this.showOrHideHeader='';
			 this.headerContent='';
		},
		 //点击行触发，选中或不选中复选框
		   	handleRowClick(row, column, event) {
		        this.$refs.handSelectTest_multipleTable.toggleRowSelection(row);
		        // console.log("this.selecTestContent", this.selectTestContent);
		    },
		getSubAreaList(data){
			//查询列表带分页参数
		  getSubAreaList(data).then(res=>{			  
			  if(res.data.code===10000){	
				  // console.log(res.data.data)
				  this.SubArealist = res.data.data.rows;
				  this.requestParameters.total = res.data.data.total;
			  }
		  })
		},
		handleSizeChange(val){
			//页容量发生改变时，重新查询数据
			this.requestParameters.size=val;
			this.getSubAreaList(this.requestParameters);
		},
		handleCurrentChange(val){
			//页码发生改变时，重新查询数据
			this.requestParameters.page=val;
			this.getSubAreaList(this.requestParameters);
		},
		openWindow(data){
		   if(data == null){
				  this.$refs['SubAreaAddEdit'].showAddress =true;
				  this.$refs['SubAreaAddEdit'].SubAreaData = {};	  
			      this.$refs['SubAreaAddEdit'].SubArea = true;
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
				this.$refs['SubAreaAddEdit'].showAddress =true;
				this.$refs['SubAreaAddEdit'].SubAreaData = this.selectRow;
				this.$refs['SubAreaAddEdit'].SubArea = true;
					  
			   }    
		   }
		},
		selectSubArea(){//条件查询SelectSubArea
			// this.$refs['SelectSubArea'].selectSubArea=true;
			// this.$refs['SelectSubArea'].selectSubAreaData={};
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
		deleteSubArea(){
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
					deleteSubArea(this.selectRow.id).then(res=>{
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
						this.getSubAreaList(this.requestParameters);
					})
				  
				}).catch(() => {	
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});	
			}
		},
		importSubArea(){
			//TODO 导入
			alert("导入")
		},
		exportSubArea(){
			//TODO 导出
			alert("导出")
		}
	},
	created(){
		this.loading=!this.validate.api.list;
		this.getSubAreaList(this.requestParameters);
	}
};
</script>
<style scoped>
	  .box-card {
		margin: 10px;
	    width: 99%;
	  } 
</style>