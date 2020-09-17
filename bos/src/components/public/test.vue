<template>
	<div style="width:100%">
		
		<div v-for="(item,index) in array" :style="{'transform':item.transform,'z-index':item.zIndex,'width':item.width,'left':item.left,'top':item.top}" class="x" >
			<el-card :body-style="{ padding: '0px' }">
				<div slot="header" align="left">
					<i style="float: right;" v-if='item.width=="600px"' class="el-icon-close" @click="guan(item)"></i>
					<div @click="xian(item,index)" style="width:90%">问答题</div>
				</div>
				
				<div :style="{'height':item.height,'overflow':'auto'}">
					<el-card :body-style="{ padding: '0px' }" >
						<div slot="header" class="clearfix" align="left">
							<span>学生:{{item.name}}</span>
						</div>

						<div v-for="(data,index2) in item.list">
							<el-card :body-style="{ padding: '0px' }" >
								<div style="width: 100%;background-color: #00FF00;border: 1px solid #00FF00;border-radius: 2px;" align="left">
									问题({{index2+1}}):{{data.ti}}
								</div>
								
								<div style="width: 100%;background-color: #F5AB35;border: 1px solid #F5AB35;border-radius: 2px;" align="left">
									答案({{index2+1}}):{{data.an}}
								</div>
						
								<div style="height: 10px;"></div>
								
								<div>
									
									<el-row>
										<el-col :span="3"><div style="line-height: 40px;height: 40px;">分数:</div></el-col>
										<el-col :span="8">
											<el-input-number v-model="data.score"  :min="1" :max="item.maxScore" label="描述文字"></el-input-number>
										</el-col>
										<el-col :span="13">

										</el-col>
									</el-row>
									
									<div style="height: 10px;"></div>
									
									<el-row>
										<el-col :span="4"><div>老师评语:</div></el-col>
										<el-col :span="20">
											<el-input
											type="textarea"
											:rows="2"
											placeholder="请输入内容"
											v-model="data.teacherComment">
											</el-input>
										</el-col>
									</el-row>
									
								</div>
							</el-card>
							
							<div style="height: 10px;"></div>
						</div>
					</el-card>
				</div>

				<div style="padding: 14px;">
					<div class="bottom clearfix">
						<el-button class="button" @click="pan(item,index)">评分</el-button>
					</div>
				</div>
			</el-card>
		</div>

		
		<div :style="{zIndex:mz, backgroundColor:backgroundColor,width:'85%',height:'85%',position: 'absolute',opacity: '0.1',top:'12%'}"></div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				mz:-1,
				backgroundColor:"#fff",
				array:[],
				transform:"",
				zIndex:""
			}
		},
		methods:{
			
			xian(data,index){
				
				if(!this.transform){
					this.transform=data.transform;
				}
				if(!this.zIndex){
					this.zIndex=data.zIndex;
				}
			
				data.transform="";
				data.width="600px";
				data.top="15%";
				data.left="30%";
				data.height="500px";
				this.mz=998;
				data.zIndex=999;
				this.backgroundColor="#000"
			},
			
			pan(data,index){
				let obj=data;
				this.$confirm('确认给'+obj.name+'评分吗?')
				  .then(_ => {
					delete obj.transform;
					delete obj.height;
					delete obj.zIndex;
					delete obj.width;
					
					this.Scoring(obj);
					
					this.array.splice(index,1);
					this.mz=-1;
					this.backgroundColor="#fff"
					this.zIndex="";
					this.transform="";
				  })
				  .catch(_ => {});
			},
			
			Rendering(arr){
				for(let i=0;i<arr.length;i++){
					let jiandu=i*3.6;
					let transform='rotate('+jiandu+'deg) translate(200px,-165px)';
					let ceng=i+1;
					let style={transform:transform,zIndex:ceng,height:"400px"}
					arr[i]=Object.assign(style,arr[i]);
				}
				this.array=arr;
			},
			guan(data){
				data.zIndex=this.zIndex;
				data.transform=this.transform;
				data.width="400px";
				data.height="400px";
				this.backgroundColor="#fff"
				this.mz=-1;
				this.zIndex="";
				this.transform="";
				data.top="";
				data.left="";
			}
		},
		computed:{
			
		},
		components:{
			
		},
		watch:{
			
		},
		props:{
			Scoring:{
				type:Function,
				default:function(data){
					console.log(data);
				}
			},
		},
		created(){
			this.Rendering(this.array);
		}
	}
</script>

<style scoped>
	.x{
		width: 400px;
		height: 660px;
		position: absolute;
		left: 30%;
		top: 40%;
		float: left;
		font-size: 15px;
	}
	.clearfix{
		width: 100%;
	}
</style>
