<template>
	<div>
		<el-dialog title="定区设置" :visible.sync="FixedArea" width="40%">
			<el-form :model="FixedAreaData" :rules="rules" ref="FixedAreaForm" label-width="100px" class="demo-ruleForm" prop>
				<el-form-item label="定区编码" prop="fixedAreaCode"><el-input v-model="FixedAreaData.fixedAreaCode" placeholder="请输入定区编码"></el-input></el-form-item>
				<el-form-item label="定区名称" prop="fixedAreaName"><el-input v-model="FixedAreaData.fixedAreaName" placeholder="请输入定区名称"></el-input></el-form-item>
				<el-form-item label="定区负责人" prop="fixedAreaLeader"><el-input v-model="FixedAreaData.fixedAreaLeader" placeholder="请输入定区负责人"></el-input></el-form-item>
				<el-form-item label="负责人电话" prop="telephone"><el-input v-model="FixedAreaData.telephone" placeholder="请输入负责人电话"></el-input></el-form-item>
				<el-form-item label="所属公司" prop="company"><el-input v-model="FixedAreaData.company" placeholder="请输入所属公司" ></el-input></el-form-item>
				<el-form-item label="关联区域" prop="areaId" >
					<el-select v-model="FixedAreaData.areaId" filterable placeholder="请选择区域" style="width: 100%;">
					    <el-option
						  v-for="item in AreaList"
						  :key="item.id"
						  :label="item.name"
						  :value="item.id">
						</el-option>
					</el-select>
					
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="FixedArea = false">取 消</el-button>
				<el-button type="primary" @click="addSearch('FixedAreaForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
 
<script>
import { saveOrUpdate } from '@/api/base/fixedArea.js';
import { getList } from '@/api/base/area.js';
export default {
	name: 'FixedArea-add-edit',
	data() {
		return {
			FixedArea: false,
			FixedAreaData: {},
			AreaList:[],
			// 校验
			rules: {
				fixedAreaCode: [
					{ required: true, message: '请输入定区名称', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				fixedAreaName: [
					{ required: true, message: '请输入定区名称', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				fixedAreaLeader: [
					{ required: true, message: '请输入定区负责人', trigger: 'blur' },
				],
				telephone: [
					{ required: true, message: '请输入负责人电话', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				company: [
					{ required: true, message: '请输入所属公司', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				areaId: [
					{ required: true, message: '请选择区区域', trigger: 'change' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				
			}
		};
	},
	watch: {},
	methods: {
		getAreaList(){
			let that=this;
			//查询列表带分页参数
			getList().then(res=>{			  
			  if(res.data.code===10000){	
				res.data.data.forEach(item=>{	
					that.AreaList.push({id:item.id,name:item.province+'-'+item.city+'-'+item.district})
				})  				
			  }
			})
		},
		addSearch(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					saveOrUpdate(this.FixedAreaData).then(res => {
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
						this.FixedArea = false;
						this.FixedAreaData = {};
						this.$parent.getFixedAreaList(this.$parent.requestParameters);
					});
				} else {
					return false;
				}
			});
		}
	},
	created() {
		this.getAreaList();
	}
};
</script>

<style></style>
