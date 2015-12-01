//create a DDGrid class
Ext.grid.DDGrid = function(){
    Ext.grid.DDGrid.superclass.constructor.apply(this, arguments);
    this.enableDragDrop = true;
    this.enableColumnMove = false;   
};

Ext.extend(Ext.grid.DDGrid, Ext.grid.Grid, {    
    render : function(){   	
        this.target = new Ext.dd.DropTarget(this.container, {
          ddGroup: 'GridDD',
          dropAllowed: "x-dd-drop-ok",
          dropNotAllowed :"x-dd-drop-nodrop",
          notifyDrop : this.onRowsDropped.createDelegate(this)
        });          
        Ext.grid.DDGrid.superclass.render.call(this);
        this.ddProxy = Ext.DomHelper.append(document.body, {
          tag: 'div',
          cls: 'row-move-proxy'},
          true
        ); 
        this.ddProxy.hide();                 
    },   

    
    onRowsDropped : function(dd, e, data){ 
      //canDragDrop=true 主要是为了表示可以接受拖拽过来的数据
      if ((dd.el.dom.className != 'x-grid-header')&&(this.canDragDrop==false)) { 
        this.ddProxy.hide();   
        var targetDs = this.getDataSource();
        for(var i = 0, len = data.selections.length; i < len;) {       	  
       	   var flag = true;
       	   //getTotalCount()???????????
       	   for(var k = 0;k<targetDs.getTotalCount();k++){
       	   	  //targetDs.getAt(k).get("userId")?????????id?
       	   	  if(targetDs.getAt(k).get("userId")==data.selections[i].get("userId")){
       	   	  flag = false;
       	   	  break;
       	   }
       	}

       	   if((targetDs.indexOfId(data.selections[i].id)==-1)&&flag){//query if the data has been inserted
       		   var selStart;
        	   var dragData = dd.getDragData(e);
        	   var pos = dragData.rowIndex;
               	  targetDs.add(data.selections[i]);
                  selStart = targetDs.getCount()-data.selections.length;
                  var col=targetDs.getById(data.selections[i].id);
                  var ind =targetDs.indexOf(col);
                //  alert(Ext.get(grid1.getView().getRow(ind)).addClass);
                 //alert(grid1.getView().getRow(ind).className);
                  //(Ext.get(grid1.getView().getRow(ind))).addClass('inserted');
                  //alert(grid1.getView().getRow(ind).className);
                  // alert(Ext.get(grid1.getView().getRow(ind)).className)
                  this.getView().getRow(ind).style.backgroundColor="green";
               //   alert(grid1.getView().getRow(ind));
                  //alert(col.id);
                  //'<span style="color:green;">' + col + '%</span>'
                  //alert(col);
             //  }
           	   //this.selModel.selectRange(selStart, selStart+data.selections.length-1);
           	   i++;
               //alert(data.selections[i].id);
               //alert(targetDs.getById(data.selections[i].id));
               //return true;
       	   }
       	   else
       	   
       	   i++;      	   
       	  //  ds.remove(data.selections[i]);
        }
       // this.selModel.clearSelections();
		return true;
      }
    }
   // onKeyDown
    
});