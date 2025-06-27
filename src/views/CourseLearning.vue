<!-- CourseLearning.vue -->
<template>
    <div class="course-learning">
        <!-- 顶部导航栏 -->
        <div class="top-nav">
            <div class="nav-left">
                <button class="back-btn" @click="goBack">
                    <span class="back-icon">←</span>
                    返回控制台
                </button>
            </div>
            <div class="nav-center">
                <h2>{{ course.title }}</h2>
            </div>
            <div class="nav-right">
                <div class="course-meta">
                    <span class="meta-item">👨‍🏫 {{ course.teacher }}</span>
                    <span class="meta-item">⭐ {{ course.rating }}</span>
                </div>
            </div>
        </div>

        <!-- 主要内容区域 -->
        <div class="main-content">
            <!-- 左侧：视频播放区域 -->
            <div class="video-section">
                <div class="video-player">
                    <div class="video-placeholder">
                        <div class="play-button">▶️</div>
                        <p>点击播放视频</p>
                    </div>
                </div>
                
                <!-- 当前章节信息 -->
                <div class="current-chapter">
                    <h3>{{ currentChapter.title }}</h3>
                    <p>{{ currentChapter.description }}</p>
                    <div class="chapter-actions">
                        <button class="btn btn-primary">✅ 标记完成</button>
                        <button class="btn btn-secondary">📝 笔记</button>
                        <button class="btn btn-secondary">❓ 提问</button>
                    </div>
                </div>
            </div>

            <!-- 右侧：学习进度和章节列表 -->
            <div class="side-panel">
                <!-- 学习进度 -->
                <div class="progress-card">
                    <h4>学习进度</h4>
                    <div class="progress-info">
                        <div class="progress-circle">
                            <div class="progress-text">
                                <span class="percentage">{{ course.progress }}%</span>
                                <span class="label">完成度</span>
                            </div>
                        </div>
                        <div class="progress-stats">
                            <div class="stat-item">
                                <span class="stat-number">{{ completedChapters }}</span>
                                <span class="stat-label">已完成</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">{{ chapters.length - completedChapters }}</span>
                                <span class="stat-label">待学习</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 章节列表 -->
                <div class="chapter-list-card">
                    <div class="section-header">
                        <h4>课程章节</h4>
                        <span class="chapter-count">{{ chapters.length }}章</span>
                    </div>
                    
                    <div class="chapter-list">
                        <div 
                            v-for="(chapter, index) in chapters" 
                            :key="chapter.id"
                            :class="['chapter-item', { 
                                'active': currentChapter.id === chapter.id,
                                'completed': chapter.completed 
                            }]"
                            @click="selectChapter(chapter)"
                        >
                            <div class="chapter-info">
                                <div class="chapter-number">{{ index + 1 }}</div>
                                <div class="chapter-content">
                                    <h5>{{ chapter.title }}</h5>
                                    <p>{{ chapter.duration }}</p>
                                </div>
                            </div>
                            <div class="chapter-status">
                                <span v-if="chapter.completed" class="status-completed">✅</span>
                                <span v-else class="status-pending">⏳</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部：学习工具 -->
        <div class="learning-tools">
            <div class="tool-item">
                <span class="tool-icon">📚</span>
                <span class="tool-text">课程资料</span>
            </div>
            <div class="tool-item">
                <span class="tool-icon">📝</span>
                <span class="tool-text">我的笔记</span>
            </div>
            <div class="tool-item">
                <span class="tool-icon">❓</span>
                <span class="tool-text">常见问题</span>
            </div>
            <div class="tool-item">
                <span class="tool-icon">💬</span>
                <span class="tool-text">讨论区</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 返回控制台
const goBack = () => {
    console.log('Navigating back to console from course learning');
    router.push('/console');
};

// 课程数据
const course = reactive({
    id: 1,
    title: 'Vue.js 前端开发实战课程',
    description: '从零开始学习Vue.js，掌握现代前端开发技术，构建响应式用户界面',
    teacher: '张老师',
    duration: '20小时',
    studentCount: 1250,
    rating: 4.8,
    progress: 35
});

// 当前章节
const currentChapter = ref({
    id: 2,
    title: 'Vue.js 基础语法',
    description: '学习Vue.js的核心概念，包括模板语法、数据绑定、事件处理等基础知识'
});

// 章节列表
const chapters = ref([
    {
        id: 1,
        title: '课程介绍与环境搭建',
        duration: '15分钟',
        completed: true
    },
    {
        id: 2,
        title: 'Vue.js 基础语法',
        duration: '45分钟',
        completed: false
    },
    {
        id: 3,
        title: '组件化开发',
        duration: '60分钟',
        completed: false
    },
    {
        id: 4,
        title: '路由管理',
        duration: '40分钟',
        completed: false
    },
    {
        id: 5,
        title: '状态管理',
        duration: '50分钟',
        completed: false
    },
    {
        id: 6,
        title: '项目实战',
        duration: '120分钟',
        completed: false
    }
]);

// 计算已完成章节数
const completedChapters = computed(() => {
    return chapters.value.filter(chapter => chapter.completed).length;
});

// 选择章节
const selectChapter = (chapter) => {
    currentChapter.value = chapter;
    // 这里可以添加视频切换逻辑
    console.log('切换到章节:', chapter.title);
};
</script>

<style scoped>
.course-learning {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    background: #f8fafc;
    min-height: 100vh;
}

/* 顶部导航栏 */
.top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: white;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 20px;
    z-index: 100;
}

.nav-left {
    display: flex;
    align-items: center;
}

.back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s;
    background: #f8fafc;
    color: #475569;
    border: 1px solid #e2e8f0;
}

.back-btn:hover {
    background: #e2e8f0;
    color: #1e293b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.back-icon {
    font-size: 1.1rem;
    font-weight: bold;
}

.nav-center h2 {
    margin: 0;
    font-size: 1.3rem;
    color: #1e293b;
    font-weight: 600;
}

.nav-right {
    display: flex;
    align-items: center;
}

.course-meta {
    display: flex;
    gap: 15px;
}

.meta-item {
    color: #64748b;
    font-size: 0.9rem;
}

/* 主要内容区域 */
.main-content {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 20px;
    margin-bottom: 20px;
}

/* 视频区域 */
.video-section {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.video-player {
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 比例 */
    background: #000;
    position: relative;
}

.video-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
}

.video-placeholder:hover {
    background: rgba(0, 0, 0, 0.8);
}

.play-button {
    font-size: 4rem;
    margin-bottom: 15px;
}

.current-chapter {
    padding: 25px;
}

.current-chapter h3 {
    margin: 0 0 10px 0;
    color: #1e293b;
    font-size: 1.3rem;
}

.current-chapter p {
    color: #64748b;
    margin: 0 0 20px 0;
    line-height: 1.6;
}

.chapter-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.3s;
}

.btn-primary {
    background: #3b82f6;
    color: white;
}

.btn-primary:hover {
    background: #2563eb;
}

.btn-secondary {
    background: #f1f5f9;
    color: #64748b;
    border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
    background: #e2e8f0;
}

/* 右侧面板 */
.side-panel {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.progress-card, .chapter-list-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.progress-card h4, .chapter-list-card h4 {
    margin: 0 0 15px 0;
    color: #1e293b;
    font-size: 1.1rem;
    font-weight: 600;
}

.progress-info {
    display: flex;
    align-items: center;
    gap: 20px;
}

.progress-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: conic-gradient(#3b82f6 0deg, #3b82f6 126deg, #e5e7eb 126deg, #e5e7eb 360deg);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.progress-circle::before {
    content: '';
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: white;
    position: absolute;
}

.progress-text {
    text-align: center;
    z-index: 1;
}

.percentage {
    display: block;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
}

.label {
    display: block;
    font-size: 0.75rem;
    color: #64748b;
}

.progress-stats {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.stat-item {
    text-align: center;
}

.stat-number {
    display: block;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
}

.stat-label {
    font-size: 0.8rem;
    color: #64748b;
}

/* 章节列表 */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.chapter-count {
    color: #64748b;
    font-size: 0.85rem;
}

.chapter-list {
    max-height: 350px;
    overflow-y: auto;
}

.chapter-item {
    padding: 12px 15px;
    border-bottom: 1px solid #f1f5f9;
    cursor: pointer;
    transition: background 0.3s;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    margin-bottom: 5px;
}

.chapter-item:hover {
    background: #f8fafc;
}

.chapter-item.active {
    background: #dbeafe;
    border-left: 3px solid #3b82f6;
}

.chapter-item.completed {
    background: #f0fdf4;
}

.chapter-info {
    display: flex;
    align-items: center;
    flex: 1;
}

.chapter-number {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #e2e8f0;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    margin-right: 12px;
}

.chapter-item.active .chapter-number {
    background: #3b82f6;
    color: white;
}

.chapter-item.completed .chapter-number {
    background: #10b981;
    color: white;
}

.chapter-content h5 {
    margin: 0 0 3px 0;
    color: #1e293b;
    font-size: 0.9rem;
    font-weight: 500;
}

.chapter-content p {
    margin: 0;
    color: #64748b;
    font-size: 0.8rem;
}

.chapter-status {
    font-size: 1rem;
}

.status-completed {
    color: #10b981;
}

.status-pending {
    color: #f59e0b;
}

/* 学习工具 */
.learning-tools {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
    gap: 20px;
}

.tool-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    border-radius: 8px;
    transition: background 0.3s;
}

.tool-item:hover {
    background: #f8fafc;
}

.tool-icon {
    font-size: 2rem;
    margin-bottom: 8px;
}

.tool-text {
    color: #64748b;
    font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 1200px) {
    .main-content {
        grid-template-columns: 1fr 300px;
    }
}

@media (max-width: 992px) {
    .main-content {
        grid-template-columns: 1fr;
    }
    
    .learning-tools {
        flex-wrap: wrap;
    }
}

@media (max-width: 768px) {
    .course-learning {
        padding: 15px;
    }
    
    .top-nav {
        padding: 12px 15px;
        margin-bottom: 15px;
    }
    
    .nav-center h2 {
        font-size: 1.1rem;
    }
    
    .course-meta {
        gap: 10px;
    }
    
    .meta-item {
        font-size: 0.8rem;
    }
    
    .learning-tools {
        flex-direction: column;
        gap: 15px;
    }
}
</style> 