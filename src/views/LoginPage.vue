<template>
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <div class="logo">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h1>学城</h1>
                <p class="subtitle">学习管理平台</p>
            </div>

            <form @submit.prevent="handleLogin" class="login-form">
                <div class="form-group">
                    <label class="form-label">用户名</label>
                    <input
                        v-model="form.username"
                        type="text"
                        placeholder="请输入用户名或邮箱"
                        required
                        class="form-input"
                    />
                </div>

                <div class="form-group">
                    <label class="form-label">密码</label>
                    <input
                        v-model="form.password"
                        type="password"
                        placeholder="请输入密码"
                        required
                        class="form-input"
                    />
                </div>

                <div class="form-options">
                    <label class="checkbox-wrapper">
                        <input type="checkbox" class="checkbox">
                        <span class="checkbox-text">记住我</span>
                    </label>
                    <a href="#" class="forgot-link" @click.prevent>忘记密码？</a>
                </div>

                <button type="submit" class="login-btn" :disabled="loading">
                    <span v-if="loading" class="loading">
                        <svg class="loading-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        登录中...
                    </span>
                    <span v-else>登录</span>
                </button>

                <div class="register-section">
                    <span>还没有账号？</span>
                    <router-link to="/register" class="register-link">立即注册</router-link>
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
    const loading = ref(false);

    const handleLogin = async () => {
        loading.value = true;
        try {
            const response = await login(form.value);
            if (response.data && response.data.token) {
                userStore.setToken(response.data.token);
                router.push('/console');
            } else {
                showErrorMessage('登录失败：未获取到token');
            }
        } catch (err) {
            showErrorMessage('登录失败：用户名或密码错误');
        } finally {
            loading.value = false;
        }
    };

    const showErrorMessage = (message) => {
        alert(message);
    };
</script>

<style scoped>
    .login-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f8fafc;
        padding: 20px;
    }

    .login-card {
        width: 100%;
        max-width: 400px;
        background: white;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        padding: 40px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .login-header {
        text-align: center;
        margin-bottom: 32px;
    }

    .logo {
        width: 48px;
        height: 48px;
        background: #3b82f6;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
        color: white;
    }

    .logo svg {
        width: 24px;
        height: 24px;
    }

    .login-header h1 {
        font-size: 24px;
        font-weight: 600;
        color: #1e293b;
        margin: 0 0 8px 0;
    }

    .subtitle {
        color: #64748b;
        font-size: 14px;
        margin: 0;
    }

    .login-form {
        margin-top: 32px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: #374151;
        margin-bottom: 6px;
    }

    .form-input {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.2s ease;
        background: white;
        color: #1f2937;
    }

    .form-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-input::placeholder {
        color: #9ca3af;
    }

    .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .checkbox-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .checkbox {
        margin-right: 8px;
        accent-color: #3b82f6;
    }

    .checkbox-text {
        font-size: 14px;
        color: #6b7280;
    }

    .forgot-link {
        font-size: 14px;
        color: #3b82f6;
        text-decoration: none;
        font-weight: 500;
    }

    .forgot-link:hover {
        color: #2563eb;
    }

    .login-btn {
        width: 100%;
        padding: 12px 16px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-bottom: 24px;
    }

    .login-btn:hover:not(:disabled) {
        background: #2563eb;
    }

    .login-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .loading-icon {
        width: 16px;
        height: 16px;
        animation: spin 1s linear infinite;
    }

    .register-section {
        text-align: center;
        font-size: 14px;
        color: #6b7280;
    }

    .register-link {
        color: #3b82f6;
        text-decoration: none;
        font-weight: 500;
        margin-left: 4px;
    }

    .register-link:hover {
        color: #2563eb;
        text-decoration: underline;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    /* 响应式设计 */
    @media (max-width: 480px) {
        .login-container {
            padding: 16px;
        }

        .login-card {
            padding: 32px 24px;
        }

        .form-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
        }
    }
</style>
