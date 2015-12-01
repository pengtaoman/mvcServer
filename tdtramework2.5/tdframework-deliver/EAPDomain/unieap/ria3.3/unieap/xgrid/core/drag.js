dojo.provide("unieap.xgrid.core.drag");

// summary:
//	utility functions for dragging as used in grid.
// begin closure
(function() {

	var ugdrag = unieap.xgrid.drag = {};
	
	ugdrag.dragging = false;
	ugdrag.hysteresis = 2;
	
	ugdrag.capture = function(inElement) {
		if(dojo.isIE && (dojo.isIE != 9)){
			if (inElement.setCapture)
			inElement.setCapture();
		} else {
			document.addEventListener("mousemove", inElement.onmousemove, true);
			document.addEventListener("mouseup", inElement.onmouseup, true);
			document.addEventListener("click", inElement.onclick, true);
		}
	}
	
	ugdrag.release = function(inElement) {
		if(dojo.isIE && (dojo.isIE != 9)){
			if(inElement.releaseCapture) {
				inElement.releaseCapture();
			} 
		} else {
			document.removeEventListener("click", inElement.onclick, true);
			document.removeEventListener("mouseup", inElement.onmouseup, true);
			document.removeEventListener("mousemove", inElement.onmousemove, true);
		}
		ugdrag.events.release();
	}
	
	ugdrag.start = function(obj) {
		var inElement = obj.inElement,
			inOnDrag = obj.inOnDrag,
			inOnEnd = obj.inOnEnd,
			inOnRelease = obj.inOnRelease,
			inEvent = obj.inEvent,
			inOnStart = obj.inOnStart;
		if(!inElement || ugdrag.dragging) {
			return;
		}
		ugdrag.dragging = true;
		ugdrag.elt = inElement;
		ugdrag.events = {
			drag: inOnDrag , 
			end: inOnEnd || unieap.xgrid.nop, 
			release: inOnRelease || unieap.xgrid.nop, 
			start: inOnStart || unieap.xgrid.nop, 
			oldmove: inElement.onmousemove, 
			oldup: inElement.onmouseup, 
			oldclick: inElement.onclick 
		};
		ugdrag.positionX = (inEvent && ('screenX' in inEvent) ? inEvent.screenX : false);
		ugdrag.positionY = (inEvent && ('screenY' in inEvent) ? inEvent.screenY : false);
		ugdrag.started = (ugdrag.position === false);
		inElement.onmousemove = ugdrag.mousemove;
		inElement.onmouseup = ugdrag.mouseup;
		inElement.onclick = ugdrag.click;
		ugdrag.capture(ugdrag.elt);
	}
	
	ugdrag.end = function() {
		ugdrag.release(ugdrag.elt);
		ugdrag.elt.onmousemove = ugdrag.events.oldmove;
		ugdrag.elt.onmouseup = ugdrag.events.oldup;
		ugdrag.elt.onclick = ugdrag.events.oldclick;
		ugdrag.elt = null;
		ugdrag.started && ugdrag.events.end();
		ugdrag.dragging = false;
	}
	
	ugdrag.calcDelta = function(inEvent) {
		inEvent.deltaX = inEvent.screenX - ugdrag.positionX;
		inEvent.deltaY = inEvent.screenY - ugdrag.positionY;
	}
	
	ugdrag.hasMoved = function(inEvent) {
		return Math.abs(inEvent.deltaX) + Math.abs(inEvent.deltaY) > ugdrag.hysteresis;
	}
	
	ugdrag.mousemove = function(inEvent) {
		inEvent = dojo.fixEvent(inEvent);
		dojo.stopEvent(inEvent);
		ugdrag.calcDelta(inEvent);
		if((!ugdrag.started)&&(ugdrag.hasMoved(inEvent))) {
			ugdrag.events.start(inEvent);
			ugdrag.started = true;
		}
		if(ugdrag.started){
			ugdrag.events.drag(inEvent);
		}
	}
	
	ugdrag.mouseup = function(inEvent) {
		dojo.stopEvent(dojo.fixEvent(inEvent));
		ugdrag.end();
	}
	
	ugdrag.click = function(inEvent) {
		dojo.stopEvent(dojo.fixEvent(inEvent));
	}

})();
// end closure
