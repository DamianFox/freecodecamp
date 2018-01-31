
// Set the time in seconds we're counting down to
var totalTime = 25*60;

// Update the count down every 1 second
var x = setInterval(function() {
    
    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor(totalTime / 60);
    var seconds = Math.floor(totalTime % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    // Output the result in an element with id="work-time"
    document.getElementById("work-time").innerHTML = minutes + ":" + seconds;

    totalTime--;
    
    // If the count down is over, write some text 
    if (totalTime < 0) {
        clearInterval(x);
        document.getElementById("work-time").innerHTML = "EXPIRED";
    }
}, 1000);




