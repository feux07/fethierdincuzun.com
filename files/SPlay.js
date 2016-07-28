var audio, videoBox, seekStick, rate, x = 0, y = 0, svg_seek, time, ratio, video, playBtn,image, imageWidth;

window.onload = init; //pencere açılır açılmaz init() fonksiyonu çağrılıyor
window.onresize = init; //window resizing olaylarında koordinatlar değiştiği için init yeniden çağrılıyor

function init() {
    

    videoBox = document.getElementById("video_player_box");
    video = document.getElementById("videofile");
    audio = document.getElementById("audio");

    
    image = document.getElementById("image");
    svg_seek = document.getElementById("svg_seek");
    seekStick = document.getElementById("line");

    window.addEventListener("keydown", checkKey, false);
    video.addEventListener("timeupdate", seekProgress, false);
    video.addEventListener("click", playPause, false);
    image.addEventListener("click", getCoordinate, false);


    imageWidth = image.width;
    videoScale();

    window.oncontextmenu = function () {//sağ tık işlevini kapat
        return false;
    };


}


function videoScale()
{
    videoBox.height = window.outerHeight;

    if (window.innerWidth < 160) {
        video.width = 80;

    }
    else if (window.innerWidth < 320) {
        video.width = 160;

    }
    else if (window.innerWidth < 480) {
        video.width = 320;

    }
    else if (window.innerWidth < 640) {
        video.width = 480;
    }
    else if (window.innerWidth < 800) {
        video.width = 640;

    }
    else if (window.innerWidth < 1000) {
        video.width = 800;
    }
    else
        video.width = 960;


}

function checkKey(e) {
    var code = e.keyCode;
    e.preventDefault();
    if (code == 32) { //32 matches Tab Button for PLay/Pause
        playPause();
    }
    else if (code == 38) {
        audio.volume += 0.1;
    }
    else if (code == 40) {
        audio.volume -= 0.1;

    }

}
function playPause() {//oynat/durdur
    if (video.paused) {
        video.play();
        audio.play();

        playBtn.innerHTML = "Pause";
    }
    else
    {
        video.pause();
        audio.pause();
        playBtn.innerHTML = "Play";
    }
}

function getCoordinate(event) { //seekslider olarak kullanılan resme tıklandığında koordinatları veriyor


    x = event.x;
    y = event.y;

    if (event.x != undefined && event.y != undefined)
    {
        x = event.x;
        y = event.y;

    }
    else // Firefox method to get the position
    {
        x = event.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;

    }

    x -= image.offsetLeft;
    y -= image.offsetTop;

    ratio = Math.abs((x / imageWidth) * 100);
    time = (ratio * video.duration) / 100;

    video.currentTime = time;
    audio.currentTime = time;



}
function seekProgress() {

    drawSeekStick();

}
function drawSeekStick() {//oynatılan videonun neresinde olduğumuzu gösteren çubuğun yerini güncelliyor 
    rate = (image.width / video.duration) * video.currentTime;
    seekStick.setAttribute("x1", rate);
    seekStick.setAttribute("x2", rate);
}



