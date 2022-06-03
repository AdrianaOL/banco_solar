const http = require('http')
const url = require('url')
const path = require('path')
const {
  insertar,
  consultar,
  editar,
  eliminar,
  consultarTransferencias,
  insertarTarnsferencias,
} = require('./consulta')
const fs = require('fs')
http
  .createServer(async (req, res) => {
    if (req.url == '/' && req.method === 'GET') {
      try {
        const html = fs.readFileSync(
          path.join(__dirname, 'index.html'),
          'utf-8'
        )
        res.writeHead(200, { 'content-type': 'text/html' })
        res.end(html)
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            message: error,
          })
        )
      }
    }
    if (req.url == '/usuario' && req.method == 'POST') {
      try {
        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', async () => {
          const datos = Object.values(JSON.parse(body))
          const respuesta = await insertar(datos)
          res.writeHead(201, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(respuesta))
        })
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            message: error,
          })
        )
      }
    }
    if (req.url == '/usuarios' && req.method === 'GET') {
      try {
        const registros = await consultar()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(registros.rows))
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            message: error,
          })
        )
      }
    }
    if (req.url.startsWith('/usuario?') && req.method === 'PUT') {
      try {
        const { id } = url.parse(req.url, true).query
        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', async () => {
          const datos = Object.values(JSON.parse(body))
          console.log(datos)
          const respuesta = await editar(datos, id)
          res.writeHead(201, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(respuesta))
        })
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            message: error,
          })
        )
      }
    }
    if (req.url.startsWith('/usuario?') && req.method == 'DELETE') {
      try {
        const { id } = url.parse(req.url, true).query
        const respuesta = await eliminar(id)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(respuesta))
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            message: error,
          })
        )
      }
    }

    if (req.url == '/transferencia' && req.method == 'POST') {
      try {
        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', async () => {
          const datos = Object.values(JSON.parse(body))
          if (datos[0] == datos[1]) {
            res.end(
              JSON.stringify({
                message: 'No se puede transferir al mismo usuario',
              })
            )
          } else {
            const respuesta = await insertarTarnsferencias(datos)
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(respuesta))
          }
        })
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            message: error,
          })
        )
      }
    }

    if (req.url == '/transferencias' && req.method === 'GET') {
      try {
        const registros = await consultarTransferencias()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(registros.rows))
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            message: error,
          })
        )
      }
    }
  })
  .listen(3000)
