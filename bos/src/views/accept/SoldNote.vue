 <template>
	<div>
		<el-card class="box-card" shadow="hover">
		  <div slot="header" class="clearfix" >
		    <span>销售记录管理</span>
			 </div>
		   <div style=" display: inline-block; width:100%">
			   <el-row style="width:100%">
			     <el-col :span="12">
					 <div class="grid-content bg-purple">
						 <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="openWindow(null)">添加</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-edit" @click="openWindow('update')">修改</el-button>
						 <el-button type="primary" size="mini" icon="el-icon-document-add" @click="deleteSold()">删除</el-button>
					 </div>
				 </el-col>
				 <el-col :span="12">
					 <div class="grid-content bg-purple" style="text-align: right;">
						销售笔数：{{total}} 总销售额：¥{{totalSales}}
						
					 </div>
				 </el-col>
			   </el-row>			  
		   </div>
		   	<el-table 
			:data="SoldNotelist" fit highlight-current-row style="width: 100%;"  empty-text="暂无数据" @select="select">
				</el-table-column>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column v-for="item in itemOptions" :key="item.id" :label="item.title" :prop="item.key" align="center">

		   		</el-table-column>
		   	</el-table>
		   	<!-- <div class="block">
		   		<el-pagination 
				:current-page="requestParameters.page" 
				:page-sizes="[10, 20, 50, 100]" 
				:page-size="requestParameters.size" 
				background 
				layout="total, sizes, prev, pager, next, jumper" 
				:total="requestParameters.total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"> -->
		   			<!-- 
		   	  
		   	   background
		   	   @size-change:       pageSize 改变时会触发	每页条数
		   	   @current-change     currentPage 改变时会触发	当前页
		   	   :current-page：	   当前页数，
		   	   :page-sizes：			每页显示个数选择器的选项设置	number[]	—	[10, 20, 30, 40, 50, 100]
		   	   :page-size:			每页显示条目个数，默认值10
		   	   layout	组件布局，子组件名用逗号分隔	String
		   	   total	总条目数
		   	   -->
		   		<!-- </el-pagination>
		   	</div>
		 -->
		
		</el-card>
		<SoldNoteAddEdit ref="soldNoteAddEdit"></SoldNoteAddEdit>
	</div>
</template>
<script>
	import { getSoldNoteList,deleteSoldNote } from '@/api/accept/soldNote.js'
export default {
	components:{
	      SoldNoteAddEdit:()=>import("@/views/accept/child/sold-note-add-edit.vue")
	},
	data() {
		return {
			// requestParameters:{
			//   page:1,
			//   size:10,
			//   total:0s
			// },
			itemOptions: [
				{ id: 0, title: '销售日期', type: 'text', key: 'orderTime' },
				{ id: 1, title: '客户编号', type: 'text', key: 'userCode' },
				{ id: 2, title: '客户名称', type: 'text', key: 'userName' },
				{ id: 3, title: '产品编号', type: 'text', key: 'productCode' },
				{ id: 4, title: '产品名称', type: 'text', key: 'productName' },
				{ id: 5, title: '单价(￥)', type: 'text', key: 'productPrice' },
				{ id: 6, title: '数量', type: 'text', key: 'orderNumber' },
				{ id: 7, title: '销售额(￥)', type: 'text', key: 'sales' }						
			],
			SoldNotelist: [],
			totalSales:0,
			total:0,
			selectRow:{},
			selection:0
			// currentPage: 1,
			// search:''
		};
	},
	methods: {
		getList(){
		  getSoldNoteList().then(res=>{
		    this.SoldNotelist = res.data.data.orderVo;
			this.totalSales=res.data.data.totalSales;
			this.total=res.data.data.total;
		   
		  })
		},
		openWindow(data){
			 
		   if(data == null){
			   
			   this.$refs['soldNoteAddEdit'].soldNoteData = {};
			      this.$refs['soldNoteAddEdit'].soldNote = true;
		   } else{
			   if(this.selection>1){
				   this.$notify({
				             title: '警告',
				             message: '只能修改一条数据',
				             type: 'warning'
				     });
			   }else if(this.selection<1){
				this.$notify({
				          title: '警告',
				          message: '请选择要修改的数据',
				          type: 'warning'
				  });
			}else{
				   this.$refs['soldNoteAddEdit'].soldNoteForm = this.selectRow;
				      this.$refs['soldNoteAddEdit'].soldNote = true;
			   }
			    
		   }
		
		},
		deleteSold(){
			
			//删除
			if(this.selection>1){
							   this.$notify({
							             title: '警告',
							             message: '一次只能删除一条数据',
							             type: 'warning'
							     });
			}else if(this.selection<1){
				
				this.$notify({
				          title: '警告',
				          message: '请选择要删除的数据',
				          type: 'warning'
				  });
			}else{
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							deleteSoldNote(this.selectRow).then(res=>{
												if(res.data.code === 10000){
												  console.log(res.data.message);
												}else{
												   console.log(res.data.message);
												}
												this.getList();
							})
							
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
			this.selection=selection.length;
			//console.log(row.);
			[this.selectRow]=selection;
			
			
		}
		// handleSizeChange(val){
		// 	this.requestParameters.size=val;
		// 	this.getSoldNoteList(this.requestParameters);
		// },
		// handleCurrentChange(val){
		// 	this.requestParameters.page=val;
		// 	this.getSoldNoteList(this.requestParameters);
		// }
	},
	created(){
		this.getList();
	}
};
</script>
<style scoped>
	  .box-card {
	    width: 100%;
	  } 
</style>