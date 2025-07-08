<!-- DepartmentManagement.vue -->
<template>
    <div class="management-page">
        <div class="header">
            <h1>班级管理</h1>
            <button class="add-btn" @click="showAddDialog = true">+ 创建班级</button>
        </div>

        <div class="search-bar">
            <input 
                type="text" 
                v-model="searchKeyword"
                placeholder="搜索班级名称..." 
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
                    <th>班级ID</th>
                    <th>班级名称</th>
                    <th>学生人数</th>
                    <th>教室编号</th>
                    <th>班级</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="classItem in classList" :key="classItem.classId">
                    <td>{{ classItem.classId }}</td>
                    <td>{{ classItem.className }}</td>
                    <td>{{ classItem.studentCount }}</td>
                    <td>{{ classItem.classroom || '-' }}</td>
                    <td>{{ getClassName(classItem.classId) }}</td>
                    <td>
                        <button class="edit-btn" @click="handleEdit(classItem)">编辑</button>
                        <button class="delete-btn" @click="handleDelete(classItem)">删除</button>
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
            <div v-if="!loading && classList.length === 0" class="empty-state">
                <p>暂无班级数据</p>
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

        <!-- 添加/编辑班级对话框 -->
        <div v-if="showAddDialog" class="dialog-overlay" @click="showAddDialog = false">
            <div class="dialog" @click.stop>
                <div class="dialog-header">
                    <h3>{{ editingClass ? '编辑班级' : '创建班级' }}</h3>
                    <button class="close-btn" @click="showAddDialog = false">×</button>
                </div>
                <div class="dialog-body">
                    <div class="form-group">
                        <label>班级名称 *</label>
                        <input 
                            type="text" 
                            v-model="classForm.className" 
                            placeholder="请输入班级名称"
                            maxlength="50"
                        >
                    </div>
                    <div class="form-group">
                        <label>学生人数</label>
                        <input 
                            type="number" 
                            v-model="classForm.studentCount" 
                            placeholder="请输入学生人数"
                            min="0"
                        >
                    </div>
                    <div class="form-group">
                        <label>教室编号</label>
                        <input 
                            type="text" 
                            v-model="classForm.classroom" 
                            placeholder="请输入教室编号"
                            maxlength="20"
                        >
                    </div>
                    <div class="form-group">
                        <label>班级</label>
                        <select v-model="userForm.classId">
                            <option value="">请选择班级</option>
                            <option v-for="item in classOptions" :key="item.value" :value="item.value">
                                {{ item.label }}
                            </option>
                        </select>
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
const classList = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const searchKeyword = ref('');
const showAddDialog = ref(false);
const editingClass = ref(null);
const classOptions = ref([]);
const userForm = reactive({
    username: '',
    email: '',
    password: '',
    classId: ''
});
const editingUser = ref(null);

// 班级表单
const classForm = reactive({
    className: '',
    studentCount: 0,
    classroom: '',
    classId: ''
});

// 计算总页数
const totalPages = computed(() => {
    return Math.ceil(total.value / pageSize.value);
});

// 获取班级列表
const fetchClassList = async () => {
    loading.value = true;
    try {
        const response = await axios.post('/api/classes/list', {
            pageNum: currentPage.value,
            pageSize: pageSize.value,
            className: searchKeyword.value
        });
        
        if (response.data) {
            classList.value = response.data.records || [];
            total.value = response.data.total || 0;
            if (response.data.current) {
                currentPage.value = response.data.current;
            }
        } else {
            console.error('获取班级列表失败:', response.data.message);
        }
    } catch (error) {
        console.error('获取班级列表出错:', error);
        // 如果API不存在，使用模拟数据
        classList.value = [
            { classId: 1, className: '前端开发班', studentCount: 25, classroom: 'A101' },
            { classId: 2, className: '后端开发班', studentCount: 30, classroom: 'A102' },
            { classId: 3, className: '全栈开发班', studentCount: 20, classroom: 'A103' },
            { classId: 4, className: '移动开发班', studentCount: 15, classroom: 'A104' },
        ];
        total.value = classList.value.length;
    } finally {
        loading.value = false;
    }
};

// 搜索
const handleSearch = () => {
    currentPage.value = 1;
    fetchClassList();
};

// 重置搜索
const handleReset = () => {
    searchKeyword.value = '';
    currentPage.value = 1;
    fetchClassList();
};

// 分页
const handlePageChange = (page) => {
    currentPage.value = page;
    fetchClassList();
};

// 编辑班级
const handleEdit = (classItem) => {
    editingClass.value = classItem;
    classForm.className = classItem.className;
    classForm.studentCount = classItem.studentCount;
    classForm.classroom = classItem.classroom || '';
    showAddDialog.value = true;
};

// 删除班级
const handleDelete = async (classItem) => {
    if (confirm(`确定要删除班级 "${classItem.className}" 吗？`)) {
        try {
            const response = await axios.delete(`/api/classes/deleteClass/${classItem.classId}`);
            
            // 处理空响应的情况
            if (response.status === 200 || response.status === 204) {
                if (!response.data || Object.keys(response.data).length === 0) {
                    alert('删除成功');
                    fetchClassList();
                    return;
                }
                
                if (response.data && response.data.success !== false) {
                    alert('删除成功');
                    fetchClassList();
                } else {
                    alert('删除失败: ' + (response.data?.message || '未知错误'));
                }
            } else {
                alert('删除失败: 服务器响应异常');
            }
        } catch (error) {
            console.error('删除班级出错:', error);
            alert('删除失败');
        }
    }
};

// 保存班级
const handleSave = async () => {
    if (!classForm.className.trim()) {
        alert('请填写班级名称');
        return;
    }
    
    try {
        let response;
        if (editingClass.value) {
            // 编辑班级
            response = await axios.put(`/api/classes/updateClass/${editingClass.value.classId}`, {
                className: classForm.className.trim(),
                studentCount: parseInt(classForm.studentCount) || 0,
                classroom: classForm.classroom.trim() || null
            });
        } else {
            // 创建班级
            response = await axios.post('/api/classes/addClass', {
                className: classForm.className.trim(),
                studentCount: parseInt(classForm.studentCount) || 0,
                classroom: classForm.classroom.trim() || null
            });
        }
        
        if (response.data && response.data.success) {
            alert(editingClass.value ? '编辑成功' : '创建成功');
            showAddDialog.value = false;
            resetForm();
            fetchClassList();
        } else {
            alert('操作失败: ' + (response.data?.message || '未知错误'));
        }
    } catch (error) {
        console.error('保存班级出错:', error);
        alert('操作失败');
    }
};

// 重置表单
const resetForm = () => {
    classForm.className = '';
    classForm.studentCount = 0;
    classForm.classroom = '';
    editingClass.value = null;
    userForm.username = '';
    userForm.email = '';
    userForm.password = '';
    userForm.classId = '';
    editingUser.value = null;
};

// 页面加载时获取数据
onMounted(() => {
    fetchClassList();
    fetchClassOptions();
});

const fetchClassOptions = async () => {
    const res = await axios.post('/api/classes/list', { pageNum: 1, pageSize: 1000 });
    classOptions.value = (res.data.records || []).map(item => ({
        label: item.className,
        value: item.classId
    }));
};

const getClassName = (classId) => {
    const found = classOptions.value.find(c => c.value === classId);
    return found ? found.label : '-';
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
