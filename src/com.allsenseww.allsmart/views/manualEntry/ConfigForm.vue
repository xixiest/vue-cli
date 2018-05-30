<template>
  <!-- Form -->
  <el-dialog title="新建工单模板" :visible.sync="dialogTempletForm" width="800px" top="10vh">
    <el-container>
      <el-form :model="templetForm" label-width="120px">
        <el-form-item label="模板名称">
          <el-col :span="12" :offset="1" align="center">
            <div class="grid-content bg-purple">
              <el-input v-model="templetForm.name"></el-input>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item label="模板字段">
          <div v-for="(items,index) in fields" :key="items.id" class="field-item">
            <el-row>
              <div>
                <!--切换按钮-->
                <el-col :span="2" :offset="1">
                  <div class="grid-content bg-purple field-position-btn">
                    <el-button type="text" @click="itemUpMove(index)"><i v-if="index !== 0" class="el-icon-sort-up"></i></el-button>
                    <el-button type="text" @click="itemDownMove(index)"><i v-if="index !== fields.length - 1" class="el-icon-sort-down"></i></el-button>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div class="grid-content bg-purple">
                    <span>选项{{index + 1}}</span>
                  </div>
                </el-col>
              </div>
              <!--SYS FIELD-->
              <div v-if="items.source==='SYS'">
                <el-col :span="10"><div class="grid-content bg-purple">
                  <span>{{items.name}}</span>
                </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">
                    <el-checkbox v-model="fields[index].isRequired" checked disabled>必填项</el-checkbox>
                  </div>
                </el-col>
              </div>
              <!--SYS FIELD END-->
              <!--USER FIELD START-->
              <div v-if="items.source==='USER'">
                <el-col :span="10"><div class="grid-content bg-purple">
                  <span v-if="items.source==='SYS'">{{items.label}}</span>
                  <el-select v-if="items.source==='USER'" v-model="fields[index].label" placeholder="请选择">
                    <div v-for="item in fieldsUser">
                      <el-option
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </div>
                  </el-select>
                </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple-light">
                    <el-checkbox v-if="" v-model="fields[index].isRequired">必填项</el-checkbox>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple-light">
                    <el-button class="field-del-btn" @click="itemDelete(index)"></el-button>
                  </div>
                </el-col>
              </div>
            </el-row>
            <!--USER FIELD -->
          </div>
        </el-form-item>
        <el-form-item label="当前状态">
          <el-col :span="12" :offset="1">
            <div class="grid-content bg-purple">
              <el-switch
                v-model="templetForm.enable"
                active-text="启用"
                inactive-text="停用">
              </el-switch>
            </div>
          </el-col>
        </el-form-item>
      </el-form>
    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTempletForm = false">取 消</el-button>
      <el-button type="primary" @click="addTemplet">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//  import Templet from '../api/templet'
//  import Field from '../api/field'
  export default {
    components: {},
    data() {
      return {
        templetForm: {
          name: '',
          label: '',
          lastModifiedUser: 1,
          enable: false,
          config: {
            items: []
          }
        },
        fields: [{
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
          }],
        fieldsUser: [],
        dialogTempletForm: false
      }
    },
    methods: {
      diaStateSwitch(state, param) {
        this.dialogTempletForm = true
        if (state === 'isEdit') {
          console.log(param)
          this.templetForm.id = param.id
          this.templetForm.name = param.name
//          this.fields = param.config.items
        }
      },
//      getFieldList() {
//        Field.getFieldList().then(fieldList => {
//          this.fields = [...fieldList] // 数组复制
//          this.userFieldsFilter(this.fields)
////          console.log(fieldList)
//        }).catch(error => {
//          console.log(error)
//        })
//      },
      userFieldsFilter (param) {
        const fieldList = param
        fieldList.map(el => {
          if (el.source === 'USER') {
            this.fieldsUser.push(el)
          }
        })
      },
      addTemplet() {
        this.templetForm.config.items = this.fields
        console.log(this.templetForm)
        Templet.addTemplet(this.templetForm).then(response => {
          this.dialogTempletForm = false
          this.$emit('SUCCESS')
        }).catch(error => {
          console.log(error)
        })
      },
      itemUpMove(index) {
        const preIndex = index - 1
        const fieldItems = this.fields
        this.fields.splice(preIndex, 2, fieldItems[index], fieldItems[preIndex])
      },
      itemDownMove(index) {
        const nextIndex = index + 1
        const fieldItems = this.fields
        this.fields.splice(index, 2, fieldItems[nextIndex], fieldItems[index])
      },
      itemDelete(index) {
        this.fields.splice(index, 1)
      },
      initPage() {
//        this.getFieldList()
        this.userFieldsFilter(this.fields)
      }
    },
    created() {
      this.initPage()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form{
    width:100%;
  }
  .field-item{
    margin: 10px 0;
    font-size: 13px;
  }
  .field-del-btn{
    padding: 9px 7px;
    border-radius: 2px;
  }
  .field-del-btn:hover{
    background-color: #f56c6c;
    color: #fff !important;
  }
  .field-del-btn::before{
    content: "";
    display: inline-block;
    height: 2px;
    width: 18px;
    background: #ccc;
    vertical-align: 4px;
  }
  .field-position-btn{
    /*border: 1px solid red;*/
    padding: 0 1px;
    .el-button{
      width: 15px;
      color: #999;
      font-weight: bolder;
      /*border: 1px solid red;*/
    }
    i{
      font-weight: bolder;
    }
  }
</style>
