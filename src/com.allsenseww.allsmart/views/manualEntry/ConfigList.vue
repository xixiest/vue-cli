<template>
  <el-container class="app-container" style="height: 100%;">
    <el-header class="toolbar topbar">
      <el-form :inline="true">
        <el-form-item>
          <el-button @click="templetFormShow()" type="primary">添加</el-button>
          <el-button @click="useFormShow()" type="primary">备用页面</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table v-loading="loading" :data="tableParam.tableData" border highlight-current-row>
        <el-table-column
          prop="name"
          label="模板名称">
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="name"-->
        <!--label="模板自定义字段">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="enable"
          label="当前状态"
          :formatter="stateSwitch" sortable>
        </el-table-column>
        <el-table-column
          prop="lastModifiedUser"
          label="最近编辑人">
        </el-table-column>
        <el-table-column
          prop="lastModifiedTime"
          label="最近编辑时间" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.lastModifiedTime | datetimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="templetFormShow('isEdit',scope.row)"><i class="el-icon-edit"></i></el-button>
            <el-button type="text" size="small" @click="deleteTemplet(scope.row)"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="toolbar">
      <!--<el-col :span="12"><div class="grid-content bg-purple">-->
        <!--<el-button type="primary" size="small" @click="startDevice" :disabled="isAbled">启用</el-button>-->
        <!--<el-button type="primary" size="small" @click="stopDevice" :disabled="isAbled">停止</el-button>-->
        <!--<el-button type="danger" size="small" @click="deleteDevice" :disabled="isAbled">删除</el-button>-->
      <!--</div></el-col>-->
      <!--<el-col :span="24"><div class="grid-content bg-purple-light" align="right">-->
        <!--<el-pagination-->
          <!--@size-change="handleSizeChange"-->
          <!--@current-change="handleCurrentChange"-->
          <!--:current-page="tableParam.currentPage"-->
          <!--:page-sizes="tableParam.pageSizes"-->
          <!--:page-size="tableParam.pageSizes[0]"-->
          <!--layout="total, sizes, prev, pager, next"-->
          <!--:total="tableParam.total">-->
        <!--</el-pagination>-->
      <!--</div></el-col>-->
    </el-footer>
    <config-form ref="configForm" @initExcute="initPage"></config-form>
  </el-container>
</template>

<script>
  import ConfigForm from './ConfigForm.vue'
  export default {
    components: { ConfigForm },
    data: function() {
      return {
        danger: 'danger',
        info: 'info',
        tableParam: {
          tableData: [{
            name: '默认模板',
            label: '默认模板',
            lastModifiedUser: 'USER',
            lastModifiedTime: 1517796493378,
            config: {
              items: [
              {
                id: 1,
                name: "工单模板",
                label: "workItemTemplateId",
                type: "single",
                config: null,
                lastModifiedUser: 1,
                source: "SYS",
                lastModifiedTime: 1517307181700,
                isRequired: true
              },
              {
                id: 2,
                name: "工单标题",
                label: "label",
                type: "input",
                config: null,
                lastModifiedUser: 1,
                source: "SYS",
                lastModifiedTime: 1517307181710,
                isRequired: true
              },
              {
                id: 4,
                name: "工单优先级",
                label: "priority",
                type: "radio",
                config: null,
                lastModifiedUser: 1,
                source: "SYS",
                lastModifiedTime: 1517307181730,
                isRequired: true
              },
              {
                id: 5,
                name: "工单受理组",
                label: "ownerGroupId",
                type: "userGroup",
                config: null,
                lastModifiedUser: 1,
                source: "SYS",
                lastModifiedTime: 1517307181740,
                isRequired: true
              },
              {
                id: 6,
                name: "工单受理人",
                label: "ownerId",
                type: "user",
                config: null,
                lastModifiedUser: 1,
                source: "SYS",
                lastModifiedTime: 1517307181750,
                isRequired: true
              },
              {
                id: 48,
                name: "上传附件",
                label: "attachmentList",
                type: "file",
                config: null,
                lastModifiedUser: 1,
                source: "SYS",
                lastModifiedTime: 1517552052490,
                isRequired: true
              },
              {
                id: 50,
                name: "手机号",
                label: "手机号",
                type: "input",
                config: {
                  type: "single"
                },
                lastModifiedUser: 1,
                source: "USER",
                lastModifiedTime: 1517629363701
              },
              {
                id: 52,
                name: "工单内容",
                label: "工单内容",
                type: "input",
                config: {
                  type: "single"
                },
                lastModifiedUser: 1,
                source: "USER",
                lastModifiedTime: 1518169878369
              },
              {
                id: 53,
                name: "时间",
                label: "时间",
                type: "timePicker",
                config: {
                  type: "single",
                  items: [ ]
                },
                lastModifiedUser: 1,
                source: "USER",
                lastModifiedTime: 1517796493378
              }
            ]},
            enable: true
          }],
          total: 0,
          pageSize: 10,
          currentPage: 0,
          pageSizes: [8, 13, 15, 20]
        },
        multipleSelection: [],
        loading: false
      }
    },
    methods: {
      handleSizeChange() {

      },
      handleCurrentChange() {

      },
      addDevice() {
        this.$refs.dialog.dialogFormState()
      },
      useFormShow() {
        this.$router.push('/manualEntry/UsePage')
      },
      templetFormShow (state, param) {
        this.$refs.configForm.diaStateSwitch(state, param)
      },
      stateSwitch(row,column,cellVal) {
        if (cellVal === true) {
          return '启用'
        }
        if (cellVal === false) {
          return '停用'
        }
      },
      initPage() {
      },
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
