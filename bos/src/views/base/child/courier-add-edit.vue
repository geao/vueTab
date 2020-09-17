<template>
	<div>
		<el-dialog title="定区设置" :visible.sync="Courier" width="40%">
			<el-form :model="CourierData" :rules="rules" ref="CourierForm" label-width="120px" class="demo-ruleForm" prop  inline>
				<el-form-item label="查台密码" prop="checkPwd" ><el-input v-model="CourierData.checkPwd" placeholder="请输入查台密码" style="width: 230px;"></el-input></el-form-item>
				<el-form-item label="所属单位" prop="company" ><el-input v-model="CourierData.company" placeholder="请输入所属单位" style="width: 230px;"></el-input></el-form-item>
				<el-form-item label="快递员工号" prop="courierNum" ><el-input v-model="CourierData.courierNum" placeholder="请输入快递员工号" style="width: 230px;"></el-input></el-form-item>
				<el-form-item label="是否作废" prop="deltag">			
					<el-radio-group v-model="CourierData.deltag" placeholder="请选择是否作废" >
						<el-radio :label="'0'">是</el-radio>
						<el-radio :label="'1'">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="快递员姓名" prop="name" >
					<el-input v-model="CourierData.name" placeholder="请输入快递员姓名" style="width: 230px;"></el-input></el-form-item>
				<el-form-item label="快递员电话" prop="telephone" ><el-input v-model="CourierData.telephone" placeholder="请输入快递员电话" style="width: 230px;"></el-input></el-form-item>
				<el-form-item label="取件员类型" prop="type" >
					<el-radio-group v-model="CourierData.type" placeholder="请选择取件员类型" >
						<el-radio :label="'0'">小件快递员</el-radio>
						<el-radio :label="'1'">大件快递员</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="车辆类型" prop="carType">
					<el-radio-group v-model="CourierData.carType" placeholder="请选择车辆类型" >
						<el-radio :label="'0'">快递三轮车</el-radio>
						<el-radio :label="'1'">货车</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="车牌号" prop="carNum"><el-input v-model="CourierData.carNum" placeholder="请输入车牌号" style="width: 230px;"></el-input></el-form-item>
				
				<el-form-item label="取派标准" prop="standardId">
					<el-select v-model="CourierData.standardId" filterable placeholder="请选择取派标准" style="width: 230px;">
						<el-option
						  v-for="item in StandardList"
						  :key="item.id"
						  :label="item.name"
						  :value="item.id">
						</el-option>
					</el-select>	
				</el-form-item>
			
				<el-form-item label="PDA号码" prop="pda">
					<el-input v-model="CourierData.pda" placeholder="请输入PDA号码" style="width: 230px;" ></el-input>
					</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="Courier = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="addSearch('CourierForm')"  size="mini">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
 
<script>
import { saveOrUpdate,getCourierList } from '@/api/base/courier.js';
import { getList } from '@/api/base/standard.js';


export default {
	name: 'Courier-add-edit',
	data() {
		return {
			Courier: false,
			CourierData: {},
			StandardList:[],
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
		getStandardList(){
			let that=this;

			getList().then(res=>{			  
			  if(res.data.code===10000){	
				  console.log(res.data.data)
				res.data.data.forEach(item=>{	
					that.StandardList.push({id:item.id,name:item.name})
				})  				
			  }
			})
		},
		addSearch(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					saveOrUpdate(this.CourierData).then(res => {
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
						this.Courier = false;
						this.CourierData = {};
						this.$parent.getCourierList(this.$parent.requestParameters);
					});
				} else {
					return false;
				}
			});
		}
	},
	created() {
		this.getStandardList();
	}
};
</script>

<style></style>
