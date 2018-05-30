<template>
  <div>
    <!--告警配置-->
    <el-dialog title="告警配置" :visible.sync="alarmFormVisible" width="580px">
      <el-form :model="alarmForm" ref="alarmForm">
        <el-form-item label="是否告警" prop="enable" :label-width="formLabelWidth">
          <el-switch v-model="alarmForm.enable"></el-switch>
        </el-form-item>
        <el-form-item label="延时告警时间" :label-width="formLabelWidth">
          <el-input v-model="alarmForm.delaySeconds" type="number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="DPType === 'DI' || DPType === 'DO'" label="告警状态配置" :label-width="formLabelWidth">
          <el-col :span="6">
            <el-select v-model="DIConfigVal" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in DIConfig"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-select v-model="DIConfigLevel" placeholder="请选择" style="width: 100%;">
              <el-option label="普通告警" value="HIGH"></el-option>
              <el-option label="严重告警" value="OVER_HIGH"></el-option>
            </el-select>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-input v-model="DIAlarmLevel.message"  auto-complete="off" placeholder="请输入告警提示"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item v-else label="告警级别配置" :label-width="formLabelWidth">
          <el-row class="alarm-input-box">
            <el-col :span="3">
              <el-tag type="danger" size="mini">过高</el-tag>
            </el-col>
            <el-col :span="8">
              <el-input v-model="alarmLevel.OVER_HIGH.min" type="number" auto-complete="off"></el-input>
            </el-col>
            <el-col :span="12" :offset="1">
              <el-input v-model="alarmLevel.OVER_HIGH.message" placeholder="请输入告警提示"></el-input>
            </el-col>
          </el-row>
          <el-row class="alarm-input-box">
            <el-col :span="3">
              <el-tag type="warning" size="mini">高</el-tag>
            </el-col>
            <el-col :span="8">
              <el-input v-model="alarmLevel.HIGH.min" type="number" auto-complete="off"></el-input>
            </el-col>
            <el-col :span="12" :offset="1">
              <el-input v-model="alarmLevel.HIGH.message" placeholder="请输入告警提示"></el-input>
            </el-col>
          </el-row>
          <el-row class="alarm-input-box">
            <el-col :span="3">
              <el-tag type="warning" size="mini">低</el-tag>
            </el-col>
            <el-col :span="8">
              <el-input v-model="alarmLevel.LOW.max" type="number" auto-complete="off"></el-input>
            </el-col>
            <el-col :span="12" :offset="1">
              <el-input v-model="alarmLevel.LOW.message" placeholder="请输入告警提示"></el-input>
            </el-col>
          </el-row>
          <el-row class="alarm-input-box">
            <el-col :span="3">
              <el-tag type="danger" size="mini">过低</el-tag>
            </el-col>
            <el-col :span="8">
              <el-input v-model="alarmLevel.OVER_LOW.max" type="number" auto-complete="off"></el-input>
            </el-col>
            <el-col :span="12" :offset="1">
              <el-input v-model="alarmLevel.OVER_LOW.message" placeholder="请输入告警提示"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alarmFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateAlarmConf">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import Device from '@/api/device'
  export default {
    data: function() {
      return {
        alarmFormVisible: false,
        formLabelWidth: '120px',
        DPType: '',
        alarmForm: {
          enable: false,
          delaySeconds: ''
        },
        alarmLevel: {
          OVER_LOW: {
            message: '',
            max: ''
          },
          LOW: {
            message: '',
            max: '',
            min: ''
          },
          HIGH: {
            message: '',
            max: '',
            min: ''
          },
          OVER_HIGH: {
            message: '',
            min: ''
          }
        },
        DIAlarmLevel: { // 传给后台使用
          max: 1,
          min: 1,
          message: ''
        },
        DIConfigVal: 1, // DI点告警状态
        DIConfigLevel: '', // DI点告警级别
        DIConfig: [{
          value: 0,
          label: 'on->off'
        }, {
          value: 1,
          label: 'off->on'
        }]
      }
    },
    methods: {
      /*1.过高不传最大值
      * 2.过低不传最小值*/
      alarmFormState(param) {
        this.alarmFormVisible = true
        this.DPType = param.dataPointType
        const alarmConf = param.alarmConfig
        if(alarmConf) {  // 告警配置是否为null
          this.alarmForm = param.alarmConfig
          if (this.DPType === 'DI' || this.DPType === 'DO') {
            console.log(this.alarmForm)
            this.DIConfigVal = alarmConf.alarmLevelConfMap.HIGH.max
            this.DIAlarmLevel = alarmConf.alarmLevelConfMap.HIGH
          } else {
            const alarmLevelVal = param.alarmConfig.alarmLevelConfMap
            if(alarmLevelVal) {
              console.log(alarmLevelVal)
              if (alarmLevelVal.HIGH) {
                this.alarmLevel.HIGH = alarmLevelVal.HIGH
              } else { // 取消模态框表单缓存数据
                this.alarmLevel.HIGH = {}
              }
              if (alarmLevelVal.LOW) {
                this.alarmLevel.LOW = alarmLevelVal.LOW
              } else {
                this.alarmLevel.LOW = {}
              }
              if (alarmLevelVal.OVER_HIGH) {
                this.alarmLevel.OVER_HIGH.min = alarmLevelVal.OVER_HIGH.min
              } else {
                this.alarmLevel.OVER_HIGH = {}
              }
              if (alarmLevelVal.OVER_LOW) {
                this.alarmLevel.OVER_LOW.max = alarmLevelVal.OVER_LOW.max
              } else {
                this.alarmLevel.OVER_LOW = {}
              }
              this.alarmForm.alarmLevel = alarmLevelVal
            }
          }
        }
      },
      updateAlarmConf() {
        if(this.DPType === 'DI' || this.DPType === 'DO'){
          console.log(this.DIConfigLevel)
          this.DIAlarmLevel.max = this.DIConfigVal
          this.DIAlarmLevel.min = this.DIConfigVal
//          console.log(this.DIAlarmLevel)
          if (this.DIConfigLevel === 'HIGH') {
            this.alarmForm.alarmLevelConfMap.HIGH = this.DIAlarmLevel
          }
          if (this.DIConfigLevel === 'OVER_HIGH') {
            this.alarmForm.alarmLevelConfMap.OVER_HIGH = this.DIAlarmLevel
          }
        } else {
          this.alarmLevel.LOW.min = this.alarmLevel.OVER_LOW.max
          this.alarmLevel.HIGH.max = this.alarmLevel.OVER_HIGH.min
          this.alarmForm.alarmLevelConfMap = this.alarmLevel
        }
        console.log(this.alarmLevel)
        Device.updateAlarmConf(this.alarmForm).then(response => {
          this.$message({
            message: '告警配置更新成功',
              type: 'success'
          })
          this.alarmFormVisible = false
          this.$emit('initExcute', true)
        })
      },
      resetForm(formName) {
//        this.alarmFormVisible = false
        this.$refs[formName].resetFields()
      }
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
