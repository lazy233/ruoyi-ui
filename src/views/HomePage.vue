<template>
    <div class="home">
        <el-button type="primary" @click="showMessage">点击我</el-button>
        <el-dialog v-model:visible="dialogVisible" title="Hello">

            <p>欢迎来到 Vue 3 和 Element Plus!</p>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false
            };
        },
        methods: {
            showMessage() {
                this.dialogVisible = true;
            }
        }
    };
</script>

<style scoped>
    .home {
        padding: 20px;
    }
</style>
