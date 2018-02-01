
var intervalID;

document.getElementById("start-btn").addEventListener("click", workTimer);
document.getElementById("stop-btn").addEventListener("click", stopTimer);
document.getElementById("reset-btn").addEventListener("click", resetTimer);

function workTimer(){
    // Update the count down every 1 second
    let totalTime = 10;
    intervalID = setInterval(function() {
        
        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor(totalTime / 60);
        var seconds = Math.floor(totalTime % 60);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        // Output the result in an element with id="work-time"
        document.getElementById("work-time").innerHTML = minutes + ":" + seconds;

        totalTime--;

        document.getElementById("message").innerHTML = "Work";
        
        // If the count down is over, write some text 
        if (totalTime < 0) {
            clearInterval(intervalID);
            breakTimer();
        }
    }, 1000);
}

function breakTimer(){
    // Update the count down every 1 second
    let totalTime = 5;
    intervalID = setInterval(function() {
        
        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor(totalTime / 60);
        var seconds = Math.floor(totalTime % 60);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        // Output the result in an element with id="work-time"
        document.getElementById("work-time").innerHTML = minutes + ":" + seconds;

        totalTime--;

        document.getElementById("message").innerHTML = "Break";
        
        // If the count down is over, write some text 
        if (totalTime < 0) {
            clearInterval(intervalID);
            workTimer();
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(intervalID);
    document.getElementById("message").innerHTML = "Stop";
}

function resetTimer(){
    clearInterval(intervalID);
    totalTime = 10;
    document.getElementById("work-time").innerHTML = "25:00";
    document.getElementById("message").innerHTML = "Reset";
}




