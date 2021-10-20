<template>
    <el-menu>
        <el-sub-menu index="1">
            <template #title><el-icon><list /></el-icon>菜单</template>
            <el-menu-item index="1-1">按楼层查询</el-menu-item>
            <el-menu-item index="1-2">按菜名搜索</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2"><el-icon><dish /></el-icon>吃啥</el-menu-item>
    </el-menu>
</template>