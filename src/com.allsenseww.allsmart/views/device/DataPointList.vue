<template>
  <el-container style="height: 75vh;">
    <el-main>
      <el-table v-loading="loading" :data="tableParam.tableData" border highlight-current-row>
        <el-table-column  type="index" width="60"></el-table-column>
        <el-table-column prop="dataPointClusterId" label="设备ID" width="130px"></el-table-column>
        <el-table-column prop="name" label="接口名称" width="130px"></el-table-column>
        <el-table-column prop="type" label="采集点类型"></el-table-column>
        <el-table-column prop="label" label="采集点名称"></el-table-column>
        <el-table-column prop="acquisition" :formatter="booleanTrans" label="是否采集"></el-table-column>
        <el-table-column prop="alarmConfig.enable" :formatter="booleanTrans" label="是否告警"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button @click="showBaseConf(scope.row)" type="text" size="small">基础配置</el-button>
            <el-button @click="showAlarmConf(scope.row)" type="text" size="small">告警配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <base-conf-form ref="baseForm" @initExcute="initPage"></base-conf-form>
    <alarm-conf-form ref="alarmForm" @initExcute="initPage"></alarm-conf-form>
  </el-container>
</template>

<script>
  import Device from '@/api/device'
  import BaseConfForm from './BaseConfForm'
  import AlarmConfForm from './AlarmConfForm'
  export default {
    components: { AlarmConfForm, BaseConfForm },
    data: function() {
      return {
        timeDataDialog: false,
        timeData: [],
        tableParam: {
          tableData: [],
          total: 0,
          pageSize: 10,
          currentPage: 0,
          pageSizes: [8, 13, 15, 20]
        },
        deviceList: [],
        loading: false,
        filterStr: '',
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          acquisition: true
        },
        formLabelWidth: '120px',
        activeName: 'first'
      }
    },
    methods: {
      getDataPointList() {
        const dId = this.$route.params.id
        console.log(dId,1)
        Device.getDataPointList(dId).then(dataPoint => {
          console.log(dataPoint)
          this.tableParam.tableData = dataPoint
        }).catch(error => {
          console.log(error)
        })
      },
      showBaseConf(param) {
        this.$refs.baseForm.baseFormState(param)
      },
      showAlarmConf(param) {
        this.$refs.alarmForm.alarmFormState(param)
      },
      initPage() {
        this.getDataPointOne()
      },
      booleanTrans(row, column,cellValue) {
        if(cellValue !== null){
          if(cellValue === true){
            return 'true'
          }
          if(cellValue === false){
            return 'false'
          }
        }
      }
    },
    created () {
      this.getDataPointList()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
