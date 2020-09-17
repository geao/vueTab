<template>
	<div>
		<el-dialog title="区域设置" :visible.sync="Area" width="40%">		
			<el-row>
				<el-col :span="5" style="line-height: 34px;font-size: 16px;">请选择省、市、区：</el-col>
				<el-col :span="18">
					<area-select :level="2" type="all" placeholder="请选择地区" v-model='form.address' :data="pcaa" v-if="showAddress"></area-select>
				</el-col>
			</el-row>		
			<div slot="footer" class="dialog-footer">
				<el-button @click="close">取 消</el-button>
				<el-button type="primary" @click="addSearch()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
 
<script>
import { saveOrUpdate,checkSomeName } from '@/api/base/area.js';
import 'vue-area-linkage/dist/index.css'
import { pca, pcaa } from 'area-data'
export default {
	name: 'Area-add-edit',
	data() {
		return {
			cc:[],
			form:{
				address:[]
			},
			pca: pca,
			pcaa: pcaa,
			showAddress:false,
			Area: false,
			AreaData: {},
			// 校验		
		};
	},
	watch: {
		Area(val){
			if(!val){
				//当el-dialog关闭的时候销毁它
				this.showAddress=false;
			}
		},
		AreaData(val){
			if(val.cityCode!=null){
				//修改-组件数据的回显
				let cityCode=val.cityCode.split(",");
				if(val.id!=null){
				//  this.selected[0] = pcaa[86][res.data.addrprovinceid];     //res.data.addrprovinceid省对应的id
				//  this.selected[1] = pcaa[res.data.addrprovinceid][res.data.addrcityid];  //res.data.addrcityid省对应的id
				//  this.selected[2] = pcaa[res.data.addrcityid][res.data.addrcountyid];    //res.data.addrcountyid省对应的id			
				this.form.address[0]=pcaa[86][cityCode[0]];    
                this.form.address[1] = pcaa[cityCode[0]][cityCode[1]];  	
                this.form.address[2] = pcaa[cityCode[1]][cityCode[2]]; 
				}
			}		
		},
		'form.address'(val){
			if(val.length!=0){
				//添加-当组件的数据发生改变时给接口参数赋值
				let arr=[];
				val.forEach(item=>{
					arr.push(JSON.stringify(item));
				})
				this.AreaData.province=arr[0].split("\u0022")[3];
				this.AreaData.city=arr[1].split("\u0022")[3];
				this.AreaData.district=arr[2].split("\u0022")[3];
				this.AreaData.cityCode=arr[2].split("\u0022")[1];	
			}
		}
	},
	methods: {
		close(){
			//关闭按钮-清空数据
			this.AreaData={};
			this.Area=false;
			this.showAddress=false;
			let arr=[];
			this.form.address=arr;
		},
		addSearch() {
			if(this.AreaData.province!=null){
				checkSomeName(this.AreaData).then(res=>{
					if (res.data.code === 10000) {
						saveOrUpdate(this.AreaData).then(res => {
							if (res.data.code === 10000) {
								this.$notify({
									title: '提示',
									message: res.data.message,
									type: 'success'
								});
								this.Area = false;
								this.AreaData = {};
								this.$parent.getAreaList(this.$parent.requestParameters);				
								this.showAddress=false;
								let arr=[];
								this.form.address=arr;
							} else {
								this.$notify({
									title: '提示',
									message: res.data.message,
									type: 'warning'
								});
							}					
						});
					}else{
						this.$notify({
							title: '提示',
							message: res.data.message,
							type: 'warning'
						});
					}
				})		
			}else{
				this.$notify({
					title: '提示',
					message: "省、市、区不能为空！！！",
					type: 'warning'
				});
			}
		}
	},
	created() {
		
	}
};
</script>

<style>
	.area-select.large{
	  width: 100%;
	  line-height: 20px;
	}
</style>
