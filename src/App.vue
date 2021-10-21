<template>
    <el-container>
        <el-header>
            <h2>What's for Lunch?</h2>
        </el-header>
        <el-main>
            <el-row :gutter="20" class="index">
                <el-col :span="24">
                    <a href="/roll">
                        <el-button type="primary" round class="index">
                            <el-icon><question-filled /></el-icon> 这顿吃啥
                        </el-button>
                    </a>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="index">
                <el-col :span="12">
                    <a href="/menu">
                        <el-button round class="index">
                            <el-icon><list /></el-icon> 查看菜单
                        </el-button>
                    </a>
                </el-col>
                <el-col :span="12">
                    <el-button round class="index">
                        <el-icon><search /></el-icon> 搜索菜品
                    </el-button>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import { List, Search, QuestionFilled } from '@element-plus/icons';

    export default {
        components: {
            List, Search, QuestionFilled
        }
    }
</script>

<style>
    .el-row.index + .el-row.index {
        margin-top: 20px;
    }
    .el-button.index {
        width: 100%;
        transition: all .3s ease-in-out !important;
    }
    .el-button.index:hover {
        box-shadow: 0 6px 18px #e8edfa80;
        transform: scale3d(1.02, 1.02, 1.02);
    }
</style>