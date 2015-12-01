dojo.provide("unieap.grid.view.drag");

// summary:
//	utility functions for dragging as used in grid.
// begin closure
(function() {

var ugdrag = unieap.grid.drag = {};

ugdrag.dragging = false;
ugdrag.hysteresis = 2;

ugdrag.capture = function(inElement) {
//	console.debug('unieap.grid.drag.capture');
	if (inElement.setCapture)
		inElement.setCapture();
	else {
		document.addEventListener("mousemove", inElement.onmousemove, true);
		document.addEventListener("mouseup", inElement.onmouseup, true);
		document.addEventListener("click", inElement.onclick, true);
	}
}

ugdrag.release = function(inElement) {
	//console.debug('unieap.grid.drag.release');
	if(inElement.releaseCapture) {
		inElement.releaseCapture();
	} else {
		document.removeEventListener("click", inElement.onclick, true);
		document.removeEventListener("mouseup", inElement.onmouseup, true);
		document.removeEventListener("mousemove", inElement.onmousemove, true);
	}
	ugdrag.events.release();
}

ugdrag.start = function(inElement, inOnDrag, inOnEnd, inOnRelease, inEvent, inOnStart) {
	if(/*ugdrag.elt ||*/ !inElement || ugdrag.dragging) {
//		console.debug('failed to start drag: bad input node or already dragging');
		return;
	}
	ugdrag.dragging = true;
	ugdrag.elt = inElement;
	ugdrag.events = {
		drag: inOnDrag || unieap.grid.nop, 
		end: inOnEnd || unieap.grid.nop, 
		release: inOnRelease || unieap.grid.nop, 
		start: inOnStart || unieap.grid.nop, 
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
//	console.debug("unieap.grid.drag.end");
	ugdrag.release(ugdrag.elt);
	ugdrag.elt.onmousemove = ugdrag.events.oldmove;
	ugdrag.elt.onmouseup = ugdrag.events.oldup;
	ugdrag.elt.onclick = ugdrag.events.oldclick;
	ugdrag.elt = null;
	try{
		if(ugdrag.started) {
			ugdrag.events.end();
		}
	}finally{
		ugdrag.dragging = false;
	}
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
	//ugdrag.end();
}

})();
// end closure
