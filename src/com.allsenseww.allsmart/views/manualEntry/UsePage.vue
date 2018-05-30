<template>
  <el-container class="app-container">
    <el-row class="btn-group-bar">
      <el-col :span="9">
        <div class="grid-content bg-purple" align="right">
          <el-button @click="useFormShow('数据模板')">数据录入</el-button>
        </div>
      </el-col>
      <el-col :span="8" :offset="3">
        <div class="grid-content bg-purple-light">
          <el-button @click="useFormShow('数据模板')">数据录入</el-button>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-purple" align="right">
          <el-button @click="useFormShow('默认模板')">数据录入</el-button>
        </div>
      </el-col>
      <el-col :span="8" :offset="3">
        <div class="grid-content bg-purple-light">
          <el-button @click="useFormShow('默认模板')">数据录入</el-button>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      useFormShow(param) {
        this.$router.push({path: `/manualEntry/UseForm/${param}`})
      },
      initPage() {
      }
    },
    created() {
      this.initPage()
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .btn-group-bar{
    width: 100%;
    margin: 100px 0;
    .el-col {
      margin-bottom: 20px;
    }
    .el-button{

    }
  }
</style>
