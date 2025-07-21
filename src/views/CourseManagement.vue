<!-- CourseManagement.vue -->
<template>
    <div class="page-container">
        <!-- 页面头部 -->
        <div class="page-header">
            <div class="header-content">
                <h1 class="page-title">课程管理</h1>
                <p class="page-description">管理和维护课程信息</p>
            </div>
            <button class="btn btn-primary" @click="showCreateWizard = true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                创建课程
            </button>
        </div>

        <!-- 搜索栏 -->
        <div class="search-section">
            <div class="search-bar">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input 
                    type="text" 
                    placeholder="搜索课程名称、教师..." 
                    class="search-input" 
                    v-model="searchQuery"
                    @keyup.enter="handleSearch"
                >
            </div>
            <div class="search-actions">
                <button class="btn btn-secondary" @click="resetSearch">重置</button>
                <button class="btn btn-primary" @click="handleSearch">搜索</button>
            </div>
        </div>

        <!-- 数据表格 -->
        <div class="table-container">
            <div class="table-header">
                <div class="table-title">课程列表</div>
                <div class="table-summary">共 {{ total }} 条记录</div>
            </div>
            
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>课程信息</th>
                            <th>教师</th>
                            <th>分类</th>
                            <th>学员数量</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="course in filteredCourses" :key="course.courseId" class="table-row">
                            <td>
                                <div class="course-info">
                                    <div class="course-icon">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 10V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <rect x="2" y="10" width="20" height="10" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M6 14H6.01M10 14H10.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                    <div class="course-details">
                                        <div class="course-title">{{ course.courseName }}</div>
                                        <div class="course-desc">{{ course.description || '暂无描述' }}</div>
                                        <div class="course-meta">
                                            <span class="duration-tag">{{ course.duration || '未设置时长' }}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="teacher-name">{{ course.teacher || '未分配' }}</span>
                            </td>
                            <td>
                                <span class="category-tag">{{ course.category || '未分类' }}</span>
                            </td>
                            <td>
                                <span class="student-count">{{ course.studentCount || 0 }} 人</span>
                            </td>
                            <td>
                                <span :class="['status-badge', course.status]">
                                    {{ getStatusText(course.status) }}
                                </span>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-sm btn-secondary" @click="viewCourse(course)" title="查看">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <button class="btn btn-sm btn-secondary" @click="editCourse(course)" title="编辑">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <button class="btn btn-sm btn-danger" @click="deleteCourse(course.courseId)" title="删除">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <!-- 空状态 -->
                <div v-if="filteredCourses.length === 0" class="empty-state">
                    <div class="empty-state-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 10V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <rect x="2" y="10" width="20" height="10" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 14H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="empty-state-text">暂无课程数据</div>
                    <div class="empty-state-desc">点击上方"创建课程"按钮创建第一个课程</div>
                </div>
            </div>
        </div>

        <!-- 分页 -->
        <div class="pagination" v-if="total > 0">
            <button 
                class="pagination-btn"
                :disabled="currentPage === 1" 
                @click="handlePageChange(currentPage - 1)"
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                上一页
            </button>
            <div class="pagination-info">
                <span class="current-page">{{ currentPage }}</span>
                <span class="separator">/ {{ totalPage }}</span>
            </div>
            <button 
                class="pagination-btn"
                :disabled="currentPage === totalPage" 
                @click="handlePageChange(currentPage + 1)"
            >
                下一页
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>

        <!-- 创建课程向导 -->
        <div v-if="showCreateWizard" class="wizard-overlay" @click="closeCreateWizard">
            <div class="wizard-dialog" @click.stop>
                <!-- 向导头部 -->
                <div class="wizard-header">
                    <h2>创建新课程</h2>
                    <button class="wizard-close" @click="closeCreateWizard">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <!-- 步骤指示器 -->
                <div class="wizard-steps">
                    <div v-for="(step, index) in wizardSteps" :key="index" 
                         :class="['step', { 
                             'active': currentStep === index, 
                             'completed': currentStep > index 
                         }]">
                        <div class="step-number">{{ index + 1 }}</div>
                        <div class="step-title">{{ step.title }}</div>
                    </div>
                </div>

                <!-- 步骤内容 -->
                <div class="wizard-content">
                    <!-- 步骤1: 基本信息 -->
                    <div v-show="currentStep === 0" class="step-content">
                        <h3>课程基本信息</h3>
                        <div class="form-grid">
                            <div class="form-group full-width">
                                <label class="form-label">课程名称 *</label>
                                <input type="text" v-model="newCourse.courseName" placeholder="请输入课程名称" class="form-input">
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">课程描述 *</label>
                                <textarea v-model="newCourse.description" placeholder="请输入课程描述" rows="3" class="form-textarea"></textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">授课教师 *</label>
                                <select v-model="newCourse.teacher" class="form-select">
                                    <option value="">请选择教师</option>
                                    <option value="张老师">张老师</option>
                                    <option value="李老师">李老师</option>
                                    <option value="王老师">王老师</option>
                                    <option value="陈老师">陈老师</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">课程分类 *</label>
                                <select v-model="newCourse.category" class="form-select">
                                    <option value="">请选择分类</option>
                                    <option value="前端开发">前端开发</option>
                                    <option value="后端开发">后端开发</option>
                                    <option value="移动开发">移动开发</option>
                                    <option value="数据科学">数据科学</option>
                                    <option value="人工智能">人工智能</option>
                                    <option value="产品设计">产品设计</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">难度等级</label>
                                <select v-model="newCourse.level" class="form-select">
                                    <option value="beginner">初级</option>
                                    <option value="intermediate">中级</option>
                                    <option value="advanced">高级</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">课程价格</label>
                                <input type="number" v-model="newCourse.price" placeholder="0" class="form-input" min="0" step="0.01">
                            </div>
                            <div class="form-group full-width">
                                <label class="form-label">课程封面</label>
                                <div class="cover-upload" @click="triggerCoverUpload">
                                    <div v-if="newCourse.coverPreview" class="cover-preview">
                                        <img :src="newCourse.coverPreview" alt="课程封面">
                                        <div class="cover-overlay">
                                            <span>点击更换</span>
                                        </div>
                                    </div>
                                    <div v-else class="upload-placeholder">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.5 4H20.5C21.0304 4 21.5391 4.21071 21.9142 4.58579C22.2893 4.96086 22.5 5.46957 22.5 6V20C22.5 20.5304 22.2893 21.0391 21.9142 21.4142C21.5391 21.7893 21.0304 22 20.5 22H3.5C2.96957 22 2.46086 21.7893 2.08579 21.4142C1.71071 21.0391 1.5 20.5304 1.5 20V6C1.5 5.46957 1.71071 4.96086 2.08579 4.58579C2.46086 4.21071 2.96957 4 3.5 4H9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M12 2V14M9 11L12 14L15 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        <p>点击上传课程封面</p>
                                        <span>建议尺寸：1920×1080px</span>
                                    </div>
                                </div>
                                <input ref="coverInput" type="file" accept="image/*" @change="handleCoverChange" style="display: none">
                            </div>
                        </div>
                    </div>

                    <!-- 步骤2: 章节管理 -->
                    <div v-show="currentStep === 1" class="step-content">
                        <div class="chapter-header">
                            <h3>课程章节</h3>
                            <button class="btn btn-primary" @click="addChapter">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                添加章节
                            </button>
                        </div>
                        
                        <div class="chapters-list">
                            <div v-for="(chapter, chapterIndex) in newCourse.chapters" :key="chapter.tempId" class="chapter-item">
                                <div class="chapter-header-info">
                                    <div class="chapter-number">第{{ chapterIndex + 1 }}章</div>
                                    <input type="text" v-model="chapter.title" placeholder="请输入章节标题" class="chapter-title-input">
                                    <button class="btn btn-sm btn-danger" @click="removeChapter(chapterIndex)">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="chapter-description">
                                    <textarea v-model="chapter.description" placeholder="请输入章节描述（可选）" rows="2" class="form-textarea"></textarea>
                                </div>
                                <div class="videos-section">
                                    <div class="videos-header">
                                        <span class="videos-title">视频列表</span>
                                        <button class="btn btn-sm btn-secondary" @click="addVideo(chapterIndex)">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            添加视频
                                        </button>
                                    </div>
                                    <div class="videos-list">
                                        <div v-for="(video, videoIndex) in chapter.videos" :key="video.tempId" class="video-item">
                                            <div class="video-info">
                                                <div class="video-number">{{ videoIndex + 1 }}.</div>
                                                <input type="text" v-model="video.title" placeholder="请输入视频标题" class="video-title-input">
                                                <input type="text" v-model="video.duration" placeholder="时长(如: 10:30)" class="video-duration-input">
                                                <button class="btn btn-sm btn-danger" @click="removeVideo(chapterIndex, videoIndex)">
                                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div class="video-upload">
                                                <div v-if="video.file" class="video-preview">
                                                    <div class="video-file-info">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <polygon points="23 7 16 12 23 17 23 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                        <span>{{ video.file.name }}</span>
                                                        <span class="file-size">({{ formatFileSize(video.file.size) }})</span>
                                                    </div>
                                                    <button class="btn btn-sm btn-secondary" @click="changeVideo(chapterIndex, videoIndex)">更换</button>
                                                </div>
                                                <div v-else class="video-upload-area" @click="uploadVideo(chapterIndex, videoIndex)">
                                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                    <span>点击上传视频</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="chapter.videos.length === 0" class="empty-videos">
                                            <p>暂无视频，点击"添加视频"开始添加</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="newCourse.chapters.length === 0" class="empty-chapters">
                                <div class="empty-icon">📚</div>
                                <p>暂无章节，点击"添加章节"开始创建课程内容</p>
                            </div>
                        </div>
                    </div>

                    <!-- 步骤3: 预览确认 -->
                    <div v-show="currentStep === 2" class="step-content">
                        <h3>预览课程</h3>
                        <div class="course-preview">
                            <div class="preview-basic">
                                <h4>基本信息</h4>
                                <div class="preview-grid">
                                    <div class="preview-item">
                                        <span class="preview-label">课程名称:</span>
                                        <span class="preview-value">{{ newCourse.courseName }}</span>
                                    </div>
                                    <div class="preview-item">
                                        <span class="preview-label">授课教师:</span>
                                        <span class="preview-value">{{ newCourse.teacher }}</span>
                                    </div>
                                    <div class="preview-item">
                                        <span class="preview-label">课程分类:</span>
                                        <span class="preview-value">{{ newCourse.category }}</span>
                                    </div>
                                    <div class="preview-item">
                                        <span class="preview-label">难度等级:</span>
                                        <span class="preview-value">{{ getLevelText(newCourse.level) }}</span>
                                    </div>
                                    <div class="preview-item">
                                        <span class="preview-label">课程价格:</span>
                                        <span class="preview-value">{{ newCourse.price > 0 ? '¥' + newCourse.price : '免费' }}</span>
                                    </div>
                                    <div class="preview-item full-width">
                                        <span class="preview-label">课程描述:</span>
                                        <span class="preview-value">{{ newCourse.description }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="preview-content">
                                <h4>课程内容</h4>
                                <div class="preview-stats">
                                    <div class="stat-item">
                                        <span class="stat-number">{{ newCourse.chapters.length }}</span>
                                        <span class="stat-label">章节</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-number">{{ getTotalVideos() }}</span>
                                        <span class="stat-label">视频</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-number">{{ getTotalSize() }}</span>
                                        <span class="stat-label">总大小</span>
                                    </div>
                                </div>
                                <div class="preview-chapters">
                                    <div v-for="(chapter, index) in newCourse.chapters" :key="chapter.tempId" class="preview-chapter">
                                        <div class="preview-chapter-title">第{{ index + 1 }}章: {{ chapter.title }}</div>
                                        <div class="preview-chapter-videos">
                                            <div v-for="(video, vIndex) in chapter.videos" :key="video.tempId" class="preview-video">
                                                {{ vIndex + 1 }}. {{ video.title }} 
                                                <span v-if="video.duration">({{ video.duration }})</span>
                                                <span v-if="video.file" class="video-file-tag">已上传</span>
                                                <span v-else class="video-file-tag missing">待上传</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 向导底部 -->
                <div class="wizard-footer">
                    <button v-if="currentStep > 0" class="btn btn-secondary" @click="previousStep">上一步</button>
                    <div class="wizard-actions">
                        <button class="btn btn-secondary" @click="closeCreateWizard">取消</button>
                        <button v-if="currentStep < wizardSteps.length - 1" class="btn btn-primary" @click="nextStep" :disabled="!canProceed">下一步</button>
                        <button v-else class="btn btn-success" @click="createCourse" :disabled="creating">
                            <span v-if="creating">创建中...</span>
                            <span v-else>创建课程</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 隐藏的文件输入 -->
        <input ref="videoInput" type="file" accept="video/*" @change="handleVideoChange" style="display: none">
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// 搜索查询
const searchQuery = ref('');

// 创建课程向导状态
const showCreateWizard = ref(false);
const currentStep = ref(0);
const creating = ref(false);

// 向导步骤
const wizardSteps = [
    { title: '基本信息', description: '设置课程基本信息' },
    { title: '章节管理', description: '创建课程章节和视频' },
    { title: '预览确认', description: '预览并确认课程信息' }
];

// 新课程数据
const newCourse = reactive({
    courseName: '',
    description: '',
    teacher: '',
    category: '',
    level: 'beginner',
    price: 0,
    coverFile: null,
    coverPreview: null,
    chapters: []
});

// 视频上传相关
const currentVideoUpload = ref({ chapterIndex: -1, videoIndex: -1 });

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 课程数据
const courses = ref([]);

// 计算属性
const filteredCourses = computed(() => {
    if (!searchQuery.value) return courses.value;
    return courses.value.filter(course => 
        course.courseName?.includes(searchQuery.value) ||
        course.teacher?.includes(searchQuery.value) ||
        course.category?.includes(searchQuery.value)
    );
});

const totalPage = computed(() => {
    return Math.ceil(total.value / pageSize.value);
});

const canProceed = computed(() => {
    if (currentStep.value === 0) {
        return newCourse.courseName && newCourse.description && newCourse.teacher && newCourse.category;
    }
    if (currentStep.value === 1) {
        return newCourse.chapters.length > 0 && newCourse.chapters.every(chapter => 
            chapter.title && chapter.videos.length > 0
        );
    }
    return true;
});

// 引用
const coverInput = ref(null);
const videoInput = ref(null);

// 获取状态文本
const getStatusText = (status) => {
    const statusMap = {
        'published': '已发布',
        'draft': '草稿',
        'archived': '下架'
    };
    return statusMap[status] || '未知';
};

const getLevelText = (level) => {
    const levelMap = {
        'beginner': '初级',
        'intermediate': '中级',
        'advanced': '高级'
    };
    return levelMap[level] || '未知';
};

// 格式化文件大小
const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 获取总视频数
const getTotalVideos = () => {
    return newCourse.chapters.reduce((total, chapter) => total + chapter.videos.length, 0);
};

// 获取总文件大小
const getTotalSize = () => {
    let totalSize = 0;
    newCourse.chapters.forEach(chapter => {
        chapter.videos.forEach(video => {
            if (video.file) {
                totalSize += video.file.size;
            }
        });
    });
    return formatFileSize(totalSize);
};

// 创建课程向导方法
const closeCreateWizard = () => {
    showCreateWizard.value = false;
    currentStep.value = 0;
    // 重置表单
    Object.assign(newCourse, {
        courseName: '',
        description: '',
        teacher: '',
        category: '',
        level: 'beginner',
        price: 0,
        coverFile: null,
        coverPreview: null,
        chapters: []
    });
};

const nextStep = () => {
    if (currentStep.value < wizardSteps.length - 1) {
        currentStep.value++;
    }
};

const previousStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
};

// 封面上传
const triggerCoverUpload = () => {
    coverInput.value.click();
};

const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        newCourse.coverFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            newCourse.coverPreview = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

// 章节管理
const addChapter = () => {
    newCourse.chapters.push({
        tempId: Date.now(),
        title: '',
        description: '',
        videos: []
    });
};

const removeChapter = (index) => {
    if (confirm('确定要删除这个章节吗？')) {
        newCourse.chapters.splice(index, 1);
    }
};

// 视频管理
const addVideo = (chapterIndex) => {
    newCourse.chapters[chapterIndex].videos.push({
        tempId: Date.now(),
        title: '',
        duration: '',
        file: null
    });
};

const removeVideo = (chapterIndex, videoIndex) => {
    if (confirm('确定要删除这个视频吗？')) {
        newCourse.chapters[chapterIndex].videos.splice(videoIndex, 1);
    }
};

const uploadVideo = (chapterIndex, videoIndex) => {
    currentVideoUpload.value = { chapterIndex, videoIndex };
    videoInput.value.click();
};

const changeVideo = (chapterIndex, videoIndex) => {
    currentVideoUpload.value = { chapterIndex, videoIndex };
    videoInput.value.click();
};

const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file && currentVideoUpload.value.chapterIndex >= 0) {
        const { chapterIndex, videoIndex } = currentVideoUpload.value;
        newCourse.chapters[chapterIndex].videos[videoIndex].file = file;
        
        // 如果没有设置标题，使用文件名（去掉扩展名）
        if (!newCourse.chapters[chapterIndex].videos[videoIndex].title) {
            const fileName = file.name.replace(/\.[^/.]+$/, "");
            newCourse.chapters[chapterIndex].videos[videoIndex].title = fileName;
        }
    }
    // 重置
    currentVideoUpload.value = { chapterIndex: -1, videoIndex: -1 };
    event.target.value = '';
};

// 创建课程
const createCourse = async () => {
    creating.value = true;
    
    try {
        // 创建FormData对象用于文件上传
        const formData = new FormData();
        
        // 添加基本课程信息
        const courseData = {
            courseName: newCourse.courseName,
            description: newCourse.description,
            teacher: newCourse.teacher,
            category: newCourse.category,
            level: newCourse.level,
            price: newCourse.price,
            status: 'draft',
            chapters: newCourse.chapters.map((chapter, chapterIndex) => ({
                title: chapter.title,
                description: chapter.description,
                orderNum: chapterIndex + 1,
                videos: chapter.videos.map((video, videoIndex) => ({
                    title: video.title,
                    duration: video.duration,
                    orderNum: videoIndex + 1,
                    hasFile: !!video.file
                }))
            }))
        };
        
        formData.append('courseData', JSON.stringify(courseData));
        
        // 添加封面文件
        if (newCourse.coverFile) {
            formData.append('coverFile', newCourse.coverFile);
        }
        
        // 添加视频文件
        newCourse.chapters.forEach((chapter, chapterIndex) => {
            chapter.videos.forEach((video, videoIndex) => {
                if (video.file) {
                    formData.append(`video_${chapterIndex}_${videoIndex}`, video.file);
                }
            });
        });
        
        // 发送请求
        const response = await axios.post('/api/courses/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log('上传进度:', percentCompleted + '%');
            }
        });
        
        if (response.data.success) {
            alert('课程创建成功！');
            closeCreateWizard();
            fetchCourseList();
        } else {
            alert('创建失败：' + (response.data.message || '未知错误'));
        }
        
    } catch (error) {
        console.error('创建课程失败:', error);
        alert('创建失败，请稍后重试');
    } finally {
        creating.value = false;
    }
};

// 获取课程列表
const fetchCourseList = async () => {
    try {
        const response = await axios.post('/api/courses/list', {
            pageNum: currentPage.value,
            pageSize: pageSize.value,
            courseName: searchQuery.value
        });
        if (response.data) {
            courses.value = response.data.records || [];
            total.value = response.data.total || 0;
        }
    } catch (error) {
        console.error('获取课程列表失败，使用模拟数据', error);
        // 模拟数据...
        const mockCourses = [
            {
                courseId: 1,
                courseName: 'Vue.js 前端开发实战课程',
                description: '从零开始学习Vue.js，掌握现代前端开发技术，构建响应式用户界面',
                teacher: '张老师',
                duration: '20小时',
                studentCount: 1250,
                category: '前端开发',
                status: 'published'
            },
            {
                courseId: 2,
                courseName: 'React 进阶开发课程',
                description: '深入学习React生态系统，包括Hooks、Context、Redux等高级特性',
                teacher: '李老师',
                duration: '25小时',
                studentCount: 980,
                category: '前端开发',
                status: 'published'
            },
            {
                courseId: 3,
                courseName: 'Node.js 后端开发',
                description: '全面掌握Node.js后端开发，包括Express、数据库操作、API设计等',
                teacher: '王老师',
                duration: '30小时',
                studentCount: 756,
                category: '后端开发',
                status: 'published'
            },
            {
                courseId: 4,
                courseName: 'Python 数据分析',
                description: '使用Python进行数据分析，包括Pandas、NumPy、Matplotlib等工具',
                teacher: '陈老师',
                duration: '18小时',
                studentCount: 643,
                category: '数据科学',
                status: 'draft'
            }
        ];
        
        let filteredCourses = mockCourses;
        if (searchQuery.value) {
            filteredCourses = mockCourses.filter(course => 
                course.courseName.includes(searchQuery.value) ||
                course.teacher.includes(searchQuery.value) ||
                course.category.includes(searchQuery.value)
            );
        }
        
        courses.value = filteredCourses;
        total.value = filteredCourses.length;
    }
};

// 搜索
const handleSearch = () => {
    currentPage.value = 1;
    fetchCourseList();
};

// 重置搜索
const resetSearch = () => {
    searchQuery.value = '';
    currentPage.value = 1;
    fetchCourseList();
};

// 分页
const handlePageChange = (page) => {
    currentPage.value = page;
    fetchCourseList();
};

// 查看课程
const viewCourse = (course) => {
    console.log('查看课程:', course);
    router.push(`/course-learning/${course.courseId}`);
};

// 编辑课程 - 暂时保留简单的编辑功能
const editCourse = (course) => {
    // TODO: 实现编辑功能
    console.log('编辑课程:', course);
    alert('编辑功能开发中...');
};

// 删除课程
const deleteCourse = async (courseId) => {
    if (confirm('确定要删除这个课程吗？')) {
        try {
            await axios.delete(`/api/courses/deleteCourse/${courseId}`);
            alert('删除成功');
            fetchCourseList();
        } catch (error) {
            console.error('删除课程失败', error);
            alert('删除失败');
        }
    }
};

// 组件挂载时获取数据
onMounted(() => {
    fetchCourseList();
});
</script>

<style scoped>
    .page-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    /* 页面头部 */
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 32px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e2e8f0;
    }

    .header-content h1 {
        font-size: 28px;
        font-weight: 600;
        color: #1e293b;
        margin: 0 0 4px 0;
    }

    .page-description {
        color: #64748b;
        font-size: 14px;
        margin: 0;
    }

    .page-header .btn svg {
        width: 16px;
        height: 16px;
        margin-right: 6px;
    }

    /* 搜索区域 */
    .search-section {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
        align-items: center;
    }

    .search-bar {
        flex: 1;
        position: relative;
        max-width: 400px;
    }

    .search-icon {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        color: #9ca3af;
        pointer-events: none;
    }

    .search-input {
        width: 100%;
        padding: 10px 12px 10px 40px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
        background: white;
        transition: all 0.2s ease;
    }

    .search-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .search-actions {
        display: flex;
        gap: 8px;
    }

    /* 表格容器 */
    .table-container {
        flex: 1;
        background: white;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        overflow: hidden;
        margin-bottom: 24px;
    }

    .table-header {
        padding: 16px 24px;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .table-title {
        font-size: 16px;
        font-weight: 600;
        color: #1e293b;
    }

    .table-summary {
        font-size: 14px;
        color: #64748b;
    }

    .table-wrapper {
        overflow-x: auto;
    }

    .data-table {
        width: 100%;
        border-collapse: collapse;
    }

    .data-table th {
        padding: 16px 24px;
        text-align: left;
        font-weight: 500;
        color: #374151;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
        font-size: 14px;
    }

    .data-table td {
        padding: 16px 24px;
        border-bottom: 1px solid #f1f5f9;
        vertical-align: middle;
    }

    .table-row:hover {
        background: #f8fafc;
    }

    /* 课程信息 */
    .course-info {
        display: flex;
        align-items: flex-start;
        gap: 12px;
    }

    .course-icon {
        width: 40px;
        height: 40px;
        background: #e0f2fe;
        color: #0369a1;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .course-icon svg {
        width: 20px;
        height: 20px;
    }

    .course-details {
        min-width: 0;
        flex: 1;
    }

    .course-title {
        font-weight: 500;
        color: #1e293b;
        font-size: 14px;
        margin-bottom: 4px;
    }

    .course-desc {
        font-size: 13px;
        color: #64748b;
        margin-bottom: 6px;
        line-height: 1.4;
    }

    .course-meta {
        display: flex;
        gap: 8px;
    }

    .duration-tag {
        background: #f1f5f9;
        color: #475569;
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
    }

    .teacher-name,
    .category-tag,
    .student-count {
        font-size: 14px;
        color: #374151;
    }

    .category-tag {
        background: #f0fdf4;
        color: #166534;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
    }

    /* 操作按钮 */
    .action-buttons {
        display: flex;
        gap: 8px;
    }

    .action-buttons .btn svg {
        width: 14px;
        height: 14px;
    }

    /* 状态样式 */
    .status-badge {
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
    }

    .status-badge.published {
        background: #dcfce7;
        color: #166534;
    }

    .status-badge.draft {
        background: #fef3c7;
        color: #92400e;
    }

    .status-badge.archived {
        background: #fee2e2;
        color: #b91c1c;
    }

    /* 空状态 */
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 64px 24px;
        color: #64748b;
    }

    .empty-state-icon {
        width: 48px;
        height: 48px;
        color: #9ca3af;
        margin-bottom: 16px;
    }

    .empty-state-icon svg {
        width: 100%;
        height: 100%;
    }

    .empty-state-text {
        font-size: 18px;
        font-weight: 500;
        color: #374151;
        margin-bottom: 8px;
    }

    .empty-state-desc {
        font-size: 14px;
        color: #9ca3af;
    }

    /* 分页 */
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
    }

    .pagination-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border: 1px solid #e2e8f0;
        background: white;
        color: #374151;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 14px;
    }

    .pagination-btn:hover:not(:disabled) {
        background: #f8fafc;
        border-color: #3b82f6;
    }

    .pagination-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .pagination-btn svg {
        width: 16px;
        height: 16px;
    }

    .pagination-info {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
        color: #374151;
    }

    .current-page {
        font-weight: 500;
    }

    .separator {
        color: #9ca3af;
    }

    /* 对话框 */
    .wizard-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    }

    .wizard-dialog {
        background: white;
        border-radius: 12px;
        width: 100%;
        max-width: 800px; /* Increased max-width for wizard */
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        display: flex;
        flex-direction: column;
    }

    .wizard-header {
        padding: 24px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .wizard-header h2 {
        font-size: 20px;
        font-weight: 600;
        color: #1e293b;
        margin: 0;
    }

    .wizard-close {
        width: 32px;
        height: 32px;
        border: none;
        background: #f1f5f9;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #64748b;
        transition: all 0.2s ease;
    }

    .wizard-close:hover {
        background: #e2e8f0;
        color: #374151;
    }

    .wizard-close svg {
        width: 16px;
        height: 16px;
    }

    .wizard-steps {
        display: flex;
        justify-content: space-around;
        padding: 16px 24px;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
    }

    .step {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        color: #9ca3af;
        font-size: 14px;
    }

    .step .step-number {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #e0f2fe;
        color: #0369a1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
    }

    .step.active {
        color: #3b82f6;
        font-weight: 500;
    }

    .step.active .step-number {
        background: #3b82f6;
        color: white;
    }

    .step.completed .step-number {
        background: #10b981;
        color: white;
    }

    .wizard-content {
        flex: 1;
        padding: 24px;
        overflow-y: auto;
        max-height: 60vh;
    }

    .step-content {
        /* All step content is rendered, controlled by v-show */
    }

    .step-content h3 {
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 20px;
    }

    /* 封面上传样式 */
    .cover-upload {
        position: relative;
        width: 200px;
        height: 120px;
        border: 2px dashed #d1d5db;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .cover-upload:hover {
        border-color: #3b82f6;
    }

    .cover-preview {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .cover-preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .cover-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.2s ease;
        color: white;
        font-size: 14px;
    }

    .cover-preview:hover .cover-overlay {
        opacity: 1;
    }

    .upload-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #9ca3af;
        text-align: center;
        padding: 16px;
    }

    .upload-placeholder svg {
        width: 32px;
        height: 32px;
        margin-bottom: 8px;
    }

    .upload-placeholder p {
        margin: 0 0 4px 0;
        font-size: 14px;
        font-weight: 500;
    }

    .upload-placeholder span {
        font-size: 12px;
        color: #6b7280;
    }

    /* 章节管理样式 */
    .chapters-list {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .chapter-item {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 20px;
    }

    .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 16px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .form-group.full-width {
        grid-column: 1 / -1; /* Span across all columns */
    }

    .form-label {
        font-size: 14px;
        color: #374151;
        margin-bottom: 8px;
        font-weight: 500;
    }

    .form-input, .form-select, .form-textarea {
        padding: 10px 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
        background: white;
        transition: all 0.2s ease;
    }

    .form-input:focus, .form-select:focus, .form-textarea:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-textarea {
        resize: vertical;
        min-height: 80px;
        font-family: inherit;
    }

    .chapter-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .chapter-header-info {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .chapter-number {
        font-size: 14px;
        color: #64748b;
        font-weight: 500;
    }

    .chapter-title-input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
    }

    .chapter-description textarea {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
        min-height: 60px;
    }

    .videos-section {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px dashed #e2e8f0;
    }

    .videos-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }

    .videos-title {
        font-size: 14px;
        color: #374151;
        font-weight: 500;
    }

    .videos-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .video-item {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 12px 16px;
    }

    .video-info {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    }

    .video-number {
        font-size: 14px;
        color: #64748b;
        font-weight: 500;
    }

    .video-title-input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
    }

    .video-duration-input {
        width: 80px;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
    }

    .video-upload {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .video-preview {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #f1f5f9;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        padding: 10px 12px;
    }

    .video-file-info {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .video-file-info svg {
        width: 20px;
        height: 20px;
        color: #0369a1;
    }

    .video-file-info span {
        font-size: 13px;
        color: #374151;
    }

    .file-size {
        font-size: 12px;
        color: #64748b;
    }

    .video-upload-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px 12px;
        border: 1px dashed #d1d5db;
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
        color: #64748b;
        transition: all 0.2s ease;
    }

    .video-upload-area:hover {
        border-color: #3b82f6;
        color: #3b82f6;
    }

    .video-upload-area svg {
        width: 40px;
        height: 40px;
        margin-bottom: 8px;
    }

    .video-preview .btn {
        padding: 6px 12px;
    }

    .empty-videos {
        text-align: center;
        padding: 16px 0;
        color: #64748b;
        font-size: 14px;
    }

    .empty-chapters {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 32px 0;
        color: #64748b;
    }

    .empty-icon {
        font-size: 48px;
        margin-bottom: 16px;
    }

    .preview-basic, .preview-content {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 20px;
    }

    .preview-basic h4, .preview-content h4 {
        font-size: 16px;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 16px;
    }

    .preview-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .preview-item {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .preview-label {
        font-size: 14px;
        color: #64748b;
        font-weight: 500;
    }

    .preview-value {
        font-size: 14px;
        color: #374151;
        font-weight: 500;
    }

    .preview-content .preview-stats {
        display: flex;
        justify-content: space-around;
        margin-bottom: 16px;
        padding: 12px 0;
        border-bottom: 1px solid #e2e8f0;
    }

    .stat-item {
        text-align: center;
    }

    .stat-number {
        font-size: 20px;
        font-weight: 700;
        color: #1e293b;
    }

    .stat-label {
        font-size: 12px;
        color: #64748b;
    }

    .preview-chapters {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .preview-chapter {
        background: #f1f5f9;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 16px;
    }

    .preview-chapter-title {
        font-size: 16px;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 12px;
    }

    .preview-chapter-videos {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .preview-video {
        font-size: 14px;
        color: #374151;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .video-file-tag {
        background: #dcfce7;
        color: #166534;
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
    }

    .video-file-tag.missing {
        background: #fee2e2;
        color: #b91c1c;
    }

    .wizard-footer {
        padding: 24px;
        border-top: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        gap: 12px;
    }

    .wizard-actions {
        display: flex;
        gap: 12px;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
    }

    .btn-primary {
        background: #3b82f6;
        color: white;
    }

    .btn-primary:hover:not(:disabled) {
        background: #2563eb;
    }

    .btn-secondary {
        background: #f3f4f6;
        color: #374151;
        border: 1px solid #d1d5db;
    }

    .btn-secondary:hover:not(:disabled) {
        background: #e5e7eb;
    }

    .btn-sm {
        padding: 6px 12px;
    }

    .btn-danger {
        background: #fee2e2;
        color: #b91c1c;
        border: 1px solid #fecaca;
    }

    .btn-danger:hover:not(:disabled) {
        background: #fecaca;
    }

    .btn-success {
        background: #10b981;
        color: white;
    }

    .btn-success:hover:not(:disabled) {
        background: #059669;
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
        }

        .search-section {
            flex-direction: column;
            align-items: stretch;
        }

        .search-bar {
            max-width: none;
        }

        .search-actions {
            justify-content: flex-end;
        }

        .table-container {
            border-radius: 8px;
        }

        .data-table th,
        .data-table td {
            padding: 12px 16px;
        }

        .course-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
        }

        .form-grid {
            grid-template-columns: 1fr;
        }

        .form-group.full-width {
            grid-column: 1 / -1;
        }

        .wizard-dialog {
            max-width: 95%;
        }

        .wizard-steps {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 12px 16px;
        }

        .step {
            width: 100%;
            justify-content: flex-start;
        }

        .step .step-number {
            margin-left: 0;
        }

        .wizard-content {
            padding: 16px;
        }

        .preview-grid {
            grid-template-columns: 1fr;
        }

        .preview-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
        }

        .preview-label {
            width: 100%;
            text-align: left;
        }

        .preview-value {
            width: 100%;
            text-align: left;
        }

        .wizard-footer {
            flex-direction: column;
            gap: 12px;
        }

                 .wizard-actions {
             width: 100%;
             justify-content: space-around;
         }

         .chapter-header-info {
             flex-direction: column;
             align-items: stretch;
             gap: 8px;
         }

         .chapter-title-input {
             width: 100%;
         }

         .video-info {
             flex-direction: column;
             align-items: stretch;
             gap: 8px;
         }

         .video-title-input,
         .video-duration-input {
             width: 100%;
         }

         .video-upload {
             flex-direction: column;
             align-items: stretch;
         }

         .cover-upload {
             width: 100%;
             height: 200px;
         }

         .preview-stats {
             flex-direction: column;
             gap: 12px;
         }

                  .pagination {
             flex-wrap: wrap;
             gap: 8px;
         }
     }

    @media (max-width: 480px) {
        .action-buttons {
            flex-direction: column;
        }

        .wizard-dialog {
            margin: 10px;
        }

        .wizard-header,
        .wizard-content,
        .wizard-footer {
            padding: 16px;
        }
    }
</style> 