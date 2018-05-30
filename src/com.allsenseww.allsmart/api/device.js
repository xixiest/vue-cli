import BaseApi from './base'
import moment from 'moment'
class Device {
  static getDeviceList(filterStr) {
    return BaseApi.fetchGqlData({
      query: `query{dataPointCluster{findList{id,name,type,deviceState,description,sampleFrequency,driverConfig}}}`,
      args: {
        Object: {
          label: filterStr
        }
      },
      apiName: this.getDeviceList.name,
      resProc: (response) => {
        return response.data.dataPointCluster.findList
      }
    })
  }
  static getDeviceOne(name) {
    // console.log(name)
    return BaseApi.fetchGqlData({
      query: `query($NAME:String){device{findOne(name:$NAME){name,label,deviceCategory,sampleRate,uploadRate,deviceState,dataPointList}}}`,
      args: {
        NAME: name
      },
      apiName: this.getDeviceOne.name,
      resProc: (response) => {
        return response.data.device.findOne
      }
    })
  }
  static addDevice(dParam) {
    // console.log(dParam)
    return BaseApi.fetchGqlData({
      query: `mutation($OBJECT:Object){dataPointCluster{create(object:$OBJECT){id}}}`,
      args: {
        OBJECT: dParam
      },
      apiName: this.addDevice.name,
      resProc: (response => {
        return response.data
      })
    })
  }
  static editDevice(dParam) {
    // console.log(dParam)
    return BaseApi.fetchGqlData({
      query: `mutation ($DEVICE:Object){device{update(object:$DEVICE){name}}}`,
      args: {
        DEVICE: dParam
      },
      name: this.editDevice.name,
      resProc: (response) => {
        return response.data
      }
    })
  }
  static deleteDevice(dId) {
    return BaseApi.fetchGqlData({
      query: `mutation($ID:Int){dataPointCluster{delete(id:$ID)}}`,
      args: {
        ID: dId
      },
      name: this.editDevice.name,
      resProc: (response) => {
        return response.data
      }
    })
  }
  static startDevice(dName) {
    // console.log(dName)
    return BaseApi.fetchGqlData({
      query:`mutation($OBJECT:Object){dataPointCluster{start(object:$OBJECT)}}`,
      args: {
        OBJECT: dName
      },
      name: this.startDevice.name,
      resProc: (response) => {
        return response.data.dataPointCluster
      }
    })
  }
  static stopDevice(dId) {
    console.log(dId)
    return BaseApi.fetchGqlData({
      query:`mutation($OBJECT:Object){dataPointCluster{stop(object:$OBJECT)}}`,
      args: {
        OBJECT: dId
      },
      name: this.stopDevice.name,
      resProc: (response) => {
        return response.data.dataPointCluster
      }
    })
  }
  // 采集点列表
  // static getDataPointList() {
  //   return BaseApi.fetchGqlData({
  //     query: `query{dataPointEntity{findList{id,dataPointClusterId,type,name,label,metric,unit,description,value}}}`,
  //     args: { },
  //     apiName: this.getDataPointList.name,
  //     resProc: (response) => {
  //       return response.data.dataPointEntity.findList
  //     }
  //   })
  // }
  // 一个设备下所有采集点的实时数据
  static getDataPointVal(dId) {
    return BaseApi.fetchGqlData({
      query: `query($OBJECT:Object){dataPoint{findList(object:$OBJECT){id,dataPointClusterId,type,name,label,metric,unit,description,value}}}`,
      args: {
        OBJECT: {
          clusterId: parseInt(dId)
        }
      },
      apiName: this.getDataPointVal.name,
      resProc: (response) => {
        return response.data.dataPoint.findList
      }
    })
  }
  一个设备下所有数据点
  static getDataPointList(dId) {
    return BaseApi.fetchGqlData({
      query: `query($OBJECT:Object){dataPoint{findList(object:$OBJECT){id,dataPointClusterId,type,name,label,metric,unit,description,value}}}`,
      args: {
        OBJECT: {
          clusterId: parseInt(dId)
        }
      },
      apiName: this.getDataPointList.name,
      resProc: (response) => {
        console.log(response)
        return response.data.dataPoint.findList
      }
    })
  }

  // 配置采集点
  static updatePointConf(param) {
    // console.log(param)
    return BaseApi.fetchGqlData({
      query:  `mutation ($DEVICE:Object){dataPoint{update(object:$DEVICE)}}`,
      args: {
        DEVICE: param
      },
      apiName: this.updatePointConf.name,
      resProc: (response) => {
        return response.data
      }
    })
  }
  // 配置告警
  static updateAlarmConf(param) {
    // console.log(param)
    return BaseApi.fetchGqlData({
      query:  `mutation ($DEVICE:Object){alarm{update(object:$DEVICE)}}`,
      args: {
        DEVICE: param
      },
      apiName: this.updateAlarmConf.name,
      resProc: (response) => {
      return response.data
    }
  })
  }
  // 实时数据列表
  static getTimeDataList(dName) {
    return BaseApi.fetchGqlData({
      query: `query($NAME:String){deviceValue{findOne(name:$NAME)}}`,
      args: {
        NAME: dName
      },
      apiName: this.getTimeDataList.name,
      resProc: (response) => {
        return response.data.deviceValue.findOne
      }
    })
  }
  // table分页
  static setTableParam(tableN, tableD, pageS, pageC) { // N列表名，D表数据，S一页显示数据，C当前页
    return BaseApi.setTableParam(tableN, tableD, pageS, pageC)
  }
}

export default Device
