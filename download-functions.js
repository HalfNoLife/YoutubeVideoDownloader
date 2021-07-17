const ytdl=require("ytdl-core");
const fs=require("fs");
const ytpl = require('ytpl');
async function downloadaudio(url){
    try{
        var stream =ytdl(url,{filter:"audioonly"})
        stream.on("info", (info) => {    
            stream.pipe(fs.createWriteStream("./Downloads/"+(info.videoDetails.title).replace(/[^a-z0-9]/gi, '_').toLowerCase()+".wav"));
            console.log(info.videoDetails.title+" was downloaded"); 
        }).on("error",(error)=>{
            console.log(error)
        })
    } catch {
        console.log("Something went wrong while downloading an audio file, make sure you specified a valid URL")
    }
}

function downloadvideo(url){
    try {
        var stream =ytdl(url)
        stream.on("info", (info) => {    
            stream.pipe(fs.createWriteStream("./Downloads/"+(info.videoDetails.title).replace(/[^a-z0-9]/gi, '-').toLowerCase()+".mp4"));
            console.log(info.videoDetails.title+" was downloaded"); 
        }).on("error",(error)=>{
            console.log(error)
        })
    } catch {
        console.log("Something went wrong while downloading a video file, make sure you specified a valid URL")
    }
}


function downloadvideoplaylist(url){
    if(url.startsWith("https://www.youtube.com/playlist?list=")){
        id=""
        for(i=0;i<url.length-38;i++){
            id=id+url[i+38]
        }
    } else {
        console.log("The url should start with 'https://www.youtube.com/playlist?list='")
    }
    results=[]
    ytpl(id).then(playlist => {
        for(i=0;i<playlist.items.length;i++){
            downloadvideo("https://www.youtube.com/watch?v="+playlist.items[i].id)
            console.log("https://www.youtube.com/watch?v="+playlist.items[i].id)
        }
      }).catch(err => {
        console.error(err);
      });
}


function downloadaudioplaylist(url){
    if(url.startsWith("https://www.youtube.com/playlist?list=")){
        id=""
        for(i=0;i<url.length-38;i++){
            id=id+url[i+38]
        }
    } else {
        console.log("The url should start with 'https://www.youtube.com/playlist?list='")
    }
    results=[]
    ytpl(id,{limit:Infinity}).then(playlist => {
        for(i=0;i<playlist.items.length;i++){
            downloadaudio("https://www.youtube.com/watch?v="+playlist.items[i].id)
            console.log("https://www.youtube.com/watch?v="+playlist.items[i].id)
        }
      }).catch(err => {
        console.error(err);
      });
}


module.exports= {downloadaudio,downloadvideo,downloadaudioplaylist,downloadvideoplaylist}