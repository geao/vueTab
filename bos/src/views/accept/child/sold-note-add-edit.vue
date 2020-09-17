<template>
	<div>
		<el-dialog title="销售记录" :visible.sync="soldNote" width="30%">
		<el-form :model="soldNoteForm" :rules="rules" ref="soldNoteForm" label-width="100px" class="demo-ruleForm" prop>
		     <el-form-item label="销售日期" prop="orderTime">
				  <el-date-picker type="date" placeholder="请选择销售日期" v-model="soldNoteForm.orderTime" style="width: 100%;"></el-date-picker>
		     </el-form-item>
			<el-form-item label="客户名称" prop="userId">
			 <el-select v-model="soldNoteForm.userId" placeholder="请选择">
			     <el-option
			       v-for="item in UserName"
			       :key="item.id"
			       :label="item.name"
			       :value="item.id">
			     </el-option>
			   </el-select>
			</el-form-item>
			<el-form-item label="产品名称" prop="productId">
			  <el-select v-model="soldNoteForm.productId" placeholder="请选择产品名称">
				 <el-option
				      v-for="item in ProductName"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				</el-select>
			 
			</el-form-item>
			<el-form-item label="单价" prop="productPrice" >
			   <el-input v-model="soldNoteForm.productPrice" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="数量" prop="orderNumber">
			   <el-input v-model="soldNoteForm.orderNumber" placeholder="请输入单价"></el-input>
			</el-form-item>
		     <el-form-item label="销售额" prop="sales">
		       <el-input v-model="soldNoteForm.sales" :disabled="true"></el-input>
		      </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="soldNote = false">取 消</el-button>
		    <el-button type="primary" @click="addSearch('soldNoteForm')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
	
<script>
	import { saveOrUpdate,getProductName,getUserName } from '@/api/accept/soldNote.js'
	
	export default{
		name:'sold-note-add-edit',
		data(){
			return{
				ProductName:[],
				UserName:[],
				soldNote:false,
				soldNoteForm:{},
				// 校验
				 rules: {
				  orderTime: [
					{ required: true, message: '请选择销售日期', trigger: 'change' },
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }  
				  ],
				  userId: [
					{ required: true, message: '请输入客户名称', trigger: 'blur' }
				  ],
				  productId: [
					{ required: true, message: '请选择产品名称', trigger: 'change' },
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }  
				  ],
				  orderNumber: [
					{ required: true, message: '请输入数量', trigger: 'blur' },
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }  
				  ]
				},
						  
			}
		},
		watch:{
			'soldNoteForm.orderNumber'(val){
				this.soldNoteForm.sales=val*this.soldNoteForm.productPrice;
				if(isNaN(this.soldNoteForm.sales)){
					this.soldNoteForm.sales=0;
				}
			},
			'soldNoteForm.productPrice'(val){
				this.soldNoteForm.sales=val*this.soldNoteForm.orderNumber;
				if(isNaN(this.soldNoteForm.sales)){
					this.soldNoteForm.sales=0;
				}
			},
			'soldNoteForm.productId'(val){
				this.ProductName.forEach(item=>{
					if(val==item.id){
						this.soldNoteForm.productPrice=item.price;
					}
				})
			}
		},
		methods:{
			addSearch(name){
				this.$refs[name].validate((valid) => {
				          if (valid) {
				           saveOrUpdate(this.soldNoteForm).then(res=>{
				             if(res.data.code === 10000){
				               console.log(res.data.message);
				             }else{
				                console.log(res.data.message);
				             }
				             this.soldNote = false;
							 this.soldNoteForm={};
				             this.$parent.getList();
				           })
				          } else {
				            return false;
				          }
				        });
				
			},
			getProductName(){
				getProductName().then(res=>{
					console.log(res);
					this.ProductName=res.data.data;
					
				  // this.SoldNotelist = res.data.data.orderVo;
						// 	this.totalSales=res.data.data.totalSales;
						// 	this.total=res.data.data.total;
				 
				})
			},
			getUserName(){
				
				getUserName().then(res=>{
					console.log(res);
					this.UserName=res.data.data;
				  // this.SoldNotelist = res.data.data.orderVo;
						// 	this.totalSales=res.data.data.totalSales;
						// 	this.total=res.data.data.total;
				 
				})
			}
		},
		created(){
			
			this.getUserName();
			this.getProductName();
		}
	}
</script>

<style>
</style>
