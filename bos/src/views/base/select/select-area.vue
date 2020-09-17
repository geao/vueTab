<template>
	<div>
		<el-dialog title="区域条件查询" :visible.sync="selectArea" width="40%">
			<el-form :model="selectAreaData" ref="selectAreaForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="省"><el-input v-model="selectAreaData.province" placeholder="请输入省"></el-input></el-form-item>
				<el-form-item label="市"><el-input v-model="selectAreaData.city" placeholder="请输入市"></el-input></el-form-item>
				<el-form-item label="区"><el-input v-model="selectAreaData.district" placeholder="请输入区"></el-input></el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="selectArea = false" size="mini">取消</el-button>
				<el-button type="primary" @click="selectResult('selectAreaForm')" size="mini">查询</el-button>
			</div>
		</el-dialog>
	</div>
</template>
 
<script>
// import { getAreaList } from '@/api/base/area.js';

export default {
	name: 'select-area',
	data() {
		return {
			selectArea: false,
			selectAreaData: {},
		};
	},
	watch: {},
	methods: {
		
		selectResult(name) {
			if(this.selectAreaData.province!=null){
				this.$parent.requestParameters.province=this.selectAreaData.province;
			}
			if(this.selectAreaData.city!=null){
				this.$parent.requestParameters.city=this.selectAreaData.city;
			}
			if(this.selectAreaData.district!=null){
				this.$parent.requestParameters.district=this.selectAreaData.district;
			}		
			this.$parent.getAreaList(this.$parent.requestParameters);
			this.selectArea = false;
			this.selectAreaData = {};			
		}
	},
	created() {
		
	}
};
</script>

<style></style>
