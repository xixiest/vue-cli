<template>
  <el-container class="app-container" style="height: 100%;">
    <el-header class="toolbar topbar">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="filterStr" placeholder="请输入关键字" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDeviceList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDevice()" type="primary">添加</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table v-loading="loading" :data="tableParam.tableData" border highlight-current-row
                @selection-change="handleSelected">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="#" width="65"></el-table-column>
        <el-table-column prop="id" label="设备编号" width="155"></el-table-column>
        <el-table-column prop="name" label="设备名称">
          <template slot-scope="scope">
            <a @click="deviceDetail(scope.row.sampleFrequency,scope.row.id)"> {{scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="设备型号"></el-table-column>
        <el-table-column prop="deviceState" label="设备状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.deviceState ==='START'?'success':'danger'" size="small" v-text="scope.row.deviceState"></el-tag>
          </template>
        </el-table-column>
        <!--<el-table-column prop="createTime" label="添加时间" sortable min-width="150px">-->
          <!--<template slot-scope="scope">-->
            <!--<i class="el-icon-time"></i>-->
            <!--<span style="margin-left: 2px"></span>-->
            <!--{{ scope.row.createTime | datetimeFormat }}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="操作" min-width="160px">
          <template slot-scope="scope">
            <el-button @click="editDevice(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deviceDetail(scope.row.sampleFrequency,scope.row.id)" type="text" size="small">设备详情</el-button>
            <el-button @click="deleteDevice(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="toolbar">
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-button type="primary" size="small" @click="startDevice" :disabled="isAbled">启用</el-button>
        <el-button type="primary" size="small" @click="stopDevice" :disabled="isAbled">停止</el-button>
        <!--<el-button type="danger" size="small" @click="deleteDevice" :disabled="isAbled">删除</el-button>-->
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light" align="right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableParam.currentPage"
          :page-sizes="tableParam.pageSizes"
          :page-size="tableParam.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="tableParam.total">
        </el-pagination>
      </div></el-col>
    </el-footer>
    <device-form ref="dialog" @initExcute="refresh"></device-form>
  </el-container>
</template>

<script>
  import Device from '@/api/device'
  import DeviceForm from './DeviceForm'
  import Cookie from 'js-cookie'
  export default {
    components: { DeviceForm },
    data: function() {
      return {
        danger: 'danger',
        info: 'info',
        tableParam: {
          tableData: [],
          total: 0,
          pageSize: 5,
          currentPage: 1,
          pageSizes: [5, 10, 15, 20]
        },
        multipleSelection: [],
        deviceList: [],
        loading: false,
        filterStr: '',
        isAbled: true,
        isStop: true
      }
    },
    methods: {
      getDeviceList() {
        Device.getDeviceList(this.filterStr).then(deviceList => {
//          console.log(deviceList)
          this.deviceList = deviceList
          Device.setTableParam(this.tableParam, deviceList,this.tableParam.pageSize,this.tableParam.currentPage)
        }).catch(error => {
          console.log(error)
        })
      },
      addDevice() {
        const formParam = Object.assign({ show: true }, { isAdd: true })
        this.$refs.dialog.dialogFormState(formParam)
      },
      editDevice(param) {
        console.log(param.deviceCategory)
        Device.getDeviceOne(param.name).then(deviceOne => {
          const formParam = Object.assign({ show: true }, { isAdd: false }, {deviceType:param.deviceCategory}, deviceOne)
          this.$refs.dialog.dialogFormState(formParam)
        }).catch(error => {
          console.log(error)
        })
      },
      deviceDetail(dSampleRate, dId) {
        localStorage.setItem('sampleRate', dSampleRate)
        this.$router.push({ name: '设备详情', params: {id: dId}})
      },
      deleteDevice(param) {
          this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
            Device.deleteDevice(param).then(response=>{
              this.initPage()
            }).catch(error => {
              console.log(error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      startDevice() {
        Device.startDevice(this.multipleSelection).then(response=>{
          this.initPage()
        }).catch(error=>{
          console.log(error)
        })
      },
      stopDevice() {
        Device.stopDevice(this.multipleSelection).then(response=>{
          this.initPage()
        }).catch(error=>{
          console.log(error)
        })
      },
      initPage() {
        this.getDeviceList()
      },
      refresh() {
        /*todo*/
        this.tableParam.currentPage = parseInt(Cookie.get('currentPage'))
        this.getDeviceList()
      },
      handleSizeChange(pageS) {
        Device.setTableParam(this.tableParam, this.deviceList, pageS)
      },
      handleCurrentChange(pageC) {
        /*todo*/
        let pageS = this.tableParam.pageSize
        Cookie.set('currentPage', pageC)
        Device.setTableParam(this.tableParam, this.deviceList, pageS, pageC)
      },
      handleSelected(param) {
        if(param.length === 0){
          this.isAbled = true
        }else{
          this.isAbled = false
        }
        this.multipleSelection = param.map(el => el.id)
      }
    },
    created () {
      this.initPage()
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
