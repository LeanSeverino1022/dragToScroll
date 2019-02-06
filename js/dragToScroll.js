/**
 * @touchScroll - touch dragging
 * yihseverino@gmail.com
 * 
 * TODO:
 * 
 *done: CREATAE A CLASS
 *done: getElementByID to getElementByClassName for multiple elements - DONE
 *fix: make whole page scrollable
 *done: IMPROVE DEMO PAGE (HTML/CSS)
 *fix: refactor js
 *TODO: determine if I need whole page scrolling...
 */



"use strict";

class TouchScroll {

    constructor( scrollableArea, speed ) {
       
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
                if (document.getElementsByClassName(scrollableArea).length) {
                    obj = document.getElementsByClassName(scrollableArea);
                    
                } else {
                    debugger;
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




// resources:
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX
// https://www.w3schools.com/jsref/met_win_scrollto.asp
