<template>
	<div>
		<el-dialog title="基础档案管理" :visible.sync="Archive" width="40%">
		 <el-form :model="ArchiveData" :rules="rules" ref="ArchiveForm" label-width="150px" class="demo-ruleForm" prop>
				<el-form-item label="基础档案编号" prop="archiveNum"><el-input v-model="ArchiveData.archiveNum" placeholder="请输入基础档案编号"></el-input></el-form-item>
				<el-form-item label="基础档案名称" prop="archiveName"><el-input v-model="ArchiveData.archiveName" placeholder="请输入基础档案名称"></el-input></el-form-item>
				<el-form-item label="是否分级" prop="hasChild">
					<el-switch
					  v-model="hasChild"
					  active-text="分级"
					  inactive-text="不分级">
					</el-switch>
					</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input placeholder="请输入备注" v-model="ArchiveData.remark" type="textarea"></el-input>
					</el-form-item>
		</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="Archive = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="addSearch('ArchiveForm')" size="mini">确 定</el-button>
			</div> 
		</el-dialog>
	</div>
</template>

<script>
import { saveOrUpdate } from '@/api/base/archive.js';

export default {
	name: 'Archive-add-edit',
	data() {
		return {
			hasChild: false,
			Archive: false,
			ArchiveData: {
				
			},
			// 校验
			rules: {
				archiveNum: [
					{ required: true, message: '请输入线路名称', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				archiveName: [{ required: true, message: '请输入线路类型', trigger: 'blur' }],
				
				remark: [
					{ required: true, message: '请输入备注', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				]
			}
		};
	},
	watch: {
		hasChild(val){
			if(val){
				//分级
				this.ArchiveData.hasChild='1'
			}else{
				//不分级
				this.ArchiveData.hasChild='0'
			}
		}
		
	},
	methods: {
		addSearch(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					if(this.ArchiveData.id!=null){
						//修改
						//如果修改分级的话当前档案下不允许有分级
					}
					saveOrUpdate(this.ArchiveData).then(res => {
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
						this.Archive = false;
						this.ArchiveData = {};
						this.$parent.getArchiveList(this.$parent.requestParameters);
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
