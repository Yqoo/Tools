/**
 *desc:扁平化数据格式化为树形结构数据
 *params: nodes => 初始节点数据 root => 根节点
 */
import http from '@/api/http.js'

const treeNodeFormatter = (nodes, root, pid = 'parentId', cid = 'id') => {
  const group = {}
  Object.keys(nodes).forEach(key => { // 分组
    if (!group[nodes[key][pid]]) group[nodes[key][pid]] = []
    group[nodes[key][pid]].push(nodes[key])
  })
  const rootNodes = group[root]
  group[root] = null;
  +(function traverseTreeNodeGroup(treeNodeGroup) {
    Object.keys(treeNodeGroup).forEach(key => {
      const node = treeNodeGroup[key]
      if (group[node[cid]]) {
        node.children = group[node[cid]]
        group[node[cid]] = null
        traverseTreeNodeGroup(node.children)
      }
    })
  }(rootNodes))
  return rootNodes
}
/* 对象深克隆 */
const deepClone = obj => {
  const objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') {
        objClone[key] = deepClone(obj[key])
      } else {
        objClone[key] = obj[key]
      }
    })
  }
  return objClone
}