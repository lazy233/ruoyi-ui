<!-- CourseManagement.vue -->
<template>
    <div class="page-container">
        <!-- 页面头部 -->
        <div class="page-header">
            <div class="header-content">
                <h1 class="page-title">课程管理</h1>
                <p class="page-description">管理和维护课程信息</p>
            </div>
            <button class="btn btn-primary" @click="showAddDialog = true">
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

        <!-- 添加/编辑课程对话框 -->
        <div v-if="showAddDialog" class="dialog-overlay" @click="closeDialog">
            <div class="dialog" @click.stop>
                <div class="dialog-header">
                    <h3>{{ editingCourse ? '编辑课程' : '创建课程' }}</h3>
                    <button class="dialog-close" @click="closeDialog">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="dialog-body">
                    <div class="form-group">
                        <label class="form-label">课程名称</label>
                        <input type="text" v-model="courseForm.title" placeholder="请输入课程名称" class="form-input">
                    </div>
                    <div class="form-group">
                        <label class="form-label">课程描述</label>
                        <textarea v-model="courseForm.description" placeholder="请输入课程描述" rows="3" class="form-textarea"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">教师</label>
                            <select v-model="courseForm.teacher" class="form-select">
                                <option value="">请选择教师</option>
                                <option value="张老师">张老师</option>
                                <option value="李老师">李老师</option>
                                <option value="王老师">王老师</option>
                                <option value="陈老师">陈老师</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">分类</label>
                            <select v-model="courseForm.category" class="form-select">
                                <option value="">请选择分类</option>
                                <option value="前端开发">前端开发</option>
                                <option value="后端开发">后端开发</option>
                                <option value="移动开发">移动开发</option>
                                <option value="数据科学">数据科学</option>
                                <option value="人工智能">人工智能</option>
                                <option value="产品设计">产品设计</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">课程时长</label>
                            <input type="text" v-model="courseForm.duration" placeholder="如：20小时" class="form-input">
                        </div>
                        <div class="form-group">
                            <label class="form-label">状态</label>
                            <select v-model="courseForm.status" class="form-select">
                                <option value="draft">草稿</option>
                                <option value="published">发布</option>
                                <option value="archived">下架</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="dialog-footer">
                    <button class="btn btn-secondary" @click="closeDialog">取消</button>
                    <button class="btn btn-primary" @click="saveCourse">{{ editingCourse ? '更新' : '创建' }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// 搜索查询
const searchQuery = ref('');

// 对话框状态
const showAddDialog = ref(false);
const editingCourse = ref(null);

// 课程表单
const courseForm = reactive({
    title: '',
    description: '',
    teacher: '',
    category: '',
    duration: '',
    status: 'draft'
});

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

// 关闭对话框
const closeDialog = () => {
    showAddDialog.value = false;
    editingCourse.value = null;
    Object.assign(courseForm, {
        title: '',
        description: '',
        teacher: '',
        category: '',
        duration: '',
        status: 'draft'
    });
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
        // 如果API调用失败，使用模拟数据
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
        
        // 应用搜索过滤
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
    // 跳转到课程学习页面
    console.log('查看课程:', course);
    router.push(`/course-learning/${course.courseId}`);
};

// 编辑课程
const editCourse = (course) => {
    editingCourse.value = course;
    Object.assign(courseForm, {
        title: course.courseName,
        description: course.description || '',
        teacher: course.teacher || '',
        category: course.category || '',
        duration: course.duration || '',
        status: course.status || 'draft'
    });
    showAddDialog.value = true;
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

// 新增/编辑课程
const saveCourse = async () => {
    if (!courseForm.title || !courseForm.teacher || !courseForm.category) {
        alert('请填写完整信息');
        return;
    }
    try {
        if (editingCourse.value) {
            // 编辑课程
            await axios.put(`/api/courses/updateCourse/${editingCourse.value.courseId}`, {
                courseName: courseForm.title,
                description: courseForm.description,
                teacher: courseForm.teacher,
                category: courseForm.category,
                duration: courseForm.duration,
                status: courseForm.status
            });
            alert('更新成功');
        } else {
            // 新增课程
            await axios.post('/api/courses/addCourse', {
                courseName: courseForm.title,
                description: courseForm.description,
                teacher: courseForm.teacher,
                category: courseForm.category,
                duration: courseForm.duration,
                status: courseForm.status
            });
            alert('创建成功');
        }
        closeDialog();
        fetchCourseList();
    } catch (error) {
        console.error('保存课程失败', error);
        alert('操作失败');
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
    .dialog-overlay {
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

    .dialog {
        background: white;
        border-radius: 12px;
        width: 100%;
        max-width: 600px;
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .dialog-header {
        padding: 24px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .dialog-header h3 {
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
        margin: 0;
    }

    .dialog-close {
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

    .dialog-close:hover {
        background: #e2e8f0;
        color: #374151;
    }

    .dialog-close svg {
        width: 16px;
        height: 16px;
    }

    .dialog-body {
        padding: 24px;
        max-height: 60vh;
        overflow-y: auto;
    }

    .dialog-footer {
        padding: 24px;
        border-top: 1px solid #e2e8f0;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
    }

    /* 表单样式 */
    .form-group {
        margin-bottom: 16px;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .form-label {
        display: block;
        margin-bottom: 8px;
        color: #374151;
        font-weight: 500;
        font-size: 14px;
    }

    .form-input, .form-select, .form-textarea {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
        background: white;
        transition: all 0.2s ease;
    }

    .form-textarea {
        resize: vertical;
        min-height: 80px;
        font-family: inherit;
    }

    .form-input:focus, .form-select:focus, .form-textarea:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    /* 按钮样式 */
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

        .form-row {
            grid-template-columns: 1fr;
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

        .dialog {
            margin: 10px;
        }

        .dialog-header,
        .dialog-body,
        .dialog-footer {
            padding: 16px;
        }
    }
</style> 