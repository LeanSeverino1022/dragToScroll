/**
 * @touchScroll - touch dragging
 * yihseverino@gmail.com
 *todo: create a class - DONE
*TODO: getElementByID to getElementByClassName for multiple elements
 
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
            this.mScrollWholePage = false;
        }            
    }

    enableScroll() {
        
        var scrollWholePage = this.mScrollWholePage;
        var scrollableArea = this.mScrollableArea;
        var obj = this.mObj;
        var isMouseDown = this.mIsMouseDown;
        var currentXPos= this.mCurrentXPos;
        var currentYPos = this.mCurrentYPos;
        var speed = this.mSpeed;
     

        window.addEventListener("load", function (event) {              
            if (scrollWholePage) {                           
                obj = window;
            } else {
                if (document.getElementById(scrollableArea) !== null) {
                    obj = document.getElementById(scrollableArea);
                } else {
                    alert("can't find obj with id attribute value: '" + scrollableArea + "'");
                }
            }

            function pressed(e) {
                isMouseDown= true;
                currentXPos = e.pageX;
                currentYPos = e.pageY
            }

            function drag(e) {
                if (isMouseDown === true) {
                    if (scrollWholePage) {
                        obj.scrollTo(document.body.scrollLeft + (currentXPos- e.pageX), document.body.scrollTop + (currentYPos - e.pageY));
                    }
                    else /*if only part of a page like a div*/ {
                        obj.scrollLeft = obj.scrollLeft + (currentXPos - e.pageX) * speed; //not tested yet
                        obj.scrollTop = obj.scrollTop + (currentYPos - e.pageY) * speed;
                    }
                }
            }

            if (obj) {
                obj.addEventListener('mousedown', pressed);
                obj.addEventListener('mouseup', function (e) { isMouseDown = false; });
                obj.addEventListener('mousemove', drag);
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
