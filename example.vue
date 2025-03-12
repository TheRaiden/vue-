<template>
  <div class="login-container">
    <div style="display: flex">
      <el-form>
        <!-- 用户名输入框 -->
        <el-form-item>
          <el-input
            style="margin-bottom: 15px"
            size="large"
            prefix-icon="el-icon-s-custom"
            placeholder="请输入用户名"
            v-model="form.userName"
          ></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item>
          <el-input
            style="margin-bottom: 15px"
            size="large"
            show-password
            prefix-icon="el-icon-key"
            placeholder="请输入密码"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <!-- 角色选择框 -->
        <el-form-item>
          <el-select
            style="width: 100%; margin-bottom: 15px"
            size="large"
            placeholder="请选择角色"
            v-model="form.role"
          >
            <el-option value="1" label="管理员"></el-option>
            <el-option value="2" label="用户"></el-option>
          </el-select>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            style="
              width: 100%;
              height: 50px;
              background-color: #17bb94;
              border-color: #17bb94;
              color: white;
            "
            size="large"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
        <!-- 注册链接 -->
        <el-form-item
          style="
            background-color: #ffffff;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <el-form-item class="regBox">
            <a href="javascript:void(0)" @click="navRegister" style="text-indent: 12px">注册</a
            ><span class="el-icon-right"></span>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'Login',
  data() {
    return {
      form: {},
    }
  },
  methods: {
    // 登录按钮点击事件
    login() {
      // 输入验证
      if (!this.form.userName) {
        this.$notify.error('请输入用户名')
        return
      }
      if (!this.form.password) {
        this.$notify.error('请输入密码')
        return
      }
      if (!this.form.role) {
        this.$notify.error('请选择角色')
        return
      }
      // 发送登录请求
      request.post('/account/login', this.form).then((res) => {
        if (res.code === '0') {
          // 获取后端传来的token和user
          let user = res.data.user
          let token = res.data.token
          // 将token和user信息存储到本地存储
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          // 根据角色跳转到不同页面
          if (user.role === 1) {
            this.$notify.success('登录成功！')
            this.$router.push('/manager/home')
          } else {
            this.$notify.success('登录成功！')
            this.$router.push('/front/index')
          }
        } else {
          this.$notify.error(res.msg)
        }
      })
    },
    // 导航到注册页面
    navRegister() {
      this.$router.push('/register')
    },
  },
}
</script>
