<!-- CourseManagement.vue -->
<template>
    <div class="management-page">
        <div class="header">
            <h1>课程管理</h1>
            <button class="add-btn" @click="showAddDialog = true">+ 创建课程</button>
        </div>

        <div class="search-bar">
            <input type="text" placeholder="搜索课程..." class="search-input" v-model="searchQuery">
            <button class="search-btn">搜索</button>
        </div>

        <div class="table-container">
            <table class="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>课程名称</th>
                    <th>教师</th>
                    <th>分类</th>
                    <th>时长</th>
                    <th>学员数</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="course in filteredCourses" :key="course.id">
                    <td>{{ course.id }}</td>
                    <td>
                        <div class="course-info">
                            <div class="course-title">{{ course.title }}</div>
                            <div class="course-desc">{{ course.description }}</div>
                        </div>
                    </td>
                    <td>{{ course.teacher }}</td>
                    <td>{{ course.category }}</td>
                    <td>{{ course.duration }}</td>
                    <td>{{ course.studentCount }}</td>
                    <td>
                        <span :class="['status', course.status]">
                            {{ course.status === 'published' ? '已发布' : course.status === 'draft' ? '草稿' : '下架' }}
                        </span>
                    </td>
                    <td>
                        <button class="edit-btn" @click="editCourse(course)">编辑</button>
                        <button class="view-btn" @click="viewCourse(course)">查看</button>
                        <button class="delete-btn" @click="deleteCourse(course.id)">删除</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination">
            <button>上一页</button>
            <span>1 / 3</span>
            <button>下一页</button>
        </div>

        <!-- 添加/编辑课程对话框 -->
        <div v-if="showAddDialog" class="dialog-overlay" @click="closeDialog">
            <div class="dialog" @click.stop>
                <div class="dialog-header">
                    <h3>{{ editingCourse ? '编辑课程' : '创建课程' }}</h3>
                    <button class="close-btn" @click="closeDialog">&times;</button>
                </div>
                <div class="dialog-body">
                    <div class="form-group">
                        <label>课程名称</label>
                        <input type="text" v-model="courseForm.title" placeholder="请输入课程名称">
                    </div>
                    <div class="form-group">
                        <label>课程描述</label>
                        <textarea v-model="courseForm.description" placeholder="请输入课程描述" rows="3"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>教师</label>
                            <select v-model="courseForm.teacher">
                                <option value="">请选择教师</option>
                                <option value="张老师">张老师</option>
                                <option value="李老师">李老师</option>
                                <option value="王老师">王老师</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>分类</label>
                            <select v-model="courseForm.category">
                                <option value="">请选择分类</option>
                                <option value="前端开发">前端开发</option>
                                <option value="后端开发">后端开发</option>
                                <option value="移动开发">移动开发</option>
                                <option value="数据科学">数据科学</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>课程时长</label>
                            <input type="text" v-model="courseForm.duration" placeholder="如：20小时">
                        </div>
                        <div class="form-group">
                            <label>状态</label>
                            <select v-model="courseForm.status">
                                <option value="draft">草稿</option>
                                <option value="published">发布</option>
                                <option value="archived">下架</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="dialog-footer">
                    <button class="cancel-btn" @click="closeDialog">取消</button>
                    <button class="confirm-btn" @click="saveCourse">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

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

// 课程数据
const courses = ref([
    { 
        id: 1, 
        title: 'Vue.js 前端开发实战课程', 
        description: '从零开始学习Vue.js，掌握现代前端开发技术',
        teacher: '张老师',
        category: '前端开发',
        duration: '20小时',
        studentCount: 1250,
        status: 'published'
    },
    { 
        id: 2, 
        title: 'React 全栈开发', 
        description: '学习React生态系统，构建完整的Web应用',
        teacher: '李老师',
        category: '前端开发',
        duration: '25小时',
        studentCount: 980,
        status: 'published'
    },
    { 
        id: 3, 
        title: 'Node.js 后端开发', 
        description: '掌握Node.js服务器端开发技术',
        teacher: '王老师',
        category: '后端开发',
        duration: '18小时',
        studentCount: 756,
        status: 'draft'
    },
    { 
        id: 4, 
        title: 'Python 数据分析', 
        description: '使用Python进行数据分析和可视化',
        teacher: '赵老师',
        category: '数据科学',
        duration: '30小时',
        studentCount: 1200,
        status: 'published'
    }
]);

// 过滤课程
const filteredCourses = computed(() => {
    if (!searchQuery.value) return courses.value;
    return courses.value.filter(course => 
        course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        course.teacher.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// 编辑课程
const editCourse = (course) => {
    editingCourse.value = course;
    Object.assign(courseForm, course);
    showAddDialog.value = true;
};

// 查看课程
const viewCourse = (course) => {
    router.push(`/course/${course.id}`);
};

// 删除课程
const deleteCourse = (id) => {
    if (confirm('确定要删除这个课程吗？')) {
        courses.value = courses.value.filter(course => course.id !== id);
    }
};

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

// 保存课程
const saveCourse = () => {
    if (!courseForm.title || !courseForm.teacher || !courseForm.category) {
        alert('请填写完整信息');
        return;
    }

    if (editingCourse.value) {
        // 编辑现有课程
        Object.assign(editingCourse.value, courseForm);
    } else {
        // 创建新课程
        const newCourse = {
            id: Math.max(...courses.value.map(c => c.id)) + 1,
            ...courseForm,
            studentCount: 0
        };
        courses.value.push(newCourse);
    }

    closeDialog();
};
</script>

<style scoped>
.management-page {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 25px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.header h1 {
    margin: 0;
    font-size: 1.8rem;
    color: #1e293b;
}

.add-btn {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
}

.add-btn:hover {
    background: #2563eb;
}

.search-bar {
    display: flex;
    margin-bottom: 25px;
}

.search-input {
    flex: 1;
    padding: 12px 15px;
    border: 1px solid #d1d5db;
    border-radius: 6px 0 0 6px;
    font-size: 1rem;
}

.search-btn {
    background: #4b5563;
    color: white;
    border: none;
    padding: 0 25px;
    border-radius: 0 6px 6px 0;
    cursor: pointer;
}

.table-container {
    overflow-x: auto;
    margin-bottom: 25px;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table th, .data-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
}

.data-table th {
    background: #f9fafb;
    font-weight: 600;
}

.data-table tbody tr:hover {
    background: #f9fafb;
}

.course-info {
    max-width: 300px;
}

.course-title {
    font-weight: 500;
    color: #1e293b;
    margin-bottom: 4px;
}

.course-desc {
    font-size: 0.85rem;
    color: #64748b;
    line-height: 1.4;
}

.status {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.85rem;
}

.status.published {
    background: #d1fae5;
    color: #15803d;
}

.status.draft {
    background: #fef3c7;
    color: #d97706;
}

.status.archived {
    background: #fef2f2;
    color: #b91c1c;
}

.edit-btn, .view-btn, .delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    margin-right: 8px;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background 0.3s;
}

.edit-btn {
    color: #3b82f6;
}

.edit-btn:hover {
    background: #dbeafe;
}

.view-btn {
    color: #10b981;
}

.view-btn:hover {
    background: #d1fae5;
}

.delete-btn {
    color: #ef4444;
}

.delete-btn:hover {
    background: #fef2f2;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.pagination button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
}

.pagination button:hover {
    background: #2563eb;
}

/* 对话框样式 */
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
}

.dialog {
    background: white;
    border-radius: 12px;
    width: 600px;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}

.dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #e5e7eb;
}

.dialog-header h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #1e293b;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background 0.3s;
}

.close-btn:hover {
    background: #f3f4f6;
}

.dialog-body {
    padding: 24px;
}

.form-group {
    margin-bottom: 20px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group textarea {
    resize: vertical;
    min-height: 80px;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    padding: 20px 24px;
    border-top: 1px solid #e5e7eb;
    gap: 12px;
}

.cancel-btn,
.confirm-btn {
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s;
}

.cancel-btn {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
}

.cancel-btn:hover {
    background: #e5e7eb;
}

.confirm-btn {
    background: #3b82f6;
    color: white;
    border: none;
}

.confirm-btn:hover {
    background: #2563eb;
}

@media (max-width: 768px) {
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .dialog {
        width: 95vw;
        margin: 20px;
    }
}
</style> 