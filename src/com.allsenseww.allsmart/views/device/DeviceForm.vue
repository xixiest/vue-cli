<template>
  <el-row>
    <el-dialog :title="isAdd?'新增设备':'编辑设备'" :visible.sync="addFormDialog" width="680px" top="8vh">
      <el-form :model="formData" ref="formData" :rules="rules" status-icon>
        <el-form-item v-if="isAdd" label="设备类型" :label-width="formLabelWidth">
          <el-radio-group v-model="deviceCategory" @change="showDriverType">
            <!--<el-radio label="VIRTUAL_DEVICE" border>虚拟设备</el-radio>-->
            <el-radio label="ACQUISITION_DEVICE" border>智能设备</el-radio>
            <el-radio label="SMART_DEVICE" border>采集设备</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="isAdd&&isDriverType" label="驱动名称" prop="driverName" :label-width="formLabelWidth">
          <el-select v-model="driverName" placeholder="请选择驱动" @change="showDriverConf" style="width: 100%">
            <el-option v-for="driverType in driverLists" :label="driverType.name" :value="driverType.name" :key="driverType.name"></el-option>
          </el-select>
          <div v-if="isDriverConf" class="components-bar">
            <component v-bind:is="driverFormName" ref="driverConfForm"></component>
          </div>
        </el-form-item>
        <el-form-item v-if="isAdd" label="设备名称" prop="label" :label-width="formLabelWidth">
          <el-input v-model="formData.name" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item v-else label="设备名称" prop="label" :label-width="formLabelWidth">
          <el-input v-model="formData.label"></el-input>
        </el-form-item>
        <el-form-item v-if="isAdd" label="设备状态" prop="deviceState" :label-width="formLabelWidth">
          <el-radio-group v-model="formData.deviceState" placeholder="请选择用户状态" >
            <el-radio label="START">启用</el-radio>
            <el-radio label="STOP">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="采集周期" prop="sampleFrequency" :label-width="formLabelWidth">
          <el-input v-model="formData.sampleFrequency" :min="1000" type="number">
            <template slot="append">ms</template>
          </el-input>
        </el-form-item>
        <!--<el-form-item label="上传频率" prop="uploadRate" :label-width="formLabelWidth">-->
          <!--<el-input v-model="formData.uploadRate" type="number"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item v-if="isDataPoint" label="数据点" :label-width="formLabelWidth">
          <el-select v-model="formData.dataPointList" placeholder="请选择数据点" multiple="multiple">
            <el-option v-for="dataPoint in dataPoints" :label="dataPoint.name" :value="dataPoint.name" :key="dataPoint.name" auto-complete="off"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div v-if="isAdd" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDevice">确 定</el-button>
        <el-button @click="addFormDialog = false">取消</el-button>
      </div>
      <div v-else slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDevice">确 定</el-button>
        <el-button @click="addFormDialog = false">取消</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import Device from '@/api/device'
  import Driver from '@/api/driver'
  import { TCP_MODBUS, UDP_MODBUS, SERIAL_MODBUS, OPC, JDBC} from '@/components/DriverConf/index' // 驱动配置components
  export default {
    components:{ 'TCP_MODBUS': TCP_MODBUS, 'UDP_MODBUS': UDP_MODBUS, 'SERIAL_MODBUS': SERIAL_MODBUS, 'OPC':OPC, 'JDBC': JDBC},
    data() {
      return {
        addFormDialog: false,
        formDef: {},
        formData: {
//          deviceCategory: 'ACQUISITION_DEVICE',
          name: '',
          deviceState: 'START',
          sampleFrequency: '1000',
          dataPointList: [],
        },
        deviceCategory: 'ACQUISITION_DEVICE',
        driverLists: [], //驱动列表
        driverName: '', //驱动名
        driverlabel: '',
        driverFormName: '', //驱动配置组件名
        rules: {
//          driverName: [
//            {required: true, message: '请选择驱动', trigger: 'change'}
//          ],
          deviceCategory: [
            {required: true, message: '请选择设备状态', trigger: 'change'}
          ],
          name: [
            {required: true, message: '请输入设备名称', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          deviceState: [
            {required: true, message: '请选择设备状态', trigger: 'change'}
          ],
          sampleRate: [
            {required: true, message: '请输入采集频率', trigger: 'blur'}
          ],
          uploadRate: [
            {required: true, message: '请输入上传频率', trigger: 'blur'}
          ]
        },
        isAdd: false,
        formLabelWidth: '120px',
        dataPoints: [],
        isDataPoint: false,
        isDriverType: true,
        isDriverConf: false,
        components: []
      }
    },
    methods: {
      dialogFormState(param) {
//        console.log(param)
        this.addFormDialog = param.show
        this.isAdd = param.isAdd
        if (param.isAdd === false) { // 编辑
          this.formData = param
          if (param.deviceCategory === 'VIRTUAL_DEVICE') {
            this.isDataPoint = true // 编辑虚拟设备显示数据点
          }else{
            this.isDataPoint = false
          }
        } else {
          this.formData = this.formDef
        }
      },
      initDeviceForm() {
        this.deviceCategory = 'ACQUISITION_DEVICE'
        this.$refs.formData.resetFields()
//        this.isDriverType = false
        this.isDriverConf = false
        this.driverName = ''
        this.formData.name = ''
      },
      addDevice() {
        let deviceParam = Object.assign({}, this.formData) //设备基础配置
//        let showDriver = (this.deviceCategory === 'VIRTUAL_DEVICE') ? false : true //设备有无驱动配置
//        if (showDriver === true) { // 有虚拟设备
        if (this.isDriverConf === true) {
          let theDriverName = this.driverName  // 驱动名称
//          console.log(this.$refs.driverConfForm)
          let theDriverConf = this.$refs.driverConfForm.formConf  // 驱动参数
          const driverConfig = Object.assign({driverName: this.driverlabel}, {transportConfig: theDriverConf})
//          deviceParam.driverConfig = driverConfig
          deviceParam = Object.assign(deviceParam, {driverConfig: driverConfig})
        }
//        console.log(deviceParam)
        this.$refs.formData.validate((valid) => {
          if (valid) {
            Device.addDevice(deviceParam).then(response => {
              this.$message({
                message: '新增设备成功',
                type: 'success'
              })
              this.addFormDialog = false
              this.initDeviceForm()
              this.$emit('initExcute', true)
            }).catch(error => {
              console.log(error)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      editDevice() {
//        console.log(this.formData)
        Device.editDevice(this.formData).then(response => {
          this.$message({
            message: '编辑设备成功',
            type: 'success'
          })
          this.addFormDialog = false
          this.$emit('initExcute', true)
        }).catch(error => {
          console.log(error)
        })
      },
//      getDataPointList() {
//        Device.getDataPointList().then(pointList => {
////          console.log(pointList)
//          this.dataPoints = pointList
//        }).catch(error => {
//          console.log(error)
//        })
//      },
      // 驱动列表
      getDriverList() {
        Driver.getDriveList().then(driverList => {
//          console.log(driverList)
          this.driverLists = driverList
        }).catch(error => {
          console.log(error)
        })
      },
      showDriverConf() {
        this.driverLists.map(el => {
          this.isDriverConf = true
          if(this.driverName === el.name){
//            console.log(el.transportType)
            this.driverFormName = el.transportType // 驱动组件名与驱动名一致
            this.driverlabel = el.name
          }
        })
//        console.log(this.driverFormName)
//        this.$refs.driverConfForm.driverConf(this.driverFormName) // 调用驱动组价的属性方法
      },
      showDriverType() {
        const tDevice = this.deviceCategory
        if(tDevice === 'VIRTUAL_DEVICE') {
          this.isDataPoint = true    // 数据点显示
          this.isDriverType = false  //驱动关闭
          this.driverName = '' // 清空驱动名称变量
        } else {
          this.isDataPoint = false
          this.isDriverType = true
        }
      },
      toDeviceName() {
        this.formData.name = this.formData.label + Math.ceil(Math.random()*10)
      },
      initPage() {
//        this.getDataPointList()
        this.formDef = Object.assign({}, this.formData)
        this.getDriverList()
      }
    },
    created () {
      this.initPage()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-select{
    width: 100%;
  }
  .components-bar{
    margin-top: 20px;
  }
  .el-checkbox-group, .el-radio-group{
    display: inline-block;
  }
</style>
