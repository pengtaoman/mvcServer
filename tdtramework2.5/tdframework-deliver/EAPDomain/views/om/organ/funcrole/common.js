	var n,CheckBoxs;
	function _CheckBox_getParentNode(){
		var sNodeName=this.name;
		var nParentNodeIndex=sNodeName.lastIndexOf("_");
		if (nParentNodeIndex){
			var sParentNodeName=sNodeName.substring(0,nParentNodeIndex);
			for(i in CheckBoxs)
				if(CheckBoxs[i].name==sParentNodeName)
			 return CheckBoxs[i];
		}
	}

	function _CheckBox_hasChildChecked(){
		var sNodeName=this.name+"_";
		for(i in CheckBoxs)
			if(CheckBoxs[i].name.indexOf(sNodeName)==0&&CheckBoxs[i].checked)
				return true;
		return false;
	}

	function _CheckBox_checkAllChildNodes(){
		var sNodeName=this.name;
		for(i in CheckBoxs){
			if(CheckBoxs[i].name.indexOf(sNodeName)==0&&CheckBoxs[i]!==this)
				CheckBoxs[i].checked=this.checked;
		}
	}

	function CheckAll(CheckBox){
	//	alert (CheckBox.name);
	//	return;
		CheckBox.checkAllChildNodes();
		var parentNode=CheckBox.getParentNode();
		while (parentNode){
			parentNode.checked=parentNode.hasChildChecked();
			parentNode=parentNode.getParentNode();
		}
	}

	function imageGrantClick(obj,webpath)
	{
		var tt,stt,flag,mystrID,str_img;
		tt=obj.id;
		mystrID=tt.substring(0,tt.length-5);//去除_imgG,_spnG等后缀 
		str_img=mystrID+"_imgG";
		if(document.formGrant.all.item(mystrID+'G').style.display=="block" )
		{
			document.formGrant.all.item(mystrID+'G').style.display="none";
			document.formGrant.all.item(str_img).src=webpath+"/views/common/images/close.gif";
		}
			//当还有下层菜单展开时,将其折叠.
		else
		{
			document.formGrant.all.item(mystrID+'G').style.display="block";
			document.formGrant.all.item(str_img).src=webpath+"/views/common/images/open.gif";
		}
	}

	function imageExecClick(obj,webpath)
	{
		var tt,stt,flag,mystrID,str_img;
		tt=obj.id;
		mystrID=tt.substring(0,tt.length-5);//去除_imgE,_spnE等后缀 
		str_img=mystrID+"_imgE";
		if(document.formExec.all.item(mystrID+'E').style.display=="block" )
		{
			document.formExec.all.item(mystrID+'E').style.display="none";
			document.formExec.all.item(str_img).src=webpath+"/views/common/images/close.gif";
		}
			//当还有下层菜单展开时,将其折叠.
		else
		{
			document.formExec.all.item(mystrID+'E').style.display="block";
			document.formExec.all.item(str_img).src=webpath+"/views/common/images/open.gif";
		}
	}
	//全部展开
	function bGrantFolderAllOffClick(bolValue,webpath){
//		alert (bolValue);
		var i;
		if (bolValue)
		{
			for (i=0;i<document.formGrant.all.tags("div").length;i++){
				if (document.formGrant.all.tags("div")[i].id!='')
					document.formGrant.all.tags("div")[i].style.display='none';
			}
			for (i=0;i<document.formGrant.all.tags("img").length;i++){
				if (document.formGrant.all.tags("img")[i].id.lastIndexOf('_img')>0){
					document.formGrant.all.tags("img")[i].src=webpath+'/views/common/images/close.gif';
				}
			}
		}
		else
		{
			for (i=0;i<document.formGrant.all.tags("div").length;i++){
				if (document.formGrant.all.tags("div")[i].id!='')
					document.formGrant.all.tags("div")[i].style.display='block';
			}
			for (i=0;i<document.formGrant.all.tags("img").length;i++){
				if (document.formGrant.all.tags("img")[i].id.lastIndexOf('_img')>0){
					document.formGrant.all.tags("img")[i].src=webpath+'/views/common/images/open.gif';
				}
			}
		}
	}
	function bExecFolderAllOffClick(bolValue,webpath){
		var i;
		if (bolValue)
		{
			for (i=0;i<document.formExec.all.tags("div").length;i++){
				if (document.formExec.all.tags("div")[i].id!='')
					document.formExec.all.tags("div")[i].style.display='none';
			}
			for (i=0;i<document.formExec.all.tags("img").length;i++){
				if (document.formExec.all.tags("img")[i].id.lastIndexOf('_img')>0){
					document.formExec.all.tags("img")[i].src=webpath+'/views/common/images/close.gif';
				}
			}	
		}
		else
		{
			for (i=0;i<document.formExec.all.tags("div").length;i++){
				if (document.formExec.all.tags("div")[i].id!='')
					document.formExec.all.tags("div")[i].style.display='block';
			}
			for (i=0;i<document.formExec.all.tags("img").length;i++){
				if (document.formExec.all.tags("img")[i].id.lastIndexOf('_img')>0){
					document.formExec.all.tags("img")[i].src=webpath+'/views/common/images/open.gif';
				}
			}	
		}
	}
	//根据bolValue的值设置授权权限的选择
	function bGrantSelectAllClick(bolValue){
		for(var i=0;i<document.formGrant.all.tags("input").length;i++){
			if (document.formGrant.all.tags("input")[i].type=='checkbox'&&document.formGrant.all.tags("input")[i].name.indexOf('ckb')==0)
				document.formGrant.all.tags("input")[i].checked=bolValue;
		}
	}
	function bExecSelectAllClick(bolValue){
		for(var i=0;i<document.formExec.all.tags("input").length;i++){
			if (document.formExec.all.tags("input")[i].type=='checkbox'&&document.formGrant.all.tags("input")[i].name.indexOf('ckb')==0)
				document.formExec.all.tags("input")[i].checked=bolValue;
		}
	}