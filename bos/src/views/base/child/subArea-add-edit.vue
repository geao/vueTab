<template>
	<div>
		<el-dialog title="定区设置" :visible.sync="SubArea" width="40%">
			<el-form :model="SubAreaData" :rules="rules" ref="SubAreaForm" label-width="120px" class="demo-ruleForm" prop  inline>
				<el-form-item label="分拣编号" prop="sortingNum" ><el-input v-model="SubAreaData.sortingNum" placeholder="请输入分拣编号" style="width: 230px;"></el-input></el-form-item>
				<el-form-item label="区域" prop="areaId">
					<el-select v-model="SubAreaData.areaId" filterable placeholder="请选择区域"  style="width: 230px;">
					    <el-option
						  v-for="item in AreaList"
						  :key="item.id"
						  :label="item.name"
						  :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="定区" prop="fixedAreaId">
					<el-select v-model="SubAreaData.fixedAreaId" filterable placeholder="请选择定区" style="width: 230px;">
					    <el-option
						  v-for="item in FixedAreaList"
						  :key="item.id"
						  :label="item.fixedAreaName"
						  :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="关键字" prop="keyWords"><el-input v-model="SubAreaData.keyWords" placeholder="请输入关键字" style="width: 230px;"></el-input></el-form-item>
				<el-form-item label="起始号" prop="startNum"><el-input v-model="SubAreaData.startNum" placeholder="请输入起始号" style="width: 230px;"></el-input></el-form-item>
				<el-form-item label="终止号" prop="endNum"><el-input v-model="SubAreaData.endNum" placeholder="请输入终止号" style="width: 230px;"></el-input></el-form-item>
				<el-form-item label="单双号" prop="single">
					
					<el-radio-group v-model="SubAreaData.single">
						<el-radio :label="'0'">单双号</el-radio>
						<el-radio :label="'1'">单号</el-radio>
						<el-radio :label="'2'">双号</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="辅助关键字" prop="assistKeyWords"><el-input v-model="SubAreaData.assistKeyWords" placeholder="请输入辅助关键字" style="width: 230px;" ></el-input></el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="SubArea = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="addSearch('SubAreaForm')"  size="mini">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
 
<script>
import { saveOrUpdate,getSubAreaList } from '@/api/base/subArea.js';
import { getList } from '@/api/base/area.js';
import { getFixedList } from '@/api/base/fixedArea.js';

export default {
	name: 'SubArea-add-edit',
	data() {
		return {
			SubArea: false,
			SubAreaData: {},
			AreaList:[],
			FixedAreaList:[],
			// 校验
			rules: {
				sortingNum: [
					{ required: true, message: '请输入分拣编号', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				areaId: [
					{ required: true, message: '请选择区域', trigger: 'change' },
				],
				fixedAreaId: [
					// { required: true, message: '请选择定区', trigger: 'change' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				keyWords: [
					{ required: true, message: '请输入关键字', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				startNum: [
					{ required: true, message: '请输入起始号', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				endNum: [
					{ required: true, message: '请输入终止号', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				single: [
					{ required: true, message: '请输入单双号', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				assistKeyWords: [
					{ required: true, message: '请输入辅助关键字', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				
			}
		};
	},
	watch: {},
	methods: {
		getAreaList(){
			let that=this;

			getList().then(res=>{			  
			  if(res.data.code===10000){	
				res.data.data.forEach(item=>{	
					that.AreaList.push({id:item.id,name:item.province+'-'+item.city+'-'+item.district})
				})  				
			  }
			})
		},
		getFixedAreaList(){
			let that=this;
			getFixedList().then(res=>{			  
			  if(res.data.code===10000){	
				
					that.FixedAreaList=res.data.data;
								
			  }
			})
		},
		addSearch(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					saveOrUpdate(this.SubAreaData).then(res => {
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
						this.SubArea = false;
						this.SubAreaData = {};
						this.$parent.getSubAreaList(this.$parent.requestParameters);
					});
				} else {
					return false;
				}
			});
		}
	},
	created() {
		this.getAreaList();
		this.getFixedAreaList();
	}
};
</script>

<style></style>
