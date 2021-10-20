<template>
    <div class="block">
        <el-cascader
            v-model="value"
            placeholder="请选择楼层…"
            :props="props"
            :options="options"
            @change="update(this.$data.value)"></el-cascader>
    </div>
    <el-table :data="tableData" style="width: 100%" lazy :load="load" row-key="name">
        <el-table-column fixed prop="name" label="名称" width="250">
            <template #default="scope">
                <span v-if="scope.row.seasoning">
                    <el-tag size="mini">调料</el-tag>
                </span>
                <span v-if="scope.row.ingredient">
                    <el-tag type="success" size="mini">加菜</el-tag>
                </span>
                {{scope.row.name}}
            </template>
        </el-table-column>
        <el-table-column
            v-for="item in attribute"
            :key="item.label"
            :prop="item.label"
            :label="item.name" />
        <el-table-column prop="open" label="营业" width="150">
            <template #default="scope">
                <div v-if="scope.row.hasChildren">
                    <el-tag v-for="(item, index) in scope.row.open" :key="index"
                        :type="scope.row.open[index] ? 'success' : 'danger'" size="mini">
                        {{period[index]}}
                    </el-tag>
                    <div v-if="!scope.row.open">
                        <el-tag type="warning" size="mini">{{period[3]}}</el-tag>
                    </div>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import AV from 'leancloud-storage';

export default {
    name: 'App',
    data () {
        return {
            tableData: [],
            attribute: [
                { label: 'price', name: '价格' },
            ],
            period: ["早", "中", "晚", "待补充"],
            value: '',
            props: {
                lazy: true,
                lazyLoad (node, resolve) {
                    if (node.level == 1) {
                        const canteen = new AV.Object.createWithoutData('Canteen', node.value);
                        const queryFloor = new AV.Query('Floor');
                        queryFloor.equalTo('canteen', canteen);
                        queryFloor.ascending('no');
                        queryFloor.find().then(floors => {
                            let array = new Array;
                            floors.forEach(floor => {
                                array.push({
                                    value: floor.getObjectId(),
                                    label: floor.get('no') + ' - ' + floor.get('name'),
                                    leaf: true
                                });
                            });
                            resolve(array);
                        });
                    }
                }
            },
            options: []
        }
    },
    mounted () {
        let array = new Array;
        let queryCanteen = new AV.Query('Canteen');
        queryCanteen.find().then(canteens => {
            canteens.forEach(canteen => {
                array.push({
                    value: canteen.getObjectId(),
                    label: canteen.get('name'),
                    level: 1
                });
            });
        }).then(() => {
            this.$data.options = array;
        });
    },
    methods: {
        update (floorid) {
            const queryWindow = new AV.Query('Window');
            const floor = new AV.Object.createWithoutData('Floor', floorid[1]);
            queryWindow.equalTo('floor', floor);
            queryWindow.ascending('name');
            queryWindow.find().then(windows => {
                let data = windows.map(window => window.toJSON());
                // console.log(data);
                data.forEach(datum => {
                    datum.hasChildren = true;
                });
                this.$data.tableData = data;
            });
        },
        load (tree, treeNode, resolve) {
            const window = new AV.Object.createWithoutData('Window', tree.objectId);
            const queryFood = new AV.Query('Food');
            queryFood.equalTo('window', window);
            queryFood.addAscending('seasoning');
            queryFood.addAscending('ingredient');
            queryFood.addAscending('name');
            queryFood.find().then(foods => {
                resolve(foods.map(food => food.toJSON()));
            });
        },
    }
}
</script>

<style>
    * {
        font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .el-tag+.el-tag {
        margin-left: 10px;
    }
</style>
