    
    function init(){
        var myTree = new tree();
        var bh = new Array();
        var center = doc.selectNodes("root/create/Area_center");
        for(var i = center.nextNode();i != null; i = center.nextNode())
        {
            
            var areaId = i.selectNodes("Area_id").nextNode().text;
            var areaName = i.selectNodes("Area_name").nextNode().text;  
            var areaLevel = i.selectNodes("Area_level").nextNode().text;
            bh[0] = new branch(areaId,areaName,areaLevel);
        }
        var items = doc.selectNodes("root/create/Area");
        for(var i = items.nextNode();i != null; i = items.nextNode())
        {
            
            var areaId = i.selectNodes("Area_id").nextNode().text;
            var areaName = i.selectNodes("Area_name").nextNode().text;      
            var areaLevel = i.selectNodes("Area_level").nextNode().text;
            var ifHavesub = i.selectNodes("If_havesub").nextNode().text;
            var intLevel = parseInt(areaLevel);
            var j = intLevel-1;
            for(j;j<intLevel;j++){
                if(ifHavesub == 0){ 
                    bh[j-1].add(new leaf(areaName,areaId,areaLevel));
                }   
                else{
                    bh[j]=new branch(areaId,areaName,areaLevel);
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
        //alert(treeString);
        document.write(treeString);
        //return treeString;
    }
    
    function branch(id, text, level){
        this.id = id;
        this.text = text;
        this.level = level;
        this.write = writeBranch;
        this.add = addLeaf;
        this.leaves = new Array();
    }

    function writeBranch(){
        var branchString = '<span class="branch">';
        branchString += '<img src="'+webpath+'/views/common/images/minus.gif" id="I' + this.id + '" onClick="showBranch(\'' + this.id + '\')">'+'</img>';
        branchString +='<input type="radio" id="R'+this.id +'" name="radioGroup" value="'+this.id+'" level="'+this.level+'" onClick="checkradio(this);"/>' ;
        branchString +='<a onClick="test(this)" radioValue= "R'+this.id +'">' + this.text;
        branchString += '</a></span>';      
        branchString += '<span class="leaf" id="';
        branchString += this.id + '">';
        var numLeaves = this.leaves.length;
        for (var j=0;j< numLeaves;j++) branchString += this.leaves[j].write();
            branchString += '</span>';
       // alert(branchString);
        return branchString;   
    }

    function addLeaf(leaf){
        this.leaves[this.leaves.length] = leaf;
    }
    
    function leaf(text, link, level){
        this.text = text;
        this.link = link;
        this.level = level;
        this.write = writeLeaf;
    }
    
    function writeLeaf(){
        var leafString = '';
        leafString += '<span class="branch">';
        leafString += '&nbsp&nbsp&nbsp&nbsp<input type="radio" id="R'+this.link+'" name="radioGroup" value="'+this.link+'" level="'+this.level+'" onClick="checkradio(this);"/><a onClick="test(this)" radioValue="R'+this.link+'">';
        //leafString +='<a onClick="test(this)" radioValue="R'+this.link+'">';
        leafString += this.text;
        leafString += '</a><br>';
        leafString += '</span>';
        return leafString;
    }
    
    //根据操作员级别控制树节点的状态
    function dealtree(){
        var length = document.myform.radioGroup.length;
        var op_arealevel = doc.selectNodes("root/create/Op_AreaLevel").nextNode().text;
        op_arealevel = parseInt(op_arealevel);
        var op_areaId = doc.selectNodes("root/create/Op_AreaId").nextNode().text;
        var flag = 0;
        for(i=0;i<length;i++){
            if(document.myform.radioGroup[i].level < op_arealevel){
                document.myform.radioGroup[i].disabled=true;
            }
            else if(document.myform.radioGroup[i].level == op_arealevel){
                if(document.myform.radioGroup[i].value != op_areaId){
                    flag = 1;
                    document.myform.radioGroup[i].disabled=true;
                }else
                    flag = 0;

            }
            else{
                if(flag == 1)
                    document.myform.radioGroup[i].disabled=true;
                else
                    document.myform.radioGroup[i].disabled=false;
            }
        }       
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
        document.myform.Code.value = obj.value;
        document.myform.OprType.value = "query";
        document.myform.target = "bottom";
        document.myform.submit();
    }
    
    function change(obj){
        var act = obj.value;
        var code = document.myform.Code.value;
        var areaId = document.myform.Area_id.value;
        if(code == ""){
            alert("请选择某一节点");
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
                
        //处理提交按钮
        if(act == "query" || act==""){
            document.myform.BSubmit.disabled = true;
        }else{
            document.myform.BSubmit.disabled = false;
        }
        if(act == "modify"){
            document.myform.Area_id.disabled = true;
            //document.myform.Area_level.disabled = true;
        }else{
            document.myform.Area_id.disabled = false;
        }
    }
    
    
    function apply_form(){
        var act = document.myform.Act_mode.value;
        if(act == "add"){
            if(nas_check_no_null('区域编码',document.myform.Area_id,0)==false)
                return;
            if(nas_check_no_null('区域名称',document.myform.Area_name,0)==false)
                return
            document.myform.OprType.value = "add";
            document.myform.target = "header";
            document.myform.submit();
        }else if(act == "delete"){
            if(confirm("确认要删除吗? ")){
                document.myform.OprType.value = "delete";
                document.myform.target = "header";
                document.myform.submit();
            }
        }else if(act == "modify"){
            document.myform.OprType.value = "modify";
            document.myform.target = "header";
            document.myform.submit();
            
        }
    }
    
    //根据操作成功失败处理文本输入框的显示数据
    function dealtext(){
        var oprFlag = doc.selectNodes("root/create/OprFlag").nextNode().text;
        var message = doc.selectNodes("root/create/Message").nextNode().text;
        var actMode = doc.selectNodes("root/create/Act_mode").nextNode().text;
        var areaId = doc.selectNodes("root/create/Area_id").nextNode().text;
        var areaName = doc.selectNodes("root/create/Area_name").nextNode().text;
        //var areaLevel = doc.selectNodes("root/create/Area_level").nextNode().text;  
        var areaCode = doc.selectNodes("root/create/Area_code").nextNode().text;
        var postalCode = doc.selectNodes("root/create/Postal_code").nextNode().text;
        var code = doc.selectNodes("root/create/Code").nextNode().text;
        if(oprFlag == "1")
            alert(message);
        else if(oprFlag == "0"){
            alert(message);
            document.myform.Act_mode.value = actMode;
            document.myform.Area_id.value = areaId;
            document.myform.Area_name.value = areaName;
            //document.myform.Area_level.value = areaLevel;
            document.myform.Area_code.value = areaCode;
            document.myform.Postal_code.value = postalCode;
            document.myform.Code.value = code;
            if(actMode == "modify"){
                document.myform.Area_id.disabled = true;
                //document.myform.Area_level.disabled = true;
            }else{
                document.myform.Area_id.disabled = false
                //document.myform.Area_level.disabled = false;
            }
        } 
    }
    
    function test(obj){
        var id = obj.radioValue;
        var readioobj = document.getElementById(id);
        if(!readioobj.disabled){
            readioobj.checked = "true";
            checkradio(readioobj);
        }
        
    }