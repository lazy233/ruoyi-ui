<template>
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <h2>欢迎来到学习平台</h2>
                <div class="logo">📚</div>
            </div>

            <form @submit.prevent="handleLogin">
                <div class="input-group">
                    <input
                            v-model="form.username"
                            placeholder="用户名/邮箱"
                            required
                            class="input-field"
                    />
                    <span class="input-icon">👤</span>
                </div>

                <div class="input-group">
                    <input
                            v-model="form.password"
                            type="password"
                            placeholder="密码"
                            required
                            class="input-field"
                    />
                    <span class="input-icon">🔑</span>
                </div>

                <button type="submit" class="login-btn">登 录</button>

                <div class="register-link">
                    <p>还没有账号？<router-link to="/register">立即注册</router-link></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/store/user';
    import { login } from '@/api/index';

    const router = useRouter();
    const userStore = useUserStore();

    const form = ref({ username: '', password: '' });

    const handleLogin = async () => {
        try {
            const response = await login(form.value);
            if (response.data && response.data.token) {
                userStore.setToken(response.data.token);
            router.push('/console');
            } else {
                alert('登录失败：未获取到token');
            }
        } catch (err) {
            alert('登录失败：无法连接服务器');
            // 不要跳转
        }
    };
</script>

<style scoped>
    /* 修复尺寸问题的关键修改 */
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
        padding: 20px;
        box-sizing: border-box; /* 新增：防止内边距影响尺寸 */
    }

    .login-card {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        padding: 40px 30px;
        width: calc(100% - 40px); /* 修复：考虑内边距的宽度计算 */
        max-width: 420px;
        box-sizing: border-box; /* 关键修复：包含内边距在宽度内 */
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        transform: translateY(0);
        transition: transform 0.3s ease;
    }

    .login-header {
        text-align: center;
        margin-bottom: 30px;
    }

    .login-header h2 {
        color: #2c3e50;
        font-size: 1.75rem; /* 使用相对单位 */
        margin-bottom: 10px;
        font-weight: 600;
    }

    .logo {
        font-size: 3rem; /* 使用相对单位 */
        margin: 10px 0;
        color: #3498db;
    }

    .input-group {
        position: relative;
        margin-bottom: 25px;
        width: 100%; /* 确保宽度继承 */
    }

    .input-field {
        width: 100%;
        padding: 14px 20px 14px 46px; /* 调整内边距 */
        border: 2px solid #e0e0e0;
        border-radius: 50px;
        font-size: 1rem;
        transition: all 0.3s;
        outline: none;
        background: #f8f9fa;
        box-sizing: border-box; /* 关键修复：包含内边距在宽度内 */
    }

    .input-field:focus {
        border-color: #3498db;
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        background: #fff;
    }

    .input-icon {
        position: absolute;
        left: 16px; /* 微调位置 */
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.25rem;
        color: #7f8c8d;
        pointer-events: none; /* 防止图标阻挡输入 */
    }

    .login-btn {
        width: 100%;
        padding: 14px;
        background: linear-gradient(to right, #3498db, #2c3e50);
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 1.125rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        letter-spacing: 1px;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        box-sizing: border-box; /* 确保尺寸包含内边距 */
    }

    .login-btn:hover {
        background: linear-gradient(to right, #2980b9, #1a2530);
        box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
        transform: translateY(-2px);
    }

    .register-link {
        text-align: center;
        margin-top: 25px;
        color: #7f8c8d;
        font-size: 0.9375rem;
    }

    .register-link a {
        color: #3498db;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s;
    }

    .register-link a:hover {
        color: #2980b9;
        text-decoration: underline;
    }

    /* 响应式调整 */
    @media (max-width: 480px) {
        .login-card {
            padding: 30px 20px;
            max-width: 340px;
        }

        .input-field {
            padding: 12px 16px 12px 42px;
        }

        .login-btn {
            padding: 12px;
        }
    }
</style>
