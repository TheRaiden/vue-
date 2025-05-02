import express from 'express'
import pkg from 'body-parser'
const { json } = pkg
import cors from 'cors'
import { createConnection } from 'mysql'
import jwt from 'jsonwebtoken'
import { saveLoginHistory } from '../src/db.js'

const app = express()
const port = 8000
const secretKey = 'your_secret_key'

app.use(json())
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'], // 允许的前端地址
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'], // 确保允许 Authorization 头
  }),
)

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'supply',
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err)
    return
  }
  console.log('Connected to the MySQL database.')
})

//处理登录
app.post('/login', (req, res) => {
  const { username, password } = req.body
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?'

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      res.status(500).send('Server error')
      return
    }

    if (results.length > 0) {
      const user = results[0]
      const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' })
      saveLoginHistory(username) // 保存登录记录
      res.status(200).send({ message: '登录成功', token, user })
    } else {
      res.status(401).send({ message: '用户名或密码错误' })
    }
  })
})

app.get('/protected', (req, res) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).send({ message: '未提供 token' })
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: '无效的 token' })
    }
    res.status(200).send({ message: '访问受保护的资源成功', user: decoded.username })
  })
})

// 验证是否为管理员
function verifyAdmin(req, res, next) {
  const { username } = req.body // 从请求体中获取用户名
  if (username == 'admin') {
    //判断获取到的用户名是否为 admin
    return res.status(403).send({ message: '无权限操作' })
  }
  next()
}

// 处理搜索
app.get('/api/search', (req, res) => {
  const query = req.query.query
  const sqlQuery = 'SELECT * FROM names WHERE name LIKE ?'
  const searchValue = `%${query}%`

  db.query(sqlQuery, [searchValue], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      res.status(500).send('Server error')
      return
    }

    res.json(results)
  })
})

//处理修改密码
app.post('/change-password', (req, res) => {
  const { oldPassword, newPassword } = req.body
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).send({ message: '未提供 token' })
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: '无效的 token' })
    }

    const username = decoded.username
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?'

    db.query(query, [username, oldPassword], (err, results) => {
      if (err) {
        console.error('Error executing query:', err)
        return res.status(500).send('Server error')
      }

      if (results.length > 0) {
        const updateQuery = 'UPDATE users SET password = ? WHERE username = ?'
        db.query(updateQuery, [newPassword, username], (err, results) => {
          if (err) {
            console.error('Error executing query:', err)
            return res.status(500).send('Server error')
          }
          res.status(200).send({ message: '密码修改成功' })
        })
      } else {
        res.status(401).send({ message: '旧密码错误' })
      }
    })
  })
})

//处理注册用户
app.post('/register', (req, res) => {
  const { username, password } = req.body
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)'

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }
    res.status(200).send({ message: '成功' })
  })
})

// 处理新增
app.post('/api/names/add', verifyAdmin, (req, res) => {
  const { name, have, company } = req.body // 添加 company 字段
  const query = 'INSERT INTO names (name, have, company) VALUES (?, ?, ?)'

  db.query(query, [name, have, company], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }
    res.status(200).send({ message: '新增成功', insertId: results.insertId })
  })
})

// 处理查询
app.get('/api/names', (req, res) => {
  const query = 'SELECT name, have, company FROM names' // 查询 company 字段

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }
    res.json(results)
  })
})

// 处理删除
app.post('/api/names/delete', verifyAdmin, (req, res) => {
  const { name } = req.body
  const query = 'DELETE FROM names WHERE name = ?'

  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }
    if (results.affectedRows > 0) {
      res.status(200).send({ message: '删除成功' })
    } else {
      res.status(404).send({ message: '未找到要删除的记录' })
    }
  })
})

// 获取空调库存数据
app.get('/api/air', (req, res) => {
  const query = 'SELECT name, have, company FROM air' // 查询 company 字段
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching air data:', err)
      return res.status(500).send('Server error')
    }
    res.json(results)
  })
})

// 新增空调
app.post('/api/air/add', verifyAdmin, (req, res) => {
  const { name, have, company } = req.body
  const query = 'INSERT INTO air (name, have, company) VALUES (?, ?, ?)'

  db.query(query, [name, have, company], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }

    // 保存操作信息到 manage 表
    const manageQuery =
      'INSERT INTO manage (user, time, table_name, action) VALUES ("system", NOW(), ?, ?)'
    db.query(manageQuery, ['air', 'add'], (manageErr) => {
      if (manageErr) {
        console.error('Error logging manage operation:', manageErr)
      }
    })

    res.status(200).send({ message: '新增空调成功', insertId: results.insertId })
  })
})

// 删除空调
app.post('/api/air/delete', verifyAdmin, (req, res) => {
  const { name } = req.body
  const query = 'DELETE FROM air WHERE name = ?'

  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }
    if (results.affectedRows > 0) {
      // 保存操作信息到 manage 表
      const manageQuery =
        'INSERT INTO manage (user, time, table_name, action) VALUES ("system", NOW(), ?, ?)'
      db.query(manageQuery, ['air', 'delete'], (manageErr) => {
        if (manageErr) {
          console.error('Error logging manage operation:', manageErr)
        }
      })

      res.status(200).send({ message: '删除空调成功' })
    } else {
      res.status(404).send({ message: '未找到要删除的空调记录' })
    }
  })
})

// 查询齿轮
app.get('/api/gear', (req, res) => {
  const query = 'SELECT name, have, company FROM gear' // 查询 company 字段
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }
    res.json(results)
  })
})

// 新增齿轮
app.post('/api/gear/add', verifyAdmin, (req, res) => {
  const { itemName, itemHave, company } = req.body
  const query = 'INSERT INTO gear (name, have, company) VALUES (?, ?, ?)'

  db.query(query, [itemName, itemHave, company], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }

    // 保存操作信息到 manage 表
    const manageQuery =
      'INSERT INTO manage (user, time, table_name, action) VALUES ("system", NOW(), ?, ?)'
    db.query(manageQuery, ['gear', 'add'], (manageErr) => {
      if (manageErr) {
        console.error('Error logging manage operation:', manageErr)
      }
    })

    res.status(200).send({ message: '新增齿轮成功', insertId: results.insertId })
  })
})

// 删除齿轮
app.post('/api/gear/delete', verifyAdmin, (req, res) => {
  const { name } = req.body
  const query = 'DELETE FROM gear WHERE name = ?'

  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }
    if (results.affectedRows > 0) {
      // 保存操作信息到 manage 表
      const manageQuery =
        'INSERT INTO manage (user, time, table_name, action) VALUES ("system", NOW(), ?, ?)'
      db.query(manageQuery, ['gear', 'delete'], (manageErr) => {
        if (manageErr) {
          console.error('Error logging manage operation:', manageErr)
        }
      })

      res.status(200).send({ message: '删除齿轮成功' })
    } else {
      res.status(404).send({ message: '未找到要删除的齿轮记录' })
    }
  })
})

// 查询压缩机
app.get('/api/compressor', (req, res) => {
  const query = 'SELECT name, have, company FROM compressor' // 查询 company 字段
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }
    res.json(results)
  })
})

// 新增压缩机
app.post('/api/compressor/add', verifyAdmin, (req, res) => {
  const { itemName, itemHave, company } = req.body
  const query = 'INSERT INTO compressor (name, have, company) VALUES (?, ?, ?)'

  db.query(query, [itemName, itemHave, company], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }

    // 保存操作信息到 manage 表
    const manageQuery =
      'INSERT INTO manage (user, time, table_name, action) VALUES ("system", NOW(), ?, ?)'
    db.query(manageQuery, ['compressor', 'add'], (manageErr) => {
      if (manageErr) {
        console.error('Error logging manage operation:', manageErr)
      }
    })

    res.status(200).send({ message: '新增压缩机成功', insertId: results.insertId })
  })
})

// 删除压缩机
app.post('/api/compressor/delete', verifyAdmin, (req, res) => {
  const { name } = req.body
  const query = 'DELETE FROM compressor WHERE name = ?'

  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }
    if (results.affectedRows > 0) {
      // 保存操作信息到 manage 表
      const manageQuery =
        'INSERT INTO manage (user, time, table_name, action) VALUES ("system", NOW(), ?, ?)'
      db.query(manageQuery, ['compressor', 'delete'], (manageErr) => {
        if (manageErr) {
          console.error('Error logging manage operation:', manageErr)
        }
      })

      res.status(200).send({ message: '删除压缩机成功' })
    } else {
      res.status(404).send({ message: '未找到要删除的压缩机记录' })
    }
  })
})

// 查询 manage 表数据
app.get('/api/manage', (req, res) => {
  const query = 'SELECT user, time, table_name, action FROM manage'
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching manage data:', err)
      return res.status(500).send('Server error')
    }
    res.json(results)
  })
})

// 查询 history 表数据
app.get('/api/history', (req, res) => {
  const query = 'SELECT user, time FROM history'
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching history data:', err)
      return res.status(500).send('Server error')
    }
    res.json(results)
  })
})

// 查询用户列表
app.get('/api/users', (req, res) => {
  const query = 'SELECT DISTINCT user FROM massage'

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err)
      return res.status(500).send('Server error')
    }
    res.json(results.map((row) => row.user))
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
