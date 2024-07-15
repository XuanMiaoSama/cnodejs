<template>
	<div class="register">
		<Title class="Title">
			<router-link to="/home">
				主页
			</router-link>
			/<span>注册</span>
		</Title>
		<el-form ref="registerFormRef" :model="registerForm" :rules="rules"
						 label-width="auto">

		</el-form>
	</div>
</template>

<script>
export default {
	data () {
		return {
			registerForm: {
				username: '',
				password: '',

			}
		}
	},
}
</script>

<style scoped lang="scss">
.register {
	background-color: #fff;
}
</style>