<template>
  <el-form :model="formConf" :inline="true" class="driver-conf-container">
    <el-form-item label="URL" :label-width="formLabelWidth">
      <el-input v-model="formConf.url" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="驱动名" :label-width="formLabelWidth">
      <el-input v-model="formConf.driverClassName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="用户名" :label-width="formLabelWidth">
      <el-input v-model="formConf.username" auto-complete="off"></el-input>
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
          type: 'JDBC',
          url: '',
          username: 'Administrator',
          password: '940513',
          driverClassName: ''
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
