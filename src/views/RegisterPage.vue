<template>
    <div class="register-container"> <!-- 页面外层容器样式 -->
        <div class="register-card"> <!-- 注册卡片样式，居中显示 -->
            <div class="register-header"> <!-- 注册卡片的标题部分 -->
                <h2>加入学习平台</h2>
                <div class="logo">🎓</div> <!-- LOGO，使用毕业帽图标 -->
            </div>

            <form @submit.prevent="handleRegister"> <!-- 表单提交事件处理 -->
                <div class="input-group">
                    <input
                            v-model="form.username"
                    placeholder="用户名"
                    required
                    class="input-field"
                    />
                    <span class="input-icon">👤</span> <!-- 图标：用户名 -->
                </div>

                <div class="input-group">
                    <input
                            v-model="form.email"
                            type="email"
                            placeholder="邮箱"
                            required
                            class="input-field"
                    />
                    <span class="input-icon">📧</span> <!-- 图标：邮箱 -->
                </div>

                <div class="input-group">
                    <input
                            v-model="form.password"
                    type="password"
                    placeholder="密码"
                    required
                    class="input-field"
                    />
                    <span class="input-icon">🔑</span> <!-- 图标：密码 -->
                </div>

                <button type="submit" class="register-btn">注 册</button> <!-- 提交按钮 -->

                <div class="login-link"> <!-- 注册成功后引导登录链接 -->
                    <p>已有账号？<router-link to="/login">立即登录</router-link></p>
                </div>
            </form>
        </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { register } from '@/api/index'; // `register` 是一个需要实现的 API 调用函数

    const router = useRouter(); // VueRouter实例，允许页面导航
    const form = ref({ username: '', email: '', password: '' }); // 使用 Vue 的 `ref` 创建可响应数据 `form`

    const handleRegister = async () => { // 注册表单提交事件处理
        try {
            console.log('发送注册数据:', form.value); // 添加日志
            const response = await register(form.value); // 调用API并传递注册数据
            console.log('注册成功响应:', response); // 添加成功日志
            alert('注册成功，请登录'); // 显示注册成功消息
            router.push('/login'); // 导航至登录页面
        } catch (err) {
            console.error('注册错误详情:', err); // 添加详细错误日志
            if (err.response) {
                console.error('响应数据:', err.response.data);
                console.error('响应状态:', err.response.status);
                console.error('响应头:', err.response.headers);
                alert(`注册失败: ${err.response.data.error || err.response.data.message || JSON.stringify(err.response.data)}`);
            } else if (err.request) {
                console.error('请求错误:', err.request);
                alert('注册失败，无法连接到服务器');
            } else {
                console.error('其他错误:', err.message);
                alert('注册失败，请检查网络连接');
            }
        }
    };
</script>

<style scoped>
    .register-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        padding: 20px;
        box-sizing: border-box;
    }

    .register-card {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        padding: 40px 30px;
        width: calc(100% - 40px);
        max-width: 420px;
        box-sizing: border-box;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        transform: translateY(0);
        transition: transform 0.3s ease;
    }

    .register-card:hover {
        transform: translateY(-5px);
    }

    .register-header {
        text-align: center;
        margin-bottom: 30px;
    }

    .register-header h2 {
        color: #2c3e50;
        font-size: 1.75rem;
        margin-bottom: 10px;
        font-weight: 600;
    }

    .logo {
        font-size: 3rem;
        margin: 10px 0;
        color: #27ae60;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    .input-group {
        position: relative;
        margin-bottom: 25px;
        width: 100%;
    }

    .input-field {
        width: 100%;
        padding: 14px 20px 14px 46px;
        border: 2px solid #e0e0e0;
        border-radius: 50px;
        font-size: 1rem;
        transition: all 0.3s;
        outline: none;
        background: #f8f9fa;
        box-sizing: border-box;
    }

    .input-field:focus {
        border-color: #27ae60;
        box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.2);
        background: #fff;
    }

    .input-icon {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.25rem;
        color: #7f8c8d;
        pointer-events: none;
    }

    .register-btn {
        width: 100%;
        padding: 14px;
        background: linear-gradient(to right, #27ae60, #2ecc71);
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 1.125rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        letter-spacing: 1px;
        box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
        box-sizing: border-box;
    }

    .register-btn:hover {
        background: linear-gradient(to right, #219653, #27ae60);
        box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
        transform: translateY(-2px);
    }

    .login-link {
        text-align: center;
        margin-top: 25px;
        color: #7f8c8d;
        font-size: 0.9375rem;
    }

    .login-link a {
        color: #27ae60;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s;
    }

    .login-link a:hover {
        color: #219653;
        text-decoration: underline;
    }

    /* 响应式调整 */
    @media (max-width: 480px) {
        .register-card {
            padding: 30px 20px;
            max-width: 340px;
        }

        .input-field {
            padding: 12px 16px 12px 42px;
        }

        .register-btn {
            padding: 12px;
        }
    }
</style>
