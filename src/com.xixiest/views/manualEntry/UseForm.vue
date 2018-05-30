<template>
  <el-container class="app-container">
    <!-- Form -->
    <el-form style="width: 80%">
      <div v-for="item in fields" :key="item.id">
        <el-form-item v-if="item.name !== '工单模板'" :label="item.name" label-width="150px">
          <div v-if="item.source === 'SYS'">
            <el-input v-if="item.type === 'input'" v-model="form[item.label]"></el-input>
            <el-select v-if="item.type === 'single'" v-model="form[item.label]" placeholder="请选择">
              <el-option
                v-for="selItem in item.options"
                :key="selItem.value"
                :label="selItem.name"
                :value="selItem.value">
              </el-option>
            </el-select>
            <el-select v-if="item.type === 'multiple'" v-model="form[item.label]" placeholder="请选择" multiple filterable>
              <el-option
                v-for="selItem in item.options"
                :key="selItem.value"
                :label="selItem.name"
                :value="selItem.value">
              </el-option>
            </el-select>
          </div>
          <!--USER FIELDS-->
          <div v-if="item.source === 'USER'">
            <div v-if="item.type === 'input'">
              <el-input v-if="item.config.type === 'single'" v-model="form.customFields[item.label]"></el-input>
              <el-input v-if="item.config.type === 'multiple'" v-model="form.customFields[item.label]" type="textarea" :rows="2" placeholder="请输入内容" style="width: 80%;"></el-input>
              <el-input v-if="item.config.type === 'number'" type="number" v-model="form.customFields[item.label]" auto-complete="off" ></el-input>
            </div>
            <el-select v-if="item.type === 'single'" v-model="form.customFields[item.label]" placeholder="请选择">
              <el-option
                v-for="selItem in item.config.items"
                :key="selItem"
                :label="selItem"
                :value="selItem">
              </el-option>
            </el-select>
            <el-select v-if="item.type === 'multiple'" v-model="form.customFields[item.label]" placeholder="请选择" multiple filterable>
              <el-option
                v-for="selItem in item.options"
                :key="selItem.value"
                :label="selItem.label"
                :value="selItem.value">
              </el-option>
            </el-select>
            <el-date-picker v-if="item.type === 'timePicker'"
                            v-model="form.customFields[item.label]"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="right"
                            :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
          <el-radio-group v-if="item.type === 'radio'" v-model="form[item.label]">
            <el-radio label="一般">一般</el-radio>
            <el-radio label="紧急">紧急</el-radio>
            <el-radio label="非常紧急">非常紧急</el-radio>
          </el-radio-group>
          <el-upload v-if="item.type === 'file'"
                     class="upload-demo"
                     action="string"
                     :http-request="fileUpload"
                     multiple
                     :limit="3">
            <el-button size="small">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </div>
      <el-form-item align="right">
        <el-button type="primary">保存</el-button>
        <el-button type="primary" @click="beBack">返回</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
  import moment from 'moment'
  export default {
    components: {  },
    data() {
      return {
        form: {
          name: '',
          label: '',
          priority: '',
          ownerId: null,   // 受理人
          ownerGroupId: null, // 受理组
          creatorId: 1, // 创建者
          workItemTemplateId: 26,
          workItemState: 'UNTREATED',
          customFields: {},
          attachmentList: []
        },
        templetList: [{
          id: 1,
          name: '默认模板',
          label: '默认模板',
          lastModifiedUser: 'USER',
          lastModifiedTime: 1517796493378,
          config: {
            items: [
              {
                id: 2,
                name: "标题",
                label: "label",
                type: "input",
                config: null,
                lastModifiedUser: 1,
                source: "SYS",
                lastModifiedTime: 1517307181710,
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
                name: "内容",
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
        },{
            id: 2,
            name: '数据模板',
            label: '数据模板',
            lastModifiedUser: 'USER',
            lastModifiedTime: 1517796493378,
            config: {
              items: [
                {
                  id: 2,
                  name: "标题1",
                  label: "label",
                  type: "input",
                  config: null,
                  lastModifiedUser: 1,
                  source: "SYS",
                  lastModifiedTime: 1517307181710,
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
                  name: "内容",
                  label: "内容",
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
        currentTIN: this.$route.params.name, // TIN === TempletName
        dialogWorkOrderForm: false,
        // 模板字段表
        fields: [],
        fileList: [],
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(moment().subtract(1, 'days'))
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(moment().subtract(7, 'days'))
              picker.$emit('pick', date)
            }
          }]
        }
      }
    },
    methods: {
      diaStateSwitch() {
        this.dialogWorkOrderForm = true
      },
      beBack() {
        this.$router.go(-1)
      },
//      getTempletList() {
//        Templet.getTempletList().then(templetList => {
////          this.templetList = templetList
////          this.templetChoose()
//        }).catch(error => {
//          console.log(error)
//        })
//      },
      templetChoose() {
        this.templetList.map(el => {
          if (el.name === this.currentTIN) {
            this.fields = el.config.items
          }
        })
//        console.log(this.fields)
      },
      addWorkOrder() {
        const ownerId = this.$refs.userList[1].ownerId
        const ownerGroupId = this.$refs.userList[0].ownerGroupId
        if (ownerId) {
          this.form.ownerId = ownerId
          this.form.workItemState = 'ACCEPTED'
          console.log('受理人', ownerId)
        }
        if (ownerGroupId) {
          this.form.ownerGroupId = ownerGroupId
          this.form.workItemState = 'UNTREATED'
          console.log('受理组', ownerGroupId)
        }
//        console.log(this.form)
        WorkOrder.addworkOrder(this.form).then(response => {
          this.dialogWorkOrderForm = false
          this.$emit('SUCCESS')
        }).catch(error => {
          console.log(error)
        })
      },
      fileUpload(item) {
        const files = []
        files.push(item.file)
        WorkOrder.fileUpload(files).then(imgParam => {
//          console.log(imgParam)
          this.form.attachmentList.push(...imgParam)
          this.form.attachmentList.map(el => {
            el.path = this.BASE_URL + el.uuid
          })
        }).catch(error => {
          console.log(error)
        })
      },
      initPage() {
//        this.getTempletList()
        this.templetChoose()
      }
    },
    created() {
      this.initPage()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-container{
    width: 75%;
    margin: 0 auto;
  }
</style>
