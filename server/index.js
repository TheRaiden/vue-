import express from 'express'
import pkg from 'body-parser'
const { json } = pkg
import cors from 'cors'
import { createConnection } from 'mysql'
import jwt from 'jsonwebtoken'

const app = express()
const port = 8000
const secretKey = 'your_secret_key'

app.use(json())
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'], // 允许的前端地址
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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

// 处理新增
app.post('/api/add', (req, res) => {
  const { name, have } = req.body
  const query = 'INSERT INTO names (name, have) VALUES (?, ?)'

  db.query(query, [name, have], (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }
    res.status(200).send({ message: '新增成功', insertId: results.insertId })
  })
})
//处理查询
app.get('/api/names', (req, res) => {
  const query = 'SELECT name, value FROM names'

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return res.status(500).send('Server error')
    }
    res.json(results)
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
