<template>
	<div>
		<el-dialog title="调度任务" :visible.sync="TimingTask" width="40%">
			<el-form :model="TimingTaskData" :rules="rules" ref="TimingTaskForm" label-width="100px" class="demo-ruleForm" prop>
				<el-form-item label="任务名称" prop="jobName"><el-input v-model="TimingTaskData.jobName" placeholder="请输入任务名称"></el-input></el-form-item>
				<el-form-item label="任务分组" prop="jobGroup"><el-input v-model="TimingTaskData.jobGroup" placeholder="请输入任务分组"></el-input></el-form-item>
				<el-form-item label="执行类" prop="jobClassName">
					<el-select v-model="TimingTaskData.jobClassName" placeholder="请选择执行类" style="width: 100%">
						<el-option v-for="item in JobClassName" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="cron表达式" prop="cronExpression">
					<el-input placeholder="请输入cron表达式" v-model="TimingTaskData.cronExpression">
						<el-button slot="append" @click="lookCron()">查看cron表达式</el-button>
					</el-input>
				</el-form-item>
				<el-form-item label="任务描述" prop="description">
					<el-input type="textarea" :rows="2" placeholder="请输入任务描述" v-model="TimingTaskData.description"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="TimingTaskForm = false">取 消</el-button>
				<el-button type="primary" @click="addSearch('TimingTaskForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
//import { saveOrUpdate,getProductName,getUserName } from '@/api/dispatch/TimingTask.js'
import {getJobClassName,saveOrUpdate,isExistJobName} from '@/api/dispatch/TimingTask.js'
export default {
	name: 'TimingTask-add-edit',
	data() {
		return {
			// ProductName:[],
			JobClassName: [],
			TimingTask: false,
			TimingTaskData: {},
			// 校验
			rules: {
				jobName: [
					{ required: true, message: '请输入任务名称', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				jobGroup: [{ required: true, message: '请输入任务分组', trigger: 'blur' }],
				jobClassName: [
					{ required: true, message: '请选择执行类', trigger: 'change' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				cronExpression: [
					{ required: true, message: '请输入cron表达式', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				description: [
					{ required: true, message: '请输入任务描述', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				]
			}
		};
	},
	watch: {},
	methods: {
		lookCron() {
			//跳转到转化cron表达式页面
			window.open('https://qqe2.com/cron', '_blank');
		},
		addSearch(name) {
			 this.$refs[name].validate((valid) => {
			          if (valid) {
						  console.log(this.TimingTaskData);
						  
						  isExistJobName(this.TimingTaskData).then(res=>{
							  if(res.data.code === 50600){
								  saveOrUpdate(this.TimingTaskData).then(res=>{
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
								  						 this.TimingTaskData={};
								    this.$parent.getList(this.$parent.requestParameters);
								  })
							  }else{
								  this.$notify({
								  title: '提示',
								  message: '任务名称或执行类已存在！',
								  type: 'warning',
								  });
							  }
						  })
						  
						  
			          
			          } else {
			            return false;
			          }
			         });
		},
		getProductName() {
			// getProductName().then(res=>{
			// 	console.log(res);
			// 	this.ProductName=res.data.data;
			// })
		},
		getJobClassName(){
			getJobClassName().then(res=>{
				this.JobClassName=res.data;
			})
		},
		getUserName() {
			// getUserName().then(res=>{
			// 	console.log(res);
			// 	this.UserName=res.data.data;
			//   // this.SoldNotelist = res.data.data.orderVo;
			// 		// 	this.totalSales=res.data.data.totalSales;
			// 		// 	this.total=res.data.data.total;
			// })
		}
	},
	created() {
		this.getJobClassName();
		// this.getUserName();
		// this.getProductName();
	}
};
</script>

<style></style>
