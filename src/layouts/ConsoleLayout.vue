<!-- ConsoleLayout.vue -->
<template>
    <div class="console-container">
        <!-- 侧边导航 -->
        <div class="sidebar">
            <div class="logo-area">
                <h2>学习平台管理</h2>
            </div>

            <nav class="menu">
                <router-link
                        v-for="item in menuItems"
                        :key="item.path"
                        :to="item.path"
                        active-class="active"
                >
                    <span class="icon">{{ item.icon }}</span>
                    <span class="title">{{ item.title }}</span>
                </router-link>
            </nav>

            <div class="user-info">
                <div class="avatar">👤</div>
                <div class="name">管理员</div>
                <button @click="logout" class="logout-btn">退出</button>
            </div>
        </div>

        <!-- 主内容区 -->
        <div class="main-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useUserStore } from '@/store/user';

    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();

    const menuItems = ref([
        { title: '学员管理', path: '/console/users', icon: '👥' },
        { title: '班级管理', path: '/console/departments', icon: '🏫' },
        { title: '课程管理', path: '/console/courses', icon: '📚' },
        { title: '角色权限', path: '/console/roles', icon: '🔑' },
        { title: '系统设置', path: '/console/settings', icon: '⚙️' }
    ]);

    const logout = () => {
        // 清除用户token
        userStore.logout();
        // 跳转到登录页面
        router.push('/login');
    };

    // 调试信息
    onMounted(() => {
        console.log('ConsoleLayout mounted, current route:', route.path);
        console.log('Available menu items:', menuItems.value);
    });
</script>

<style scoped>
    .console-container {
        display: flex;
        min-height: 100vh;
        background-color: #f5f7fa;
    }

    .sidebar {
        width: 240px;
        background: linear-gradient(180deg, #1e3a8a 0%, #1d4ed8 100%);
        color: white;
        display: flex;
        flex-direction: column;
        box-shadow: 3px 0 10px rgba(0, 0, 0, 0.1);
        z-index: 10;
    }

    .logo-area {
        padding: 24px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .logo-area h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .menu {
        flex: 1;
        padding: 20px 0;
    }

    .menu a {
        display: flex;
        align-items: center;
        padding: 14px 24px;
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: all 0.3s;
        font-size: 1.05rem;
    }

    .menu a:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }

    .menu a.active {
        background: rgba(255, 255, 255, 0.15);
        color: white;
        border-left: 4px solid #60a5fa;
    }

    .menu .icon {
        font-size: 1.3rem;
        margin-right: 12px;
        width: 24px;
        text-align: center;
    }

    .user-info {
        padding: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        margin-bottom: 10px;
    }

    .name {
        font-size: 1.1rem;
        margin-bottom: 15px;
    }

    .logout-btn {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 8px 20px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s;
        width: 100%;
    }

    .logout-btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .main-content {
        flex: 1;
        padding: 30px;
        overflow-y: auto;
    }
</style>
