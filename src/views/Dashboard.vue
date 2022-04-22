<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img :src="accountform.picUrl" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ accountform.account }}</div>
                            <div>{{ accountform.roleName }}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>{{ accountform.lastTime }}</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:550px;">
                    <template #header>
                        <div class="clearfix">
                            <span>类目博客占比</span>
                        </div>
                    </template>
                    <el-table :show-header="false" :data="ratioList" style="width:100%;">
                        <el-table-column width="50">
                            <template #default="scope">
                                {{ scope.row.id }}
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template #default="scope">
                                <el-progress :percentage="scope.row.name" :color="colorlists[Math.floor(Math.random()*10)]"></el-progress>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-user-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ accountform.userNumber }}</div>
                                    <div>用户总数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-monitor grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ accountform.viewNumber }}</div>
                                    <div>博客浏览总数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-document-copy grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ accountform.essayNumber }}</div>
                                    <div>博客总数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            <el-dialog title="添加待办事项" v-model="addEditVisible" width="20%">
                <el-form label-width="70px">
                    <el-form-item label="事项描述">
                        <el-input type="textarea" rows="1" v-model="thingData.thing"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="addEditVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addThingEdit">确 定</el-button>
                    </span>
                </template>
            </el-dialog>
                <el-card shadow="hover" style="height:700px;">
                    <template #header>
                        <div class="clearfix">
                            <span>待办事项</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="addthing">添加</el-button>
                        </div>
                    </template>

                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template #default="scope">
                                <el-checkbox v-model="scope.row.status" @change="handleCheck(scope.row.id)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template #default="scope">
                                <div class="todo-item" :class="{
                                        'todo-item-del': scope.row.status
                                    }">{{ scope.row.thing }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
import Schart from "vue-schart";
import { ref,reactive } from "vue";
import { getAccount,getThingList,addThing,updateThing,getEssayRatio } from "../api/index";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
    name: "dashboard",
    components: { Schart },
    setup() {

        const data = reactive([
            {
                name: "2018/09/04",
                value: 1083,
            },
            {
                name: "2018/09/05",
                value: 941,
            },
            {
                name: "2018/09/06",
                value: 1139,
            },
            {
                name: "2018/09/07",
                value: 816,
            },
            {
                name: "2018/09/08",
                value: 327,
            },
            {
                name: "2018/09/09",
                value: 228,
            },
            {
                name: "2018/09/10",
                value: 1065,
            },
        ]);
        const options = {
            type: "bar",
            title: {
                text: "最近一周各类目浏览树状图",
            },
            xRorate: 25,
            labels: ["周一", "周二", "周三", "周四", "周五"],
            datasets: [
                {
                    label: "Java",
                    data: [234, 278, 270, 190, 230],
                },
                {
                    label: "C++",
                    data: [164, 178, 190, 135, 160],
                },
                {
                    label: "python",
                    data: [144, 198, 150, 235, 120],
                },
            ],
        };
        const colorlists = [
            'rgb(229, 0, 19)','rgb(206,194,28)','rgb(0,161,233)','rgb(109,185,45)',
            'rgb(166,0,130)','rgb(237,108,0)','rgb(240, 28, 131)', 'rgb(84, 21, 226)',
            'rgb( 0,128,0)','rgb( 255,69,0)','rgb( 255,165,0)','rgb( 178,34,34)',
            'rgb( 255,0,255)','rgb(65,105,225)','blueviolet']
        const options2 = {
            type: "line",
            title: {
                text: "最近几个月各类目浏览趋势图",
            },
            labels: ["6月", "7月", "8月", "9月", "10月"],
            datasets: [
                {
                    label: "Java",
                    data: [234, 278, 270, 190, 230],
                },
                {
                    label: "C++",
                    data: [164, 178, 150, 135, 160],
                },
                {
                    label: "python",
                    data: [74, 118, 200, 235, 90],
                },
            ],
        };
        // const statusData = reactive({
        //     '1':false,
        //     '9':true,
        // });
        const ratioList = ref([]);
        const getRatio = ()=>{
            getEssayRatio().then((res)=>{
                if(res.errorCode == 200){
                    ratioList.value = res.data;
                    console.log(ratioList);
                }else{
                    ElMessage.warning(res.message);
                }
            });
        };
        getRatio();
        const todoList = ref([]);
        const getThing = ()=>{
            getThingList().then((res)=>{
                if(res.errorCode == 200){
                    todoList.value = res.data;
                    console.log(todoList);
                }else{
                    ElMessage.warning(res.message);
                }
            });
        };
        getThing();
        //账号信息
        let accountform = reactive({
            id:"",
            account: "",
            phone: "",
            picUrl:"",
            lastTime:"",
            roleName:"",
            essayNumber:"",
            userNumber:"",
            viewNumber:""
        });
        let idData = reactive({
            id:"",
        });
        let thingData = reactive({
            thing:null,
        });
        const addEditVisible = ref(false);
        const addthing = ()=>{
            addEditVisible.value = true;
        };
        const addThingEdit = ()=>{
            addThing(thingData).then((res)=>{
                if(res.errorCode == 200){
                    ElMessage.success("添加待办事项成功");
                    getThing();
                }else{
                    ElMessage.warning(res.message);
                }
            });
            addEditVisible.value = false;
        };
        const handleCheck = (id)=>{
            idData.id = id;
            updateThing(idData).then((res)=>{
                if(res.errorCode == 200){
                    ElMessage.success("操作事项成功");
                }else{
                    ElMessage.warning(res.message);
                }
            });
        };
        const getUserInfo=()=>{
            idData.id = localStorage.getItem("wuser_id");
            getAccount(idData).then((res)=>{
                if(res.errorCode == 200){
                    accountform.id = res.data.id;
                    accountform.account = res.data.account;
                    accountform.phone = res.data.phone;
                    accountform.lastTime = res.data.lastTime;
                    accountform.roleName = res.data.roleName;
                    accountform.picUrl = res.data.picUrl;
                    accountform.essayNumber = res.data.essayNumber;
                    accountform.userNumber = res.data.userNumber;
                    accountform.viewNumber = res.data.viewNumber;
                }else{
                    ElMessage.warning(res.message);
                }
            });
        };
        getUserInfo();
        return {
            colorlists,
            thingData,
            accountform,
            data,
            options,
            options2,
            todoList,
            idData,
            ratioList,
            addEditVisible,
            getRatio,
            getThing,
            addThingEdit,
            addthing,
            getUserInfo,
            handleCheck
            
        };
    },
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
