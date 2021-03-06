// -- pure javascript area --
console.log("load");

guestBookUp = null;
guestDel = null;
function autoplay(){
  var r = confirm("Would You Like To AutoPlay Music?");
  if (r == true) {
      document.getElementById("player").muted = false;
  }
}

// ========== audio control ==========
// λ³μ μ μΈ
document.getElementById("player").volume = 0.4;
var audio = document.getElementById("player");
var playButton = document.getElementById("play");
var playingState = document.getElementById("playingState");
var audioArea = document.getElementsByClassName("audio-area");
console.log(audioArea);

// audio state
var audioPaused = audio.paused;
audio.onplaying = function() {
  audioPaused = true;
};
audio.onpause = function() {
  audioPaused = false;
};
// nowPlaying text
function nowPlaying() {
  playingState.innerHTML = "Now Playing..."
  icoState.innerHTML = "π΅";
}

function audioControl(e) {
  var id = e.target.id;
  console.log("click");
  if(id == "play") {
    if(audioPaused == true){
      audio.pause()
      play.innerHTML = "π€";
      playingState.innerHTML = "paused!!"
      icoState.innerHTML = "βΈ";
    } else if(audioPaused == false) {
      audio.play()
      play.innerHTML = "π€";
      nowPlaying();
    }
  }
  if(id == "muted") {
    audio.muted = !audio.muted;
    if(audio.muted == false) {
      nowPlaying();
    } else {
      playingState.innerHTML = "muted!!"
      icoState.innerHTML = "π";
    }
  }
  if(id == "volumeUp") {
    audio.volume += 0.1;
    playingState.innerHTML = "Volume " + (audio.volume * 100).toFixed() + "%";
    // setTimeout(() => {
    //   nowPlaying(); // λΉλκΈ°μ§μ° μ΄μ
    // }, 3000);
  }
  if(id == "volumeDown") {
    audio.volume -= 0.1;
    playingState.innerHTML = "Volume " + (audio.volume * 100).toFixed() + "%";
    // setTimeout(() => {
    //   nowPlaying(); // λΉλκΈ°μ§μ° μ΄μ
    // }, 3000);
  }
}

// ========== D-Day ==========
const dDay = document.getElementById("dDay");

function diffDay() {
    const masTime = new Date("2022-06-15");
    const todayTime = new Date();
    
    const diff = masTime - todayTime;
    
    const diffDay = Math.floor(diff / (1000*60*60*24));
    const diffHour = Math.floor((diff / (1000*60*60)) % 24);
    const diffMin = Math.floor((diff / (1000*60)) % 60);
    const diffSec = Math.floor(diff / 1000 % 60);
    dDay.innerHTML = 'κΈ°λ§κ³ μ¬κΉμ§, ' + `${diffDay}μΌ ${diffHour}μκ° ${diffMin}λΆ ${diffSec}μ΄`;
}
diffDay();
setInterval(diffDay, 1000);

// ========== canvas ==========
var canvas, context;

function init() {
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");

	context.lineWidth = 2; // μ  κ΅΅κΈ°λ₯Ό 2λ‘ μ€μ 
	context.strokeStyle = "black";

	// λ§μ°μ€ λ¦¬μ€λ λ±λ‘. eλ MouseEvent κ°μ²΄
	canvas.addEventListener("mousemove", function (e) { move(e) }, false);
	canvas.addEventListener("mousedown", function (e) { down(e) }, false);
	canvas.addEventListener("mouseup", function (e) { up(e) }, false);
	canvas.addEventListener("mouseout", function (e) { out(e) }, false);
}

var startX=0, startY=0; // λ§μ°μ€μ λ§μ§λ§ ν¬μΈν° μ’ν
var drawing=false;
function draw(curX, curY) { 
	context.beginPath();
	context.moveTo(startX, startY);
	context.lineTo(curX, curY);
	context.stroke();
}
function down(e) { 
	startX = e.offsetX; startY = e.offsetY;
	drawing = true;
}
function up(e) { drawing = false; }
function move(e) {
	if(!drawing) return; // λ§μ°μ€κ° λλ¬μ§μ§ μμμΌλ©΄ λ¦¬ν΄
	var curX = e.offsetX, curY = e.offsetY;
	draw(curX, curY);	
	startX = curX; startY = curY;
}
function out(e) { drawing = false; }

const currentColor = document.getElementsByClassName("current-color");
function btnEvent(e) {
  id = e.target.id;

  if(id == "btn-black") { context.strokeStyle = "black"; currentColor[0].style.color = "black"; }
  if(id == "btn-red") { context.strokeStyle = "red"; currentColor[0].style.color = "red"; }
  if(id == "btn-green") { context.strokeStyle = "green"; currentColor[0].style.color = "green"; }
  if(id == "btn-blue") { context.strokeStyle = "blue"; currentColor[0].style.color = "blue"; }
  if(id == "btn-clear") { context.clearRect(0, 0, canvas.width, canvas.height);  }
}

// ========== guest book ==========
function guestBook() {
  guestBookUp();
}
function guestDelJs() {
  guestDel();
}

// ========== keyring ==========
function reset_animation() {
  var el = document.getElementById('keyring');
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null; 
}



// -- jQuery area --
$(function() {
  $(".post").on('mouseenter', function(){
    $(".depth2").children().stop().slideDown();
  });
  $(".post").on('mouseleave', function(){
    if($(".post a").hasClass("on")) {
      $(".depth2").children().stop().slideDown();
    } else {
      $(".depth2").children().stop().slideUp();
    }
  $(".depth1").on('click', function() {
    if($(".post a").hasClass("on")) {
      $(".depth2").children().stop().slideDown();
    } else {
      $(".depth2").children().stop().slideUp();
    }
  })
  });

  // loading
  $(".loading").fadeOut(1500);

  //tab nav
  $(".main-nav li a").on('click', function() {
    var link = $(this).parents().attr('data-tab');
    $(".main-nav li a").removeClass("on");
    $(this).addClass("on");
    $(link).siblings().hide();
    $(link).fadeIn();
    if(link == "#diary") {
      $(link).fadeIn().css({
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between"
      });
    }
  })

  //  cont
  $(".cont").click(function() {
    $(this).toggleClass("on");
  })

  // modal
  $(".diarybtn").click(function() {
    var $thisData = $(this).attr("data-tab");
    $($thisData).css('display', 'flex');
  })
  $(".modal").click(function() {
    $(this).hide();
  })

  $(".diary-ico .fa-heart").click(function() {
    $(this).toggleClass("far").toggleClass("fa").css("color", "hotpink");
  });

  // canvas
  $(".btn-area button:nth-of-type(1)").css("box-shadow", "5px 5px 10px #555");
  $(".btn-area button").not("button:nth-of-type(5)").click(function() {
    $(this).not().siblings().css("box-shadow", "none");
    $(this).css("box-shadow", "5px 5px 10px #555");
  })

  function guestBookUp() {
    var guestName = document.getElementById("guest-name").value;
    var guestPwd = document.getElementById("guest-password").value;
    var guestDescVal = document.getElementById("guest-desc").value;
    var guestDate = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0];
    var geustTime = new Date().toTimeString().split(" ")[0];
  
    $("#guest").append("<div class='guest-conts'> <hr> <span>β£</span> <h3>" + guestName + "</h3> <p class='date'>" + guestDate + " " + geustTime +"</p> <p class='g-pwd'>" + guestPwd + "</p> <p class='guest-desc'>" + guestDescVal +"</p> <button onclick='guestDelJs(event)'>μ­μ </button> </div>");

    // console.log(guestName, guestPwd, guestDescVal); 
  }
  function guestDel(e) {
    var delTarget = $(e.target);
    var gPwdChk = prompt("λΉλ°λ²νΈλ₯Ό μλ ₯ν΄μ£ΌμΈμ");
    // console.log($(delTarget).siblings(".g-pwd").text(), gPwdChk);

    if(gPwdChk == $(delTarget).siblings(".g-pwd").text()) {
      $(delTarget).parents(".guest-conts").remove();
    } else {
      alert("λΉλ°λ²νΈκ° νλ¦½λλ€.");
    }

  }
  guestBook = guestBookUp;
  guestDelJs = guestDel;

  // keyring


});