var currentIndex = 0
var clock
var audio = new Audio()
var musicList = []
audio.autoplay = true

getMusicList(function(list){
    musicList = list
    loadMusic(list[currentIndex])
})

audio.ontimeupdate = function(){
    console.log(this.currentTime)
    $('.musicbox .progress-now').style.width = (this.currentTime/this.duration)*100 + '%'
    var min = Math.floor(this.currentTime/60)
    var sec = Math.floor(this.currentTime%60) + ''
    sec = sec.length === 2? sec : '0' + sec
    $('.musicbox .time').innerText = min + ':' + sec
}
audio.onended = function() {
    currentIndex = (++currentIndex)%musicList.length
    console.log(currentIndex)
    loadMusic(musicList[currentIndex])
}
$('.musicbox .play').onclick = function(){
    if(audio.paused){
        audio.play()
        this.querySelector('.fas').classList.add('fa-pause')
        this.querySelector('.fas').classList.remove('fa-play')
    }else{
        audio.pause()
        this.querySelector('.fas').classList.add('fa-play')
        this.querySelector('.fas').classList.remove('fa-pause')
    }
}
$('.musicbox .forward').onclick = function(){
    currentIndex = (++currentIndex)%musicList.length
    console.log(currentIndex)
    loadMusic(musicList[currentIndex])
}
$('.musicbox .back').onclick = function(){
    currentIndex = (musicList.length + --currentIndex)%musicList.length
    console.log(currentIndex)
    loadMusic(musicList[currentIndex])
}
$('.musicbox .bar').onclick = function(e){
    var percent = e.offsetX / parseInt(getComputedStyle(this).width)
    audio.currentTime = audio.duration * percent
}
function $(selector){
    return document.querySelector(selector)
}

function getMusicList(callback){
    var xhr = new XMLHttpRequest()
    xhr.open('GET','https://jakeyi.github.io/jirengu/task31/music.json',true)
    xhr.onload = function(){
        if((xhr.status >= 200 && xhr.status <= 304) || xhr.status === 304){
            callback(JSON.parse(this.responseText))
        }else{
            console.log('获取数据失败')
        }
    }
    xhr.onerror = function(){
        console.log('网络异常')
    }
    xhr.send()
}

function loadMusic(musicObj){
    console.log('begin play ',musicObj)
    audio.src = musicObj.src
    $('.musicbox .title').innerText = musicObj.title
    $('.musicbox .author').innerText = musicObj.author
    $('.cover').style.backgroundImage = 'url(' + musicObj.img + ')'
}