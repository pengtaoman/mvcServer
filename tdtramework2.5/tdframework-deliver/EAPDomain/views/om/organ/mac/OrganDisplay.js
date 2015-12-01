 var disabledRadio = '';
 var parentObject = parent;
 
 function init(){
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
            
            if(organKind == "organ" || organKind == 'dealer'){
                departId = organId;
            }
            var j = intLevel-1;
            for(j;j<intLevel;j++){
                if(ifHavesub == 0 && organKind == "dealer") { 
                    bh[j-1].add(new leaf(organName,organId,organLevel,organKind,departId,belongArea,ifPermitAdd,areaLevel));
                }   
                else if(ifHavesub != 0){
                    bh[j]=new branch(organId,organName,organLevel,organKind,departId,belongArea,ifPermitAdd,areaLevel);
                    bh[j-1].add(bh[j]);
                }
            }
            
        }
        myTree.add(bh[0]);
        myTree.write();
        dealtext();
		
		if(disabledRadio!=null && disabledRadio!=''){
			var values = disabledRadio.split(",");
			for(var i=0;i<values.length;i=i+1){
				if(values[i] != ''){
					document.getElementById(values[i]).disabled = true;
				}
			}
		}
		openAllNode();	
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
        document.write(treeString);
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
        branchString +='<input type="radio" id="R'+this.id +'" name="radioGroup" value="'+this.id+'" level="'+this.level+'" kind = "'+this.kind+'" depart = "'+this.depart+'" belongArea = "'+this.belongArea+'" ifPermitAdd = "'+this.ifPermitAdd+'" areaLevel = "'+this.areaLevel+'" oText = "'+this.text+'" onClick ="showBranch(\'' + this.id + '\');checkradio(this);"/><a onClick="test(this)" radioValue= "R'+this.id +'">';
        branchString +='<img border=0 src="'+webpath+'/views/common/images/'+this.kind+'.gif">';
        branchString +='<a onClick="showBranch(\'' + this.id + '\');test(this)" radioValue= "R'+this.id +'">' + this.text;
        branchString += '</a></span>';      
        branchString += '<span style="display:none;" class="leaf" id="' ;
        branchString += this.id + '">';
        
        var numLeaves = this.leaves.length;
        for (var j=0;j< numLeaves;j++) branchString += this.leaves[j].write();
            branchString += '</span>';
        
        if(this.kind == 'organ'){
        		disabledRadio = disabledRadio+'R'+this.id+',';
        }
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
        leafString += '&nbsp&nbsp&nbsp&nbsp<input type="radio" id="R'+this.link+'" name="radioGroup" value="'+this.link+'" level="'+this.level+'" kind = "'+this.kind+'" depart = "'+this.depart+'" belongArea= "'+this.belongArea+'" ifPermitAdd = "'+this.ifPermitAdd+'" areaLevel = "'+this.areaLevel+'" oText = "'+this.text+'" onClick ="checkradio(this);"/><a onClick="test(this);" radioValue="R'+this.link+'">';
        leafString +='<img border=0 src="'+webpath+'/views/common/images/'+this.kind+'.gif">';
        leafString +='<a onClick="test(this)" radioValue="R'+this.link+'">';
        leafString += this.text;
        leafString += '</a><br>';
        leafString += '</span>';
        
        if(this.kind == 'organ'){
        		disabledRadio = disabledRadio+'R'+this.depart+',';
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
        parentObject.workPlace.document.frames.organmainbuttons.bAddClick(flag);
    }
    
    function checkradio(obj){
        var path = parentObject.query.document.getElementById("path").value;
		parentObject.query.document.getElementById("search").disabled="";
		parentObject.query.document.getElementById("add").disabled="";
		parentObject.query.document.getElementById("modify").disabled=true;
		parentObject.query.document.getElementById("delete").disabled=true;
        if(obj.kind =="area"){
        	parentObject.query.document.EAPForm.action=path+"/om/macsPermittedAction.do?method=queryInit";
			parentObject.query.document.EAPForm.target='query';			
        	parentObject.query.document.getElementById("city").value=obj.belongArea;
        	parentObject.query.document.getElementById("hallId").value = "";
        	parentObject.query.document.EAPForm.submit();        	
        }else if(obj.kind =="dealer"){
			parentObject.query.document.getElementById("hallId").value = obj.depart;
			parentObject.query.document.EAPForm.action=path+"/om/macsPermittedAction.do?method=queryInit";
			parentObject.query.document.EAPForm.target='query';			
        	parentObject.query.document.getElementById("city").value=obj.belongArea;
        	parentObject.query.document.EAPForm.submit();
        }
    }
    
    function change(obj){

    }
    
    function test(obj){
        var id = obj.radioValue;
        var readioobj = document.getElementById(id);
        if(readioobj.kind != "organ"){
        	readioobj.checked = true;
        }       
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