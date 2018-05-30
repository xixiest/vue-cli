import fetch from '@/utils/fetchGql'

const BaseApi = {
  // 将返回的DevTree转换为el-tree需要的tree数据结构
  TreeDataAdapter(arr) {
    arr.map((item) => {
      item.id = item.data.id
      // item.pid = item.data.pid
      item.label = item.data.label
      item.canAdd = (item.data.name !== 'ungrouped')
      item.canEdit = ((item.data.name !== 'root') && (item.data.name !== 'ungrouped'))
      item.isEdit = false
      if (item.children) {
        this.TreeDataAdapter(item.children)
      } else {
        item.children = []
      }
    })
    return arr
  },
  // table初始化
 setTableParam(tableN, tableD, pageS, pageC) { // N列表名，D表数据，S一页显示数据，C当前页
    tableN.tableData = tableD
    tableN.total = tableD.length
    let theStart = 0, theEnd = tableN.pageSizes[0]
    if (pageS) {
      tableN.pageSize = pageS
      theEnd = pageS
    } else {
      tableN.pageSize = tableN.pageSizes[0]
    }
    if(pageC) {
      theStart = pageS*(pageC-1)
      theEnd = theStart + pageS
    }
    tableN.tableData = tableD.slice(theStart, theEnd)
  },

  logErrorInfo(apiName, error) {
    console.error(`${apiName} failed - ${error}`)
  },

  fetchGqlData(param) {
    return new Promise((resolve, reject) => {
      fetch({
        method: 'post',
        data: {
          query: param.query,
          arguments: param.args
        }
      }).then(response => {
        const data = param.resProc(response)
        resolve(data)
      }).catch(error => {
        reject(error)
        this.logErrorInfo(param.apiName, error)
      })
    })
  }
}

export default BaseApi
