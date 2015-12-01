
function autoResizeIframe(iframeObj) {
	try {
		iframeObj.style.height=iframeObj.contentWindow.document.body.scrollHeight;
	} catch (e) {
		//iframeObj.style.height='100%';
	}
}

/*
function autoResizeIframe2(iframeId) {
	try {
			var s="document.all[\""+iframeId+"\"].style.height="+iframeId+".document.body.scrollHeight";
			eval(s);
	} catch (e) {
	}
}


function autoResizeIframe(iframeObj) {
	try {
		return iframeObj.document.body.scrollHeight;
	} catch (e) {
		return '100%';
	}
}
*/
