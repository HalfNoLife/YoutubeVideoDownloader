const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const dl = require("./download-functions")



app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true })); 
app.post('/index', function(req, res) {
    res.sendFile('public/index.html', {root: __dirname })
    if (req.body.audiodl){
        if (req.body.playlistdl){
            dl.downloadaudioplaylist(req.body.mytext)
        } else {
            dl.downloadaudio(req.body.mytext)
        }
    } else {
        if (req.body.playlistdl){
            dl.downloadvideoplaylist(req.body.mytext)
        } else {
            dl.downloadvideo(req.body.mytext)
        }
    };
});

app.listen(port, () => {
    console.log("Local host started, go on port "+port+". Go on http://localhost:"+port+"/index.html to start downloading your videos! test")
})

