<!-- UserManagement.vue -->
<template>
    <div class="page-container">
        <!-- 页面头部 -->
        <div class="page-header">
            <div class="header-content">
                <h1 class="page-title">学员管理</h1>
                <p class="page-description">管理和维护学员信息</p>
            </div>
            <button class="btn btn-primary" @click="showAddDialog = true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                添加学员
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
                    v-model="searchKeyword"
                    placeholder="搜索学员姓名、邮箱..." 
                    class="search-input"
                    @keyup.enter="handleSearch"
                >
            </div>
            <div class="search-actions">
                <button class="btn btn-secondary" @click="handleReset">重置</button>
                <button class="btn btn-primary" @click="handleSearch">搜索</button>
            </div>
        </div>

        <!-- 数据表格 -->
        <div class="table-container">
            <div class="table-header">
                <div class="table-title">学员列表</div>
                <div class="table-summary">共 {{ total }} 条记录</div>
            </div>
            
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>学员信息</th>
                            <th>班级</th>
                            <th>注册时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in userList" :key="user.userId" class="table-row">
                            <td>
                                <div class="user-info">
                                    <div class="user-avatar">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                    <div class="user-details">
                                        <div class="user-name">{{ user.username }}</div>
                                        <div class="user-email">{{ user.email }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="class-name">{{ getClassName(user.classId) || '未分配' }}</span>
                            </td>
                            <td>
                                <span class="date-text">{{ formatDate(user.createdAt) }}</span>
                            </td>
                            <td>
                                <span :class="['status-badge', user.status || 'active']">
                                    {{ user.status === 'active' ? '活跃' : '停用' }}
                                </span>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-sm btn-secondary" @click="handleEdit(user)" title="编辑">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <button class="btn btn-sm btn-danger" @click="handleDelete(user)" title="删除">
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
                
                <!-- 加载状态 -->
                <div v-if="loading" class="loading-state">
                    <div class="loading-spinner">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <p>加载中...</p>
                </div>
                
                <!-- 空状态 -->
                <div v-if="!loading && userList.length === 0" class="empty-state">
                    <div class="empty-state-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20 8V14M23 11H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="empty-state-text">暂无学员数据</div>
                    <div class="empty-state-desc">点击上方"添加学员"按钮创建第一个学员</div>
                </div>
            </div>
        </div>

        <!-- 分页 -->
        <div class="pagination" v-if="total > 0">
            <button 
                class="pagination-btn"
                :disabled="currentPage <= 1" 
                @click="handlePageChange(currentPage - 1)"
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                上一页
            </button>
            <div class="pagination-info">
                <span class="current-page">{{ currentPage }}</span>
                <span class="separator">/ {{ totalPages }}</span>
            </div>
            <button 
                class="pagination-btn"
                :disabled="currentPage >= totalPages" 
                @click="handlePageChange(currentPage + 1)"
            >
                下一页
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>

        <!-- 添加/编辑用户对话框 -->
        <div v-if="showAddDialog" class="dialog-overlay" @click="closeDialog">
            <div class="dialog" @click.stop>
                <div class="dialog-header">
                    <h3>{{ editingUser ? '编辑学员' : '添加学员' }}</h3>
                    <button class="dialog-close" @click="closeDialog">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="dialog-body">
                    <div class="form-group">
                        <label class="form-label">用户名</label>
                        <input type="text" v-model="userForm.username" placeholder="请输入用户名" class="form-input">
                    </div>
                    <div class="form-group">
                        <label class="form-label">邮箱</label>
                        <input type="email" v-model="userForm.email" placeholder="请输入邮箱" class="form-input">
                    </div>
                    <div class="form-group" v-if="!editingUser">
                        <label class="form-label">密码</label>
                        <input type="password" v-model="userForm.password" placeholder="请输入密码" class="form-input">
                    </div>
                    <div class="form-group">
                        <label class="form-label">班级</label>
                        <select v-model="userForm.classId" class="form-select">
                            <option value="">请选择班级</option>
                            <option v-for="option in classOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                        </select>
                    </div>
                </div>
                <div class="dialog-footer">
                    <button class="btn btn-secondary" @click="closeDialog">取消</button>
                    <button class="btn btn-primary" @click="handleSave">{{ editingUser ? '更新' : '创建' }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';

// 响应式数据
const userList = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const searchKeyword = ref('');
const showAddDialog = ref(false);
const editingUser = ref(null);

// 新增班级下拉选项数据
const classOptions = ref([]);

// 用户表单
const userForm = reactive({
    username: '',
    email: '',
    password: '',
    classId: ''
});

// 计算总页数
const totalPages = computed(() => {
    return Math.ceil(total.value / pageSize.value);
});

// 关闭对话框
const closeDialog = () => {
    showAddDialog.value = false;
    editingUser.value = null;
    Object.assign(userForm, {
        username: '',
        email: '',
        password: '',
        classId: ''
    });
};

// 获取用户列表
const fetchUserList = async () => {
    loading.value = true;
    try {
        const response = await axios.post('/api/users/list', {
            pageNum: currentPage.value,
            pageSize: pageSize.value,
            username: searchKeyword.value
        });
        
        if (response.data) {
            userList.value = response.data.records || [];
            total.value = response.data.total || 0;
            if (response.data.current) {
                currentPage.value = response.data.current;
            }
        } else {
            console.error('获取用户列表失败:', response.data.message);
        }
    } catch (error) {
        console.error('获取用户列表出错:', error);
    } finally {
        loading.value = false;
    }
};

// 搜索
const handleSearch = () => {
    currentPage.value = 1;
    fetchUserList();
};

// 重置搜索
const handleReset = () => {
    searchKeyword.value = '';
    currentPage.value = 1;
    fetchUserList();
};

// 分页
const handlePageChange = (page) => {
    currentPage.value = page;
    fetchUserList();
};

// 获取班级列表
const fetchClassOptions = async () => {
    try {
        const response = await axios.post('/api/classes/list', { pageNum: 1, pageSize: 100 });
        if (response.data && response.data.records) {
            classOptions.value = response.data.records.map(item => ({
                value: item.classId,
                label: item.className
            }));
        }
    } catch (error) {
        console.error('获取班级列表失败', error);
    }
};

// 获取班级名称
const getClassName = (classId) => {
    if (!classId) return '';
    const classOption = classOptions.value.find(option => option.value === classId);
    return classOption ? classOption.label : '未知班级';
};

// 格式化日期
const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
};

// 编辑用户
const handleEdit = (user) => {
    editingUser.value = user;
    Object.assign(userForm, {
        username: user.username,
        email: user.email,
        password: '',
        classId: user.classId || ''
    });
    showAddDialog.value = true;
};

// 删除用户
const handleDelete = async (user) => {
    if (confirm(`确定要删除学员 "${user.username}" 吗？`)) {
        try {
            await axios.delete(`/api/users/deleteUser/${user.userId}`);
            alert('删除成功');
            fetchUserList();
        } catch (error) {
            console.error('删除用户失败', error);
            alert('删除失败');
        }
    }
};

// 保存用户
const handleSave = async () => {
    if (!userForm.username || !userForm.email) {
        alert('请填写完整信息');
        return;
    }

    try {
        if (editingUser.value) {
            // 编辑用户
            await axios.put(`/api/users/updateUser/${editingUser.value.userId}`, {
                username: userForm.username,
                email: userForm.email,
                classId: userForm.classId
            });
            alert('更新成功');
        } else {
            // 新增用户
            if (!userForm.password) {
                alert('请输入密码');
                return;
            }
            await axios.post('/api/users/register', {
                username: userForm.username,
                email: userForm.email,
                password: userForm.password,
                classId: userForm.classId
            });
            alert('添加成功');
        }
        closeDialog();
        fetchUserList();
    } catch (error) {
        console.error('保存用户失败', error);
        alert('操作失败');
    }
};

// 组件挂载时获取数据
onMounted(() => {
    fetchUserList();
    fetchClassOptions();
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

    /* 用户信息 */
    .user-info {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .user-avatar {
        width: 40px;
        height: 40px;
        background: #f1f5f9;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #64748b;
        flex-shrink: 0;
    }

    .user-avatar svg {
        width: 20px;
        height: 20px;
    }

    .user-details {
        min-width: 0;
    }

    .user-name {
        font-weight: 500;
        color: #1e293b;
        font-size: 14px;
        margin-bottom: 2px;
    }

    .user-email {
        font-size: 13px;
        color: #64748b;
    }

    .class-name {
        font-size: 14px;
        color: #374151;
    }

    .date-text {
        font-size: 14px;
        color: #64748b;
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

    /* 状态和加载 */
    .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 48px 24px;
        color: #64748b;
    }

    .loading-spinner {
        width: 32px;
        height: 32px;
        color: #3b82f6;
        margin-bottom: 12px;
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
        max-width: 500px;
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

    .form-label {
        display: block;
        margin-bottom: 8px;
        color: #374151;
        font-weight: 500;
        font-size: 14px;
    }

    .form-input, .form-select {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
        background: white;
        transition: all 0.2s ease;
    }

    .form-input:focus, .form-select:focus {
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

    /* 状态和加载 */
    .status-badge {
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
    }

    .status-badge.active {
        background: #dcfce7;
        color: #166534;
    }

    .status-badge.inactive {
        background: #fee2e2;
        color: #b91c1c;
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

        .pagination {
            flex-wrap: wrap;
            gap: 8px;
        }
    }

    @media (max-width: 480px) {
        .user-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
        }

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
