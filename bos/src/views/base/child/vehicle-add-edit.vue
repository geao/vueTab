<template>
	<div>
		<el-dialog title="班车管理" :visible.sync="Vehicle" width="40%">
			<el-form :model="VehicleData" :rules="rules" ref="VehicleForm" label-width="100px" class="demo-ruleForm" prop>
				<el-form-item label="线路名称" prop="routeName"><el-input v-model="VehicleData.routeName" placeholder="请输入线路名称"></el-input></el-form-item>
				<el-form-item label="线路类型" prop="routeType"><el-input v-model="VehicleData.routeType" placeholder="请输入线路类型"></el-input></el-form-item>
				<el-form-item label="承运商" prop="shipper"><el-input v-model="VehicleData.shipper" placeholder="请输入承运商"></el-input></el-form-item>
				<el-form-item label="司机" prop="driver"><el-input placeholder="请输入司机" v-model="VehicleData.driver"></el-input></el-form-item>
				<el-form-item label="车型" prop="vehicleType"><el-input v-model="VehicleData.vehicleType" placeholder="请输入车型"></el-input></el-form-item>
				<el-form-item label="车牌号" prop="vehicleNum"><el-input v-model="VehicleData.vehicleNum" placeholder="请输入车牌号"></el-input></el-form-item>
				<el-form-item label="吨控" prop="ton"><el-input v-model="VehicleData.ton" placeholder="请输入吨控"></el-input></el-form-item>
				<el-form-item label="描述" prop="remark"><el-input type="textarea" :rows="2" placeholder="请输入描述" v-model="VehicleData.remark"></el-input></el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="Vehicle = false">取 消</el-button>
				<el-button type="primary" @click="addSearch('VehicleForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { saveOrUpdate } from '@/api/base/vehicle.js';

export default {
	name: 'vehicle-add-edit',
	data() {
		return {
			Vehicle: false,
			VehicleData: {},
			// 校验
			rules: {
				routeName: [
					{ required: true, message: '请输入线路名称', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				routeType: [{ required: true, message: '请输入线路类型', trigger: 'blur' }],
				shipper: [
					{ required: true, message: '请输入承运商', trigger: 'change' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				driver: [
					{ required: true, message: '请输入司机', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				vehicleType: [
					{ required: true, message: '请输入车型', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				vehicleNum: [
					{ required: true, message: '请输入车牌号', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				ton: [
					{ required: true, message: '请输入吨控', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				remark: [
					{ required: true, message: '请输入描述', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				]
			}
		};
	},
	watch: {},
	methods: {
		addSearch(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					saveOrUpdate(this.VehicleData).then(res => {
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
						this.Vehicle = false;
						this.VehicleData = {};
						this.$parent.getVehicleList(this.$parent.requestParameters);
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
