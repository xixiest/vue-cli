<template>
  <div>
    <!--基础配置-->
    <el-dialog title="采集点配置" :visible.sync="baseFormVisible" width="580px">
      <el-form :model="baseForm">
        <el-form-item label="采集点名称" :label-width="formLabelWidth">
          <el-input v-model="baseForm.label" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上报类型" :label-width="formLabelWidth">
          <el-select v-model="baseForm.aggType" placeholder="请选择活动区域">
            <el-option label="MEAN" value="MEAN"></el-option>
            <el-option label="MAX" value="MAX"></el-option>
            <el-option label="MIN" value="MIN"></el-option>
            <el-option label="LATEST" value="LATEST"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否采集" prop="acquisition" :label-width="formLabelWidth">
          <el-switch v-model="baseForm.acquisition"></el-switch>
        </el-form-item>
        <div v-if="pointType==='AI'||pointType==='AO'">
          <el-form-item label="单位" :label-width="formLabelWidth">
            <el-input v-model="baseForm.unit" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="矫正参数k" :label-width="formLabelWidth">
            <el-input v-model="baseForm.k" auto-complete="off" type="number"></el-input>
          </el-form-item>
          <el-form-item label="矫正参数b" :label-width="formLabelWidth">
            <el-input v-model="baseForm.b" auto-complete="off" type="number"></el-input>
          </el-form-item>
        </div>
        <div v-if="pointType==='DI'||pointType==='DO'">
          <el-form-item label="onName" prop="" :label-width="formLabelWidth">
            <el-input v-model="baseForm.onName"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="offName" prop="" :label-width="formLabelWidth">
            <el-input v-model="baseForm.offName"  auto-complete="off"></el-input>
          </el-form-item>
        </div>
        <div v-if="pointType==='CI'||pointType==='CO'">
          <el-form-item label="范围" prop="" :label-width="formLabelWidth">
            <el-input v-model="baseForm.range" type="number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="基准值" prop="" :label-width="formLabelWidth">
            <el-input v-model="baseForm.datum" type="number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="跳变次数" :label-width="formLabelWidth">
            <el-input v-model="baseForm.jumpCount" type="number" auto-complete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="baseFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePointConf">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import Device from '@/api/device'
  export default {
    data: function() {
      return {
        baseFormVisible: false,
        pointType: '',
        baseForm: {
          name: '',
          label: '',
          aggType: '',
          unit: '',
          acquisition: false,
          k: '',
          b: '',
          range: '',
          datum: '',
          jumpCount: '',
          onName: '',
          offName: ''
        },
        formLabelWidth: '120px',
      }
    },
    methods: {
      baseFormState(param) {
        console.log(param)
        this.baseFormVisible = true
        this.baseForm = param
        this.pointType = param.dataPointType  //获取采集点类型以作判断
      },
      updatePointConf() {
//        console.log(this.baseForm)
        Device.updatePointConf(this.baseForm).then(response => {
          this.$message({
            message: '采集点配置成功',
            type: 'success'
          })
          this.baseFormVisible = false
          this.$emit('initExcute', true)
        }).catch(error=> {
          console.log(error)
        })
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/mixin.scss";
  .alarm-input-box{
    margin-bottom: 10px;
  }
  .line{
    text-align: center;
  }
</style>
