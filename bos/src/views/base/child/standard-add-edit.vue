<template>
	<div>
		<el-dialog title="收派标准" :visible.sync="Standard" width="40%">
			<el-form :model="StandardData" :rules="rules" ref="StandardForm" label-width="100px" class="demo-ruleForm" prop>
				<el-form-item label="标准名称" prop="name"><el-input v-model="StandardData.name" placeholder="请输入标准名称"></el-input></el-form-item>
				<el-form-item label="最大长度" prop="maxLength"><el-input v-model="StandardData.maxLength" placeholder="请输入最大长度"></el-input></el-form-item>
				<el-form-item label="最大重量" prop="maxWeight"><el-input v-model="StandardData.maxWeight" placeholder="请输入最大重量"></el-input></el-form-item>
				<el-form-item label="最小长度" prop="minLength"><el-input v-model="StandardData.minLength" placeholder="请输入最小长度" ></el-input></el-form-item>
				<el-form-item label="最小重量" prop="minxWeight"><el-input v-model="StandardData.minxWeight" placeholder="请输入最小重量"></el-input></el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="Standard = false">取 消</el-button>
				<el-button type="primary" @click="addSearch('StandardForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
 
<script>
import { saveOrUpdate } from '@/api/base/standard.js';

export default {
	name: 'Standard-add-edit',
	data() {
		return {
			Standard: false,
			StandardData: {},
			// 校验
			rules: {
				name: [
					{ required: true, message: '请输入标准名称', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				maxLength: [
					{ required: true, message: '请输入最大长度', trigger: 'blur' },
				],
				maxWeight: [
					{ required: true, message: '请输入最大重量', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				minLength: [
					{ required: true, message: '请输入最小长度', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				minxWeight: [
					{ required: true, message: '请输入最小重量', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				
			}
		};
	},
	watch: {},
	methods: {
		addSearch(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					saveOrUpdate(this.StandardData).then(res => {
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
						this.Standard = false;
						this.StandardData = {};
						this.$parent.getStandardList(this.$parent.requestParameters);
					});
				} else {
					return false;
				}
			});
		}
	},
	created() {}
};
</script>

<style></style>
