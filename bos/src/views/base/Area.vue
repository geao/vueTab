 <template>
	<div>
		<el-card class="box-card" shadow="hover">
		  <div slot="header" class="clearfix" >
		    <span>区域设置</span>
			 </div>
		   <div style=" display: inline-block; width:100%">
			   <el-row style="width:100%">
			     <el-col :span="12">
					 <div class="grid-content bg-purple">
						 <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="openWindow(null)" :disabled="validate.point.add?null:'disabled'">添加</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-edit" @click="openWindow('update')" :disabled="validate.point.update?null:'disabled'">修改</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteArea()" :disabled="validate.point.delete?null:'disabled'">删除</el-button>
						 <!-- <el-button type="primary" size="mini" icon="el-icon-bottom-right" @click="importArea()">导入</el-button> -->
						 <el-popover placement="bottom" @after-leave="hide" style="margin: 0 10px">
						     <!--
						         name:必须和后台对应(一般都为file)
						         limit:上传的个数
						         auto-upload:是否自动上传
						         class:
						         list-type:文件列表的类型
						         file-list:上传的文件列表
						         headers:设置上传的请求头部（放token）
						         drag:是否可以拖拽上传文件，默认为false
						         action:上传的路径
						         on-success:文件上传成功时触发的钩子
						         on-exceed:文件超出限制时触发的钩子
						         on-change:文件状态改变时的钩子
						         on-error:文件上传失败时触发的钩子
						     -->
						     <el-upload ref="upload"
						                name="file"
						                :limit="1"
						                :auto-upload="false"
						                class="upload-demo"
						                list-type="text"
						                :file-list="fileList"
						                :headers="{'Authorization':token()}"
						                :drag="true"
						                action="http://localhost:9001/area/uploadQuestion"
						                :on-success="uploadSuccess"
						                :on-exceed="uploadExceed"
						                :on-change="uploadChange"
						                :on-error="uploadError">
						         <i class="el-icon-upload"></i>
						         <div class="el-upload__text"><em>点击上传</em></div>
						         <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
						     </el-upload>
						     <el-button size="mini" type="warning" plain @click="importData"
						                v-loading.fullscreen.lock="fullscreenLoading" style="margin-top: 10px">确定
						     </el-button>
						     <el-button type="primary" slot="reference" size="mini">导入</el-button>
						 </el-popover>
						 <el-button type="primary" size="mini" icon="el-icon-search" @click="selectArea()">查询</el-button>
						
					 </div>
				 </el-col>
			   </el-row>			  
		   </div>
		   	<el-table 
			border
			 ref="handSelectTest_multipleTable"
			 v-loading="loading"
			 element-loading-text="权限不足"
			:data="Arealist" fit highlight-current-row style="width: 100%;"  empty-text="暂无数据" @select="select">
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
		<AreaAddEdit ref="AreaAddEdit"></AreaAddEdit>
		<SelectArea ref="SelectArea"></SelectArea>
	</div>
</template>
<script>
	import {getAreaList,deleteArea} from '@/api/base/area.js'
	import {getToken} from '@/utils/tools.js'
export default {
	components:{
	      AreaAddEdit:()=>import("@/views/base/child/area-add-edit.vue"),
	      SelectArea:()=>import("@/views/base/select/select-area.vue")
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
			itemOptions: [
				{ id: 0, title: '城市名称', type: 'text', key: 'city' },
				{ id: 1, title: '城市编号', type: 'text', key: 'cityCode' },
				{ id: 2, title: '区', type: 'text', key: 'district' },
				{ id: 3, title: '邮政编码', type: 'text', key: 'postCode' },
				{ id: 4, title: '省', type: 'text', key: 'province' },
				{ id: 5, title: '简码', type: 'text', key: 'shirtCode' }				
			],
			Arealist: [],
			fileList: [],
			fullscreenLoading:false,
			currentPage: 1,
			search:'',
			selectRow:{},			//选中当前行数据
			selectionLen:0			,//选中行数
			loading:false,
			validate:{
			  point:{
			    sub:this.$access.has_permission('POINT-AREA-LIST'),
			    update:this.$access.has_permission('POINT-AREA-UPDATE'),
			    delete:this.$access.has_permission('POINT-AREA-DELETE'),
			    add:this.$access.has_permission('POINT-AREA-ADD')
			  },
			  api:{
			    list:this.$access.has_api_permission("API-AREA-LIST")
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
		getAreaList(data){
			//查询列表带分页参数
		  getAreaList(data).then(res=>{			  
			  if(res.data.code===10000){	
				  // console.log(res.data.data)
				  this.Arealist = res.data.data.rows;
				  this.requestParameters.total = res.data.data.total;
			  }
		  })
		},
		handleSizeChange(val){
			//页容量发生改变时，重新查询数据
			this.requestParameters.size=val;
			this.getAreaList(this.requestParameters);
		},
		handleCurrentChange(val){
			//页码发生改变时，重新查询数据
			this.requestParameters.page=val;
			this.getAreaList(this.requestParameters);
		},
		openWindow(data){
		   if(data == null){
				  this.$refs['AreaAddEdit'].showAddress =true;
				  this.$refs['AreaAddEdit'].AreaData = {};	  
			      this.$refs['AreaAddEdit'].Area = true;
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
				this.$refs['AreaAddEdit'].showAddress =true;
				this.$refs['AreaAddEdit'].AreaData = this.selectRow;
				this.$refs['AreaAddEdit'].Area = true;
					  
			   }    
		   }
		},
		selectArea(){//条件查询SelectArea
			this.$refs['SelectArea'].selectArea=true;
			this.$refs['SelectArea'].selectAreaData={};
			this.requestParameters.province='';
			this.requestParameters.city='';
			this.requestParameters.district='';
		},
		select(selection, row){
			//selection选中复选框的数组
			//选中行数
			this.selectionLen=selection.length;
			//选中时当前行数据
			[this.selectRow]=selection;
		},
		deleteArea(){
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
					deleteArea(this.selectRow.id).then(res=>{
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
						this.getAreaList(this.requestParameters);
					})
				  
				}).catch(() => {	
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});	
			}
		},
		hide() {
		    this.fileList = [];
		},
		token() {
		    return getToken();
		},
		uploadSuccess(response, file, fileList) {
		
		},
		uploadExceed(files, fileList) {
		    this.$message.info("上传文件的个数超过限制");
		    return false;
		},
		uploadChange(file, fileList) {
		    if (file.size / 1024 / 1024 > 50) {
		        this.$refs.upload.uploadFiles = [];
		        this.$message.error("上传的文件大小不能超过50MB");
		        return false;
		    }
		},
		uploadError(err, file, fileList) {
		    this.$message.error(file.name + "文件上传失败");
		    return false;
		},
		importData() {
		    if (this.$refs.upload.uploadFiles.length != 1) {
		        this.$message.error("请选择文件");
		        return false;
		    }
		    this.$confirm("文件一旦上传，无法修改，你确定提交吗?", "友情提示", {type: 'info'}).then(() => {
		        this.fullscreenLoading = true;
		        this.$refs.upload.submit();
		        setTimeout(() => {
		            this.$message.success("导入成功");
		            this.fullscreenLoading = false;
		            this.getAreaList(this.requestParameters);
		        }, 2000)
		    })
		}
	},
	created(){
		this.loading=!this.validate.api.list;
		this.getAreaList(this.requestParameters);
	}
};
</script>
<style scoped>
	  .box-card {
		margin: 10px;
	    width: 99%;
	  } 
</style>