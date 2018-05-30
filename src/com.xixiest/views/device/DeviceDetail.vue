<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!--<el-tab-pane label="采集点列表" name="first" style="height: 88vh;">-->
        <!--<data-point-list></data-point-list>-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="采集点列表" name="second" style="height: 88vh;">
        <real-time-data v-if="activeName === 'second'"></real-time-data>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Device from '@/api/device'
  import DataPointList from './DataPointList'
  import RealTimeData from './RealTimeData'
  export default {
    components: { DataPointList, RealTimeData },
    data: function() {
      return {
        activeName: 'second'
      }
    },
    methods: {
      handleClick(tab, event) {
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/variables.scss';
  @import '../../styles/mixin.scss';
  .app-container {
    /*margin-left: 10px;*/
    height: 88vh;
    overflow-y: hidden;
  }
  .toolbar {
    @include al-toolbar;
    &.topbar {
      padding-bottom: 0;
      /*margin: 0 0 10px 0;*/
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
</style>
