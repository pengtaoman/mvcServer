// defines images for buttons the "push" effect
function swap(oGif, sMode) {
	eval("oGif.src="+oGif.id+"_"+sMode+".src;");
}

function defineButtons(aButtons, aModes, sPrefix) { // enables the Img objects for the buttons
	var i, ii, btnStr;
	for ( i=0; i<aButtons.length; i++ )
		for ( ii=0; ii<aModes.length; ii++ ) {
			btnStr = aButtons[i]+"_btn_"+aModes[ii];
			eval(btnStr+" = new Image(); "+ btnStr +".src = '"+ sPrefix +"_"+aButtons[i]+"_"+aModes[ii]+".gif';");
		}
}



var currentKey = '';
var timeoutID;
function toggleNavBarMenu(aUrls, aLabels, iNumLinks, aGroupKey) {
	
	var oTargetDoc = document; // display menu in nav frame.
	
	var oCont = oTargetDoc.getElementById(aGroupKey);
	
	if (oTargetDoc.getElementById(currentKey)) {
		
		oTargetDoc.getElementById(currentKey).style.display = "none";
		timeoutID = clearTimeout(timeoutID);
		if (currentKey == aGroupKey) {
			currentKey = '';
			return;
		}
	}
	
	currentKey = aGroupKey;
	timeoutID = setTimeout('toggleNavBarMenu(null, null, 1, currentKey)', 15000);
	
	if (iNumLinks < 1) {
		iNumLinks = 1;	
	}
	
	if ( ! oCont ) {
		
		oCont = oTargetDoc.createElement("DIV");
		oCont.id = aGroupKey;
		oCont.style.textAlign="right";
		
	} else {
		
		if ( oCont.style.display == "block" ) {
			oCont.style.display = "none";
		} else {
			oCont.style.display = "block";
			oCont.style.top = 18;
			oCont.style.Right = 0;
		}
		return;
	}
	
	var oTable = oTargetDoc.createElement("TABLE");
	var oCell, oRow, i, oLabel, oLink;
	oTable.cellPadding=2;
	oTable.cellSpacing=0;
	oTable.id = "navBarDropDown";
	
	oRow = oTable.insertRow(-1);
	
	for ( i=0; i<aUrls.length; i++ ) {
		oCell = oRow.insertCell(0);
		oCell.id = "navBarDropDown";
		oCell.style.textAlign="right";
		oCell.style.height=1;
		
		oLink = oTargetDoc.createElement("A");
		oLink.style.margin=0;
		
		oLabel = oTargetDoc.createTextNode(aLabels[i]);
		
		oLink.href = aUrls[i];
		oLink.target = "workpane";
		oLink.insertBefore(oLabel, null);
		oCell.insertBefore(oLink, null);
		
	}
	
	// First cell in table
	oCell = oRow.insertCell(0);
	oCell.id = "navBarMenuCap";
	
	oCont.insertBefore(oTable, null);
	
	oCont.style.position = "absolute";
	
	oCont.style.top = 18;
	oCont.style.right = 0;
	oCont.style.display = "block";
	
	oTargetDoc.body.insertBefore(oCont, null);
}
