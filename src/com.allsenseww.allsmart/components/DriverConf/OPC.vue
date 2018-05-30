<template>
  <el-form :model="formConf" :inline="true" class="driver-conf-container">
    <el-form-item label="服务器" :label-width="formLabelWidth">
      <el-input v-model="formConf.host" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="域" :label-width="formLabelWidth">
      <el-input v-model="formConf.domain" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="CLSID" :label-width="formLabelWidth" :title="formConf.clsid">
      <el-input v-model="formConf.clsid" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="用户名" :label-width="formLabelWidth">
      <el-input v-model="formConf.user" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="密码" :label-width="formLabelWidth">
      <el-input v-model="formConf.password" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  import Driver from '@/api/driver'
  export default {
    components: {},
    data: function() {
      return {
        formLabelWidth: '80px',
        formConf: {
          type: 'OPC',
          host: '10.0.0.118',
          domain: 'WORKGROUP',
          clsid: 'F8582CF2-88FB-11D0-B850-00C0F0104305',
          user: 'Administrator',
          password: '940513'
        },
        isDriverConf: false
      }
    },
    methods: {
      driverConf(nDriver) {
        console.log(nDriver)
        this.isDriverConf = true
      }
    },
    created () {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .driver-conf-container{
    .el-input{
      width: 160px;
    }
  }
</style>
