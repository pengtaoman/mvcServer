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
            var parentOrgan = i.selectNodes("ParentOrganId").nextNode().text;
            bh[0] = new branch(organId,organName,organLevel,organKind,departId,belongArea,parentOrgan);
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
            var parentOrgan = i.selectNodes("ParentOrganId").nextNode().text; 
            var intLevel = parseInt(organLevel);
            
            if(organKind == "organ"){
                departId = organId;
            }
            var j = intLevel-1;
            for(j;j<intLevel;j++){
                if(ifHavesub == 0){ 
                    bh[j-1].add(new leaf(organName,organId,organLevel,organKind,departId,belongArea,parentOrgan));
                }   
                else{
                    bh[j]=new branch(organId,organName,organLevel,organKind,departId,belongArea,parentOrgan);
                    bh[j-1].add(bh[j]);
                }
            }
            
        }
        myTree.add(bh[0]);
        myTree.write();
        dealtext();
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
        var treeString = '<table align="left" border="0" cellpadding="1" cellspacing="2" width="100%">';
        treeString += '<tr><td>';
        var numBranches = this.branches.length;
        for (var i=0;i < numBranches;i++)
            treeString += this.branches[i].write();
        treeString +='</td></tr></table>';
        document.write(treeString);
    }
    
    function branch(id, text, level,kind,depart,belongArea,parentOrgan){
        this.id = id;
        this.text = text;
        this.level = level;
        this.kind = kind;
        this.depart = depart;
        this.belongArea=belongArea;
        this.parentOrgan = parentOrgan;
        this.write = writeBranch;
        this.add = addLeaf;
        this.leaves = new Array();
    }
    
    function writeBranch(){
        var branchString = '<span class="branch" onmouseover="MouseOver(this);" onmouseout="MouseOut(this);" onmousedown="MouseDown(this);" onmouseup="MouseUp(this);">';   
        branchString += '<img src="'+webpath+'/views/common/images/plus.gif" id="I' + this.id + '" onClick="showBranch(\'' + this.id + '\')">'+'</img>';
        branchString +='<input type="radio" id="R'+this.id +'" name="radioGroup" value="'+this.id+'" level="'+this.level+'" kind = "'+this.kind+'" depart = "'+this.depart+'" belongArea = "'+this.belongArea+'"parentOrgan="'+this.parentOrgan+'" onClick ="checkradio(this);"/>'
        branchString +='<img border=0 src="'+webpath+'/views/common/images/'+this.kind+'.gif">';
        branchString +='<a onClick="test(this)" radioValue= "R'+this.id +'">' + this.text;
        branchString += '</a></span>';      
        branchString += '<span style="display:none;" class="leaf" id="';
        branchString += this.id + '">';
        var numLeaves = this.leaves.length;
        for (var j=0;j< numLeaves;j++) branchString += this.leaves[j].write();
            branchString += '</span>';
        
        return branchString;
        
    }

    function addLeaf(leaf){
        this.leaves[this.leaves.length] = leaf;
    }
    
    function leaf(text, link, level,kind,depart,belongArea,parentOrgan){
        this.text = text;
        this.link = link;
        this.level = level;
        this.kind = kind;
        this.depart = depart;
        this.parentOrgan
        this.belongArea = belongArea;
        this.write = writeLeaf;
    }
    
    function writeLeaf(){
        var leafString = '';
        leafString += '<span class="branch">';
        leafString += '&nbsp&nbsp&nbsp&nbsp<input type="radio" id="R'+this.link+'" name="radioGroup" value="'+this.link+'" level="'+this.level+'" kind = "'+this.kind+'" depart = "'+this.depart+'" belongArea= "'+this.belongArea+'" onClick ="checkradio(this);"/>'
        leafString +='<img border=0 src="'+webpath+'/views/common/images/'+this.kind+'.gif">';
        leafString +='<a onClick="test(this)" radioValue="R'+this.link+'">';
        leafString += this.text;
        leafString += '</a><br>';
        leafString += '</span>';
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
    
   function checkradio(obj){
        parent.mainFrameset.cols="27%,*,0,0,0";
        if(obj.kind =="area"){

        }else if(obj.kind =="organ"){
            parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value= "organ";
            parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value = obj.value;
            parent.organdisplayhidden.document.myform.CurrentSelectDutyId.value = "";
            parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value = obj.belongArea;
            parent.employeemaintance.location.href = webpath+"/views/om/blank.html"
            //parent.employeelist.location.href = webpath+"/om/EmployeeQueryAction.do?OrganKind='organ'"+"&BelongArea="+obj.belongArea+"&OrganId=" + obj.value + "&OperType=employeeList";
            parent.dealerdisplay.location.href = webpath+"/om/EmployeeQueryAction.do?OrganKind='organ'"+"&BelongArea="+obj.belongArea+"&OrganId=" + obj.value + "&OperType=treeDisplay"
            //parent.employeebutton.myform.bAdd.disabled = false;
        }
        else{
            var nodeValues = obj.value.split("|");
            var currentOrganId = nodeValues[0];
            var currentDutyId = nodeValues[1];
            parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value= "duty";
            parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value = currentOrganId
            parent.organdisplayhidden.document.myform.CurrentSelectDutyId.value = currentDutyId;
            parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value = obj.belongArea;
            parent.employeemaintance.location.href = webpath+"/views/om/blank.html"
            parent.employeelist.location.href = webpath+"/om/EmployeeQueryAction.do?"+"&OrganKind='duty'"+"&BelongArea="+obj.belongArea+"&OrganId=" + currentOrganId + "&DutyId=" +currentDutyId + "&OperType=employeeList";
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