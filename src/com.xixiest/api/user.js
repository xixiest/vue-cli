import BaseApi from './base'
class User {
  static getUserCurrent() {
    return BaseApi.fetchGqlData({
      query: 'query  { user{current{name,label,role,state,telephoneNo,mailAddress,remarks,userGroupList{name}}}}',
      apiName: this.getUserCurrent.name,
      resProc: (response) => {
        return response.data.user.current
      }
    })
  }

  // 过滤数组对象中的某个字段
  static filterObj(arr, field) {
    const fieldArr = arr.map(el => el[field])
    return fieldArr
  }
}

export default User
