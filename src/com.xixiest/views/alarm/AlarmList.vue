<template>
  <el-container class="app-container">
    <el-header class="toolbar topbar">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="filterObj.label" placeholder="请输入告警点名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filterObj.level" placeholder="请选择告警级别" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="rangeTime"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getAlarmList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="tableParam.tableData" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="label" label="告警点名称"></el-table-column>
        <el-table-column prop="level" label="告警级别"></el-table-column>
        <el-table-column prop="source.conf.predictorType" label="告警类型"></el-table-column>
        <el-table-column prop="value" label="告警数值"></el-table-column>
        <el-table-column prop="message" label="告警信息" show-overflow-tooltip></el-table-column>
        <el-table-column prop="timestamp" label="告警产生时间" sortable show-overflow-tooltip min-width="150px">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 2px">{{ scope.row.timestamp | datetimeFormat }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="toolbar" align="right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableParam.currentPage"
        :page-sizes="tableParam.pageSizes"
        :page-size="tableParam.pageSizes[0]"
        layout="total, sizes, prev, pager, next"
        :total="tableParam.total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
  import Alarm from '@/api/alarm'
  import moment from 'moment'
  export default {
    components: {},
    data() {
      return {
        tableParam: {
          tableData: [],
          total: 0,
          pageSize: 10,
          currentPage: 1,
          pageSizes: [10, 13, 15, 20]
        },
        alarmList: [],
        filterObj:{
          name: '',
          label: '',
          startTime: '',
          endTime: '',
          level: ''
        },
        rangeTime: '',
        options: [{
          value: 'HIGH',
          label: '高'
        },{
          value: 'LOW',
          label: '低'
        },{
          value: 'OVER_HIGH',
          label: '过高'
        }, {
          value: 'OVER_LOW',
          label: '过低'
        },{
          value: 'NORMAL',
          label: '正常'
        }],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = moment().format("YYYY-MM-DD HH:mm")
              const start = moment().subtract(7, 'days')
              console.log(end)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = moment().format("YYYY-MM-DD HH:mm")
              const start = moment().subtract(30, 'days')
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = moment().format("YYYY-MM-DD HH:mm")
              const start = moment().subtract(90, 'days')
              picker.$emit('pick', [start, end])
            }
          }]
        },
      }
    },
    methods: {
      getAlarmList: function () {
        const rangeMS = Alarm.cutRangeTime(this.rangeTime)
        if (rangeMS) {
          this.filterObj.startTime = rangeMS[0]
          this.filterObj.endTime = rangeMS[1]
        }
        Alarm.getAlarmList(this.filterObj).then(alarmList => {
//          console.log(alarmList)
          Alarm.setTableParam(this.tableParam, alarmList)
          this.alarmList = alarmList
        })
      },
      handleSizeChange(pageS) {
        Alarm.setTableParam(this.tableParam, this.alarmList, pageS)
      },
      handleCurrentChange(pageC) {
        let pageS = this.tableParam.pageSize
        Alarm.setTableParam(this.tableParam, this.alarmList, pageS, pageC)
      }
    },
    created() {
      this.getAlarmList()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/variables.scss';
  @import '../../styles/mixin.scss';
  .app-container {
    /*margin-left: 10px;*/
    height: 88vh;
  }
  .toolbar {
    @include al-toolbar;
    &.topbar {
      padding-bottom: 0;
    }
  }
  .el-container {
    padding-left: 10px;
  }
  .el-main {
    margin: 10px 0;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-input{
    width: 150px;
  }
  .el-select{
    width: 160px;
  }
  .el-date-editor .el-range-input{
    width: 44%;
  }
  </style>

