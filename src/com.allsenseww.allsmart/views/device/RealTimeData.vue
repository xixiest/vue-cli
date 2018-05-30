<template>
  <el-container style="height: 75vh;">
    <el-main>
      <el-col :span="24" align="right" style="margin-bottom: 10px"><el-tag type="primary">{{this.currentTime}}</el-tag></el-col>
      <el-table v-loading="loading" :data="tableParam.tableData" border highlight-current-row>
        <el-table-column  type="index" width="60"></el-table-column>
        <el-table-column prop="name" label="采集点名称"></el-table-column>
        <el-table-column prop="type" label="采集点类型"></el-table-column>
        <el-table-column prop="label" label="采集点昵称"></el-table-column>
        <el-table-column prop="metric" label="采集指标"></el-table-column>
        <el-table-column prop="value" :formatter="booleanTrans" label="实时数据"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
  import Device from '@/api/device'
  import DataPointForm from './AlarmConfForm'
  import moment from 'moment'
  export default {
    components: { DataPointForm },
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
        currentTime: '',
        filterStr: '',
        reloadTimeData: '',
        sampleRate: 1000 // 数据采集频率
      }
    },
    methods: {
      getTimeDataList() {
        this.currentTime = moment().format('HH:mm:ss')
        const dId = this.$route.params.id
        Device.getDataPointVal(dId).then(dataPoint => {
//          console.log(dataPoint)
          this.tableParam.tableData = dataPoint
        }).catch(error => {
          clearInterval(this.reloadTimeData)
          console.log(error)
        })
      },
      initPage() {
        this.getTimeDataList()
        const sampleRate = localStorage.getItem('sampleRate')
        console.log(sampleRate)
        this.reloadTimeData = setInterval(() => this.getTimeDataList(), sampleRate)
      },
      booleanTrans(row, column, cellValue) {
        if(cellValue !== null){
          if(cellValue === true){
            return 'true'
          } else if(cellValue === false){
            return 'false'
          } else {
            return cellValue
          }
        }
      }
    },
    created () {
      this.initPage()
    },
    destroyed () {
      clearInterval(this.reloadTimeData)
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
