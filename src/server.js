import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js'
import { Database } from './database.js'
import { routes } from './routes.js'

const database = new Database()



const server = http.createServer (async(request, response)=>{
    const {method, url} = request

    await json (request, response)

    const route = routes.find (route =>{
        return route.method === method && route.path === url
    })

    if (route){
        return route.handler(request, response)
    }

    return response.writeContinue(404).end()
})

server.listen(3333);

