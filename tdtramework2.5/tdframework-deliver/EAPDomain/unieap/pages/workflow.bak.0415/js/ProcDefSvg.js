var SVGRoot=document.documentElement();
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
      obj.setAttribute("fill","blue");
      obj.setAttribute("style","text-decoration:underline;text-anchor: middle;");
}
function unTxtSelected(evt){
      var obj=evt.target
      obj.setAttribute("fill","black")
      obj.setAttribute("style","text-anchor: middle;")
}
function byRecSelected(type,evt,id,path){
      //if (type=='0'){
         //var pathFile = path + "/menu/defmonitor/SVGAutoMenu.xml";
         //addActivityMenu(pathFile);
      //}
      //if (type=='1'){
        // var pathFile = path + "/menu/defmonitor/SVGManualMenu.xml";
         //addActivityMenu(pathFile);
      //}
      menuActDefID=id;
      var obj=document.getElementById(id);
      obj.setAttribute("style","fill:#cccccc;stroke:#cccccc; stroke-width: 1; stroke-opacity: 5;");      
}
function unRecSelected(evt,id,path){
      var obj=document.getElementById(id);
      obj.setAttribute("style","fill:url(#linerec1);stroke-width:1;stroke:#B4B2B4;");
      //addMainMenu(path);
}
function unOldRecSelected(evt,id,path){
      var obj=document.getElementById(id);
      obj.setAttribute("style","fill:#ffffff;");
      //addMainMenu(path);
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
//function addMainMenu(path){
  //var menuname = path + "/menu/defmonitor/SVGMenu.xml";
  //getURL(menuname, fileLoaded);
//}
function addActivityMenu(pathFile){
  getURL(pathFile, fileLoaded);
}
function initMenu(){
  //if(evt.button==2)
     //evt.preventDefault();
}
function openManualMenu(evt,id){
    //if(evt.button==2){
    
    //}else{
      manual_onClick(id);
    //} 
}
function openAutoMenu(evt,id){
    //if(evt.button==2){
    
    //}else{
      auto_onClick(id);
    //} 
}
function detectPlugin(){

}
