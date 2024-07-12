<template>
  <div class="login">
    <Title class="title">
      <router-link to="/home">
        主页
      </router-link>
      /<span>登录</span>
    </Title>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon
             :rules="rules" label-width="auto" class="ruleForm">
      <el-form-item label="账户" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()" class="btn">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateUser, validatePass } from "../utils/validator";
import { login } from "../api";
import { ElMessage } from "element-plus";
export default {
  methods: {
    submitForm () {
      console.log(this.ruleForm);
      this.$refs.ruleFormRef.validate(valid => {
        if (valid) {
          // alert("submit!");
          let res = login(this.ruleForm)
          if (res.code === 200) {
            ElMessage({
              message: res.msg + ',3秒后自动跳转到首页',
              type: 'success',
              showClose: true,
              onClose: () => {
                localStorage.setItem('user', JSON.stringify(res.data))
                this.$router.push('/home')
              }
            })
          } else {
            ElMessage({
              message: res.msg,
              showClose: true,
              type: 'error'
            })
          }
        } else {
          // alert("error submit!");
          ElMessage({
            message: '账户密码格式不正确',
            type: 'error'
          })
        }
      });
    }
  },
  data () {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  }
};
</script>

<style scoped lang="scss">
.login {
  background: #fff;
  overflow: hidden;

  .title {
    font-size: 14px;
    color: #ded2cc;

    a {
      color: #80bd01;
      margin-right: 5px;
    }

    a:hover {
      text-decoration: underline;
    }

    span {
      color: #999999;
      margin-left: 10px;
    }
  }

  .ruleForm {
    margin: 20px auto;
    width: 300px;

    .btn {
      margin: 0 auto;
    }
  }
}
</style>
