 <template>
	<div>
		<el-card class="box-card" shadow="hover">
		  <div slot="header" class="clearfix" >
		    <span>基础档案管理</span>
			 </div>
		   <div style=" display: inline-block; width:100%">
			   <el-row style="width:100%">
			     <el-col :span="12">
					 <div class="grid-content bg-purple">
						 <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="openWindow(null)" :disabled="validate.point.add?null:'disabled'">添加</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-edit" @click="openWindow('update')"  :disabled="validate.point.update?null:'disabled'">修改</el-button>
					 </div>
				 </el-col>
			   </el-row>			  
		   </div>
			<el-table
				ref="handSelectTest_multipleTable"
				:data="Archivelist"
				empty-text="暂无数据"
				fit
				highlight-current-row
				style="width: 100%" 
				max-height="640"
				v-loading="loading"
				@row-dblclick="handleRowdbClick"
				@select="select"
				element-loading-text="权限不足"
				border> 
				<el-table-column type="selection" width="40" align="center"></el-table-column>
				<el-table-column type="index" width="60" label="序号" align="center"></el-table-column>
		
				<el-table-column
					prop="archiveNum"
					label="基础档案编号" 
					align="center"
					>
				</el-table-column>
				<el-table-column
					prop="archiveName"
					label="基础档案名称" 
					align="center"
					>
				</el-table-column>
				<el-table-column
					prop="hasChild"
					label="是否分级" 
					align="center"
					>
		
					<template slot-scope="scope">
						 <el-tag size="mini" :type="scope.row.hasChild == '1' ? 'success' : 'warning'">{{scope.row.hasChild == '1' ? '分级':'不分级'}}</el-tag></span>
					</template>
					
				</el-table-column>
				<el-table-column
					prop="remark"
					label="备注" 
					align="center"
					>
				</el-table-column>
		
			</el-table>
		   	<div class="block">
		   		<el-pagination 
				:current-page="requestParameters.page" 
				:page-sizes="[3, 6]" 
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
			 <!--
			 @row-dblclick="handleRowdbClick" -->
			 <div :style="{display:show}">
				 <el-card class="box-card" shadow="hover">
				   <div slot="header" class="clearfix" >
				     <span>子档案管理</span>
				 	 </div>
				    <div style=" display: inline-block; width:100%">
				 	   <el-row style="width:100%">
				 	     <el-col :span="12">
				 			 <div class="grid-content bg-purple">
				 				 <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="openSubWindow(null)" :disabled="validate.point.subAdd?null:'disabled'">添加</el-button>
				 				 <el-button type="primary" size="mini" icon="el-icon-edit" @click="openSubWindow('update')" :disabled="validate.point.subUpdate?null:'disabled'">修改</el-button>
				 				
				 			 </div>
				 		 </el-col>
				 	   </el-row>			  
				    </div>
				    	<el-table
				    	 ref="sub"
						 border
						 v-loading="subLoading"
						 element-loading-text="权限不足"
				    	:data="SubArchivelist" fit highlight-current-row style="width: 100%;"  empty-text="暂无数据" @select="subSelect">
				    		</el-table-column>
				    		<el-table-column type="selection" width="55"></el-table-column>
				    		<el-table-column v-for="item in subItemOptions" :key="item.id" :label="item.title" :prop="item.key" align="center">	
				    		</el-table-column>
				    	</el-table>
				    	<div class="block">
				    		<el-pagination 
				 		:current-page="subRequestParameters.page" 
				 		:page-sizes="[5, 10]" 
				 		:page-size="subRequestParameters.size" 
				 		background 
						:hide-on-single-page="true"
				 		layout="total, sizes, prev, pager, next, jumper" 
				 		:total="subRequestParameters.total"
				 		@size-change="subHandleSizeChange"
				 		@current-change="subHandleCurrentChange">
				    		</el-pagination>
				    	</div>
				 	</el-card>
			 </div>
		<ArchiveAddEdit ref="ArchiveAddEdit"></ArchiveAddEdit>
		<SubArchiveAddEdit ref="SubArchiveAddEdit"></SubArchiveAddEdit>
	</div>
</template>
<script>
	import {getArchiveList,getSubArchiveList} from '@/api/base/archive.js'
	
export default {
	components:{
	      ArchiveAddEdit:()=>import("@/views/base/child/archive-add-edit.vue"),
		  SubArchiveAddEdit:()=>import("@/views/base/child/subArchive-add-edit.vue")
	},
	data() {
		return {
			//-------------------------------基础
			show:"none",
			requestParameters:{
			  page:1,
			  size:3,
			  total:0
			},
			Archivelist: [],
			selectRow:{},			//选中当前行数据
			selectionLen:0,			//选中行数
			//-------------------------------子
			subRequestParameters:{
			  page:1,
			  size:5,
			  total:0
			},
			subItemOptions: [
				{ id: 0, title: '子档案名称', type: 'text', key: 'info' },
				{ id: 3, title: '子档案备注', type: 'text', key: 'subRemark' }			
			],
			SubArchivelist:[],
			subSelectRow:{},			//选中当前行数据
			subSelectionLen:0,			//选中行数
			loading:false,
			subLoading:false,
			validate:{
			  point:{
			    list:this.$access.has_permission('POINT-ARCHIVE-LIST'),
			    update:this.$access.has_permission('POINT-ARCHIVE-UPDATE'),
			    add:this.$access.has_permission('POINT-ARCHIVE-ADD'),
				subList:this.$access.has_permission('POINT-SUBARCHIVE-LIST'),
				subUpdate:this.$access.has_permission('POINT-SUBARCHIVE-UPDATE'),
				subAdd:this.$access.has_permission('POINT-SUBARCHIVE-ADD')
			  },
			  api:{
			    list:this.$access.has_api_permission("API-ARCHIVE-LIST"),
				subList:this.$access.has_api_permission("API-SUBARCHIVE-LIST"),
			  }
			},
			
		};
	},
	watch:{
		// SubArchivelist(val){
		// 	//console.log(val)
		// 	if(val.length>0){
		// 		this.show="block"
				
		// 	}else{
		// 		this.show="none"
		// 	}
		// }
	},
	methods: {
		//--------------------------------------------基础
		 //点击行触发，选中或不选中复选框
		handleRowdbClick(row){
			// row.id 
		
			this.subRequestParameters.id=row.id;
			if(row.hasChild==1){
				this.show="block";
			}else{
				this.show="none";
			}
			//查询子档案列表
			this.getSubArchiveList(this.subRequestParameters);
			
		},
		
		getArchiveList(data){
			//查询列表带分页参数
		  getArchiveList(data).then(res=>{		
			  //console.log(res);
			  if(res.data.code===10000){				  
				  this.Archivelist = res.data.data.rows;
				  // this.Archivelist.forEach(item=>{
					 //  item.hasChild=="1" ? item.hasChild="分级" : item.hasChild="不分级"
				  // })
				  this.requestParameters.total = res.data.data.total;
			  }
		  })
		},
		handleSizeChange(val){
			//页容量发生改变时，重新查询数据
			this.requestParameters.size=val;
			this.getArchiveList(this.requestParameters);
		},
		
		handleCurrentChange(val){
			//页码发生改变时，重新查询数据
			this.requestParameters.page=val;
			this.getArchiveList(this.requestParameters);
		},
		openWindow(data){
		   if(data == null){
			   this.$refs['ArchiveAddEdit'].ArchiveData = {};
			      this.$refs['ArchiveAddEdit'].Archive = true;
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
				  this.$refs['ArchiveAddEdit'].ArchiveData = this.selectRow;
				 // console.log(this.selectRow)
				  if(this.selectRow.hasChild=='1'){
					 this.$refs['ArchiveAddEdit'].hasChild=true;
				  }
				  this.$refs['ArchiveAddEdit'].Archive = true;
			   }    
		   }
		},
		select(selection, row){
			//selection选中复选框的数组
			//选中行数
			this.selectionLen=selection.length;
			//选中时当前行数据
			[this.selectRow]=selection;
		},
		//-----------------------------------------------------子档案
		getSubArchiveList(data){
			getSubArchiveList(data).then(res=>{
				if(res.data.code===10000){
				  this.SubArchivelist = res.data.data.rows;
				  this.subRequestParameters.total = res.data.data.total;
				}
			})
		},
		subHandleCurrentChange(val){
			//页码发生改变时，重新查询数据
			this.subRequestParameters.page=val;
			this.getSubArchiveList(this.subRequestParameters);
		},
		subHandleSizeChange(val){
			//页容量发生改变时，重新查询数据
			this.subRequestParameters.size=val;
			this.getSubArchiveList(this.subRequestParameters);
		},
		details(){
			//详情
			if(this.subSelectionLen>1){
			   this.$notify({
					 title: '警告',
					 message: '一次只能查看一条数据',
					 type: 'warning'
				 });
			}else if(this.subSelectionLen<1){	
				this.$notify({
					  title: '警告',
					  message: '请选择要查看的数据',
					  type: 'warning'
				  });
			}else{
					this.$refs['SubArchiveAddEdit'].SubArchiveData = this.subSelectRow;
					this.$refs['SubArchiveAddEdit'].SubArchive = true;
					this.$refs['SubArchiveAddEdit'].isDisable = true;
			}
		},
		openSubWindow(data){
		   if(data == null){
			   this.$refs['SubArchiveAddEdit'].SubArchiveData = {};
			      this.$refs['SubArchiveAddEdit'].SubArchive = true;
				  this.$refs['SubArchiveAddEdit'].isDisable = false;
		   } else{
			   if(this.subSelectionLen>1){
				   this.$notify({
				             title: '警告',
				             message: '只能修改一条数据',
				             type: 'warning'
				     });
			   }else if(this.subSelectionLen<1){
				this.$notify({
				          title: '警告',
				          message: '请选择要修改的数据',
				          type: 'warning'
				  });
			}else{
				  this.$refs['SubArchiveAddEdit'].SubArchiveData = this.subSelectRow;
				  this.$refs['SubArchiveAddEdit'].SubArchive = true;
				  this.$refs['SubArchiveAddEdit'].isDisable = false;
			   }    
		   }
		   this.$refs['SubArchiveAddEdit'].SubArchiveData.archiveId=this.subRequestParameters.id;
		},
		subSelect(selection,row){
			//selection选中复选框的数组
			//选中行数
			this.subSelectionLen=selection.length;
			//选中时当前行数据
			[this.subSelectRow]=selection;
		}
	},
	created(){
		this.loading=!this.validate.api.list;
		this.subLoading=!this.validate.api.subList;
		this.getArchiveList(this.requestParameters);
	}
};
</script>
<style scoped>
	  .box-card {
	    width: 99%;
		margin: 10px;
	  } 
</style>