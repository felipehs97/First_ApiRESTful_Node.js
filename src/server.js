import http from 'node:http'

// Criando primeiro servidor Http

const users = []

const server = http.createServer (async(request, response)=>{
    const {method, url} = request

    const buffers = []

   for await (const chunk of request){
    buffers.push(chunk)
   }

   try{
   request.body = JSON.parse(Buffer.concat(buffers).toString())
   }catch{
    request.body = null
   }

    if (method === "GET" && url === "/users"){
        // Early Return (quando bate no early return o que está abaixo não é executado)
        return response
        .setHeader("Content-type", "application/json")
        .end(JSON.stringify(users))
    }
    if (method === "POST" && url === "/users"){
        const {name, email} = request.body

        users.push({
            id:1,
            name,
            email,
        })

        return response.writeHead(201).end()
    }

    return response.writeContinue(404).end()
})

server.listen(3333);

