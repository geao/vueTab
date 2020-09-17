 <template>
	<div>

		
		   <div style=" display: inline-block; width:100% ;margin: 20px 5px 0px 5px;padding: 5px;">
			   <el-row style="width:100%">
			     <el-col :span="12">
					 <div class="grid-content bg-purple">
						 <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="openWindow(null)" :disabled="validate.point.add?null:'disabled'">添加</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-edit" @click="openWindow('update')" :disabled="validate.point.update?null:'disabled'">修改</el-button>
					 </div>
				 </el-col>
			   </el-row>			  
		   </div>
		   <div style="margin: 5px;padding: 5px;">
		   	<el-table 
			 ref="handSelectTest_multipleTable"
			 v-loading="loading"
			 element-loading-text="权限不足"
			 border
			:data="Standardlist" fit highlight-current-row style="width: 100%;"  empty-text="暂无数据" @select="select">
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
		 
		
		</div>
		<StandardAddEdit ref="StandardAddEdit"></StandardAddEdit>
	</div>
</template>
<script>
	import { YearMonthDay } from '@/utils/tools.js'
	import {getStandardList} from '@/api/base/standard.js'
export default {
	components:{
	      StandardAddEdit:()=>import("@/views/base/child/standard-add-edit.vue")
	},
	data() {
		return {
			requestParameters:{
			  page:1,
			  size:10,
			  total:0
			},
			itemOptions: [
				{ id: 0, title: '标准名称', type: 'text', key: 'name' },
				{ id: 1, title: '最大长度', type: 'text', key: 'maxLength' },
				{ id: 2, title: '最大重量', type: 'text', key: 'maxWeight' },
				{ id: 3, title: '最小长度', type: 'text', key: 'minLength' },
				{ id: 4, title: '最小重量', type: 'text', key: 'minxWeight' },
				{ id: 5, title: '操作单位', type: 'text', key: 'operatingCompany' },
				{ id: 6, title: '操作时间', type: 'text', key: 'operatingTime' },
				{ id: 7, title: '操作人', type: 'text', key: 'operator' }						
			],
			Standardlist: [],
			currentPage: 1,
			search:'',
			selectRow:{},			//选中当前行数据
			selectionLen:0			,//选中行数
			loading:false,
			validate:{
			  point:{
			    sub:this.$access.has_permission('POINT-STANDARD-LIST'),
			    update:this.$access.has_permission('POINT-STANDARD-UPDATE'),
			    add:this.$access.has_permission('POINT-STANDARD-ADD')
			  },
			  api:{
			    list:this.$access.has_api_permission("API-STANDARD-LIST")
			  }
			},
		};
	},
	methods: {
		format(data){
			return YearMonthDay(data);
		},
		 //点击行触发，选中或不选中复选框
		   	handleRowClick(row, column, event) {
		        this.$refs.handSelectTest_multipleTable.toggleRowSelection(row);
		        // console.log("this.selecTestContent", this.selectTestContent);
		    },
		getStandardList(data){
			//查询列表带分页参数
		  getStandardList(data).then(res=>{			  
			  if(res.data.code===10000){				  
				  this.Standardlist = res.data.data.rows;
				  
				  this.Standardlist.forEach(item=>{
					  item.operatingTime=this.format(item.operatingTime)
				  })
				  this.requestParameters.total = res.data.data.total;
			  }
		  })
		},
		handleSizeChange(val){
			//页容量发生改变时，重新查询数据
			this.requestParameters.size=val;
			this.getStandardList(this.requestParameters);
		},
		handleCurrentChange(val){
			//页码发生改变时，重新查询数据
			this.requestParameters.page=val;
			this.getStandardList(this.requestParameters);
		},
		openWindow(data){
		   if(data == null){
			   this.$refs['StandardAddEdit'].StandardData = {};
			      this.$refs['StandardAddEdit'].Standard = true;
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
				   this.$refs['StandardAddEdit'].StandardData = this.selectRow;
				      this.$refs['StandardAddEdit'].Standard = true;
			   }    
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
		this.getStandardList(this.requestParameters);
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