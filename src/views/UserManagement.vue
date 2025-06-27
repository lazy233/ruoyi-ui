<!-- UserManagement.vue -->
<template>
    <div class="management-page">
        <div class="header">
            <h1>学员管理</h1>
            <button class="add-btn" @click="showAddDialog = true">+ 添加学员</button>
        </div>

        <div class="search-bar">
            <input 
                type="text" 
                v-model="searchKeyword"
                placeholder="搜索学员..." 
                class="search-input"
                @keyup.enter="handleSearch"
            >
            <button class="search-btn" @click="handleSearch">搜索</button>
            <button class="reset-btn" @click="handleReset">重置</button>
        </div>

        <div class="table-container">
            <table class="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>邮箱</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in userList" :key="user.userId">
                    <td>{{ user.userId }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ formatDate(user.createdAt) }}</td>
                    <td>{{ formatDate(user.updatedAt) }}</td>
                    <td>
                        <span :class="['status', user.status || 'active']">
                            {{ user.status === 'active' ? '活跃' : '停用' }}
                        </span>
                    </td>
                    <td>
                        <button class="edit-btn" @click="handleEdit(user)">编辑</button>
                        <button class="delete-btn" @click="handleDelete(user)">删除</button>
                    </td>
                </tr>
                </tbody>
            </table>
            
            <!-- 加载状态 -->
            <div v-if="loading" class="loading">
                <div class="loading-spinner"></div>
                <p>加载中...</p>
            </div>
            
            <!-- 空状态 -->
            <div v-if="!loading && userList.length === 0" class="empty-state">
                <p>暂无数据</p>
            </div>
        </div>

        <!-- 分页 -->
        <div class="pagination" v-if="total > 0">
            <button 
                :disabled="currentPage <= 1" 
                @click="handlePageChange(currentPage - 1)"
                class="page-btn"
            >
                上一页
            </button>
            <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
            <button 
                :disabled="currentPage >= totalPages" 
                @click="handlePageChange(currentPage + 1)"
                class="page-btn"
            >
                下一页
            </button>
        </div>

        <!-- 添加/编辑用户对话框 -->
        <div v-if="showAddDialog" class="dialog-overlay" @click="showAddDialog = false">
            <div class="dialog" @click.stop>
                <div class="dialog-header">
                    <h3>{{ editingUser ? '编辑学员' : '添加学员' }}</h3>
                    <button class="close-btn" @click="showAddDialog = false">×</button>
                </div>
                <div class="dialog-body">
                    <div class="form-group">
                        <label>用户名</label>
                        <input type="text" v-model="userForm.username" placeholder="请输入用户名">
                    </div>
                    <div class="form-group">
                        <label>邮箱</label>
                        <input type="email" v-model="userForm.email" placeholder="请输入邮箱">
                    </div>
                    <div class="form-group" v-if="!editingUser">
                        <label>密码</label>
                        <input type="password" v-model="userForm.password" placeholder="请输入密码">
                    </div>
                </div>
                <div class="dialog-footer">
                    <button class="cancel-btn" @click="showAddDialog = false">取消</button>
                    <button class="confirm-btn" @click="handleSave">确定</button>
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

// 用户表单
const userForm = reactive({
    username: '',
    email: '',
    password: ''
});

// 计算总页数
const totalPages = computed(() => {
    return Math.ceil(total.value / pageSize.value);
});

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

// 编辑用户
const handleEdit = (user) => {
    editingUser.value = user;
    userForm.username = user.username;
    userForm.email = user.email;
    userForm.password = '123456';
    showAddDialog.value = true;
};

// 删除用户
const handleDelete = async (user) => {
    if (confirm(`确定要删除用户 ${user.username} 吗？`)) {
        try {
            const response = await axios.delete(`/api/users/deleteUser/${user.userId}`);
            
            // 处理空响应的情况
            if (response.status === 204 || !response.data || Object.keys(response.data).length === 0) {
                // 删除成功，返回空响应是正常的
                alert('删除成功');
                fetchUserList();
                return;
            }
            
            // 如果有响应数据，按正常逻辑处理
            if (response.data && response.data.success) {
                alert('删除成功');
                fetchUserList();
            } else {
                alert('删除失败: ' + (response.data?.message || '未知错误'));
            }
        } catch (error) {
            console.error('删除用户出错:', error);
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
        let response;
        if (editingUser.value) {
            // 编辑用户
            response = await axios.put(`/api/users/updateUser/${editingUser.value.userId}`, {
                username: userForm.username,
                email: userForm.email
            });
        } else {
            // 添加用户
            if (!userForm.password) {
                alert('请输入密码');
                return;
            }
            response = await axios.put('/api/users/adduser', userForm);
        }
        
        if (response.data && response.data.success) {
            alert(editingUser.value ? '编辑成功' : '添加成功');
            showAddDialog.value = false;
            resetForm();
            fetchUserList();
        } else {
            alert('操作失败: ' + (response.data?.message || '未知错误'));
        }
    } catch (error) {
        console.error('保存用户出错:', error);
        alert('操作失败');
    }
};

// 重置表单
const resetForm = () => {
    userForm.username = '';
    userForm.email = '';
    userForm.password = '';
    editingUser.value = null;
};

// 格式化日期
const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// 页面加载时获取数据
onMounted(() => {
    fetchUserList();
});
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
    gap: 10px;
}

.search-input {
    flex: 1;
    padding: 12px 15px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
}

.search-btn, .reset-btn {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
}

.search-btn {
    background: #4b5563;
    color: white;
}

.search-btn:hover {
    background: #374151;
}

.reset-btn {
    background: #f3f4f6;
    color: #4b5563;
    border: 1px solid #d1d5db;
}

.reset-btn:hover {
    background: #e5e7eb;
}

.table-container {
    overflow-x: auto;
    position: relative;
    min-height: 200px;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table th {
    background: #f3f4f6;
    padding: 15px;
    text-align: left;
    font-weight: 600;
    color: #374151;
    border-bottom: 2px solid #e5e7eb;
}

.data-table td {
    padding: 15px;
    border-bottom: 1px solid #e5e7eb;
    color: #4b5563;
}

.data-table tr:hover {
    background: #f9fafb;
}

.status {
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
}

.status.active {
    background: #dcfce7;
    color: #166534;
}

.status.inactive {
    background: #fee2e2;
    color: #b91c1c;
}

.edit-btn, .delete-btn {
    padding: 6px 12px;
    margin-right: 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    border: none;
    transition: background 0.3s;
}

.edit-btn {
    background: #e0f2fe;
    color: #0369a1;
    border: 1px solid #bae6fd;
}

.edit-btn:hover {
    background: #bae6fd;
}

.delete-btn {
    background: #fee2e2;
    color: #b91c1c;
    border: 1px solid #fecaca;
}

.delete-btn:hover {
    background: #fecaca;
}

.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #6b7280;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f4f6;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 10px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.empty-state {
    text-align: center;
    padding: 40px;
    color: #6b7280;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    gap: 15px;
}

.page-btn {
    padding: 8px 16px;
    background: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
}

.page-btn:hover:not(:disabled) {
    background: #e5e7eb;
}

.page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.page-info {
    color: #6b7280;
    font-weight: 500;
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
    border-radius: 10px;
    width: 400px;
    max-width: 90vw;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e5e7eb;
}

.dialog-header h3 {
    margin: 0;
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
}

.close-btn:hover {
    color: #374151;
}

.dialog-body {
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #374151;
    font-weight: 500;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    box-sizing: border-box;
}

.form-group input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 20px;
    border-top: 1px solid #e5e7eb;
}

.cancel-btn, .confirm-btn {
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    border: none;
    transition: background 0.3s;
}

.cancel-btn {
    background: #f3f4f6;
    color: #4b5563;
    border: 1px solid #d1d5db;
}

.cancel-btn:hover {
    background: #e5e7eb;
}

.confirm-btn {
    background: #3b82f6;
    color: white;
}

.confirm-btn:hover {
    background: #2563eb;
}
</style>
