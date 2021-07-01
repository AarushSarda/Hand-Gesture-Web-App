prediction_1 = "" ;
prediction_2 = "" ;

Webcam.set({
   width : 350 ,
   height : 300 ,
   image_format : "png" ,
   png_quality : 90 
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id ='captured_img' src='"+data_uri+"'>";
    })
}

console.log("ML5 Version : " , ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/uQPP2VJrb/model.json" , modelLoaded);

function modelLoaded() {
     console.log("Model Loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first Prediction is " + prediction_1 ;
    speak_data_2 = " and The second Prediction is " + prediction_2 ;
    var utter_this = new SpeechSynthesisUtterance (speak_data_1 + speak_data_2);
    synth.speak(utter_this);
}

function check() {
     img = document.getElementById("captured_img");
     classifier.classify(img,gotResult);
}

function gotResult(error , results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label ;
        prediction_2 = results[1].label ;
        speak();
        if (results[0].label == "Amazing") {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if (results[0].label == "Ok") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if (results[0].label == "Victory") {
            document.getElementById("update_emoji").innerHTML = "&#128406;";
        }
        if (results[0].label == "Hi or Bye") {
            document.getElementById("update_emoji").innerHTML = "&#128075;";
        }
        if (results[1].label == "Amazing") {
            document.getElementById("update_emoji_2").innerHTML = "&#128076;";
        }
        if (results[1].label == "Ok") {
            document.getElementById("update_emoji_2").innerHTML = "&#128077;";
        }
        if (results[1].label == "Victory") {
            document.getElementById("update_emoji_2").innerHTML = "&#128406;";
        }
        if (results[1].label == "Hi or Bye") {
            document.getElementById("update_emoji_2").innerHTML = "&#128075;";
        }
    }
}