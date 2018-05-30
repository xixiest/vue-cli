<template>
  <el-form :model="formConf" :inline="true" class="driver-conf-container">
    <el-form-item label="端口号" :label-width="formLabelWidth">
      <el-input v-model="formConf.port" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="超时设置" :label-width="formLabelWidth">
      <el-input v-model="formConf.timeOut" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="ip地址" :label-width="formLabelWidth">
      <el-input v-model="formConf.ip" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="通信地址" :label-width="formLabelWidth">
      <el-input v-model="formConf.slaveId" auto-complete="off"></el-input>
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
          type: 'UDP_MODBUS',
          port: '',
          timeOut: '',
          ip: '',
          slaveId: ''
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
