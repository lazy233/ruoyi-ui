<!-- ConsoleLayout.vue -->
<template>
    <div class="console-container">
        <!-- 侧边导航 -->
        <div class="sidebar">
            <div class="logo-area">
                <div class="logo-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h2 class="logo-text">学城</h2>
            </div>

            <nav class="menu">
                <router-link
                        v-for="item in menuItems"
                        :key="item.path"
                        :to="item.path"
                        active-class="active"
                        class="menu-item"
                >
                    <svg class="menu-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path :d="item.iconPath" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="menu-title">{{ item.title }}</span>
                </router-link>
            </nav>

            <div class="user-section">
                <div class="user-info">
                    <div class="avatar">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="user-details">
                        <div class="user-name">管理员</div>
                        <div class="user-role">系统管理员</div>
                    </div>
                </div>
                <button @click="logout" class="logout-btn" title="退出登录">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>

        <!-- 主内容区 -->
        <div class="main-content">
            <div class="content-wrapper">
                <router-view></router-view>
            </div>
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
        { 
            title: '学员管理', 
            path: '/console/users', 
            iconPath: 'M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z'
        },
        { 
            title: '班级管理', 
            path: '/console/departments', 
            iconPath: 'M19 21V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V21L12 17L19 21Z'
        },
        { 
            title: '课程管理', 
            path: '/console/courses', 
            iconPath: 'M2 3H8C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5V21C10 20.4696 9.78929 19.9609 9.41421 19.5858C9.03914 19.2107 8.53043 19 8 19H2V3ZM22 3H16C15.4696 3 14.9609 3.21071 14.5858 3.58579C14.2107 3.96086 14 4.46957 14 5V21C14 20.4696 14.2107 19.9609 14.5858 19.5858C14.9609 19.2107 15.4696 19 16 19H22V3Z'
        },
        { 
            title: '角色权限', 
            path: '/console/roles', 
            iconPath: 'M16.5 10.5V6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5V10.5M6 22H18C19.1046 22 20 21.1046 20 20V12C20 10.8954 19.1046 10 18 10H6C4.89543 10 4 10.8954 4 12V20C4 21.1046 4.89543 22 6 22Z'
        },
        { 
            title: '系统设置', 
            path: '/console/settings', 
            iconPath: 'M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15ZM19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z'
        }
    ]);

    const logout = () => {
        userStore.logout();
        router.push('/login');
    };

    onMounted(() => {
        console.log('ConsoleLayout mounted, current route:', route.path);
        console.log('Available menu items:', menuItems.value);
    });
</script>

<style scoped>
    .console-container {
        display: flex;
        min-height: 100vh;
        background-color: #f8fafc;
    }

    /* 侧边栏 */
    .sidebar {
        width: 240px;
        background-color: #1e293b;
        color: white;
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 1000;
        border-right: 1px solid #334155;
    }

    /* Logo区域 */
    .logo-area {
        padding: 24px 20px;
        border-bottom: 1px solid #334155;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .logo-icon {
        width: 32px;
        height: 32px;
        background: #3b82f6;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }

    .logo-icon svg {
        width: 20px;
        height: 20px;
    }

    .logo-text {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
        color: #f1f5f9;
    }

    /* 菜单 */
    .menu {
        flex: 1;
        padding: 20px 0;
        overflow-y: auto;
    }

    .menu-item {
        display: flex;
        align-items: center;
        padding: 12px 20px;
        color: #94a3b8;
        text-decoration: none;
        transition: all 0.2s ease;
        margin: 0 12px 4px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
    }

    .menu-item:hover {
        background: #334155;
        color: #f1f5f9;
    }

    .menu-item.active {
        background: #3b82f6;
        color: white;
    }

    .menu-icon {
        width: 20px;
        height: 20px;
        margin-right: 12px;
        flex-shrink: 0;
    }

    .menu-title {
        flex: 1;
    }

    /* 用户区域 */
    .user-section {
        padding: 20px;
        border-top: 1px solid #334155;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .user-info {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    }

    .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #334155;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #94a3b8;
    }

    .avatar svg {
        width: 20px;
        height: 20px;
    }

    .user-details {
        flex: 1;
    }

    .user-name {
        font-size: 14px;
        font-weight: 500;
        color: #f1f5f9;
        line-height: 1.2;
    }

    .user-role {
        font-size: 12px;
        color: #94a3b8;
        line-height: 1.2;
    }

    .logout-btn {
        width: 32px;
        height: 32px;
        border: none;
        background: #334155;
        color: #94a3b8;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    .logout-btn:hover {
        background: #475569;
        color: #f1f5f9;
    }

    .logout-btn svg {
        width: 16px;
        height: 16px;
    }

    /* 主内容区 */
    .main-content {
        flex: 1;
        margin-left: 240px;
        background-color: #f8fafc;
        min-height: 100vh;
    }

    .content-wrapper {
        padding: 32px;
        max-width: 1200px;
        margin: 0 auto;
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .sidebar {
            width: 200px;
        }

        .main-content {
            margin-left: 200px;
        }

        .content-wrapper {
            padding: 20px;
        }

        .logo-text {
            display: none;
        }

        .menu-title {
            display: none;
        }

        .user-details {
            display: none;
        }
    }

    @media (max-width: 640px) {
        .sidebar {
            width: 60px;
        }

        .main-content {
            margin-left: 60px;
        }

        .logo-area {
            padding: 20px 10px;
            justify-content: center;
        }

        .menu-item {
            margin: 0 8px 4px;
            justify-content: center;
        }

        .menu-icon {
            margin: 0;
        }

        .user-section {
            padding: 15px 10px;
            justify-content: center;
        }
    }
</style>
