<template>
    <el-container>
        <el-main v-loading="loading">
            <page-header content="这顿吃啥" />
            <div style="text-align: center;">
                <el-button type="primary" round plain @click="openDrawer">
                    <el-icon :size="128"><dish /></el-icon>
                </el-button>
            </div>
            <el-drawer
                v-model="drawer"
                title="这顿就吃…"
                direction="btt"
                size="60%">
                <el-descriptions :title="name" :column="1">
                    <el-descriptions-item label="餐厅">{{canteen}}</el-descriptions-item>
                    <el-descriptions-item label="楼层">{{floor}}</el-descriptions-item>
                    <el-descriptions-item label="窗口">{{window}}</el-descriptions-item>
                    <el-descriptions-item label="营业">
                        <span v-if="open">
                            <el-tag v-for="(item, index) in open" :key="index"
                                :type="open[index] ? 'success' : 'danger'" size="mini">
                                {{period[index]}}
                            </el-tag>
                        </span>
                        <span v-else>
                            <el-tag type="warning" size="mini">{{period[3]}}</el-tag>
                        </span>
                    </el-descriptions-item>
                    <el-descriptions-item label="价格">{{price}}</el-descriptions-item>
                </el-descriptions>
            </el-drawer>
        </el-main>
    </el-container>
</template>

<script>
    import PageHeader from './PageHeader.vue';
    import AV from 'leancloud-storage';
    import { Dish } from '@element-plus/icons';

    export default {
        data () {
            return {
                drawer: false,
                loading: false,
                canteen: "",
                window: "",
                floor: "",
                name: "",
                open: [],
                period: ["早", "中", "晚", "待补充"],
                price: 114514
            }
        },
        methods: {
            openDrawer () {
                this.$data.loading = true;
                const query = new AV.Query('Food');
                query.equalTo('seasoning', false);
                query.equalTo('ingredient', false);
                query.count().then((count) => {
                    let ran = Math.floor(Math.random() * count);
                    query.skip(ran);
                    query.first().then(food => {
                        this.$data.name = food.get('name');
                        this.$data.price = food.get('price');
                        new AV.Query('Window').get(food.get('window').id).then(window => {
                            this.$data.window = window.get("name");
                            this.$data.open = window.get("open");
                            new AV.Query('Floor').get(window.get('floor').id).then(floor => {
                                this.$data.floor = floor.get("no") + 'F ' +floor.get("name");
                                new AV.Query('Canteen').get(floor.get('canteen').id).then(canteen => {
                                    this.$data.canteen = canteen.get("name");
                                    this.$data.loading = false;
                                    this.$data.drawer = true;
                                });
                            });
                        });
                    });
                });
            }
        },
        components: {
            PageHeader, Dish
        },
    }
</script>
