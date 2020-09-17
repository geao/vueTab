<template>
	<div>
		<el-dialog title="区域条件查询" :visible.sync="selectFixedArea" width="40%">
			<el-form :model="selectFixedAreaData" ref="selectFixedAreaForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="定区编码"><el-input v-model="selectFixedAreaData.fixedAreaCode" placeholder="请输入定区编码"></el-input></el-form-item>
				<el-form-item label="所属公司"><el-input v-model="selectFixedAreaData.company" placeholder="请输入所属单位"></el-input></el-form-item>
				<el-form-item label="分区" prop="areaId" >
					<el-select v-model="selectFixedAreaData.areaId" filterable placeholder="请选择分区" style="width: 100%;">
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
				<el-button @click="selectFixedArea = false" size="mini">取消</el-button>
				<el-button type="primary" @click="selectResult('selectFixedAreaForm')" size="mini">查询</el-button>
			</div>
		</el-dialog>
	</div>
</template>
 
<script>
import { getList } from '@/api/base/area.js';

export default {
	name: 'select-FixedArea',
	data() {
		return {
			AreaList:[],
			selectFixedArea: false,
			selectFixedAreaData: {},
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
		selectResult(name) {
			if(this.selectFixedAreaData.fixedAreaCode!=null){
				this.$parent.requestParameters.fixedAreaCode=this.selectFixedAreaData.fixedAreaCode;
			}
			if(this.selectFixedAreaData.company!=null){
				this.$parent.requestParameters.company=this.selectFixedAreaData.company;
			}
			if(this.selectFixedAreaData.areaId!=null){
				this.$parent.requestParameters.areaId=this.selectFixedAreaData.areaId;
			}		
			this.$parent.getFixedAreaList(this.$parent.requestParameters);
			this.selectFixedArea = false;
			this.selectFixedAreaData = {};			
		}
	},
	created() {
		this.getAreaList();
	}
};
</script>

<style></style>
