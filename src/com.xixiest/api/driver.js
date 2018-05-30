import BaseApi from './base'

class Driver {
  static getDriveList() {
    return BaseApi.fetchGqlData({
      query: 'query {driver{findList{name,transportType}}}',
      args: {

      },
      name: this.getDriveList.name,
      resProc: (response) => {
        return response.data.driver.findList
      }
    })
  }
}
export default Driver
