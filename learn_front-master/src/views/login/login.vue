<template>
  <div class="login">
	<div class="login-top">
		<div class="logo">
			<img style="width:100px;padding-left:100px" src="../../assets/image/logo.png">
		</div>
		<div class="btns">
			<div style="padding-right:100px;display:flex">
				<div class="toReg" @click="toRegister">
					<div>注册</div>
				</div>
				<div class="toRegTeacher" @click="toTeacherRegister">
					<div>教师入驻</div>
				</div>
			</div>
		</div>
	</div>
	<div class="login-center">
		<div class="login-content">
			<div style="padding-left: 100px;">
				<div class="title">
					<div>STUDY FROM</div>
					<div>HOME WITH EXPERT</div>
				</div>
				<div style="color:#181818;font-family:'黑体'">在线学习系统，一个在家就能学习的平台</div>
				<div style="margin-top:20px;color:#181818;font-family:'黑体'">
					<div>| 我们都得经历一段努力闭嘴不抱怨的时光，</div>
					<div>| 才能熠熠生辉，才能去更酷的地方，成为更酷的人。</div>
				</div>
				<div style="margin-top:20px;color:#181818;font-family:'黑体'">
					<div>| 最好的生活状态：一个人时，安静而丰盛</div>
					<div>| ；两个人是，温暖而踏实。</div>
				</div>
				<div style="margin-top:30px;display:flex;justify-content: space-between">
					<img style="width:20%" src="../../assets/image/login_image.png">
					<img style="width:25%;padding-right:30px" src="../../assets/image/login-jiantou.png">
				</div>
			</div>
		</div>
		<div class="login-form">
			<div class="jiantou1">
				<img src="../../assets/image/jiantou1.png">
			</div>
			<div class="jiantou2">
				<img src="../../assets/image/jiantou2.png">
			</div>
			<div class="yuan">
				<img src="../../assets/image/yuan.png">
			</div>
			<div class="form">
				<div class="login-title">在线学习系统</div>
				<div style="width:100%">
					<el-form style="width:100%" :model="userInfo" :rules="rules" ref="ruleForm" class="demo-ruleForm">
						<el-form-item  prop="username">
							<el-input v-model="userInfo.username" placeholder="请输入用户账号"></el-input>
						</el-form-item>
						<el-form-item  prop="password">
							<el-input type="password" v-model="userInfo.password" placeholder="请输入用户密码"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div class="login-btn" @click="toLogin()">
					<div>登 陆</div>
				</div>
			</div>
		</div>
	</div>
	<bottomPage></bottomPage>
  </div>
</template>

<script>
  import {login,getUser} from '../../api/api' 
  import bottomPage from "../../components/bottom/login-bottom"
  export default {
	data() {
	  return{
		userInfo: {
			username: "",
			password: ""
		},
		rules: {
          username: [
            { required: true, message: '请输入用户账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入用户密码', trigger: 'blur' }
          ],
        }
	  }
	},
	components: {
        bottomPage
	},
	methods: {
		toRegister() {
			this.$router.push("/register")
		},
		toTeacherRegister() {
			this.$router.push("/teacherRegister")
		},
		toLogin() {
			this.$refs["ruleForm"].validate((valid) => {
				if (valid) {
					var params = {
						username: this.userInfo.username,
						password: this.userInfo.password
					}
					login(params).then(res => {
						if(res.code == 1000) {
							this.$message({
								message: '登陆成功',
								type: 'success'
							});
							var that = this
							var token = res.data.token
							window.localStorage.setItem("user_token",token)
							this.getUserInfo()
							setTimeout(function() {
								that.$router.push("/")
							},500)
						} else {
							this.$message.error(res.message);
						}
					})
				} else {
					return false;
				}
			});
		},
		getUserInfo() {
            getUser().then(res => {
                if(res.code == 1000) {
					window.localStorage.setItem("user_info",JSON.stringify(res.data))
                }
            })
        },
	},
	created() {
	 
	},
	mounted() {
	  
	}
 }
</script>

<style scoped>
  .login {
	  width: 100%;
	  height: 100%;
	  background-color: #FCFCFC;
  }
  .login-top {
	  width: 100%;
	  height: 100px;
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: space-between;
  }
  .logo {
	  width: 30%;
	  text-align: center;
	  height: 100%;
	  display: flex;
	  align-items: center;
  }
  .btns {
	  width: 45%;
	  display: flex;
	  background-color: #ffffff;
	  height: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: flex-end;
  }
  .toReg {
	  width: 130px;
	  height: 40px;
	  border:1px solid #474747;
	  font-family: '黑体';
	  cursor: pointer;
	  display: flex;
	  justify-content: center;
	  align-items: center;
  }
  .toRegTeacher {
	  margin-left: 20px;
	  width: 130px;
	  height: 40px;
	  border:1px solid #474747;
	  font-family: '黑体';
	  cursor: pointer;
	  display: flex;
	  justify-content: center;
	  align-items: center;
  }
  .login-center {
	  background-image: url('../../assets/image/index/index_back.png');
	  width: 100%;
	  height: 75%;
	  display: flex;
	  flex-direction: row;
  }
  .login-bottom {
	  width: 100%;
	  height: 250px;
	  background-color: #262543;
	  display: flex;
  }
  .login-content {
	  width: 55%;
	  height: 100%;
	  display: flex;
	  flex-direction: column;
  }
  .login-form {
	  background-image: url('../../assets/image/index/index_back.png');
	  position: relative;
	  display: flex;
	  justify-content: center;
	  width: 45%;
	  height: 100%;
	  background-color: #ffffff;
  }
  .title {
	  font-weight: '黑体';
	  font-size: 55px;
	  font-weight: bold;
  }
  .jiantou1 {
	  position: absolute;
	  left: 10px;
	  top: 20px;
  }
  .jiantou2 {
	  position: absolute;
	  left: 10px;
	  bottom: 100px;
  }
  .yuan {
	  position: absolute;
	  right: 10px;
	  bottom: 200px;
  }
  .form {
	  width: 50%;
	  height: 70%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: space-around;
  }
  .login-title {
	  font-size: 50px;
	  font-weight: bold;
	  height: 40%;
	  display: flex;
	  align-items: center;
  }
  .login-btn {
	  width: 130px;
	  height: 40px;
	  border:1px solid #FF5202;
	  background-color: #FF5202;
	  color: #ffffff;
	  font-size: 18px;
	  font-family: '黑体';
	  cursor: pointer;
	  display: flex;
	  justify-content: center;
	  align-items: center;
  }
  .bottom-one {
	  width: 34%;
	  height: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  flex-direction: column;
  }
  .bottom-two {
	  width: 25%;
	  height: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  flex-direction: column;
  }
  .bottom-three {
	  width: 25%;
	  height: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  flex-direction: column;
  }
  .bottom-four {
	  width: 25%;
	  height: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  flex-direction: column;
  }
  .one-1 {
	  font-size: 20px;
	  font-weight: bold;
	  color: #ffffff;
  }
  .one-2 {
	  margin-top: 15px;
	  font-size: 15px;
	  color: #ffffff;
	  font-family: '黑体';
  }
  .two-2 {
	  margin-top: 15px;
	  font-size: 20px;
	  color: #ffffff;
	  font-weight: bold;
  }
  .two-3 {
	  margin-top: 15px;
	  font-size: 15px;
	  color: #ffffff;
	  font-family: '黑体';
  }
</style>