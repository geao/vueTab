<template>
	<div>
		<el-dialog title="收派时间管理" :visible.sync="TakeTime" width="40%">
			<el-form :model="TakeTimeData" :rules="rules" ref="TakeTimeForm" label-width="130px" class="demo-ruleForm" prop>
				<el-form-item label="时间名称" prop="name">
					<el-input v-model="TakeTimeData.name" placeholder="请输入时间名称"></el-input>
					</el-form-item>
				<el-form-item label="平常上班时间" prop="normalWorkTime"><el-input v-model="TakeTimeData.normalWorkTime" placeholder="请输入平常上班时间"></el-input></el-form-item>
				<el-form-item label="平常下班时间" prop="normalDutyTime"><el-input v-model="TakeTimeData.normalDutyTime" placeholder="请输入平常下班时间"></el-input></el-form-item>
				<el-form-item label="周六上班时间" prop="satWorkTime"><el-input  v-model="TakeTimeData.satWorkTime" placeholder="请输入周六上班时间"></el-input></el-form-item>
				<el-form-item label="周六下班时间" prop="satDutyTime"><el-input v-model="TakeTimeData.satDutyTime" placeholder="请输入周六下班时间"></el-input></el-form-item>
				<el-form-item label="周日上班时间" prop="sunWorkTime"><el-input v-model="TakeTimeData.sunWorkTime" placeholder="请输入周日上班时间"></el-input></el-form-item>
				<el-form-item label="周日下班时间" prop="sunDutyTime"><el-input v-model="TakeTimeData.sunDutyTime" placeholder="请输入周日下班时间"></el-input></el-form-item>
				<!-- <el-input  v-model="TakeTimeData.company" placeholder="请输入所属单位" ></el-input></el-form-item>
				 -->
				 <el-form-item label="所属单位" prop="company">
					<el-input v-model="TakeTimeData.company" placeholder="请输入所属单位"></el-input>
				 </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="TakeTime = false">取 消</el-button>
				<el-button type="primary" @click="addSearch('TakeTimeForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { saveOrUpdate } from '@/api/base/takeTime.js';

export default {
	name: 'TakeTime-add-edit',
	data() {
		return {
			TakeTime: false,
			TakeTimeData: {},
			// 校验
			rules: {
				name: [
					{ required: true, message: '请输入时间名称', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				normalWorkTime: [{ required: true, message: '请输入平常上班时间', trigger: 'blur' }],
				satWorkTime: [
					{ required: true, message: '请输入平常下班时间', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				satDutyTime: [
					{ required: true, message: '请输入周六上班时间', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				sunWorkTime: [
					{ required: true, message: '请输入周日上班时间', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				sunDutyTime: [
					{ required: true, message: '请输入周日下班时间', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				companyId: [
					{ required: true, message: '请选择所属单位', trigger: 'change' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
			
			},
			department:{
				data:[]
			},
		}
	},
	watch: {},
	methods: {
		
		addSearch(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					
					saveOrUpdate(this.TakeTimeData).then(res => {
						if (res.data.code === 10000) {
							this.$notify({
								title: '提示',
								message: res.data.message,
								type: 'success'
							});
						} else {
							this.$notify({
								title: '提示',
								message: res.data.message,
								type: 'warning'
							});
						}
						this.TakeTime = false;
						this.TakeTimeData = {};
						this.$parent.getTakeTimeList(this.$parent.requestParameters);
					});
				} else {
					return false;
				}
			});
		}
	},
	created() {
		
	}
};
</script>

<style></style>
