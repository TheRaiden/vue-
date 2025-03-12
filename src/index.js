// 导入 mysql 模块
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

  // 执行查询操作
  connection.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error('查询失败: ' + err.message)
    } else {
      console.log(result)
    }

    // 关闭数据库连接
    connection.end((endErr) => {
      if (endErr) {
        console.error('关闭连接失败: ' + endErr.message)
      } else {
        console.log('连接已关闭')
      }
    })
  })
})
