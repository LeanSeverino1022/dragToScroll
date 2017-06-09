/**
 * @touchScroll - touch dragging
 * yi
 *todo: class, multiple scrollable areas
 */

// modify if needed
var speed = .80;
var scrollWholePage = false;

var currentXPos = 0;
var currentYPos = 0;
var isMouseDown = false;

var obj;

window.addEventListener("load", function(event) {
    console.log("All resources finished loading!");
  
  	if(scrollWholePage) {
		obj = window;
	} else {  
   	  	obj = document.getElementById("scrollables");         
	}	

    function pressed(e) { 	 
        isMouseDown = true;
        currentXPos = e.pageX;
        currentYPos = e.pageY
    }

  	function drag(e) 
  	{	
        if(isMouseDown === true ) 
        {
            if(scrollWholePage) 
            {        
                obj.scrollTo(document.body.scrollLeft + (currentXPos - e.pageX), document.body.scrollTop + (currentYPos - e.pageY));
            } 
            else /*if only part of a page like a div*/
            {          
                obj.scrollLeft = obj.scrollLeft + (currentXPos - e.pageX) *speed; //not tested yet
                obj.scrollTop = obj.scrollTop + (currentYPos - e.pageY)* speed;
            }
        }
	}

	if(obj) {  
      
      	obj.addEventListener('mousedown', pressed);

		obj.addEventListener('mouseup', function(e) {
			isMouseDown = false;
		});

		obj.addEventListener('mousemove', drag);
	}

});