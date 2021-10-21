<template>
    <el-page-header icon="el-icon-arrow-left" :title="new String" :content="content" @back="goBack" />
    <el-divider />
</template>

<script>
    export default {
        props: ['content'],
        methods: {
            goBack () {
                window.location.search = '';
            }
        }
    }
</script>
