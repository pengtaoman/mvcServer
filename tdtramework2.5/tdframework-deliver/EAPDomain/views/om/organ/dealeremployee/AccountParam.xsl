<?xml version="1.0" encoding="gb2312"?>   
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes" standalone="no" encoding="gb2312"/>   
<xsl:strip-space elements="*"/>   

<xsl:template match="/">
<html>
			<meta http-equiv="EXPIRES" content="0"/>
			<title></title>
			<HEAD/>
			
<STYLE>
	BODY {margin:0}     
	.trType{font-size:11px;font-family:"Times New Roman";height:20px}
	.tabletype{width:620px}
	.buttonType{font-size:11px;font-family:"Times New Roman";width:50px;height:20px}
	.textType{font-size:11px;font-family:"Times New Roman";width:110px;height:20px}
	.textType_sim{font-size:11px;font-family:"Times New Roman";width:191px;height:20px}
	.textType_count{font-size:11px;font-family:"Times New Roman";width:450px;height:20px;}
	.drawdownType{font-size:11px;font-family:"Times New Roman";width:110px;height:20px}
	.drawdownType_favor{font-size:11px;font-family:"Times New Roman";width:540px;height:20px}
	.notsType{font-size:11px;font-family:"Times New Roman";width:450px;height:20px}
	.alertType{font-size:11px;font-family:"Times New Roman";width:520px;height:20px}
	
	.checkBoxType{font-size:11px;font-family:"Times New Roman";}
	
	.branch{cursor:pointer;cursor:hand;display:block; COLOR: #000000; FONT-SIZE: 12px}
	.leaf{display:none;margin-left:32px; COLOR: #000000; FONT-SIZE: 12px}
	a{ text-decoration: none; }
	a:hover{ text-decoration: underline; }
</STYLE>
			
			<SCRIPT language="javascript" src="views/om/common_css_js/select_default.js"/>
					<SCRIPT language="javascript" src="views/om/common_css_js/nas_set_button_disabled.js" />

			<SCRIPT>
		<xsl:comment><![CDATA[
	var openImg = new Image;
	openImg.src = "images/open.gif";
	var closedImg = new Image;
	closedImg.src = "images/close.gif";
	
	function showBranch(bh){
		var objBranch = document.getElementById(bh).style;
		if (objBranch.display=="block")
			objBranch.display="none";
		else
			objBranch.display="block";
		swapFolder('I' + bh);
	}
	function swapFolder(img){
		objImg = document.getElementById(img);
		if (objImg.src.indexOf('open.gif')>-1)
				objImg.src = closedImg.src;
		else
			objImg.src = openImg.src;
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
		var treeString = '<table border="1"  width="440" bordercolor="#E6E6E6" bgcolor="#F0F0F0">';
		treeString += '<tr><td>';
		var numBranches = this.branches.length;
		for (var i=0;i < numBranches;i++)
			treeString += this.branches[i].write();
		treeString +='</td></tr></table>';
		//alert(treeString);
		//document.write(treeString);
		return treeString;
	}
	function branch(id, text, level, isCheck){
		this.id = id;
		this.text = text;
		this.level = level;
		this.isCheck = isCheck;
		this.write = writeBranch;
		this.add = addLeaf;
		this.leaves = new Array();
	}


	function addLeaf(leaf){
		this.leaves[this.leaves.length] = leaf;
	}

	function writeBranch(){
		var branchString = '<span class="branch">';
		branchString += '<img src="images/close.gif" id="I' + this.id + '" onClick="showBranch(\'' + this.id + '\')">'+'</img>';
		branchString +='<input type="checkbox" name="ParamTableData" Index="'+this.id+'" level="'+this.level+'" ';
		branchString +='isCheck="'+this.isCheck+'" onClick="checkclick(this);"/>' + this.text;
		branchString += '</span>';		
		branchString += '<span class="leaf" id="';
		branchString += this.id + '">';
		var numLeaves = this.leaves.length;
		for (var j=0;j< numLeaves;j++) branchString += this.leaves[j].write();
			branchString += '</span>';
		
		return branchString;
		
	}
	function leaf(text, link, level, isCheck){
		this.text = text;
		this.link = link;
		this.level = level;
		this.isCheck = isCheck;
		this.write = writeLeaf;
	}
	
	function writeLeaf(){
		var leafString = '<input type="checkbox" name="ParamTableData" Index="'+this.link+'" level="'+this.level+'" ';
		leafString += 'isCheck="'+this.isCheck+'" onClick="checkclick(this);"/>';
		leafString += this.text;
		leafString += '<br>';
		return leafString;
	}
	function checkclick(checkobj){
		document.myform.updateBt.disabled=false;
		var length = document.myform.ParamTableData.length;
		var curlevel = checkobj.level;
		var curCode = checkobj.Index;
		var flag = 0;
		for(var i=0;i<length;i++){
			if(document.myform.ParamTableData[i].level == curlevel){
				if(document.myform.ParamTableData[i].Index == curCode)
					flag = 1;
				else
					flag = 0;
			}else if(document.myform.ParamTableData[i].level > curlevel){
				if(flag == 1){
					if(checkobj.checked==true)
						document.myform.ParamTableData[i].checked=true;
					else
						document.myform.ParamTableData[i].checked=false;
				}
			}
		}
		
	}
			var isModify = false;
		  	function init(){
		  		dwselect("myform","tableCol","TableSelected");
				var errorMessage = document.myform.ErrorMessage.value;
	      			if (errorMessage != ""){
      					alert(errorMessage);
      				}
				if(document.myform.ParamTableData == undefined){
					
				document.myform.checkall.disabled=true;	
				}document.myform.updateBt.disabled=true;
				nas_set_button_disabled("","");
		  	}			
		  	
		  	function update_sys(){		  						
				if(checkChange()){
					document.myform.oprType.value="update";
					document.myform.tableName.value=document.myform.tableCol.value;
					window.parent.frames[2].myform.action="AccountParamPowerServlet";
					window.parent.frames[2].myform.submit();
					isModify = false;
				}
		  	}

			function query(){
				if(isModify == true){
					alert();
				}
				document.myform.oprType.value="query";
				document.myform.tableName.value=document.myform.tableCol.value;
				window.parent.frames[2].myform.action="AccountParamPowerServlet";
				window.parent.frames[2].myform.submit();
			}
			
			function checkChange(){
				if(document.myform.ParamTableData == undefined)return false;
				var length = document.myform.ParamTableData.length;
				var deleteString="";
				var addString="";
				for(var i=0; i<length; i++){
					var oldCheck = document.myform.ParamTableData[i].isCheck;
					var newCheck = "false";
					if(document.myform.ParamTableData[i].checked == true)
						newCheck = "true";
					if(oldCheck != newCheck){
						if(newCheck == "true")
							deleteString += document.myform.ParamTableData[i].Index+"-";
						else if(newCheck == "false")
							addString += document.myform.ParamTableData[i].Index+"-";
						isModify = true;
					}
				}
				if(deleteString == "" && addString == ""){
					alert("没有变化！")
					return false;
				}
				document.myform.deleteString.value = deleteString;
				document.myform.addString.value = addString;
				//alert("delstr="+document.myform.deleteString.value);
				//alert("addstr="+document.myform.addString.value);
				return true;
			}

			function clickCheck(){
				document.myform.updateBt.disabled=false;
			}
		  	
		  	function check_all(){
				document.myform.updateBt.disabled=false;
		  		if (document.myform.checkall.checked == true){
		  			for (var i=0; i <document.myform.elements.length;i++){
					var e = document.myform.elements[i];
						if (e.type == "checkbox" ){
						e.checked = true;
						}
					}
		  		}
		  		if (document.myform.checkall.checked == false){
		  			for (var i=0; i <document.myform.elements.length;i++){
					var e = document.myform.elements[i];
						if (e.type == "checkbox" ){
							e.checked = false;
						}
					}
		  		}
		  	}
		  	
		  	//生成树形图
		  	function create_city_tree(){
				var doc = document.XMLDocument;
				var myTree = new tree();
				var bh = new Array();
				var center = doc.selectNodes("root/city_info/City_center");
				for(var i = center.nextNode();i != null; i = center.nextNode())
				{
					
					var city_code = i.selectNodes("City_code").nextNode().text;
					var city_name = i.selectNodes("City_name").nextNode().text;	
					var city_level = i.selectNodes("City_level").nextNode().text;
					var check_option = i.selectNodes("Check_option").nextNode().text;
					bh[0] = new branch(city_code,city_name,city_level,check_option);
				}
				
				var items = doc.selectNodes("root/city_info/City");
				for(var i = items.nextNode();i != null; i = items.nextNode())
				{
					
					var city_code = i.selectNodes("City_code").nextNode().text;
					var city_name = i.selectNodes("City_name").nextNode().text;		
					var city_level = i.selectNodes("City_level").nextNode().text;
					var if_havesub = i.selectNodes("If_havesub").nextNode().text;
					var check_option = i.selectNodes("Check_option").nextNode().text;
					var intLevel = parseInt(city_level);
					var j = intLevel-1;
					for(j;j<intLevel;j++){
						if(if_havesub == 0){	
							bh[j-1].add(new leaf(city_name,city_code,city_level,check_option));
						}	
						else{
							bh[j]=new branch(city_code,city_name,city_level,check_option);
							bh[j-1].add(bh[j]);
						}
					}
					
				}
				myTree.add(bh[0]);
				return myTree.write();
				
			}
			
			/*function dealtree(){
				var len = document.myform.ParamTableData.length;
				for(i=0;i<len;i++){
					if(document.myform.ParamTableData[i].isCheck == "true")
						document.myform.ParamTableData[i].checked = true;
					else
						document.myform.ParamTableData[i].checked = false;
				}
			}*/
			
			function dealtree(){
				var doc = document.XMLDocument;
				var len = document.myform.ParamTableData.length;
				var op_citylevel = doc.selectNodes("root/city_info/Op_citylevel").nextNode().text;
				op_citylevel = parseInt(op_citylevel);
				var op_citycode = doc.selectNodes("root/city_info/Op_citycode").nextNode().text;
				var flag = 0;
				for(var i=0;i<len;i++){
					if(document.myform.ParamTableData[i].isCheck == "true")
						document.myform.ParamTableData[i].checked = true;
					else
						document.myform.ParamTableData[i].checked = false;
				
					if(document.myform.ParamTableData[i].level < op_citylevel){
						document.myform.ParamTableData[i].disabled=true;
					}
					else if(document.myform.ParamTableData[i].level == op_citylevel){
						if(document.myform.ParamTableData[i].Index != op_citycode){
							flag = 1;
							document.myform.ParamTableData[i].disabled=true;
						}else
							flag = 0;
		
					}
					else{
						if(flag == 1){
							document.myform.ParamTableData[i].disabled=true;
						}
						else{
							document.myform.ParamTableData[i].disabled=false;
						}
					}
						
				}
						
			}
		  	
		  				    	
		]]></xsl:comment>
			</SCRIPT>
	<body onload="init()">
	<form method="POST"  name="myform">
			<input type="hidden" value="" name="oprType"/>
			<input type="hidden" value="" name="tableName"/>
			<input type="hidden" value="" name="deleteString"/>
			<input type="hidden" value="" name="addString"/>
			<input type="hidden" name="ErrorMessage"><xsl:attribute name="value"><xsl:value-of select="/root/ErrorMessage"/></xsl:attribute></input>                   
			<xsl:apply-templates select="/root"/>
		
	</form>
	</body>	
	</html>		
</xsl:template>
	
<xsl:template match="/root">

	<table width = "440" border="0" bordercolor="#CCCCCC" bgcolor="#FFFFFF">
		<tr class="trType">
		<td width="5%" bordercolor="#A2BEE1" bgcolor="#F0F0F0">参数表：</td>
		<td width="30%" bordercolor="#E6E6E6" bgcolor="#F0F0F0">
			<select name="tableCol" class="drawdownType" onchange="query()">
				<xsl:for-each select="tableCol/option">        
					<option>
						<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute><xsl:value-of select="caption"/>
					</option>
				</xsl:for-each>
			</select>
		</td>
		</tr>
	</table>
	<xsl:if test="if_city='false'">   
	<table width = "440" border="1" bordercolor="#CCCCCC" bgcolor="#FFFFFF">           	            
			<tr class="trType">
				<td width="30" bordercolor="#E6E6E6" bgcolor="#A2BEE1">选择</td>
				<td bordercolor="#E6E6E6" bgcolor="#A2BEE1">标识</td>
				<td bordercolor="#E6E6E6" bgcolor="#A2BEE1">名称</td>
				<xsl:choose>
					<xsl:when test="ParamTable/Service_kind=''"></xsl:when>
					<xsl:otherwise>
						<td bordercolor="#E6E6E6" bgcolor="#A2BEE1">业务类型</td>
					</xsl:otherwise>
				</xsl:choose>				
				<xsl:choose>
					<xsl:when test="ParamTable/Apply_event=''"></xsl:when>
					<xsl:otherwise>
						<td bordercolor="#E6E6E6" bgcolor="#A2BEE1">申请事项</td>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:choose>
					<xsl:when test="ParamTable/Sub_service_kind=''"></xsl:when>
					<xsl:otherwise>
						<td bordercolor="#E6E6E6" bgcolor="#A2BEE1">子业务类型</td>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:choose>
					<xsl:when test="ParamTable/Innet_method=''"></xsl:when>
					<xsl:otherwise>
						<td bordercolor="#E6E6E6" bgcolor="#A2BEE1">入网方式</td>
					</xsl:otherwise>
				</xsl:choose>
			</tr>
			<xsl:for-each select="ParamTable">
			   <tr class="trType">		   
			     <p>
				<xsl:choose>
			     		<xsl:when test="RoleCheck='1'">
			     			<td bordercolor="#E6E6E6" bgcolor="A2BEE1">
							<input type="checkbox" name="ParamTableData" class="checkBoxType" onClick="clickCheck();">
							<xsl:attribute name="Index"><xsl:value-of select="Index"/></xsl:attribute>
							<xsl:attribute name="isCheck"><xsl:value-of select="checked"/></xsl:attribute>
							<xsl:attribute name="isId"><xsl:value-of select="isId"/></xsl:attribute>
							<xsl:if test="checked='true'">
								<xsl:attribute name="checked">true</xsl:attribute>
							</xsl:if>
							</input>
						</td>
			     		</xsl:when>
			     		<xsl:otherwise>
						<td bordercolor="#E6E6E6" bgcolor="#F0F0F0">
							<input type="checkbox" name="ParamTableData" class="checkBoxType" onClick="clickCheck();">
							<xsl:attribute name="Index"><xsl:value-of select="Index"/></xsl:attribute>
							<xsl:attribute name="isCheck"><xsl:value-of select="checked"/></xsl:attribute>
							<xsl:attribute name="isId"><xsl:value-of select="isId"/></xsl:attribute>
							<xsl:if test="checked='true'">
								<xsl:attribute name="checked">true</xsl:attribute>
							</xsl:if>
							</input>
						</td>
					</xsl:otherwise>
				</xsl:choose>
				
				<td bordercolor="#E6E6E6" bgcolor="#F0F0F0">
					<xsl:value-of select="PK"/>
				</td>
				<td bordercolor="#E6E6E6" bgcolor="#F0F0F0">
					<xsl:value-of select="Name"/>
				</td>
				
				<xsl:choose>
					<xsl:when test="Service_kind=''"></xsl:when>
					<xsl:otherwise>
						<td bordercolor="#E6E6E6" bgcolor="#F0F0F0">
							<xsl:value-of select="Service_kind_name"/>
						</td>
					</xsl:otherwise>
				</xsl:choose>
				
				<xsl:choose>
					<xsl:when test="Apply_event=''"></xsl:when>
					<xsl:otherwise>
						<td bordercolor="#E6E6E6" bgcolor="#F0F0F0">
						<xsl:value-of select="Apply_event"/>
						</td>
					</xsl:otherwise>
				</xsl:choose>
				
				<xsl:choose>
					<xsl:when test="Sub_service_kind=''"></xsl:when>
					<xsl:otherwise>
						<td bordercolor="#E6E6E6" bgcolor="#F0F0F0">
						<xsl:value-of select="Sub_service_kind"/>
						</td>
					</xsl:otherwise>
				</xsl:choose>
				
				<xsl:choose>
					<xsl:when test="Innet_method=''"></xsl:when>
					<xsl:otherwise>
						<td bordercolor="#E6E6E6" bgcolor="#F0F0F0">
						<xsl:value-of select="Innet_method"/>
						</td>
					</xsl:otherwise>
				</xsl:choose>
				
			   </p>
			   </tr>
			</xsl:for-each>
	</table>
	</xsl:if>
	<xsl:if test="if_city='true'">  
		<div id="tree_list" style="display:block"/>
		<script>
			document.all.tree_list.innerHTML=create_city_tree();
			dealtree();
		</script>
	</xsl:if>
	<table border="0" cellpadding="1" cellspacing="2" width="440" bgcolor="#FFFFFF">	            	            
		<input name="AllCheck" type="hidden" ></input>
		<tr class="trType">
			<td width="100%" bordercolor="#E6E6E6" bgcolor="#F0F0F0"></td>
		</tr>
		<tr class="trType">
			<td width="20%" bordercolor="#E6E6E6" bgcolor="#F0F0F0">
				<input type="checkbox" name="checkall" onclick="check_all();"></input> 全部选中
			</td>
		</tr>
		<tr class="trType">
			<td width="20%" align="center" bordercolor="#E6E6E6" bgcolor="#F0F0F0">
				<input type="button" name="updateBt" value="确认" onclick="update_sys();" class="buttonType"></input>
			</td>
		</tr>
	</table>
</xsl:template>
</xsl:stylesheet>