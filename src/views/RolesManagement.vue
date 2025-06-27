<template>
    <div class="management-page">
        <div class="header">
            <h1>角色权限管理</h1>
            <button class="add-btn">+ 创建角色</button>
        </div>

        <div class="search-bar">
            <input type="text" placeholder="搜索角色..." class="search-input">
            <button class="search-btn">搜索</button>
        </div>

        <div class="table-container">
            <table class="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>角色名称</th>
                    <th>角色描述</th>
                    <th>权限数量</th>
                    <th>用户数量</th>
                    <th>创建时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="role in roles" :key="role.id">
                    <td>{{ role.id }}</td>
                    <td>{{ role.name }}</td>
                    <td>{{ role.description }}</td>
                    <td>{{ role.permissionCount }}</td>
                    <td>{{ role.userCount }}</td>
                    <td>{{ role.createTime }}</td>
                    <td>
              <span :class="['status', role.status]">
                {{ role.status === 'active' ? '启用' : '禁用' }}
              </span>
                    </td>
                    <td>
                        <button class="edit-btn">编辑</button>
                        <button class="delete-btn">删除</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination">
            <button>上一页</button>
            <span>1 / 2</span>
            <button>下一页</button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    const roles = ref([
        { id: 1, name: '超级管理员', description: '拥有所有权限，可以管理整个平台', permissionCount: 50, userCount: 1, createTime: '2024-01-01', status: 'active' },
        { id: 2, name: '教师', description: '可以管理课程、学员和作业', permissionCount: 25, userCount: 8, createTime: '2024-01-15', status: 'active' },
        { id: 3, name: '助教', description: '可以查看课程和学员信息，协助教学', permissionCount: 15, userCount: 12, createTime: '2024-01-20', status: 'active' },
        { id: 4, name: '学员', description: '可以学习课程、提交作业', permissionCount: 10, userCount: 150, createTime: '2024-02-01', status: 'active' },
    ]);
</script>

<style scoped>
    .management-page {
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        padding: 25px;
        height: 100%;
        display: flex;
        flex-direction: column;
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
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .add-btn:hover {
        background: #2563eb;
    }

    .search-bar {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
    }

    .search-input {
        width: 300px;
        padding: 10px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 1rem;
    }

    .search-btn {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.3s;
        margin-left: 10px;
    }

    .search-btn:hover {
        background: #2563eb;
    }

    .table-container {
        flex: 1;
        overflow-y: auto;
    }

    .data-table {
        width: 100%;
        border-collapse: collapse;
    }

    .data-table th,
    .data-table td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
    }

    .data-table th {
        background-color: #f9fafb;
    }

    .data-table tbody tr:hover {
        background-color: #f0f9ff;
    }

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 25px;
    }

    .pagination button {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.3s;
        margin: 0 5px;
    }

    .pagination button:hover {
        background: #2563eb;
    }

    .status {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.85rem;
    }

    .status.active {
        background-color: #d1fae5;
        color: #15803d;
    }

    .status.inactive {
        background-color: #fef2f2;
        color: #b91c1c;
    }

    .edit-btn,
    .delete-btn {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        font-size: 1rem;
        margin-left: 10px;
    }

    .edit-btn:hover,
    .delete-btn:hover {
        color: #1f2937;
    }
</style>
