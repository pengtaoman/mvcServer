 function AppendTable(name)
 {
  var nameStr = "";
  nameStr = name;	
  this.base=DataGrid;
  this.base(nameStr,nameStr+"_xml",true,4);
  this.pageable = false;
  this.updateView = function(){
	 var div = document.getElementById(this.name);  
     
	 /*while(div){
	    if(div.className == "NSFT-internal"){
	    	var index = div.id.substring(div.id.length-1);
	    	NSFTHandler.f_activate_tab(parseInt(index));
	    	break;
	    }
	    div = div.parentElement;
	}*/
	FORM_OBJECT_POOL.put("isSelected",false);
  	var doc = document.getElementById(this.dsID).XMLDocument;	
    var styleDoc = document.getElementById(this.styleID).XMLDocument;
    div.innerHTML = doc.transformNode(styleDoc);	
    if(this.onViewUpdate){
         eval(this.onViewUpdate);
    }
  };
  this.appendRow = appendRow;
  this.clear = function(){
       var  xmlDoc = this.getXMLDocument();
       var rootNode = xmlDoc.documentElement;
       nodes =  rootNode.childNodes;
       while(nodes.length>1){
           rootNode.removeChild(nodes.item(0));
       }
       rootNode.firstChild.setAttribute("num",0);
       rootNode.firstChild.setAttribute("state","3");
       this.recordNumber = 0;
       this.calcPageInfo();
       this.selectedRow = -1;
  }
}

function getAppendTable(name)
{
  var grid = FORM_OBJECT_POOL.get(name);
  try{
    if(!grid){
      grid = new AppendTable(name); 
      FORM_OBJECT_POOL.put(name,grid);
    }
  }
  catch(e){
    alert(e.description);
  }  
  return grid;
 }
 
function appendRow(values){
    var row = this.addRow();
    var node;
    for (index001100 in values)
    {
	row.setColumnValue(index001100,values[index001100]);
    }
}

function parseGISString(gisStr )
{
 var coords =new Array();
 if(gisStr!="")
 {
  var words = gisStr.split(",");
  var areaCount = parseInt(words[0]);
  var pointCount = (parseInt(words[1])+1)*2;
  //alert("pointCount:"+pointCount); 
  for(i=0;i<pointCount;i++)
  {
   coords[i] = words[i+2];
  }
  var j = pointCount+2;
  areaCount--;

  pointCount = (parseInt(words[j+1])+1)*2;

  var delAreaCount = 1;
  var ignoreCount = delAreaCount*2;
  while(areaCount >0)
  {
   for(i = j; i<j+ pointCount; i++)
    coords[i-ignoreCount] = words[i+2];
   areaCount --;
   delAreaCount++;
   ignoreCount = delAreaCount*2;
   if(areaCount>0)
   {
    j = j+ pointCount+2;
    pointCount = (parseInt(words[j+1])+1)*2;
   }
  } 
 }
 return coords;
}


function showXYCoords(tableName,xyStr){
    var table = getAppendTable(tableName);


    var xycoords = parseGISString(xyStr);

    table.clear();   
    var doc = table.getXMLDocument();
    var node = doc.selectSingleNode("/dataset/record");
    var nodeX = node.childNodes.item(0).nodeName;
    var nodeY = node.childNodes.item(1).nodeName;

   for(index=0;index<xycoords.length;index+=2){
       eval("table.appendRow({"+nodeX+":'"+xycoords[index]+"',"+nodeY+":'"+xycoords[index+1]+"'})");
   }
   table.updateView(); 	
}

function generateGisString(tableName)
{
 var table = getAppendTable(tableName);
 var xmlDoc = table.getXMLDocument();
 
 var rowCount = table.getRowCount();

 if(rowCount ==0)
 {

  return "";
  // return;
 }

 var xyStr = "";
 var record;
 var  x,y;
 var areaCount = 0;
 var pointCount = 0;
 var index = 0;
 var flag = true;
 while(index < rowCount )
 {
  record = table.getRow(index);
  x = record.getColumnValue(record.getColumnName(0));
  y = record.getColumnValue(record.getColumnName(1));
  
  if(x==""||x=="0")
  { 
   x = "0";
   y = "0";
  }
  if(y=="") y = "0";

  xyStr +=  "," +x +"," +y;	
  if(x=="0")
  {
   pointCount = index;
   areaCount ++;	
   xyStr = pointCount + xyStr +",0";
   index ++;
   break;
  }
  index ++;
 }
 var i = index;
 pointCount = 0;
 var subStr = "";
 while(i<rowCount ){
  record = table.getRow(i);
  x = record.getColumnValue(record.getColumnName(0));
  y = record.getColumnValue(record.getColumnName(1));
  if(x==""||x=="-1"||x=="-2"){                 
   if(x!="-2") 
   {
      x = "-1";
   }
   y = "0" ;
  }
  if(y=="") y = "0";
  subStr +=  "," +x +"," +y;	
  if(x=="-1"||x=="-2")
  {
   pointCount =i -  index;
   areaCount ++;	
   subStr = pointCount + subStr+",0";
   xyStr += "," +subStr;
   subStr = "";
   index = i+1;
   pointCount = 0;
  }
  i++;
 }
 xyStr = areaCount +"," + xyStr+ ",";
 return xyStr;
}

function showMineGISString(tableName,xyStr){
  var table = getAppendTable(tableName);
  table.clear();   
  var doc = table.getXMLDocument();
  var node = doc.selectSingleNode("/dataset/record");
  var id = node.childNodes.item(0).nodeName;
  var nodeX = node.childNodes.item(1).nodeName;
  var nodeY = node.childNodes.item(2).nodeName;
  var v = node.childNodes.item(3).nodeName;
  var type = node.childNodes.item(4).nodeName;
  var tokens = xyStr;
  var coords = tokens.split(",");
  var i = 0;
  var j=1;
  var k=0;
  while(i<parseInt(coords[0])){
  	index = j;
  	while(k < parseInt(coords[index])){
  		    
	   eval("table.appendRow({"+id+":'"+coords[++j]+"',"+nodeX+":'"+coords[++j]+"',"+nodeY+":'"+coords[++j]+"'})");
	   k++;
  	}
  	eval("table.appendRow({"+id+":'*',"+nodeX+":'"+coords[++j]+"',"+nodeY+":'"+coords[++j]+"',"+v+":'"+coords[++j]+"',"+type+":'"+coords[++j]+"'})");
  	k = 0;
  	j++;
  	i++;
  }
  table.updateView(); 	
}

function generateMineGISString(tableName){
   var table = getAppendTable(tableName);

   var rowCount = table.getRowCount();
 
   if(rowCount ==0)
   {

     // return;
   }

   var xyStr = "";
   var subStr = "";
   var areaCount = 0;
   //point count in an area
   var pointCount = 0;
   var index = 0;
   var record;
   while(index < rowCount )
   {
    record = table.getRow(index);
    id = record.getColumnValue(record.getColumnName(0));
    x = record.getColumnValue(record.getColumnName(1));
    y = record.getColumnValue(record.getColumnName(2));
    if(id=="*"){
    	v = record.getColumnValue(record.getColumnName(3));
    	t = record.getColumnValue(record.getColumnName(4));
    	subStr = pointCount +","+subStr + x +","+y+","+v+","+t+",";
    	xyStr += subStr;
    	subStr = "";
    	areaCount++;  
    	pointCount = 0;
    }else{
        subStr += id +","+ x +","+y+",";
    }
    pointCount ++;
    index ++;
   }
   xyStr = areaCount + ","+ xyStr;
   return xyStr;
}
function newGisCoords(name,flex_type,width,height){
    
    try{
	   createGisContol(name);
	   var gridflex = document.getElementById(name);
	   gridflex.Flex_Type =flex_type;
	   gridflex.Init_Grid_Control(width,height);
    }catch(e){
    	alert(e.description);  
    }
}

function createGisContol(objectID){
	div = document.getElementById(objectID+"_div");
	div.innerHTML = '<object classid=clsid:F3128431-2432-4ADF-9D83-17D12BDE8EB1 ' +
				  ' type="'+div.type+ '"' +
				    ' id="'+objectID + '"'  +
			     ' flex_type="'+div.flex_type+ '"' +
			      ' codebase="'+div.codebase+ '"' +
				  ' name="'+objectID + '"' +
				  ' width="'+div.style.width + '"' +
				  ' height="'+div.style.height + '"' +
				 //' style="height:'+div.style.height + ';width:'+div.style.width+';">'+
				 '</object>';
					 
}
/////////////////////////////////////////////////
function newJFQK(name,width,height,inrate){
    try{
     createnewJFQK(name,width,height,inrate);
     var JFQKa = document.getElementById(name);
//   JFQKa.in_rate =inrate; //????????????????
     JFQKa.width=width
     JFQKa.height=height;
    }catch(e){
      alert("here is error "+e.description);
    }
}

function createnewJFQK(objectID,width,height,inrate){
  div = document.getElementById(objectID+"_div");
  div.innerHTML =
          '<object classid="clsid:FEF8E799-D47D-4E49-A47E-581085FA2052" ' +
          ' id="'+objectID + '"'  +
          ' codebase="'+div.codebase+ '"' +
          ' name="'+objectID + '"' +
          ' width="'+width + '"' +
          ' hspace="0" height="'+height + '">' +
          ' <param name="width" value="'+ width +'"> '+
          ' <param name="height" value="'+ height +'"> '+
          ' <param name="in_rate" value="'+ inrate +'"> '+
          '</object>';
}

function newDKYT(name,width,height,inpurpose){
    try{
     createnewDKYT(name,width,height,inpurpose);
     var DKYTa = document.getElementById(name);
//   DKYTa.in_purpose =inpurpose; //????????????????
     DKYTa.width=width
     DKYTa.height=height;
    }catch(e){
      alert(e.description);
    }
}
function createnewDKYT(objectID,width,height,inpurpose){
  div = document.getElementById(objectID+"_div");
  div.innerHTML =
          '<object classid="clsid:4BA0A2F0-6BE4-482A-956B-8F5C647163CC" ' +
          ' id="'+objectID + '"'  +
          ' codebase="'+div.codebase+ '"' +
          ' name="'+objectID + '"' +
          ' width="'+width + '"' +
          ' hspace="0" height="'+height + '">' +
          ' <param name="width" value="'+ width +'"> '+
          ' <param name="height" value="'+ height +'"> '+
          ' <param name="inp_urpose" value="'+ inpurpose +'"> '+
         '</object>';
}

function newSCXXYJ(name,width,height,inexam){
    try{
     createnewSCXXYJ(name,width,height,inexam);
     var SCXXYJa = document.getElementById(name);
//   SCXXYJa.in_exam =inexam; //????????????????
     SCXXYJa.width=width
     SCXXYJa.height=height;
    }catch(e){
      alert(e.description);
    }
}
function createnewSCXXYJ(objectID,width,height,inexam){
  div = document.getElementById(objectID+"_div");
  div.innerHTML =
          '<object classid="clsid:E1ED50C1-9F55-4B15-AC6A-E15764554470" ' +
          ' id="'+objectID + '"'  +
          ' codebase="'+div.codebase+ '"' +
          ' name="'+objectID + '"' +
          ' width="'+width + '"' +
          ' hspace="0" height="'+height + '">' +
          ' <param name="width" value="'+ width +'"> '+
          ' <param name="height" value="'+ height +'"> '+
          ' <param name="in_exam" value="'+ inexam +'"> '+
         '</object>';
}
