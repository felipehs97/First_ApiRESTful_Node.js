import http from 'node:http'

// Criando primeiro servidor Http
const server = http.createServer ((request, response)=>{
    return response.end("Hello ")
})

server.listen(3333);

