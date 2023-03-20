<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { loginApi } from "../../api/login/index";
import { setLocalStorage } from "../../utils/localStorage";
import { type FormInstance, FormRules } from "element-plus";

const router = useRouter();
/** 登录按钮 Loading */
const loading = ref(false);
const loginFormRef = ref<FormInstance | null>(null);

const loginData = reactive({
  username: "",
  password: "",
});
function login() {
  try {
    loginFormRef.value?.validate(async (valid: boolean) => {
      if (valid) {
        let res = await loginApi({
          username: loginData.username,
          password: loginData.password,
        });
        setLocalStorage("token", res.data.token);
        setLocalStorage("authority", res.data.authority);
        router.push({ path: "/" });
      } else {
        return false;
      }
    });
  } catch (err) {
    console.log(err);
  }
}
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};
</script>

<template>
  <div class="login-container">
    <div class="login-box flex-column justify-center align-center">
      <div class="title">
        <h2>Esick admin</h2>
      </div>
      <div :style="{ width: '100%' }">
        <el-form ref="loginFormRef" :model="loginData" :rules="loginFormRules" @keyup.enter="login">
          <el-form-item prop="username">
            <el-input v-model.trim="loginData.username" placeholder="用户名" type="text" tabindex="1" size="large" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model.trim="loginData.password" placeholder="密码" type="password" tabindex="2" size="large"
              show-password />
          </el-form-item>
          <el-button :loading="loading" type="primary" size="large" @click.prevent="login()">
            登 录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;

  .login-box {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    padding: 50px;

    :deep(.el-input-group__append) {
      padding: 0;
      overflow: hidden;
    }

    .el-button {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
