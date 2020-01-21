// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "test-3thxx"
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('user').add({
    data: {
      _id: event.uid
    }
  })
}