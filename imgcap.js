var mImgCap;
var mStream;
var video = document.getElementById('videoElement');
var resultImg = document.getElementById('resultImg');
var videoout = document.createElement('video');
//var imageout = document.createElement('img');

function getVideoTag() {
  video.src = "huhu.webm";
  //videoout.mozSrcObject = video.mozCaptureStreamUntilEnded();
  mStream = video.mozCaptureStreamUntilEnded();
  video.play();
  //document.body.appendChild(videoout);
  //videoout.play();

}

function getFakegUM() {
  navigator.mozGetUserMedia(
              { video:true, fake:true },
              function(s) {
                video.mozSrcObject = s;
                video.play();
                mStream = s;
                document.getElementById('msInput').value  = mStream;
              },
              function(e) {dump(e)});

}

function showPic(e) {
  dump('== Success on takePhoto ==');
  resultImg.src = URL.createObjectURL(e.data);
  resultImg.style.visibility = "visible";
}

function errorcb(e) {
  alert(e);
}

function takePic() {
  mImgCap = new ImageCapture(mStream.getVideoTracks()[0]);
  if (mImgCap) {
    mImgCap.onphoto = showPic;
    mImgCap.onerror = errorcb;
    mImgCap.takePhoto();
    //imageout.src = URL.createObjectURL(mStream.getVideoTracks()[0]);
    //document.body.appendChild(imageout);
  } else {
    dump('## Fail to initialize the ImageCapture ##');
  }
}

window.onload = function() {
  document.getElementById('playVideoTag').onclick = function() { getVideoTag(); };
  document.getElementById('playFakegUM').onclick = function() { getFakegUM(); };
  document.getElementById('takePhoto').onclick = function() { takePic(); };
  resultImg.style.visibility = "hidden";
};
