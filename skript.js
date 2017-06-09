
let curXPos = 0;
let curYPos = 0;
let curDown = false;
let speed = .10;

var scrollableEl = document.getElementById("my");

var element = document.querySelector('h2');

// console.log(scrollableEl.length);

// if (scrollableEl.length < 0) {                          
//        alert("Element does not exist");
// }

function drag(e) {

 	// alert(e.pageX);
 	curDown = true;
 	curXPos = e.pageX;
 	curYPos = e.pageY
}

function scroll(e, speed) {

	if(curDown === true ) {
		speed = .1;
		
		scrollableEl.scrollTop = scrollableEl.scrollTop + (curYPos - e.pageY) * speed;

	
		// element.innerHTML = scrollableEl.scrollTop;
		// console.log();
		// scrollableEl[0].scrollTo(scrollableEl[0].scrollLeft + (curXPos - e.pageX), scrollableEl[0].scrollTop + (curYPos - e.pageY));
	}
}

scrollableEl.addEventListener('mousedown', drag);
scrollableEl.addEventListener('mouseup', function(e) {
	curDown = false;
});


scrollableEl.addEventListener('mousemove', function(e){

	scroll(e, .10)
});
// resources:
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX
// https://www.w3schools.com/jsref/met_win_scrollto.asp