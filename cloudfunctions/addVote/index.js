// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('vote').add({
    data: {
      cid: event.cid,
      tid: event.tid,
      title: event.title,
      content: event.content,
      variety: event.variety
    }
  })
}