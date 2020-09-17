 <template>
	<div>
		<el-card class="box-card" shadow="hover">
		  <div slot="header" class="clearfix" >
		    <span>定时任务管理</span>
			 </div>
		   <div style=" display: inline-block; width:100%">
			   <el-row style="width:100%">
			     <el-col :span="12">
					 <div class="grid-content bg-purple">
						 <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="openWindow(null)">新增调度</el-button>
					 </div>
				 </el-col>
			   </el-row>			  
		   </div>
		   	<el-table 
			:data="TimingList" fit highlight-current-row style="width: 100%;"  empty-text="暂无数据" @select="select">
			 <el-table-column label="序号"  align="center"
			      type="index"
			      :width="requestParameters.total">
			    </el-table-column>
			
				
				<el-table-column v-for="item in itemOptions" :key="item.id" :label="item.title" :prop="item.key" align="center">

		   		</el-table-column>
				<el-table-column label="操作" width=350 align="center">
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
						  type="primary"
						  icon="el-icon-thumb"
				          @click="handleTrigger(scope.$index, scope.row)">触发</el-button>
				        <el-button
				          size="mini"
				         type="primary"
						 icon="el-icon-video-pause"
				          @click="handlePause(scope.$index, scope.row)">暂停</el-button>
				      
					  <el-button
					      size="mini"
						  type="primary"
						  icon="el-icon-video-play"
					      @click="handleResume(scope.$index, scope.row)">恢复</el-button>
					    <el-button
					      size="mini"
					      type="primary"
						  icon="el-icon-switch-button"
					      @click="handleRemove(scope.$index, scope.row)">结束</el-button>
					  </template>
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
		<TimingTaskAddEdit ref="TimingTaskAddEdit"></TimingTaskAddEdit>
	</div>
</template>
<script>
	// import { getSoldNoteList,deleteSoldNote } from '@/api/accept/soldNote.js'
	import {getTimingList,TimingTrigger,TimingPause,TimingResume,TimingRemove} from '@/api/dispatch/TimingTask.js'
export default {
	components:{
	     TimingTaskAddEdit:()=>import("@/views/dispatch/child/TimingTask-add-edit.vue")
	},
	data() {
		return {
			requestParameters:{
			  page:1,
			  size:10,
			  total:0
			},
			itemOptions: [
				// { id: 0, title: '序号', type: 'text', key: 'id' },
				{ id: 1, title: '任务名称', type: 'text', key: 'jobName' },
				{ id: 2, title: '任务分组', type: 'text', key: 'jobGroup' },
				{ id: 3, title: '执行类', type: 'text', key: 'jobClassName' },
				{ id: 4, title: 'cron表达式', type: 'text', key: 'cronExpression' },
				{ id: 5, title: '触发器状态', type: 'text', key: 'triggerState' },
				{ id: 6, title: '描述', type: 'text', key: 'description' }
									
			],
			TimingList: [],
			selectRow:{},
			selection:0
			
		};
	},
	methods: {
		
		getList(data){
		  getTimingList(data).then(res=>{
			  console.log(res);
		    this.TimingList = res.data.rows;
			this.requestParameters.total=res.data.total;
		  })
		},
		openWindow(data){
		   if(data == null){
			   this.$refs['TimingTaskAddEdit'].TimingTaskData = {};
			      this.$refs['TimingTaskAddEdit'].TimingTask = true;
		   }else{
				 this.$refs['TimingTaskAddEdit'].TimingTaskData = this.selectRow;
				    this.$refs['TimingTaskAddEdit'].TimingTask = true;
		   }
		},
		deleteSold(){			
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
					this.getList(this.requestParameters);
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
		},
		select(selection, row){
			this.selection=selection.length;
			//console.log(row.);
			[this.selectRow]=selection;
			
			
		},
		handleTrigger(val,rows){
			
			this.$confirm('此操作将会触发当前选中任务, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
						TimingTrigger(rows).then(res=>{
							if(res.data.code === 10000){
									this.$notify({
									          title: '提示',
									          message: res.data.message,
									          type: 'success'
									  });					 
							   
							  }else{
							     this.$notify({
							               title: '提示',
							               message: res.data.message,
							               type: 'warning'
							       });
							  }
							  this.TimingTask = false;
							
							  this.getList(this.requestParameters);
							
						})
			        }).catch(() => {
						
			          this.$message({
			            type: 'info',
			            message: '已取消'
			          });          
			        });
			
		},
		handlePause(val,rows){
			if(rows.triggerState=="PAUSED"){
				this.$notify({
				          title: '警告',
				          message: '当前任务已经停止了！！',
				          type: 'warning'
				  });	
			}else{
				this.$confirm('此操作将会停止当前选中任务, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							TimingPause(rows).then(res=>{
								if(res.data.code === 10000){
										this.$notify({
										          title: '提示',
										          message: res.data.message,
										          type: 'success'
										  });					 
								   
								  }else{
								     this.$notify({
								               title: '提示',
								               message: res.data.message,
								               type: 'warning'
								       });
								  }
								  this.TimingTask = false;
								
								  this.getList(this.requestParameters);
								
							})
				        }).catch(() => {
							
				          this.$message({
				            type: 'info',
				            message: '已取消'
				          });          
				        });
			}
			
			
		},
		handleResume(val,rows){
			if(rows.triggerState=="RUNNING"){
				this.$notify({
				          title: '警告',
				          message: '当前任务已经恢复了！！',
				          type: 'warning'
				  });	
			}else{
			this.$confirm('此操作将会恢复当前选中任务, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
						TimingResume(rows).then(res=>{
							if(res.data.code === 10000){
									this.$notify({
									          title: '提示',
									          message: res.data.message,
									          type: 'success'
									  });					 
							   
							  }else{
							     this.$notify({
							               title: '提示',
							               message: res.data.message,
							               type: 'warning'
							       });
							  }
							  this.TimingTask = false;
							
							  this.getList(this.requestParameters);
							
						})
			        }).catch(() => {
						
			          this.$message({
			            type: 'info',
			            message: '已取消'
			          });          
			        });
			}
		},
		handleRemove(val,rows){
			this.$confirm('此操作将会结束当前选中任务, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
						TimingRemove(rows).then(res=>{
							if(res.data.code === 10000){
									this.$notify({
									          title: '提示',
									          message: res.data.message,
									          type: 'success'
									  });					 
							   
							  }else{
							     this.$notify({
							               title: '提示',
							               message: res.data.message,
							               type: 'warning'
							       });
							  }
							  this.TimingTask = false;
							
							  this.getList(this.requestParameters);
							
						})
			        }).catch(() => {
						
			          this.$message({
			            type: 'info',
			            message: '已取消'
			          });          
			        });
			
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
		
		this.getList(this.requestParameters);
	}
};
</script>
<style scoped>
	  .box-card {
	    width: 100%;
	  } 
</style>