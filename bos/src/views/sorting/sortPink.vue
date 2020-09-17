<template>
	<div>
		<el-button type="primary" @click="query" size="mini">判断</el-button>
		
		
		
		<div class="parent">
			<i class="el-icon-success" style="float: right;margin: 6px;color:green"  v-if="isOk"/>
			<i class="el-icon-error" style="float: right;margin: 6px;color:red" v-else/>
			<div class="page">
				  <div class="page-box">
					大叔大婶奥术大师多多多多多多多多多多多多多多多多多
				</div>
			</div>
			</div>
			<div style="height: 1vh;">	</div>
			<div class="parent">
				<i class="el-icon-success" style="float: right;margin: 6px;color:green"  v-if="isOk"/>
				<i class="el-icon-error" style="float: right;margin: 6px;color:red" v-else/>
			<div class="page">
				  <div class="page-box">
					大叔大婶奥术大师多多多多多多多多
					
				</div>
			</div>
			</div>
			<div style="height: 1vh;">	</div>
			<div class="parent">
				<i class="el-icon-success" style="float: right;margin: 6px;color:green"  v-if="isOk"/>
				<i class="el-icon-error" style="float: right;margin: 6px;color:red" v-else/>
			<div class="page">
				  <div class="page-box">师多多多多多多多多多多多多多多多多多
				
				</div>
			</div>
			</div>
			<div style="height: 1vh;">	</div>
			<div class="parent">
				<i class="el-icon-success" style="float: right;margin: 6px;color:green"  v-if="isOk"/>
				<i class="el-icon-error" style="float: right;margin: 6px;color:red" v-else/>
			<div class="page">
				  <div class="page-box">
					大叔大婶奥术大师多多多多多多多多多多多多多多多多多
				
					
				</div>
			</div>
			</div>
			<div style="height: 1vh;">	</div>
			<div class="parent">
				<i class="el-icon-success" style="float: right;margin: 6px;color:green"  v-if="isOk"/>
				<i class="el-icon-error" style="float: right;margin: 6px;color:red" v-else/>
			<div class="page">
				
				  <div class="page-box">师多多多多多多多多多多多多多多多多多
					
				</div>
			</div>
		</div>
		
		
	</div>
	
	
	
</template>





<script>
	export default{
		data(){
			return{
				isOk:true
			}
		},
		methods:{
			query(){
				this.isOk=!this.isOk;
			}
		}
	}
</script>
<style scoped="scoped">
	
	@media only screen and (min-width: 540px) and (max-width: 1024px) {
	.parent{
		/* width: 100%; */
		width: 290px;
		 background: #fff;
	}
	.page{
		 /* border: blue 1px solid; */
	    margin: 0 auto;
	    /* width:96.3%; */
		/* width: 90%; */
		width: 230px; 
	    padding: 30px 0px 0px 30px;
	    background: #fff;
	    border-radius: 0px 20px 0px 0px;
	    /* text-align: justify; */
	}
	.page-box{
		/* border: red 1px solid; */
	    margin: 0 auto;
		width: 230px;
	    /* width:100%; */
		/* width: 100%; */
	    padding: 0px 30px 30px 0px; 
	    background: #fff;
	    border-radius: 0px 20px 0px 0px;
	    /* text-align: justify; */
	}

	}
	
	@media only screen and (max-width: 540px) {
	.parent{
		/* width: 100%; */
		width: 260px;
		 background: #fff;
	}
	.page{
		 /* border: blue 1px solid; */
	    margin: 0 auto;
	    /* width:96.3%; */
		/* width: 90%; */
		width: 200px; 
	    padding: 30px 0px 0px 30px;
	    background: #fff;
	    border-radius: 0px 20px 0px 0px;
	    /* text-align: justify; */
	}
	.page-box{
		/* border: red 1px solid; */
	    margin: 0 auto;
		width: 200px;
	    /* width:100%; */
		/* width: 100%; */
	    padding: 0px 30px 30px 0px; 
	    background: #fff;
	    border-radius: 0px 20px 0px 0px;
	    /* text-align: justify; */
	}
	}
	
	@media only screen and (min-width: 1024px) and (max-width: 1600px) {
	.parent{
		/* width: 100%; */
		width: 790px;
		 background: #fff;
	}
	.page{
		 /* border: blue 1px solid; */
	    margin: 0 auto;
	    /* width:96.3%; */
		/* width: 90%; */
		width: 730px; 
	    padding: 30px 0px 0px 30px;
	    background: #fff;
	    border-radius: 0px 20px 0px 0px;
	    /* text-align: justify; */
	}
	.page-box{
		/* border: red 1px solid; */
	    margin: 0 auto;
		width: 730px;
	    /* width:100%; */
		/* width: 100%; */
	    padding: 0px 30px 30px 0px; 
	    background: #fff;
	    border-radius: 0px 20px 0px 0px;
	    /* text-align: justify; */
	}
	}
	
	@media only screen and (min-width: 1600px)  {
	
	.parent{
		/* width: 100%; */
		width: 1370px;
		 background: #fff;
	}
	.page{
		 /* border: blue 1px solid; */
	    margin: 0 auto;
	    /* width:96.3%; */
		/* width: 90%; */
		width: 1310px; 
	    padding: 30px 0px 0px 30px;
	    background: #fff;
	    border-radius: 0px 20px 0px 0px;
	    /* text-align: justify; */
	}
	.page-box{
		
		/* border: red 1px solid; */
	    margin: 0 auto;
		width: 1310px;
	    /* width:100%; */
		/* width: 100%; */
	    padding: 0px 30px 30px 0px; 
	    background: #fff;
	    border-radius: 0px 20px 0px 0px;
	    /* text-align: justify; */
	}
	
	}			
	   .page{
		   position: relative;
		   margin-left: 0;
		   filter: drop-shadow(0px 0px 15px #bbb);
	   }
	   .page:before{
		/* border: 1px saddlebrown solid; */
		   display: block;
		   position: absolute;
		   right:-30px;
		   top:0;
		   width: 30px;
		   height: 30px;
		   background: linear-gradient(42deg, #ddd 30%, rgba(0,0,0,0) 40%);
	   }    	        
	</style>
