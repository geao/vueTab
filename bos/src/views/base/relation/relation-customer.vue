<template>
	<div>
		a
	</div>
</template>
<script>
	
</script>
<style>
	
</style>
<!-- <template>
	<div>
		<el-dialog title="关联分区" :visible.sync="reSubArea" width="40%">
			
		</el-dialog>
	</div>
</template>
 
<script>
// import { saveOrUpdate } from '@/api/base/fixedArea.js';
// import { getList } from '@/api/base/area.js';
export default {
	name: 'relation-customer',
	data() {
		return {
			reSubArea: false,
			reSubAreaData: {},
			// AreaList:[],
			// // 校验
			// rules: {
			// 	fixedAreaCode: [
			// 		{ required: true, message: '请输入定区名称', trigger: 'blur' }
			// 		// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			// 	],
			// 	fixedAreaName: [
			// 		{ required: true, message: '请输入定区名称', trigger: 'blur' }
			// 		// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			// 	],
			// 	fixedAreaLeader: [
			// 		{ required: true, message: '请输入定区负责人', trigger: 'blur' },
			// 	],
			// 	telephone: [
			// 		{ required: true, message: '请输入负责人电话', trigger: 'blur' }
			// 		// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			// 	],
			// 	company: [
			// 		{ required: true, message: '请输入所属公司', trigger: 'blur' }
			// 		// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			// 	],
			// 	areaId: [
			// 		{ required: true, message: '请选择区区域', trigger: 'change' }
			// 		// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			// 	],
				
			// }
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
		
	}
};
</script>

<style></style>
 -->