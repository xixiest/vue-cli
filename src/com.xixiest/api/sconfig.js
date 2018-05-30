import BaseApi from './base'
class Sconfig {
  static getSystemConf() {
    return BaseApi.fetchGqlData({
      query: `query($NAME:String){properties{get(name:$NAME)}}`,
      args: {
        NAME: 'id'
      },
      name: this.getSystemConf.name,
      resProc: (response) => {
        return response.data.properties.get
      }
    })
  }
  static updateCommonConf(param) {
    return BaseApi.fetchGqlData({
      query: `mutation($OBJECT:Object){properties{update(object:$OBJECT)}}`,
      args: {
        OBJECT:param
      },
      name: this.updateCommonConf.name,
      resProc: (response) => {
        return response.data.properties
      }
    })
  }
  static updateNetWorkConf(param) {
    return BaseApi.fetchGqlData({
      query: `mutation ($OBJECT:Object){systemConfig{changeNetWorkConfig(object:$OBJECT)}}`,
      args: {
        OBJECT: param
      },
      name: this.updateNetWorkConf.name,
      resProc: (response) => {
        return response.data.systemConfig.findAllsmartConfig
      }
    })
  }
  static updateSmart(param) {
    return BaseApi.fetchGqlData({
      query: `mutation ($OBJECT:Object){systemConfig{changeAllsmartConfig(object:$OBJECT)}}`,
      args: {
        OBJECT: param
      },
      name: this.updateSmart.name,
      resProc: (response) => {
        return response.data.systemConfig.findAllsmartConfig
      }
    })
  }
}
export default Sconfig
