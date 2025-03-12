import mysql from 'mysql'

// 解构出 createConnection 方法
const { createConnection } = mysql

// 创建数据库连接
const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'supply',
})

// 连接数据库
connection.connect((err) => {
  if (err) {
    console.error('连接失败: ' + err.stack)
    return
  }
  console.log('连接成功!')
})

// 通用数据库操作函数
function executeQuery(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) {
        return reject(error)
      }
      resolve(results)
    })
  })
}

// 执行查询操作
export async function query(sql, params) {
  return executeQuery(sql, params)
}

// 执行新增操作
export async function add(sql, params) {
  return executeQuery(sql, params)
}

// 执行查询数据操作
export async function getData(sql, params) {
  return executeQuery(sql, params)
}

// 关闭数据库连接
export function end(callback) {
  connection.end(callback)
}

export default connection
