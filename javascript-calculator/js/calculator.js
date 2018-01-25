
var keys = document.querySelectorAll('#calculator span');
var clear = false;

for(var i=0; i<keys.length; i++){
	keys[i].onclick = function(e){
		var input = document.querySelector(".screen");
		var inputVal = input.innerHTML;
		var buttonVal = this.innerHTML;

		if(buttonVal == "C"){
			input.innerHTML = "";
		}

		if(buttonVal != "C" && buttonVal != "=" && clear == false){
			if(input.innerHTML.length <= 18){
				input.innerHTML += buttonVal;
				clear = false;
			}
		} else if(buttonVal != "C" && buttonVal != "=" && clear == true){
			if(input.innerHTML.length <= 18){
				input.innerHTML = "";
				input.innerHTML += buttonVal;
				clear = false;
			}
		}

		if(buttonVal == "="){
			clear = true;
			if(inputVal[0] != "*" && inputVal[0] != "/"){
				input.innerHTML = eval(inputVal);
			} else {
				input.innerHTML = "ERROR!";
			}
		}
		e.preventDefault();
	}
}