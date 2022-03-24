<template>
    <div>
        <el-row :gutter="40">
            <!-- <el-col :span="12"> -->
                <el-card shadow="hover">
                    <template #header>
                        <div class="clearfix">
                            <span>基础信息</span>
                        </div>
                    </template>
                    <div class="info">
                        <div class="info-image" >
                            <el-upload class="upload-demo" 
                                :action=uploadUrl 
                                auto-upload
                                :on-success="uploadSuccess">
                                <img :src="userInfo.picUrl" v-if="userInfo.picUrl"/>
                                <span class="info-edit">
                                <i class="el-icon-lx-camerafill"></i>
                               </span>
                            </el-upload>
                        </div>
                        <div class="info-name" > 
                            <span>{{ userInfo.account }}</span> 
                        </div>
                        <div class="info-desc">不可能！我的代码怎么可能会有bug！</div>
                    </div>
                </el-card>
        </el-row>
        <el-row :gutter="40">
                <el-card shadow="hover" v-if="aditStatus">
                    <template #header>
                        <div class="clearfix">
                            <span>账号编辑</span>
                            <span>完成</span>
                        </div>
                    </template>
                    <el-form label-width="90px" >
                        <el-form-item label="用户名："> 
                            <el-input v-model="accountform.account"></el-input>
                        </el-form-item>
                        <el-form-item label="旧密码：">
                            <el-input type="password" v-model="accountform.oldPassword"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码：">
                            <el-input type="password" v-model="accountform.password"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号：">
                            <el-input v-model="accountform.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ号：">
                            <el-input v-model="accountform.qqNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="微信号：">
                            <el-input v-model="accountform.weChat"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-card shadow="hover" v-else>
                    <template #header>
                        <div class="clearfix">
                            <span>账号信息</span>
                            <el-button type="primary" icon="el-icon-edit" @click="changeUpdate"></el-button>
                        </div>
                    </template>
                    <el-form label-width="90px" >
                        <el-form-item label="用户名："> 
                            {{ accountform.account }} 
                        </el-form-item>
                        <el-form-item label="手机号：">
                            {{ accountform.phone }}
                        </el-form-item>
                        <el-form-item label="QQ号：">
                            {{ accountform.qqNumber }}
                        </el-form-item>
                        <el-form-item label="微信号：">
                            {{ accountform.weChat }}
                        </el-form-item>
                    </el-form>
                </el-card>
        </el-row>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import "cropperjs/dist/cropper.css";
import { ElMessage, ElMessageBox } from "element-plus";
import { getUserRecommendByUserId,updateUser } from "../api/index";
import router from '../router';
export default {
    name: "user",
    setup() {
        const form = reactive({
            old: "",
            new: "",
            desc: "",
        });
        const onSubmit = () => {};
        let userform = reactive({
            id:"",
            realName:null,
            picUrl:"",
            sex:null,
            synopsis:null,
            areaName:null,
            provinceCode:"",
            cityCode:"",
            areaCode:"",
            birthday:"",
            nativePlace:null,
            status:null
        });
        //基础信息
        let userInfo = reactive({
            id:"",
            account: "",
            picUrl:""
        });
        //账号信息
        let accountform = reactive({
            id:"",
            account: "",
            oldPassword:"",
            password:"",
            phone: "",
            qqNumber:"",
            weChat:"",
        });
        //上传图片
        const uploadUrl = "http://localhost:8080/api/cloud/uploadImg";
        const uploadSuccess = (res)=>{
            userInfo.picUrl = res.data;
            userform.id = localStorage.getItem("userId");
            userform.picUrl = res.data;
            updateUser(userform).then((res)=>{
                if(res.errorCode == 200){
                    router.go(0);
                    ElMessage.success("修改头像成功");
                }else{
                    ElMessage.warning("修改头像失败");
                }
            })
        }

        let idData = reactive({
            id:"",
        });
        const aditStatus = ref(false);
        const getUser = ()=>{
            idData.id = localStorage.getItem("userId");
            getUserRecommendByUserId(idData).then((res)=>{
                if(res.errorCode == 200){
                    userInfo.id = res.data.blogUserId;
                    userInfo.account = res.data.blogUserName;
                    userInfo.picUrl = res.data.blogUserPic;
                }else{
                    ElMessage.warning("获取用户信息失败");
                }
            });
            
        };
        getUser();
        const changeUpdate = ()=>{
            console.log("点击")
            aditStatus.value = true;
        }

        return {
            accountform,
            userform,
            uploadUrl,
            uploadSuccess,
            aditStatus,
            idData,
            userInfo,
            form,
            onSubmit,
            getUser,
            changeUpdate
        };
    },
};
</script>

<style scoped>
.info {
    text-align: center;
    padding: 35px 0;
}
.info-image {
    position: relative;
    margin: auto;
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 50px;
    overflow: hidden;
}
.info-image img {
    width: 100%;
    height: 100%;
}
.info-edit {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
}
.info-edit i {
    color: #eee;
    font-size: 25px;
}
.info-image:hover .info-edit {
    opacity: 1;
}
.info-name {
    margin: 15px 0 10px;
    font-size: 24px;
    font-weight: 500;
    color: #262626;
}
.crop-demo-btn {
    position: relative;
}
.crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
:deep(.el-upload) {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
*{
    margin: auto;
}
:deep(.el-card){
    width: 60%;
}
:deep(.el-row){
    margin-top: 10px;
}
:deep(.el-button){
    position: relative;
    left: 80%;
    color: #100e0f;
    background-color: #e7ecef00;
    border-color: #409eff08;
}
</style>