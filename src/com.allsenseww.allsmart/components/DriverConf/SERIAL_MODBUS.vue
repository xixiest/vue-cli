<template>
  <el-form :model="formConf" :inline="true" class="driver-conf-container">
    <el-form-item  label="端口名称" :label-width="formLabelWidth">
      <el-input v-model="formConf.portName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="波特率" :label-width="formLabelWidth">
      <el-input v-model="formConf.baudRate" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="数据位" :label-width="formLabelWidth">
      <el-input v-model="formConf.dataBits" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="停止位" :label-width="formLabelWidth">
      <el-input v-model="formConf.stopBit" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="通信地址" :label-width="formLabelWidth">
      <el-input v-model="formConf.slaveId" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="校验位" :label-width="formLabelWidth">
      <el-select v-model="formConf.parity" placeholder="请选择">
        <el-option
          v-for="item in optionsParity"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item  label="编码" :label-width="formLabelWidth">
      <el-select v-model="formConf.encoding" placeholder="请选择">
        <el-option
          v-for="item in optionsEncoding"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
          type: 'SERIAL_MODBUS',
          portName: '',
          baudRate: '9600',
          dataBits: '8',
          stopBit: '1',
          slaveId: '1',
          parity: 'none',
          encoding: 'rtu'
        },
        optionsParity: [{
          label: '奇校验',
          value: 'odd'
        },
          {
            label: '偶校验',
            value: 'even'
          },
          {
            label: '无',
            value: 'none'
          }
        ],
        optionsEncoding: [
          {
            label: 'ascii',
            value: 'ascii'
          },
          {
            label: 'rtu',
            value: 'rtu'
          },
          {
            label: 'bin',
            value: 'bin'
          }
        ],
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
    .el-select{
      width: 160px;
    }
  }
</style>
