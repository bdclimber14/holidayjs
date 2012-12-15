var http = require('http')
  , ecstatic = require('ecstatic')

http.createServer(
    ecstatic(__dirname + '/public')
).listen(8080)
