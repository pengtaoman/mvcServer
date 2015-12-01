var SVGRoot=document.documentElement();
var actRecColor;
var lineRecColor;
var ctrlFlag = false;
var alt_text_value;
function zoomOut(){
   if (SVGRoot.currentScale > 0.2){
      SVGRoot.currentScale = SVGRoot.currentScale * 0.8;
      winZoomOut();
   }
}
function zoomIn(){
   if (SVGRoot.currentScale < 2.5){
      SVGRoot.currentScale = SVGRoot.currentScale * 1.2;
      winZoomIn();
   }
}
function originalView(){
   var scale = SVGRoot.currentScale;
   SVGRoot.currentScale = 1;
   winOriginalView(scale);
}
function byTxtSelected(evt){
      var obj=evt.target;
      obj.setAttribute("style","text-decoration:underline;font-weight:bold;text-anchor: middle;");
}
function unTxtSelected(evt){
      var obj=evt.target
      obj.setAttribute("style","text-anchor: middle;font-weight:bold;")
}
function byRecSelected(type,evt,recid,htid,path){
      if (type=='0'){
         var pathFile = path + "/menu/instmonitor/SVGAutoMenu.xml";
         addActivityMenu(pathFile);
      }else if (type=='1'){
	     var pathFile = path + "/menu/instmonitor/SVGManualMenu.xml";
	     addActivityMenu(pathFile);
      }else if (type=='2'){
	     var pathFile = path + "/menu/instmonitor/SVGSubProcMenu.xml";
	     addActivityMenu(pathFile);      
      }else if (type=='4'){
	     var pathFile = path + "/menu/instmonitor/SVGEventMenu.xml";
	     addActivityMenu(pathFile);      
      }
      if (recid==htid){
         menuActDefID=recid;
         menuActInstID=null;
      }else{
         menuActDefID=recid;
         menuActInstID=htid;
      }
      var obj = document.getElementById("rec"+recid);
      actRecColor=obj.getAttribute("style");
      obj.setAttribute("style","fill:#cccccc;stroke:#cccccc; stroke-width: 1; stroke-opacity: 5;");      
}
function byRunManualRecSelected(type,evt,recid,htid,path){
      if (type=='1'){
	     var pathFile = path + "/menu/instmonitor/SVGCtrlMenu.xml";
	     addActivityMenu(pathFile);         
	  }else if(type=='2'){
	  	var pathFile =path +"/menu/instmonitor/SVGSubCtrlProcMenu.xml";
	  	addActivityMenu(pathFile);
	  }
      if (recid==htid){
         menuActDefID=recid;
         menuActInstID=null;
      }else{
         menuActDefID=recid;
         menuActInstID=htid;
      }
      var obj = document.getElementById("rec"+recid);
      actRecColor=obj.getAttribute("style");
      obj.setAttribute("style","fill:#cccccc;stroke:#cccccc; stroke-width: 1; stroke-opacity: 5;");      
}

function unRecSelected(evt,id,path){
      var obj=document.getElementById(id);
      if(actRecColor!=null)
      	obj.setAttribute("style",actRecColor);
      //obj.setAttribute("style","fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;");
      addMainMenu(path);
}
function unOldRecSelected(evt,id,path){
      var obj=document.getElementById(id);
      obj.setAttribute("style",actRecColor);
      addMainMenu(path);
}
function byBranchRecSelected(evt,recid,name,x,y,l){
      var obj = document.getElementById("rec"+recid);
      actRecColor=obj.getAttribute("style");
      obj.setAttribute("style","fill:#cccccc;stroke:#cccccc; stroke-width: 1; stroke-opacity: 5;");       
      var obj1 = document.getElementById("alt");
      obj1.setAttribute("x",x); 
      obj1.setAttribute("y",y);
      obj1.setAttribute("width",l+2); 
      obj1.setAttribute("style","fill:#FFFFE1;stroke-width:1;stroke:#000000;");
      var obj2 = document.getElementById("alt_text");
      obj2.setAttribute("x",x+1); 
      obj2.setAttribute("y",y+13); 
      obj2.setAttribute("width",l); 
      var nameValue=document.createTextNode(name);
      alt_text_value =nameValue;
      obj2.appendChild(nameValue);
     
}
function unBranchRecSelected(evt,id){
      var obj=document.getElementById(id);
      obj.setAttribute("style","fill:url(#linerec2);stroke-width:1;stroke:#B4B2B4;");
      var obj1 = document.getElementById("alt");
      obj1.setAttribute("x",0); 
      obj1.setAttribute("y",0);
      obj1.setAttribute("width",2); 
      obj1.setAttribute("style","fill:#FFFFFF;stroke-width:1;stroke:#FFFFFF;");
      var obj2 = document.getElementById("alt_text");
      obj2.setAttribute("x",0); 
      obj2.setAttribute("y",0); 
      obj2.setAttribute("width",1); 
      if (alt_text_value!=null&&obj2!=null){
        obj2.removeChild(alt_text_value);
        alt_text_value=null;
      }
}
function byParrallelRecSelected(evt,recid,name,x,y,l){
      var obj = document.getElementById("rec"+recid);
      actRecColor=obj.getAttribute("style");
      obj.setAttribute("style","fill:#cccccc;stroke:#cccccc; stroke-width: 1; stroke-opacity: 5;");           
}
function unParallelRecSelected(evt,id){
      var obj=document.getElementById(id);
      obj.setAttribute("style","fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;");
}
function setPreviousColor(preid,curid){
      if (curid!=null){
         if (curid.indexOf(",")>0){
            var curids = curid.split(",");
            var i=0;
            while(curids[i]!=null){      
               var obj = document.getElementById("rec"+curids[i]);   
               obj.setAttribute("style",lineRecColor);
               i++;
            }
        }else{
            var obj = document.getElementById("rec"+curid);
            obj.setAttribute("style",lineRecColor);
        }
      }
      if (preid.indexOf(",")>0){
         var preids = preid.split(",");
         var i=1;
         var obj = document.getElementById("rec"+preids[0]);
         focusDiv(obj.getAttribute("x"),obj.getAttribute("y")); 
         lineRecColor=obj.getAttribute("style");
         obj.setAttribute("style","fill:#00FF00;fill-opacity: 0.6;"); 
         while(preids[i]!=null){     
            obj = document.getElementById("rec"+preids[i]);   
            obj.setAttribute("style","fill:#00FF00;fill-opacity: 0.6;");
            i++;
         }
      }else{
         var obj = document.getElementById("rec"+preid);
         focusDiv(obj.getAttribute("x"),obj.getAttribute("y")); 
         lineRecColor=obj.getAttribute("style"); 
         obj.setAttribute("style","fill:#00FF00;fill-opacity: 0.6;");      
      }
}
function setNextColor(nexid,curid){
       if (curid.indexOf(",")>0){
          var curids = curid.split(",");
          var i=0;
          while(curids[i]!=null){      
             var obj = document.getElementById("rec"+curids[i]);   
             obj.setAttribute("style",lineRecColor);
             i++;
          }
       }else{
          var obj = document.getElementById("rec"+curid);
          obj.setAttribute("style",lineRecColor);
      }
      if(nexid!=null){
	      if (nexid.indexOf(",")>0){
	         var nexids = nexid.split(",");
	         var i=1;
	         var obj = document.getElementById("rec"+nexids[0]);
	         focusDiv(obj.getAttribute("x"),obj.getAttribute("y")); 
	         lineRecColor=obj.getAttribute("style");
	         obj.setAttribute("style","fill:#00FF00;fill-opacity: 0.6;"); 
	         while(nexids[i]!=null){     
	            obj = document.getElementById("rec"+nexids[i]);   
	            obj.setAttribute("style","fill:#00FF00;fill-opacity: 0.6;");
	            i++;
	         }
	      }else{
	         var obj = document.getElementById("rec"+nexid);
	         focusDiv(obj.getAttribute("x"),obj.getAttribute("y")); 
	         lineRecColor=obj.getAttribute("style"); 
	         obj.setAttribute("style","fill:#00FF00;fill-opacity: 0.6;");      
	      } 
      } 
}
function setCurColor(curid,curStr){
       if (curid!=null){
	       if (curid.indexOf(",")>0){
	          var curids = curid.split(",");
	          var i=0;
	          while(curids[i]!=null){      
	             var obj = document.getElementById("rec"+curids[i]);   
	             obj.setAttribute("style",lineRecColor);
	             i++;
	          }
	       }else{
	          var obj = document.getElementById("rec"+curid);
	          obj.setAttribute("style",lineRecColor);
	       }
       }
       if (curStr.indexOf(",")>0){
          var curStrs = curStr.split(",");  
          var obj = document.getElementById("rec"+curStrs[0]);   
          focusDiv(obj.getAttribute("x"),obj.getAttribute("y"));
       }else{
          var obj = document.getElementById("rec"+curStr);
          focusDiv(obj.getAttribute("x"),obj.getAttribute("y"));
       }
}
function findXY(evt){
    window.status = 'X=' + evt.getClientX  + ' Y=' + evt.getClientY;
}
function fileLoaded(data){
     if(data.success){
         var newMenuRoot=parseXML(data.content,contextMenu)
         contextMenu.replaceChild(newMenuRoot,contextMenu.getDocumentElement());
      }    
}
function addMainMenu(path){
  var menuname = path + "/menu/instmonitor/SVGMenu.xml";
  getURL(menuname, fileLoaded);
}
function checkState(recid,curStr){
     var checked;
     checked = false;
     if (curStr.indexOf(",")>0){
         var curStrs = curStr.split(","); 
         var i=0; 
         while(curStrs[i]!=null){
           if (recid==curStrs[i]){
              checked=true;
              i++;
           }   
         }   
     }else{
         if (curStr==recid){
            checked=true;
         }        
     }
     return checked;
}
function addActivityMenu(pathFile){
  getURL(pathFile, fileLoaded);
}
function detectPlugin(){

}
