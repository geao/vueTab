<template>
	<div>
		<el-dialog title="关联分区" :visible.sync="reSubArea" width="40%" >
			<!-- filterable
			    :filter-method="filterMethod"
				filter-placeholder="请输入分区拼音"-->
			<!-- <el-transfer
				:titles="titles"
			    v-model="value"
			    :data="data">
			  </el-transfer> -->
			
			<div style="margin: 0px 10%;">
			 <el-transfer
			        v-model="yesData"
			        :props="{key: 'id',label: 'name'}"
			        :titles="['未关联分区', '已关联分区']"
			        @change="handleChange"
			        :data="noData"
			    ></el-transfer>
			</div>
			
		</el-dialog>
	</div>
</template>
 
<script>
// import { saveOrUpdate } from '@/api/base/fixedArea.js';
// import { getList } from '@/api/base/area.js';
import { getNoSubAreaList,updateFixedAreaId } from '@/api/base/subArea.js';

export default {
	name: 'relation-customer',
	data() {
		return {
			reSubArea: false,
			reSubAreaData: {},
			
			 noData: this.noSubArea(),
			 yesData: this.yesSubArea(),
			updateData:{}
		};
	},
	watch: {},
	methods: {
		updateFixedAreaId(data){
			updateFixedAreaId(data).then(res=>{
				console.log(res);
			})
		},
		noSubArea(){
			let arr=[];
			let fixedId="no";
			getNoSubAreaList(fixedId).then(res=>{
				console.log("no",res.data.data);
				res.data.data.forEach(item=>{
					arr.push({id:item.id,name:item.keyWords+'-'+item.assistKeyWords})
				})
			})
			//所有的未关联的分区
			//arr=[{id:111,name:'测试1'},{id:222,name:'测试2'},{id:333,name:'测试3'}];
			return arr;
		},
		yesSubArea(){
			let arr=[];
			//所有的已关联的分区
			let fixedId="1205903559334412290";
			getNoSubAreaList(fixedId).then(res=>{
				console.log("yes",res.data.data);
				res.data.data.forEach(item=>{
					arr.push(item.id);
				})
			})
			//arr=[111,222];
			//[{id:1,name:'测试1'},{id:2,name:'测试2'},{id:3,name:'测试3'}]
			return arr;
		},
		 handleChange(value, direction, movedKeys) {
			console.log(value, direction, movedKeys);
			 //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
			 if(direction === "right") {
				//console.log(value,"right")
				//console.log(movedKeys,"------------------------------右-----------------------")
				let ids=[];
				ids=movedKeys;
				this.updateData.ids=ids;
				this.updateData.fixedId="1205903559334412290";
				this.updateFixedAreaId(this.updateData);
		
			 }
			 if(direction === "left") {
				//console.log(value,"left")
				//console.log(movedKeys,"----------------------------左-------------------------")
				let ids=[];
				ids=movedKeys;
				this.updateData.ids=ids;
				this.updateData.fixedId=null;
				this.updateFixedAreaId(this.updateData);
				
				// fixedId
				
			 }
				
		},

	
		
		
		
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
