 var disabledRadio = '';
 var parentObject = parent.parent.parent;
 
 function init(){
 		var openFlag = myform.openFlagValue.value;
 		//alert(openFlag);
 		if(openFlag!='null' && openFlag.length>0){
 			if (myform.alertMessage.value.length>0)
				alert(myform.alertMessage.value);
	        var myTree = new tree();
	        var bh = new Array();
	        var center = doc.selectNodes("root/create/OrganCenter");
	        var departId = "-1";
	        for(var i = center.nextNode();i != null; i = center.nextNode())
	        {
	            var organId = i.selectNodes("OrganId").nextNode().text;
	            var organName = i.selectNodes("OrganName").nextNode().text;  
	            var organLevel = i.selectNodes("OrganLevel").nextNode().text;
	            var organKind = i.selectNodes("OrganKind").nextNode().text;
	            var belongArea = i.selectNodes("BelongArea").nextNode().text;
	            var ifPermitAdd = i.selectNodes("IfPermitAdd").nextNode().text;
	            var areaLevel = i.selectNodes("AreaLevel").nextNode().text; 
	            
	            bh[0] = new branch(organId,organName,organLevel,organKind,departId,belongArea,ifPermitAdd,areaLevel);
	        }
	        
	        var items = doc.selectNodes("root/create/OrganInfo");
	        for(var i = items.nextNode();i != null; i = items.nextNode())
	        {
	            
	            var organId = i.selectNodes("OrganId").nextNode().text;
	            var organName = i.selectNodes("OrganName").nextNode().text;      
	            var organLevel = i.selectNodes("OrganLevel").nextNode().text;
	            var organKind = i.selectNodes("OrganKind").nextNode().text;
	            var belongArea = i.selectNodes("BelongArea").nextNode().text;
	            var ifHavesub = i.selectNodes("If_havesub").nextNode().text;
	            var ifPermitAdd = i.selectNodes("IfPermitAdd").nextNode().text;
	            var areaLevel = i.selectNodes("AreaLevel").nextNode().text;
	            var intLevel = parseInt(organLevel);
	            
	            if(organKind == "organ"){
	                departId = organId;
	            }
	            var j = intLevel-1;
	            for(j;j<intLevel;j++){
	                if(ifHavesub == 0){ 
	                    bh[j-1].add(new leaf(organName,organId,organLevel,organKind,departId,belongArea,ifPermitAdd,areaLevel));
	                }   
	                else{
	                    bh[j]=new branch(organId,organName,organLevel,organKind,departId,belongArea,ifPermitAdd,areaLevel);
	                    bh[j-1].add(bh[j]);
	                }
	            }
	            
	        }
	        myTree.add(bh[0]);
	        myTree.write();
	        dealtext();
	        
	        if(openFlag == 'areaTree'){
	        	
				parentObject.organdisplayhidden.document.myform.CurrentSelectOrganKind.value='';
				parentObject.organdisplayhidden.document.myform.CurrentSelectOrganId.value='';
				parentObject.organdisplayhidden.document.myform.CurrentSelectDutyId.value='';
				parentObject.organdisplayhidden.document.myform.CurrentSelectBelongArea.value='';
			}
			
			if(disabledRadio!=null && disabledRadio!=''){
				var values = disabledRadio.split(",");
				for(var i=0;i<values.length;i=i+1){
					//alert(values[i]);
					if(values[i] != ''){
						document.getElementById(values[i]).disabled = true;
					}
					//
				}
			}
			
			openAllNode();
 		}		
    }
    
    function tree(){
        this.branches = new Array();
        this.add = addBranch;
        this.get = getLastNode;
        this.write = writeTree;
        
    }
    
    function addBranch(branch){
        this.branches[this.branches.length] = branch;
    }  
      
    function getLastNode(){
        var lastNode = this.branches.length - 1;
        return this.branches[lastNode];
    }   
    
    function writeTree(){
        var treeString = '<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" >';
        treeString += '<tr><td>';
        var numBranches = this.branches.length;
        for (var i=0;i < numBranches;i++)
            treeString += this.branches[i].write();
        treeString +='</td></tr></table>';
        //alert(treeString);
        document.write(treeString);
        //return treeString;
    }
    
    function branch(id, text, level,kind,depart,belongArea,ifPermitAdd,areaLevel){
        this.id = id;
        this.text = text;
        this.level = level;
        this.kind = kind;
        this.depart = depart;
        this.belongArea = belongArea;
        this.ifPermitAdd = ifPermitAdd;
        this.write = writeBranch;
        this.add = addLeaf;
        this.areaLevel = areaLevel;
        this.leaves = new Array();
    }

    function writeBranch(){
        var branchString = '<span class="branch">';
        branchString += '<img src="'+webpath+'/views/common/images/plus.gif" id="I' + this.id + '" onClick="showBranch(\'' + this.id + '\')">'+'</img>';
        branchString +='<input type="radio" id="R'+this.id +'" name="radioGroup" value="'+this.id+'" level="'+this.level+'" kind = "'+this.kind+'" depart = "'+this.depart+'" belongArea = "'+this.belongArea+'" ifPermitAdd = "'+this.ifPermitAdd+'" areaLevel = "'+this.areaLevel+'" onClick ="showBranch(\'' + this.id + '\');checkradio(this);"/><a onClick="test(this)" radioValue= "R'+this.id +'">';
        branchString +='<img border=0 src="'+webpath+'/views/common/images/'+this.kind+'.gif">';
        branchString +='<a onClick="showBranch(\'' + this.id + '\');test(this)" radioValue= "R'+this.id +'">' + this.text;
        branchString += '</a></span>';      
        branchString += '<span style="display:none;" class="leaf" id="' ;
        branchString += this.id + '">';
        
        var numLeaves = this.leaves.length;
        for (var j=0;j< numLeaves;j++) branchString += this.leaves[j].write();
            branchString += '</span>';
        
        return branchString;
        
    }

    function addLeaf(leaf){
        this.leaves[this.leaves.length] = leaf;
    }
    
    function leaf(text, link, level,kind,depart,belongArea,ifPermitAdd,areaLevel){
        this.text = text;
        this.link = link;
        this.level = level;
        this.kind = kind;
        this.depart = depart;
        this.belongArea = belongArea;
        this.ifPermitAdd = ifPermitAdd;
        this.write = writeLeaf;
        this.areaLevel = areaLevel;
    }
    
    function writeLeaf(){
        var leafString = '';
        leafString += '<span class="branch">';
        leafString += '&nbsp&nbsp&nbsp&nbsp<input type="radio" id="R'+this.link+'" name="radioGroup" value="'+this.link+'" level="'+this.level+'" kind = "'+this.kind+'" depart = "'+this.depart+'" belongArea= "'+this.belongArea+'" ifPermitAdd = "'+this.ifPermitAdd+'" areaLevel = "'+this.areaLevel+'" onClick ="checkradio(this);"/><a onClick="test(this);" radioValue="R'+this.link+'">';
        leafString +='<img border=0 src="'+webpath+'/views/common/images/'+this.kind+'.gif">';
        leafString +='<a onClick="test(this)" radioValue="R'+this.link+'">';
        leafString += this.text;
        leafString += '</a><br>';
        leafString += '</span>';
        
        if(this.kind == 'organ'){
        	//if(this.level < 6)
        		disabledRadio = disabledRadio+'R'+this.belongArea+',';
        }
        
        return leafString;
    }
     function dealtree(){     
    }
     function showBranch(bh){
        var objBranch = document.getElementById(bh).style;
        if (objBranch.display=="none")
            objBranch.display="block";
        else
            objBranch.display="none";
        swapFolder('I' + bh);
    }      
    
    function swapFolder(img){
        objImg = document.getElementById(img);
        if (objImg.src.indexOf('minus.gif')>-1)
            objImg.src = closedImg.src;
        else
            objImg.src = openImg.src;
    }  
    
    function showAddPage(flag){
    	//alert(parentObject.workPlace.document.frames.organmainbuttons);
        parentObject.workPlace.document.frames.organmainbuttons.bAddClick(flag);
    }
    
    function checkradio(obj){
		parentObject.organmainbuttons.myform.bAdd.disabled=true;
		parentObject.organmainbuttons.myform.bModify.disabled=true;
		parentObject.organmainbuttons.myform.bDelete.disabled=true;
		parentObject.organmainbuttons.myform.bEmployeeModify.disabled=true;
		//alert(obj.kind);
        if(obj.kind =="area"){
            parentObject.dealermaintance.location.href =document.myform.Path.value+"/views/om/blank.html";
            if(obj.ifPermitAdd=="true"){
				//parentObject.organmainbuttons.myform.bAdd.disabled=false;
				if(obj.areaLevel == 4){
					parentObject.organdisplay.document.getElementById("areaId").value = obj.value;
					//parentObject.countryTree.location.href = document.myform.Path.value+"/om/organ/organ/waittingPage.jsp";
				}
				
	            parentObject.organdisplayhidden.document.myform.CurrentSelectOrganKind.value= "area";
	            parentObject.organdisplayhidden.document.myform.CurrentSelectOrganId.value = obj.value;
	            parentObject.organdisplayhidden.document.myform.CurrentSelectDutyId.value = "";
	            parentObject.organdisplayhidden.document.myform.CurrentSelectBelongArea.value = obj.belongArea;
	            parentObject.organmaintance.location.href = document.myform.Path.value+"/views/om/blank.html";
	            showAddPage('area');
             }else{
             	//parentObject.organdisplay.location.href = document.myform.Path.value+"/views/om/blank.html";
                if(obj.areaLevel == 4){
					parentObject.organdisplay.document.getElementById("areaId").value = obj.value;
					//parentObject.countryTree.location.href = document.myform.Path.value+"/om/organ/organ/waittingPage.jsp";
				}
                return;
             }
             
        }else if(obj.kind =="organ"){
            parentObject.organmainbuttons.myform.bAdd.disabled=false;
			parentObject.organmainbuttons.myform.bModify.disabled=false;
			parentObject.organmainbuttons.myform.bDelete.disabled=false;
			parentObject.organmainbuttons.myform.bEmployeeModify.disabled=false;
			
			parentObject.organdisplay.document.getElementById("areaId").value = '';
            parentObject.organdisplayhidden.document.myform.CurrentSelectOrganKind.value= "organ";
            parentObject.organdisplayhidden.document.myform.CurrentSelectOrganId.value = obj.value;
            parentObject.organdisplayhidden.document.myform.CurrentSelectDutyId.value = "";
            parentObject.organdisplayhidden.document.myform.CurrentSelectBelongArea.value = obj.belongArea;
            parentObject.organmaintance.location.href  = "OrganMaintanceAction.do?"+"OrganId= " + obj.value + "&BelongArea= "+obj.belongArea+"&OrganKind=area"+ "&OperType=query";
            //parentObject.dealermaintance.location.href = "OrganMaintanceAction.do?OperType=queryDealers&marketId="+obj.value;
        }else{
            var nodeValues = obj.value.split("|");
            var currentOrganId = nodeValues[0];
            var currentDutyId = nodeValues[1];
            
			parentObject.organdisplayhidden.document.myform.CurrentSelectOrganKind.value= "duty";
            parentObject.organdisplayhidden.document.myform.CurrentSelectOrganId.value = currentOrganId;
            parentObject.organdisplayhidden.document.myform.CurrentSelectDutyId.value = currentDutyId;
            parentObject.organdisplayhidden.document.myform.CurrentSelectBelongArea.value = obj.belongArea;

            parentObject.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganId= " + currentOrganId + "&DutyId= " +currentDutyId + "&OperType= employeeList";
            
        }
    }
    
    function change(obj){
        /*
        var act = obj.value;
        var code = document.myform.Code.value;
        var areaId = document.myform.Area_id.value;
        if(code == ""){
            alert("??????????????");
        }
        if(act == "add"){
            document.myform.Area_id.value = "";
            document.myform.Area_name.value = "";
            //document.myform.Area_level.value = "";
            //document.myform.Area_level.disabled = true;
            document.myform.Area_code.value = "";
            document.myform.Postal_code.value = "";
        }
        else{
            if(areaId == "" && code != ""){
                document.myform.Area_id.value = window.parent.frames[1].document.all.Area_id.value;
                document.myform.Area_name.value = window.parent.frames[1].document.all.Area_name.value;
                //document.myform.Area_level.value = window.parent.frames[1].document.all.Area_level.value;
                document.myform.Area_code.value = window.parent.frames[1].document.all.Area_code.value;
                document.myform.Postal_code.value = window.parent.frames[1].document.all.Postal_code.value;
            }
        }
                
        //????????????
        if(act == "query"){
            document.myform.BSubmit.disabled = true;
        }else{
            document.myform.BSubmit.disabled = false;
        }
        if(act == "modify"){
            document.myform.Area_id.disabled = true;
            //document.myform.Area_level.disabled = true;
        }else{
            document.myform.Area_id.disabled = false;
        }*/
    }
    
    function test(obj){
        var id = obj.radioValue;
        var readioobj = document.getElementById(id);
        readioobj.checked = true;
        checkradio(readioobj);
    }
   
    function apply_form(){
        
    }
   function dealtext(){
    }
    function openAllNode(){
    	var center = doc.selectNodes("root/create/OrganCenter");
    	for(var i = center.nextNode();i != null; i = center.nextNode())
        {
            var organId = i.selectNodes("OrganId").nextNode().text;
            showBranch(organId);
        }
    	var items = doc.selectNodes("root/create/OrganInfo");
    	for(var i = items.nextNode();i != null; i = items.nextNode())
        {
            var ifHavesub = i.selectNodes("If_havesub").nextNode().text;
            var organId = i.selectNodes("OrganId").nextNode().text;
            var organLevel = i.selectNodes("OrganLevel").nextNode().text;            
            var intLevel = parseInt(organLevel);
        	var j = intLevel-1;
	        for(j;j<intLevel;j++){
	            if(ifHavesub == 0){ 	                
	            }   
	            else{
	                showBranch(organId);
	            }
	        } 
        }  
    }