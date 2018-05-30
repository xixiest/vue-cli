import BaseApi from './base'
import moment from 'moment'
class Device {
  static getAlarmList (param) {
    // console.log(param)
    return BaseApi.fetchGqlData({
      query: `query($OBJECT:Object){alarm{findHistory(object:$OBJECT)}}`,
      args: {
        OBJECT:param
      },
      name: this.getAlarmList.name,
      resProc: (response) => {
        return response.data.alarm.findHistory
      }
    })
  }
  // 拆分rangeTime
  static cutRangeTime(rangeTime) {
    if (rangeTime) {
      return [moment(rangeTime[0]).format('x'), moment(rangeTime[1]).format('x')]
    }
  }
  // table分页
  static setTableParam(tableN, tableD, pageS, pageC) { // N列表对象，D表数据，S一页显示数据，C当前页
    return BaseApi.setTableParam(tableN, tableD, pageS, pageC)
  }
}
export default Device
