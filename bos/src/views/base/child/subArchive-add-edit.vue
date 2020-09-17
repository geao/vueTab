<template>
	<div>
		<el-dialog title="子档案管理" :visible.sync="SubArchive" width="40%">
		 <el-form :model="SubArchiveData" :rules="rules" ref="SubArchiveForm" label-width="120px" class="demo-ruleForm" fullscreen inline prop :disabled="isDisable">
				<el-form-item label="子档案名称" prop="info">
					<el-input v-model="SubArchiveData.info" placeholder="请输入子档案名称">
				</el-input>
				</el-form-item>
				
				</el-form-item>
				<el-form-item label="备注" prop="subRemark">
					<el-input v-model="SubArchiveData.subRemark" placeholder="请输入备注">
				</el-input></el-form-item>
				
		</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="SubArchive = false" size="mini">关 闭</el-button>
				
				<el-button type="primary" @click="addSearch('SubArchiveForm')" size="mini" :style="{display:(isDisable ? 'none':'') }">确 定</el-button>
			</div> 
		</el-dialog>
	</div>
</template>

<script>
import { subSaveOrUpdate } from '@/api/base/archive.js';

export default {
	name: 'SubArchive-add-edit',
	data() {
		return {
			isDisable:false,
			SubArchive:false,
			SubArchiveData: {
				
			},
			// 校验
			rules: {
				// SubArchiveNum: [
				// 	{ required: true, message: '请输入线路名称', trigger: 'blur' }
				// 	// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				// ],
				// SubArchiveName: [{ required: true, message: '请输入线路类型', trigger: 'blur' }],
				
				// remark: [
				// 	{ required: true, message: '请输入备注', trigger: 'blur' }
				// 	// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				// ]
			}
		};
	},
	watch: {
		
	},
	methods: {
		addSearch(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					subSaveOrUpdate(this.SubArchiveData).then(res => {
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
						this.SubArchive = false;
						this.SubArchiveData = {};
						this.$parent.getSubArchiveList(this.$parent.subRequestParameters);
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
