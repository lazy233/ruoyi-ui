<template>
    <div class="page-container">
        <!-- 页面头部 -->
        <div class="page-header">
            <div class="header-content">
                <h1 class="page-title">角色权限管理</h1>
                <p class="page-description">管理系统角色和权限配置</p>
            </div>
            <button class="btn btn-primary">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                创建角色
            </button>
        </div>

        <!-- 搜索栏 -->
        <div class="search-section">
            <div class="search-bar">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input type="text" placeholder="搜索角色名称..." class="search-input">
            </div>
            <div class="search-actions">
                <button class="btn btn-secondary">重置</button>
                <button class="btn btn-primary">搜索</button>
            </div>
        </div>

        <!-- 数据表格 -->
        <div class="table-container">
            <div class="table-header">
                <div class="table-title">角色列表</div>
                <div class="table-summary">共 {{ roles.length }} 个角色</div>
            </div>
            
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>角色信息</th>
                            <th>权限数量</th>
                            <th>用户数量</th>
                            <th>创建时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="role in roles" :key="role.id" class="table-row">
                            <td>
                                <div class="role-info">
                                    <div class="role-icon">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M20 8V14M23 11H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                    <div class="role-details">
                                        <div class="role-name">{{ role.name }}</div>
                                        <div class="role-desc">{{ role.description }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="permission-count">{{ role.permissionCount }} 项权限</span>
                            </td>
                            <td>
                                <span class="user-count">{{ role.userCount }} 个用户</span>
                            </td>
                            <td>
                                <span class="date-text">{{ role.createTime }}</span>
                            </td>
                            <td>
                                <span :class="['status-badge', role.status]">
                                    {{ role.status === 'active' ? '启用' : '禁用' }}
                                </span>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn btn-sm btn-secondary" title="编辑">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <button class="btn btn-sm btn-secondary" title="权限管理">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <circle cx="12" cy="16" r="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <button class="btn btn-sm btn-danger" title="删除">
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
            </div>
        </div>

        <!-- 分页 -->
        <div class="pagination">
            <button class="pagination-btn" disabled>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                上一页
            </button>
            <div class="pagination-info">
                <span class="current-page">1</span>
                <span class="separator">/ 1</span>
            </div>
            <button class="pagination-btn" disabled>
                下一页
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
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

    /* 角色信息 */
    .role-info {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .role-icon {
        width: 40px;
        height: 40px;
        background: #fef3c7;
        color: #d97706;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .role-icon svg {
        width: 20px;
        height: 20px;
    }

    .role-details {
        min-width: 0;
    }

    .role-name {
        font-weight: 500;
        color: #1e293b;
        font-size: 14px;
        margin-bottom: 2px;
    }

    .role-desc {
        font-size: 13px;
        color: #64748b;
        line-height: 1.4;
    }

    .permission-count,
    .user-count,
    .date-text {
        font-size: 14px;
        color: #374151;
    }

    .permission-count {
        color: #059669;
        font-weight: 500;
    }

    .user-count {
        color: #0369a1;
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

    .status-badge.active {
        background: #dcfce7;
        color: #166534;
    }

    .status-badge.inactive {
        background: #fee2e2;
        color: #b91c1c;
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

        .role-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
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
    }
</style>
