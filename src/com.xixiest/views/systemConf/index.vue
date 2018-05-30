<template>
  <el-container class="app-container">
    <el-header>
      <el-col :span="24">常规配置</el-col>
    </el-header>
    <el-main>
      <el-form :model="commonData" ref="formData">
        <el-form-item label="IotGateway名称" :label-width="formLabelWidth">
          <el-input v-model="commonData.name"></el-input>
        </el-form-item>
        <el-form-item label="IotGateway唯一ID" prop="label" :label-width="formLabelWidth">
          <el-input v-model="commonData.id"></el-input>
        </el-form-item>
        <el-form-item label="商户ID" prop="corpId" :label-width="formLabelWidth">
          <el-input v-model="commonData.corpId"></el-input>
        </el-form-item>
        <!--<el-form-item label="工作模式" prop="deviceState" :label-width="formLabelWidth">-->
          <!--<el-radio-group v-model="commonData.workPattern" placeholder="请选择用户状态">-->
            <!--<el-radio label="NORMAL">正常模式</el-radio>-->
            <!--<el-radio label="MAINTENANCE">维护模式</el-radio>-->
            <!--<el-radio label="SHIELDING">屏蔽模式</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="NTP服务地址" prop="uploadRate" :label-width="formLabelWidth">-->
          <!--<el-input v-model="commonData.ntpaddress"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item align="right">
          <el-button type="primary" size="small" @click="updateCommonConf">应用</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
  <!--<el-container>-->
  <!--<el-header>-->
  <!--<el-col :span="24">本地网络配置</el-col>-->
  <!--</el-header>-->
  <!--<el-main>-->
  <!--<el-form :model="netWorkData" ref="formData">-->
  <!--<el-form-item label="IP地址" :label-width="formLabelWidth">-->
  <!--<el-input v-model="netWorkData.ip"></el-input>-->
  <!--</el-form-item>-->
  <!--<el-form-item label="子网掩码" prop="subnetMask" :label-width="formLabelWidth">-->
  <!--<el-input v-model="netWorkData.subnetMask"></el-input>-->
  <!--</el-form-item>-->
  <!--<el-form-item label="网关" prop="gateway" :label-width="formLabelWidth">-->
  <!--<el-input v-model="netWorkData.gateway"></el-input>-->
  <!--</el-form-item>-->
  <!--<el-form-item label="DNS配置" prop="mainDNS" :label-width="formLabelWidth">-->
  <!--<el-input v-model="netWorkData.mainDNS"></el-input>-->
  <!--</el-form-item>-->
  <!--<el-form-item style="text-align: right">-->
  <!--<el-button type="primary" size="small" @click="updateNetWorkConf">应用</el-button>-->
  <!--</el-form-item>-->
  <!--</el-form>-->
  <!--</el-main>-->
  <!--</el-container>-->
  <!--<el-container>-->
  <!--<el-header>-->
  <!--<el-col :span="24">AllSmart地址配置</el-col>-->
  <!--</el-header>-->
  <!--<el-main>-->
  <!--<el-form :model="smartData" ref="formData">-->
  <!--<el-form-item label="IP地址" :label-width="formLabelWidth">-->
  <!--<el-input v-model="smartData.ip"></el-input>-->
  <!--</el-form-item>-->
  <!--<el-form-item label="端口" prop="label" :label-width="formLabelWidth">-->
  <!--<el-input v-model="smartData.port"></el-input>-->
  <!--</el-form-item>-->
  <!--<el-form-item label="用户名" prop="label" :label-width="formLabelWidth">-->
  <!--<el-input v-model="smartData.username"></el-input>-->
  <!--</el-form-item>-->
  <!--<el-form-item label="密码" prop="label" :label-width="formLabelWidth">-->
  <!--<el-input v-model="smartData.password"></el-input>-->
  <!--</el-form-item>-->
  <!--<el-form-item style="text-align: right">-->
  <!--<el-button type="primary" size="small" @click="updateSmartConf">应用</el-button>-->
  <!--</el-form-item>-->
  <!--</el-form>-->
  <!--</el-main>-->
  <!--</el-container>-->
</template>

<script>
  import Sconfig from '@/api/sconfig'
  export default {
    components: {},
    data() {
      return {
        commonData: {
          name: '',
          id: '',
          corpId: ''
//          workPattern: 'NORMAL',
//          ntpaddress: ''
        },
        netWorkData: {
          ip: '',
          subnetMask: '',
          gateway: '',
          mainDNS: '',
          assistantDNS: ''
        },
        smartData: {
          ip: '',
          port: '',
          username: '',
          password: ''
        },
        formLabelWidth: '200px'
      }
    },
    methods: {
      getSystemConf() {
        Sconfig.getSystemConf().then(configList =>{
//          console.log(configList)
          this.commonData = configList  // 常规配置
//          this.netWorkData = configList.findNetWorkConfig //网络配置
//          this.smartData = configList.findAllsmartConfig  //allsmart地址配置
        }).catch(error =>{
          console.log(error)
        })
      },
      updateCommonConf() {
        Sconfig.updateCommonConf(this.commonData).then(response=>{
          console.log(response)
          this.initPage()
          this.$message({
            type: 'success',
            message: '常规配置更新成功'
          })
        }).catch(error=> {
          console.log(error)
        })
      },
      updateNetWorkConf() {
        Sconfig.updateNetWorkConf(this.netWorkData).then(response=>{
          console.log(response)
          this.initPage()
          this.$message({
            type: 'success',
            message: '本地网络配置更新成功'
          })
        }).catch(error=>{
          console.log(error)
        })
      },
      updateSmartConf() {
        Sconfig.updateSmart(this.smartData).then(response => {
          console.log(response)
          this.initPage()
          this.$message({
            type: 'success',
            message: 'allSmart地址配置更新成功'
          })
        }).catch(error => {
          console.log(error)
        })
      },
      initPage() {
        this.getSystemConf()
      }
    },
    created() {
      this.initPage()
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-container{
  width: 75%;
  margin: 0 auto;
}
</style>
