/*********************************
*  Note  :draw coordinate diagram
*  author:muxg
*  date  :2005.09.13
**********************************/

/**
* eg. 
  var points = "10,10,100,10,100,100,10,100,10,10;120,60,180,60,180,160,120,160,120,60"
  var diagram = new CoordDiagram('myid',100,200,0,0,points);
  diagram.draw();
*/

/*******CoordDiagram
*
*  @id    : required.
*  @width : required;the diagram's width.
*  @height: required;the diagram's height.
*  @left  : required;the position of the diagram.
*  @top   : required;the position of the diagram.
*  @points: required;the diagrams's track.
*  @gap   : unrequired;the space between the diagram and the widget.
*  e.points="10,10,100,10,100,100,10,100,10,10;120,60,180,60,180,160,120,160,120,60;5,110,50,110,50,180,5,180,5,110"
******/

function CoordDiagram(id,points,gap)
  {
    if(gap)
      { 
        this.gap=parseInt(gap);	
      }
    else
      {
        this.gap=16;	
      }
    this.id=id;
    this.posWidth = 0;
    this.posHeight= 0;
    this.width=0;
    this.height=0;
    this.posLeft = 0;
    this.posTop = 0;
    this.left=0;
    this.top=0; 
    this.points=points;
    this.draw = drawDiagram;
    this.setPoints = setPoints;
    FORM_OBJECT_POOL.put(this.id,this);

  }
function setPoints(points){
	 this.points=points; 
} 
function drawDiagram()
 {
  var minLeft = 0;
  var maxLeft = 0;
  var minTop  = 0;
  var maxTop  = 0;
  var width1  = 0;
  var height1 = 0;
  
  var parentDiv = document.getElementById(this.id);
  if(parentDiv==null||this.points==null||this.points=="")
    return;
  
  this.posWidth = parseInt(parentDiv.style.width);
  this.width = this.posWidth - this.gap*2;
  this.posHeight= parseInt(parentDiv.style.height);
  this.height= this.posHeight - this.gap*2;
  this.posTop = parseInt(parentDiv.style.top);
  this.top   = this.posTop + this.gap;
  this.posTop = parseInt(parentDiv.style.left);
  this.left   = this.posTop + this.gap;
  
  var diagrams = this.points.split(";");
  for(var d=0;d<diagrams.length;d++)
    {
      var points_array = diagrams[d].split(",");

      for(var i=0;i<points_array.length;i=i+2)
        {
       	  if(d==0&&i==0)
      	    {
      	      minLeft = maxLeft = parseFloat(points_array[i]);
      	      minTop  = maxTop  = parseFloat(points_array[i+1]);
      	    }
      	  if(minLeft > parseFloat(points_array[i]))
      	    {
              minLeft = parseFloat(points_array[i]);
      	    }
      	  if(maxLeft < parseFloat(points_array[i]))
      	    {
      	      maxLeft = parseFloat(points_array[i]);
      	    }
          if(minTop > parseFloat(points_array[i+1]))
            {
              minTop = parseFloat(points_array[i+1]);		
            }
          if(maxTop < parseFloat(points_array[i+1]))
            {
              maxTop = parseFloat(points_array[i+1]);
            }
       }
   }
   width1 = maxLeft - minLeft;
   height1= maxTop - minTop;
   var points_zoom = "";
   var multiple1 = this.height/height1
   var multiple2 = this.width/width1
   var multiple;
   if(multiple1>multiple2)
     {
     	multiple=multiple2;
     }
   else
     {
     	multiple=multiple1;
     }
   
   var realWidth = width1*multiple
   var realHeight = height1*multiple
   
   var left1 = (this.width - realWidth)/2
   var top1 = (this.height - realHeight)/2
   var polyLines = new Array();
   
   for(var m=0;m<diagrams.length;m++)
     {
       var points_ary = diagrams[m].split(",");
       points_zoom="";
       //alert(diagrams[m]!="")
       if(diagrams[m]=="")
        {
          break;
        }
       for(var p=0;p<points_ary.length;p=p+2)
        {
          points_zoom=points_zoom+(points_ary[p] - minLeft)*multiple+","+(height1 - points_ary[p+1] + minTop )*multiple+" ";
          
        }
       polyLines[m]=points_zoom;
     }
     
     if(parentDiv.childNodes.length >0){
     	 parentDiv.removeChild(parentDiv.childNodes[0]);
     }
    
      parentDiv.style.border = "none";//"dashed black 1px";
      var div = document.createElement("<DIV style='width:"+this.width+"px;height:"+this.height+"px;position:absolute;left:"+this.gap+"px;top:"+this.gap+"px;'/>");
      var gs =""
      gs = "<v:group style='position:absolute;left:"+left1+"px;top:+"+top1+";width:"+realWidth+"px;height:"+realHeight+"px;'"+" coordsize='"+realWidth+","+realHeight+"'>";
      for(is in polyLines)
      {
       gs = gs + '<v:polyLine style="z-index:9" filled=f strokecolor=black strokeweight=1pt points="'+polyLines[is]+'"/>'  	
      }
     gs = gs + "</v:group>" + '<v:polyline  points="0 0" style="position:absolute;top:0;left:0;visibility:hidden;"/>';
     div.innerHTML = gs
   parentDiv.appendChild(div)
 }
 
/**TOOL FUNCTIONS**/

function replaceAll(str_source,str_old,str_new)
 {
    return str_source.replace(eval("/"+str_old+"/g"), str_new);
 }