<template>
    <div class="home-container">
        <!-- 页面标题 -->
        <div class="page-header">
            <h1 class="page-title">仪表板</h1>
            <p class="page-description">欢迎回到学城管理平台</p>
        </div>

        <!-- 统计卡片 -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon users">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-value">{{ stats.users.toLocaleString() }}</div>
                    <div class="stat-label">学员总数</div>
                    <div class="stat-change positive">+12.5%</div>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon courses">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 3H8C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5V21C10 20.4696 9.78929 19.9609 9.41421 19.5858C9.03914 19.2107 8.53043 19 8 19H2V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22 3H16C15.4696 3 14.9609 3.21071 14.5858 3.58579C14.2107 3.96086 14 4.46957 14 5V21C14 20.4696 14.2107 19.9609 14.5858 19.5858C14.9609 19.2107 15.4696 19 16 19H22V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-value">{{ stats.courses }}</div>
                    <div class="stat-label">课程数量</div>
                    <div class="stat-change positive">+8.2%</div>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon departments">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 21V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V21L12 17L19 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-value">{{ stats.departments }}</div>
                    <div class="stat-label">班级数量</div>
                    <div class="stat-change positive">+3.1%</div>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon activity">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-value">{{ stats.activity }}%</div>
                    <div class="stat-label">活跃度</div>
                    <div class="stat-change positive">+5.3%</div>
                </div>
            </div>
        </div>

        <!-- 主要内容区域 -->
        <div class="main-content-grid">
            <!-- 快速操作 -->
            <div class="quick-actions card">
                <h2 class="card-title">快速操作</h2>
                <div class="actions-grid">
                    <router-link to="/console/users" class="action-item">
                        <div class="action-icon users">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M20 8V14M23 11H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="action-content">
                            <div class="action-title">添加学员</div>
                            <div class="action-desc">注册新学员账户</div>
                        </div>
                    </router-link>

                    <router-link to="/console/courses" class="action-item">
                        <div class="action-icon courses">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="action-content">
                            <div class="action-title">创建课程</div>
                            <div class="action-desc">添加新的课程内容</div>
                        </div>
                    </router-link>

                    <router-link to="/console/departments" class="action-item">
                        <div class="action-icon departments">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 22H2L12 2L22 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16 18H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="action-content">
                            <div class="action-title">管理班级</div>
                            <div class="action-desc">组织和管理班级</div>
                        </div>
                    </router-link>

                    <router-link to="/console/settings" class="action-item">
                        <div class="action-icon settings">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="action-content">
                            <div class="action-title">系统设置</div>
                            <div class="action-desc">配置系统参数</div>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- 最近活动 -->
            <div class="recent-activity card">
                <h2 class="card-title">最近活动</h2>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M20 8V14M23 11H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">新学员注册</div>
                            <div class="activity-desc">张三 加入了前端开发班级</div>
                            <div class="activity-time">2分钟前</div>
                        </div>
                    </div>

                    <div class="activity-item">
                        <div class="activity-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">课程发布</div>
                            <div class="activity-desc">《Vue.js进阶教程》课程已发布</div>
                            <div class="activity-time">15分钟前</div>
                        </div>
                    </div>

                    <div class="activity-item">
                        <div class="activity-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 21V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V21L12 17L19 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">班级创建</div>
                            <div class="activity-desc">创建了"Python基础班"</div>
                            <div class="activity-time">1小时前</div>
                        </div>
                    </div>

                    <div class="activity-item">
                        <div class="activity-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">系统维护</div>
                            <div class="activity-desc">系统维护已完成</div>
                            <div class="activity-time">3小时前</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    // 这里可以添加数据获取逻辑
    const stats = ref({
        users: 1234,
        courses: 156,
        departments: 24,
        activity: 89
    });

    onMounted(() => {
        // 这里可以调用API获取实际数据
        console.log('Home page mounted');
    });
</script>

<style scoped>
    .home-container {
        padding: 0;
    }

    /* 页面标题 */
    .page-header {
        margin-bottom: 32px;
    }

    .page-title {
        font-size: 32px;
        font-weight: 600;
        color: #1e293b;
        margin: 0 0 8px 0;
    }

    .page-description {
        color: #64748b;
        font-size: 16px;
        margin: 0;
    }

    /* 统计卡片网格 */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        margin-bottom: 32px;
    }

    .stat-card {
        background: white;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        padding: 24px;
        display: flex;
        align-items: center;
        gap: 16px;
        transition: all 0.2s ease;
    }

    .stat-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }

    .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .stat-icon svg {
        width: 24px;
        height: 24px;
        color: white;
    }

    .stat-icon.users {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    }

    .stat-icon.courses {
        background: linear-gradient(135deg, #10b981, #047857);
    }

    .stat-icon.departments {
        background: linear-gradient(135deg, #f59e0b, #d97706);
    }

    .stat-icon.activity {
        background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    }

    .stat-content {
        flex: 1;
    }

    .stat-value {
        font-size: 28px;
        font-weight: 700;
        color: #1e293b;
        line-height: 1;
        margin-bottom: 4px;
    }

    .stat-label {
        font-size: 14px;
        color: #64748b;
        margin-bottom: 8px;
    }

    .stat-change {
        font-size: 12px;
        font-weight: 500;
        padding: 2px 8px;
        border-radius: 6px;
        display: inline-block;
    }

    .stat-change.positive {
        background: #dcfce7;
        color: #166534;
    }

    /* 主要内容网格 */
    .main-content-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
    }

    .card {
        background: white;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        padding: 24px;
    }

    .card-title {
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
        margin: 0 0 24px 0;
    }

    /* 快速操作 */
    .actions-grid {
        display: grid;
        gap: 16px;
    }

    .action-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        text-decoration: none;
        color: inherit;
        transition: all 0.2s ease;
    }

    .action-item:hover {
        background: #f8fafc;
        border-color: #3b82f6;
        transform: translateX(4px);
    }

    .action-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .action-icon svg {
        width: 20px;
        height: 20px;
        color: white;
    }

    .action-icon.users {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    }

    .action-icon.courses {
        background: linear-gradient(135deg, #10b981, #047857);
    }

    .action-icon.departments {
        background: linear-gradient(135deg, #f59e0b, #d97706);
    }

    .action-icon.settings {
        background: linear-gradient(135deg, #6b7280, #4b5563);
    }

    .action-content {
        flex: 1;
    }

    .action-title {
        font-size: 14px;
        font-weight: 500;
        color: #1e293b;
        margin-bottom: 4px;
    }

    .action-desc {
        font-size: 12px;
        color: #64748b;
    }

    /* 最近活动 */
    .activity-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .activity-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 16px;
        border-radius: 8px;
        transition: all 0.2s ease;
    }

    .activity-item:hover {
        background: #f8fafc;
    }

    .activity-icon {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        background: #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 2px;
    }

    .activity-icon svg {
        width: 16px;
        height: 16px;
        color: #64748b;
    }

    .activity-content {
        flex: 1;
    }

    .activity-title {
        font-size: 14px;
        font-weight: 500;
        color: #1e293b;
        margin-bottom: 4px;
    }

    .activity-desc {
        font-size: 13px;
        color: #64748b;
        margin-bottom: 6px;
    }

    .activity-time {
        font-size: 12px;
        color: #94a3b8;
    }

    /* 响应式设计 */
    @media (max-width: 1024px) {
        .main-content-grid {
            grid-template-columns: 1fr;
            gap: 24px;
        }
    }

    @media (max-width: 768px) {
        .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 16px;
        }

        .page-title {
            font-size: 28px;
        }

        .card {
            padding: 20px;
        }
    }

    @media (max-width: 480px) {
        .stats-grid {
            grid-template-columns: 1fr;
        }

        .stat-card {
            padding: 20px;
        }

        .action-item {
            padding: 12px;
        }

        .activity-item {
            padding: 12px;
        }
    }
</style>
