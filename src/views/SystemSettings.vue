<template>
    <div class="settings-page">
        <div class="header">
            <h1>系统设置</h1>
            <button class="save-btn" @click="saveSettings">
                <i class="icon-save"></i> 保存设置
            </button>
        </div>

        <div class="settings-container">
            <!-- 设置导航 -->
            <div class="settings-nav">
                <div
                        v-for="tab in tabs"
                        :key="tab.id"
                        :class="['nav-item', { active: activeTab === tab.id }]"
                        @click="activeTab = tab.id"
                >
                    <i :class="['nav-icon', tab.icon]"></i>
                    <span class="nav-text">{{ tab.name }}</span>
                </div>
            </div>

            <!-- 设置内容 -->
            <div class="settings-content">
                <!-- 基本设置 -->
                <div v-if="activeTab === 'general'" class="settings-section">
                    <h2 class="section-title">基本设置</h2>

                    <div class="setting-item">
                        <div class="setting-label">
                            <h3>系统名称</h3>
                            <p>显示在登录页和系统标题栏</p>
                        </div>
                        <div class="setting-control">
                            <input type="text" v-model="settings.general.systemName" placeholder="请输入系统名称">
                        </div>
                    </div>

                    <div class="setting-item">
                        <div class="setting-label">
                            <h3>系统Logo</h3>
                            <p>建议尺寸 200×60px，支持 PNG/JPG 格式</p>
                        </div>
                        <div class="setting-control">
                            <div class="logo-upload" @click="triggerUpload">
                                <div v-if="logoPreview" class="logo-preview">
                                    <img :src="logoPreview" alt="Logo">
                                </div>
                                <div v-else class="upload-placeholder">
                                    <span>📚</span>
                                    <p>点击上传Logo</p>
                                </div>
                            </div>
                            <input
                                    ref="logoInput"
                                    type="file"
                                    accept="image/*"
                                    @change="handleLogoChange"
                                    style="display: none"
                            >
                        </div>
                    </div>

                    <div class="setting-item">
                        <div class="setting-label">
                            <h3>默认语言</h3>
                            <p>系统界面显示语言</p>
                        </div>
                        <div class="setting-control">
                            <select v-model="settings.general.defaultLanguage">
                                <option value="zh-CN">简体中文</option>
                                <option value="en-US">English</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- 通知设置 -->
                <div v-if="activeTab === 'notification'" class="settings-section">
                    <h2 class="section-title">通知设置</h2>

                    <div class="setting-item">
                        <div class="setting-label">
                            <h3>系统通知</h3>
                            <p>系统事件通知方式</p>
                        </div>
                        <div class="setting-control">
                            <div class="notification-types">
                                <label class="option-item">
                                    <input type="checkbox" v-model="settings.notification.system.enableEmail">
                                    <span class="option-checkbox"></span>
                                    邮件通知
                                </label>
                                <label class="option-item">
                                    <input type="checkbox" v-model="settings.notification.system.enableSMS">
                                    <span class="option-checkbox"></span>
                                    短信通知
                                </label>
                                <label class="option-item">
                                    <input type="checkbox" v-model="settings.notification.system.enableWeb">
                                    <span class="option-checkbox"></span>
                                    站内通知
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="setting-item">
                        <div class="setting-label">
                            <h3>用户通知</h3>
                            <p>用户相关事件通知方式</p>
                        </div>
                        <div class="setting-control">
                            <div class="notification-types">
                                <label class="option-item">
                                    <input type="checkbox" v-model="settings.notification.user.enableEmail">
                                    <span class="option-checkbox"></span>
                                    邮件通知
                                </label>
                                <label class="option-item">
                                    <input type="checkbox" v-model="settings.notification.user.enableSMS">
                                    <span class="option-checkbox"></span>
                                    短信通知
                                </label>
                                <label class="option-item">
                                    <input type="checkbox" v-model="settings.notification.user.enableWeb">
                                    <span class="option-checkbox"></span>
                                    站内通知
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="setting-item">
                        <div class="setting-label">
                            <h3>通知模板</h3>
                            <p>自定义通知内容模板</p>
                        </div>
                        <div class="setting-control">
                            <div class="template-select">
                                <select v-model="selectedTemplate">
                                    <option value="welcome">新用户欢迎邮件</option>
                                    <option value="passwordReset">密码重置通知</option>
                                    <option value="systemAlert">系统警报通知</option>
                                </select>
                                <button class="edit-btn">编辑模板</button>
                            </div>
                            <div class="template-preview">
                                <h4>模板预览</h4>
                                <div class="preview-content">
                                    {{ templatePreview }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive, computed } from 'vue';

    // 设置标签页
    const tabs = [
        { id: 'general', name: '基本设置', icon: 'icon-settings' },
        { id: 'notification', name: '通知设置', icon: 'icon-bell' }
    ];

    const activeTab = ref('general');

    // 系统设置数据
    const settings = reactive({
        general: {
            systemName: '在线学习平台',
            logo: null,
            defaultLanguage: 'zh-CN'
        },
        notification: {
            system: {
                enableEmail: true,
                enableSMS: false,
                enableWeb: true
            },
            user: {
                enableEmail: true,
                enableSMS: true,
                enableWeb: true
            }
        }
    });

    // Logo 上传相关
    const logoInput = ref(null);
    const logoPreview = ref(null);

    function triggerUpload() {
        logoInput.value.click();
    }

    function handleLogoChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                logoPreview.value = e.target.result;
                settings.general.logo = file;
            };
            reader.readAsDataURL(file);
        }
    }

    // 通知模板预览
    const selectedTemplate = ref('welcome');
    const templatePreview = computed(() => {
        const templates = {
            welcome: `尊敬的{username}，欢迎加入{systemName}！您的账号已创建成功，初始密码为{password}。请尽快登录系统修改密码。`,
            passwordReset: `您的{systemName}账号密码已重置。如果不是您本人操作，请立即联系管理员。`,
            systemAlert: `系统检测到异常登录：时间：{time}，IP：{ip}，地点：{location}。如非本人操作，请立即修改密码。`
        };
        return templates[selectedTemplate.value];
    });

    // 保存设置
    function saveSettings() {
        console.log('保存设置:', settings);
        // 这里实际会调用API保存
        alert('系统设置已保存！');
    }
</script>

<style scoped>
    .settings-page {
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

    .save-btn {
        background: #10b981;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: background 0.3s;
    }

    .save-btn:hover {
        background: #059669;
    }

    .settings-container {
        display: flex;
        flex: 1;
        gap: 25px;
        height: calc(100% - 70px);
    }

    .settings-nav {
        width: 200px;
        border-right: 1px solid #e5e7eb;
        padding-right: 15px;
    }

    .nav-item {
        display: flex;
        align-items: center;
        padding: 12px 15px;
        border-radius: 6px;
        margin-bottom: 8px;
        cursor: pointer;
        transition: all 0.3s;
    }

    .nav-item:hover {
        background: #f3f4f6;
    }

    .nav-item.active {
        background: #dbeafe;
        color: #3b82f6;
        font-weight: 500;
    }

    .nav-icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        font-size: 1.1rem;
    }

    .nav-text {
        font-size: 1rem;
    }

    .settings-content {
        flex: 1;
        overflow-y: auto;
        padding-right: 10px;
    }

    .settings-section {
        margin-bottom: 40px;
    }

    .section-title {
        margin-top: 0;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e5e7eb;
        font-size: 1.4rem;
        color: #1e293b;
    }

    .setting-item {
        display: flex;
        margin-bottom: 30px;
        padding-bottom: 30px;
        border-bottom: 1px solid #f3f4f6;
    }

    .setting-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }

    .setting-label {
        width: 300px;
        padding-right: 20px;
    }

    .setting-label h3 {
        margin: 0 0 8px 0;
        font-size: 1.1rem;
        color: #1e293b;
    }

    .setting-label p {
        margin: 0;
        color: #6b7280;
        font-size: 0.9rem;
        line-height: 1.4;
    }

    .setting-control {
        flex: 1;
    }

    input[type="text"],
    input[type="number"],
    select,
    textarea {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 1rem;
    }

    select {
        padding: 10px 35px 10px 12px;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236b7280'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 16px;
        appearance: none;
    }

    .logo-upload {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .logo-preview {
        width: 200px;
        height: 60px;
        border: 1px dashed #d1d5db;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .logo-preview img {
        max-width: 100%;
        max-height: 100%;
    }

    .upload-placeholder {
        color: #9ca3af;
        text-align: center;
    }

    .upload-placeholder span {
        font-size: 1.5rem;
        display: block;
        margin-bottom: 5px;
    }

    .upload-placeholder p {
        margin: 0;
    }

    .option-item {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .option-checkbox {
        position: relative;
        height: 18px;
        width: 18px;
        background-color: #fff;
        border: 2px solid #d1d5db;
        border-radius: 4px;
        margin-right: 10px;
    }

    .option-item input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    .option-item input:checked ~ .option-checkbox {
        background-color: #3b82f6;
        border-color: #3b82f6;
    }

    .option-checkbox:after {
        content: "";
        position: absolute;
        display: none;
        left: 5px;
        top: 1px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    .option-item input:checked ~ .option-checkbox:after {
        display: block;
    }

    .notification-types {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }

    .template-select {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    }

    .template-select select {
        flex: 1;
    }

    .edit-btn {
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.3s;
    }

    .edit-btn:hover {
        background: #e5e7eb;
    }

    .template-preview {
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        padding: 15px;
        background: #f9fafb;
    }

    .template-preview h4 {
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 1rem;
    }

    .preview-content {
        white-space: pre-wrap;
        font-size: 0.9rem;
        line-height: 1.6;
        color: #4b5563;
    }


</style>