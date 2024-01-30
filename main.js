song = "";
left_wristx = 0;
left_wristy = 0;

right_wristx = 0;
right_wristy = 0;

right_wrist_score = 0 ; 
left_wrist_score = 0;

function preload(){
  song = loadSound("music.mp3");
}

function draw(){
    image(video ,0,0,600,500);
    fill('yellow');
    stroke('black');
    if (right_wrist_score > 0.2) {
        circle(right_wristx , right_wristy , 20);
        if (right_wristy>0 && right_wristy<=100) {
            document.getElementById("Speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if (right_wristy>100 && right_wristy<=200){
            document.getElementById("Speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if (right_wristy>200 && right_wristy<=300){
            document.getElementById("Speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if (right_wristy>300 && right_wristy<=400){
            document.getElementById("Speed").innerHTML="Speed = 2x";
            song.rate(2);
        }
        else if (right_wristy>400 && right_wristy <=500){
            document.getElementById("Speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
        
    }
    if(left_wrist_score > 0.2){
        circle(left_wristx , left_wristy , 20);
    numberforn = Number(left_wristy);
    decimal_r = floor(numberforn);
    volume = decimal_r/500 ; 
    song.setVolume(volume);
    document.getElementById("Volume").innerHTML ="Volume = " + volume ;
    }
}


function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video , modelloaded);
    posenet.on("pose",gotresults);
}

function modelloaded() {
    console.log("Model is loaded");
}

function gotresults(results) {
    if (results.length > 0 ){
        console.log(results);

        right_wrist_score = results[0].pose.keypoints[10].score;
        console.log("Right Wrist Score"+ right_wrist_score ) ;
        
        left_wrist_score = results[0].pose.keypoints[9].score ; 
        console.log("Left Wrist Score = " + left_wrist_score );

        left_wristx = results[0].pose.leftWrist.x ;
        left_wristy = results[0].pose.leftWrist.y ;
        console.log("Left Wrist X = "+left_wristx+ " Left Wrist Y = "+left_wristy );

        right_wristx = results[0].pose.rightWrist.x ;
        right_wristy = results[0].pose.rightWrist.y ;
        console.log("Right Wrist X = "+right_wristx+ " Right Wrist Y = "+right_wristy );
    }
}

function playing(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}