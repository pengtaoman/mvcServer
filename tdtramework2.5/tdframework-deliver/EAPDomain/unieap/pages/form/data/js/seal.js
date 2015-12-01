function verifySeal(sealName){
	var seal = document.getElementById(sealName);
	if(seal.VerifyDoc()){
		return true;
	}else{
		seal.ShowView();
		return false;
	}
}

function getContentData(sealName){ 
        var seal = document.getElementById(sealName+"_object");
	var signedFields = document.getElementsByName(sealName)[0].signedfields;
	if(!signedFields){
		return ;
	}
	fieldNames = signedFields.split(",");
	var value="";
	if(fieldNames){
		for(j=0;j<fieldNames.length;j++){
			if(j==0){
				value = document.getElementsByName(fieldNames[j])[0].value;
			}else{
				value = document.getElementsByName(fieldNames[j])[0].value +";" + value;
			}
		}
		seal.ContentData = value;
	}
}

function signCompleted(sealName){
    var hidden = document.getElementsByName(sealName)[0];
	var seal = document.getElementById(sealName+"_object");
	hidden.value = seal.SaveToString();
	//document.getElementsByName("textarea1")[0].value = hidden.value;
}

function sealMoveCompleted(sealName,X,Y){
	var parentDiv = document.getElementById(sealName+"_div");
	parentDiv.style.posLeft = parentDiv.style.posLeft + X;
        parentDiv.style.posTop = parentDiv.style.posTop + Y;  
}

function sealAreaSizeComplete(ID) {
  var seal = document.getElementById(ID);
  var parentDiv = document.getElementById(ID+"_div");
  seal.style.posWidth = seal.Width;
  seal.style.posHeight = seal.Height;
  
  parentDiv.style.posWidth = seal.Width;
  parentDiv.style.posHeight = seal.Height;
  
}

function loadSignedString(sealName){
	var value = document.getElementsByName(sealName)[0].value;
	value = value.replace("&#47;","/");
	var seal = document.getElementById(sealName+"_object");
	seal.LoadFromString(value);
	//parent.document.getElementsByName("textarea1")[0].value = value
}
function loadSeal(sealName,width,height){
	getContentData(sealName);
	loadSignedString(sealName);
	//document.getElementById(sealName+"_object").ShapeName=sealName+"_object";
	//document.getElementById(sealName+"_object").Widht = width;
	//document.getElementById(sealName+"_object").Height = height;
}