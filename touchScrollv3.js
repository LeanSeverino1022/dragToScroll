/**
 * @touchScroll - touch dragging
 * yihseverino@gmail.com
 *TODO: CREATAE A CLASS - DONE
 *TODO: getElementByID to getElementByClassName for multiple elements - DONE
 *TODO: srollable  window object
 *TODO: IMPROVE DEMO PAGE (HTML/CSS)
 */

// NOTE:   SCROLLABLE AREA SHOULD BE ID (change later to class)

"use strict";

class TouchScroll {

    constructor( speed, scrollableArea ) {
       
        this.mScrollWholePage = true;
        this.mCurrentXPos = 0;
        this.mCurrentYPos = 0;
        this.mIsMouseDown = false;
        this.mObj = null;

        // if speed is omitted, set to default of .20
        this.mSpeed = speed || .20
        
        // if "scrollableArea" is omitted then scrollableArea = window obj
        if(scrollableArea === undefined ) {
            this.mScrollWholePage = true;
        }
        else {            
            this.mScrollableArea = scrollableArea;
            // if scrollableArea is defined, disable whole page scrolling
            this.mScrollWholePage = false;
        }            
    }

    enableScroll() {
        
        let scrollWholePage = this.mScrollWholePage;
        let scrollableArea = this.mScrollableArea;
        let obj = this.mObj;
        let isMouseDown = this.mIsMouseDown;
        let currentXPos= this.mCurrentXPos;
        let currentYPos = this.mCurrentYPos;
        let speed = this.mSpeed;
     

        window.addEventListener("load", function (event) {              
            // set our scrollable obj
            if (scrollWholePage) {               
                obj = window;
            } else {
                if (document.getElementsByClassName(scrollableArea) !== null) {
                    obj = document.getElementsByClassName(scrollableArea);
                } else {
                    alert("can't find obj with id attribute value: '" + scrollableArea + "'");
                }
            }   


            function pressed(e) {
                // console.log("pressed");
                isMouseDown= true;
                currentXPos = e.pageX;
                currentYPos = e.pageY
            }

            function drag(e, el) {
                console.log(el);
                if (isMouseDown === true) {
                    if (scrollWholePage) {
                        el.scrollTo(document.body.scrollLeft + (currentXPos- e.pageX), document.body.scrollTop + (currentYPos - e.pageY));
                    }
                    else /*if only part of a page like a div*/ {
                        el.scrollLeft = el.scrollLeft + (currentXPos - e.pageX) * speed; //not tested yet
                        el.scrollTop = el.scrollTop + (currentYPos - e.pageY) * speed;
                    }
                }
            }            

            // if a scrollable obj exists
            if(obj.length >= 1) {
                
                //iterate  and bind an event to each of the elements
                for(let i=0; i<obj.length; i++) {
                   
                    let el = obj[i];
                    obj[i].addEventListener('mousedown', pressed);
                    obj[i].addEventListener('mouseup', function(e) { isMouseDown = false; });
                    obj[i].addEventListener('mousemove', function(e) { 
                        console.log(obj[i]);
                        drag(e, el); 
                    });
                }
            }

        });

    } //end enableScroll
    



}

// set desired values
// var speed = .20;
// var scrollWholePage = 1;
// var containerId = "scrollable";

// var currentXPos = 0;
// var currentYPos = 0;
// var isMouseDown = false;

// var obj;


// resources:
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX
// https://www.w3schools.com/jsref/met_win_scrollto.asp
