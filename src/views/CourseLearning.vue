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
                <h2>{{ course.courseName }}</h2>
            </div>
            <div class="nav-right">
                <div class="course-meta">
                    <span class="meta-item">👨‍🏫 {{ course.teacher }}</span>
                    <span class="meta-item">📅 {{ formatDate(course.createTime) }}</span>
                </div>
            </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
            <div class="loading-spinner">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <p>加载课程信息中...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="error-container">
            <div class="error-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h3>加载失败</h3>
            <p>{{ error }}</p>
            <button class="btn btn-primary" @click="goBack">返回课程列表</button>
        </div>

        <!-- 主要内容区域 -->
        <div v-else class="main-content">
            <!-- 左侧：视频播放区域 -->
            <div class="video-section">
                <div class="video-player">
                    <div class="video-placeholder" v-if="!currentVideo">
                        <div class="play-button">▶️</div>
                        <p>选择章节开始学习</p>
                    </div>
                    <div class="video-container" v-else>
                        <video v-if="currentVideo.videoUrl" :src="currentVideo.videoUrl" controls class="video-element">
                            您的浏览器不支持视频播放
                        </video>
                        <div v-else class="video-placeholder">
                            <div class="play-button">▶️</div>
                            <p>{{ currentVideo.videoTitle }}</p>
                        </div>
                    </div>
                </div>
                
                <!-- 当前章节信息 -->
                <div class="current-chapter" v-if="currentChapter">
                    <h3>{{ currentChapter.chapterTitle }}</h3>
                    <p v-if="currentVideo">{{ currentVideo.videoTitle }}</p>
                    <div class="chapter-actions">
                        <button class="btn btn-primary">✅ 标记完成</button>
                        <button class="btn btn-secondary">📝 笔记</button>
                        <button class="btn btn-secondary">❓ 提问</button>
                    </div>
                </div>
            </div>

            <!-- 右侧：学习进度和章节列表 -->
            <div class="sidebar">
                <!-- 课程信息卡片 -->
                <div class="course-info-card">
                    <div class="course-cover">
                        <img v-if="course.coverUrl" :src="course.coverUrl" :alt="course.courseName">
                        <div v-else class="default-cover">📚</div>
                    </div>
                    <div class="course-details">
                        <h3>{{ course.courseName }}</h3>
                        <p>{{ course.description }}</p>
                        <div class="course-stats">
                            <div class="stat-item">
                                <span class="stat-label">状态</span>
                                <span class="stat-value">{{ getStatusText(course.status) }}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">章节数</span>
                                <span class="stat-value">{{ chapters.length }}章</span>
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
                            :key="chapter.chapterId"
                            :class="['chapter-item', { 
                                'active': currentChapter && currentChapter.chapterId === chapter.chapterId,
                                'expanded': expandedChapters.includes(chapter.chapterId)
                            }]"
                        >
                            <div class="chapter-header" @click="toggleChapter(chapter)">
                                <div class="chapter-info">
                                    <div class="chapter-number">{{ index + 1 }}</div>
                                    <div class="chapter-content">
                                        <h5>{{ chapter.chapterTitle }}</h5>
                                        <p>{{ chapter.videos.length }}个视频</p>
                                    </div>
                                </div>
                                <div class="chapter-toggle">
                                    <span v-if="expandedChapters.includes(chapter.chapterId)">▼</span>
                                    <span v-else>▶</span>
                                </div>
                            </div>
                            
                            <!-- 视频列表 -->
                            <div v-if="expandedChapters.includes(chapter.chapterId)" class="video-list">
                                <div 
                                    v-for="video in chapter.videos" 
                                    :key="video.videoId"
                                    :class="['video-item', { 
                                        'active': currentVideo && currentVideo.videoId === video.videoId 
                                    }]"
                                    @click="selectVideo(chapter, video)"
                                >
                                    <div class="video-icon">🎥</div>
                                    <div class="video-info">
                                        <div class="video-title">{{ video.videoTitle }}</div>
                                        <div class="video-duration">{{ video.duration || '未知时长' }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部：学习工具 -->
        <div class="learning-tools" v-if="!loading && !error">
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
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getCourseDetail } from '@/api/index.js';

const router = useRouter();
const route = useRoute();

// 返回控制台
const goBack = () => {
    console.log('Navigating back to console from course learning');
    router.push('/console/courses');
};

// 课程数据
const course = reactive({
    courseId: null,
    courseName: '',
    description: '',
    teacher: '',
    coverUrl: '',
    createTime: '',
    updateTime: '',
    status: ''
});

// 章节数据
const chapters = ref([]);

// 当前选中的章节和视频
const currentChapter = ref(null);
const currentVideo = ref(null);

// 展开的章节
const expandedChapters = ref([]);

// 加载状态
const loading = ref(true);
const error = ref(null);

// 格式化日期
const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('zh-CN');
};

// 获取状态文本
const getStatusText = (status) => {
    const statusMap = {
        'published': '已发布',
        'draft': '草稿',
        'archived': '下架'
    };
    return statusMap[status] || '未知';
};

// 获取课程详情
const fetchCourseDetail = async (courseId) => {
    loading.value = true;
    error.value = null;
    
    try {
        const response = await getCourseDetail(courseId);
        
        if (response.data && response.data.success) {
            const { course: courseInfo, chapters: chapterList } = response.data;
            
            // 更新课程信息
            Object.assign(course, courseInfo);
            
            // 更新章节信息
            chapters.value = chapterList || [];
            
            // 默认展开第一个章节并选择第一个视频
            if (chapters.value.length > 0) {
                const firstChapter = chapters.value[0];
                expandedChapters.value.push(firstChapter.chapterId);
                currentChapter.value = firstChapter;
                
                if (firstChapter.videos && firstChapter.videos.length > 0) {
                    currentVideo.value = firstChapter.videos[0];
                }
            }
            
        } else {
            error.value = response.data.message || '获取课程详情失败';
        }
    } catch (apiError) {
        console.log('API调用失败:', apiError);
        error.value = '网络错误，请稍后重试';
    } finally {
        loading.value = false;
    }
};

// 切换章节展开/收起
const toggleChapter = (chapter) => {
    const index = expandedChapters.value.indexOf(chapter.chapterId);
    if (index > -1) {
        expandedChapters.value.splice(index, 1);
    } else {
        expandedChapters.value.push(chapter.chapterId);
    }
};

// 选择视频
const selectVideo = (chapter, video) => {
    currentChapter.value = chapter;
    currentVideo.value = video;
    console.log('切换到视频:', video.videoTitle);
};

// 组件挂载时获取课程信息
onMounted(() => {
    const courseId = route.params.id;
    if (courseId) {
        fetchCourseDetail(courseId);
    } else {
        error.value = '课程ID无效';
        loading.value = false;
    }
});
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

/* 加载和错误状态 */
.loading-container,
.error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-bottom: 20px;
}

.loading-spinner {
    width: 48px;
    height: 48px;
    color: #3b82f6;
    margin-bottom: 16px;
}

.loading-spinner svg {
    width: 100%;
    height: 100%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.error-icon {
    width: 48px;
    height: 48px;
    color: #ef4444;
    margin-bottom: 16px;
}

.error-icon svg {
    width: 100%;
    height: 100%;
}

.loading-container p,
.error-container p {
    color: #64748b;
    font-size: 16px;
    margin: 0 0 16px 0;
}

.error-container h3 {
    color: #1e293b;
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 8px 0;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    text-decoration: none;
}

.btn-primary {
    background: #3b82f6;
    color: white;
}

.btn-primary:hover {
    background: #2563eb;
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

.video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.video-element {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
.sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.course-info-card {
    display: flex;
    align-items: center;
    gap: 20px;
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.course-cover {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
}

.course-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.default-cover {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e0e7ff;
    color: #4f46e5;
    font-size: 2.5rem;
}

.course-details {
    flex: 1;
}

.course-details h3 {
    margin: 0 0 5px 0;
    color: #1e293b;
    font-size: 1.2rem;
    font-weight: 600;
}

.course-details p {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0 0 10px 0;
    line-height: 1.5;
}

.course-stats {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 5px;
}

.stat-label {
    color: #64748b;
    font-size: 0.8rem;
}

.stat-value {
    color: #1e293b;
    font-weight: 500;
    font-size: 0.9rem;
}

.chapter-list-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chapter-list-card h4 {
    margin: 0 0 15px 0;
    color: #1e293b;
    font-size: 1.1rem;
    font-weight: 600;
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
    flex-direction: column;
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

.chapter-item.expanded {
    background: #f8fafc;
}

.chapter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    cursor: pointer;
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

.chapter-item.expanded .chapter-number {
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

.chapter-toggle {
    font-size: 1rem;
    color: #64748b;
}

.video-list {
    padding-left: 20px;
    margin-top: 10px;
}

.video-item {
    padding: 12px 15px;
    border-bottom: 1px solid #f1f5f9;
    cursor: pointer;
    transition: background 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    margin-bottom: 5px;
}

.video-item:hover {
    background: #f8fafc;
}

.video-item.active {
    background: #dbeafe;
    border-left: 3px solid #3b82f6;
}

.video-icon {
    font-size: 1.2rem;
    color: #3b82f6;
}

.video-info {
    flex: 1;
}

.video-title {
    font-size: 0.9rem;
    font-weight: 500;
    color: #1e293b;
    margin-bottom: 3px;
}

.video-duration {
    font-size: 0.75rem;
    color: #64748b;
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