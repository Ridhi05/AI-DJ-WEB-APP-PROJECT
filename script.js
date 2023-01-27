song="";
function preload(){
    song=loadSound("Music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(600,500);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    
}
function modelLoaded(){
    console.log("PoseNet is Initialised");
}
rightWristX=0;
rigthWristY=0;
leftWristX=0;
leftWristY=0;
function gotPoses(results){
if(results.length>0){
    console.log(results);
leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
console.log("Left Wrist X="+leftWristX+"Left Wrist Y="+leftWristY);
console.log("Right Wrist X="+rightWristX+"Right Wrist Y="+rightWristY);
leftWristScore=results[0].pose.keypoints[9].score;

}
}
leftWristScore=0;

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("black");
    circle(leftWristX,leftWristY,20);
if(leftWristScore>0.2){
    number=Number(leftWristY);
    remove_decimal=floor(number);
    volume=remove_decimal/500;
    document.getElementById("volume1").innerHTML="Volume= "+volume;
    song.setVolume(volume);
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}