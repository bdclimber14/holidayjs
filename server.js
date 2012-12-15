var http = require('http')
  , fs = require('fs')
  , path = require('path')
  // deps
  , ecstatic = require('ecstatic')
  , ramrod = require('ramrod')
  , filed = require('filed')
  , f = require('flates')

var router = ramrod(
    { 'upload': upload
    , 'display': display
    }
)

http.createServer(function (req, res) {
  router.dispatch(req, res)
}).listen(8080)

router.on('*', ecstatic(__dirname + '/public'))

function upload (req, res) {

  req.pipe(filed(path.join(__dirname, 'public' + 'upload', u++ + '.png'))
  ).on('end', function () {
    res.statusCode = 200
    res.end('ok')
  }).on('error', function (e) {
    res.statusCode = 500
    res.end('You ruined Christmas')
  })

}

function display (req, res) {
  fs.readdir(path.join(__dirname, 'public', 'upload'), function (err, files) {
    console.log(files)
    if (err) {
      res.statusCode = 500
      res.end('Read Dir fialed')
    }

    res.statusCode = 200

    var images = files.map(function (file) {
      return f.img({ src: 'upload/' + file })
    })
    images.reverse()
    images = images.splice(0, 10)
    res.end(f.d() + f.link({ href: 'display.css', rel: 'stylesheet' }) + images.join(''))
  })
  
}

