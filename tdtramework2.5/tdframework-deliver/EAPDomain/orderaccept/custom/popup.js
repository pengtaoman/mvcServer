defineModule("orderaccept.custom.popup", ["../prodofferaccept/util","dijit._base.popup"], function(util) {
	        
	        	var open = function(args){
	        		 var tipNode = args.widget.popup.domNode,
	        		 	 aroundNode = args.widget.around;
	        		 if(args.doCheck && !args.doCheck()){
	        		 	return false;
	        		 }	        	
	        		 dijit.popup.open(args.widget);
	        		 
	        		 if(args.widget.pos =="R"){	  
							tipNode.className = 'dijitTooltipDialog dijitTooltipRight';     
	        		     	popNode= tipNode.parentNode;	 	
							popNode.style.left =  util.DomHelper.getLeft(aroundNode)+util.DomHelper.getWidth(aroundNode)+"px";
							popNode.style.top = util.DomHelper.getTop(aroundNode)+
										util.DomHelper.getHeight(aroundNode)-util.DomHelper.getHeight(popNode)+"px";
	        		 }else if(args.widget.pos =="L"){
							tipNode.className = 'dijitTooltipDialog dijitTooltipLeft';     
	        		     	popNode= tipNode.parentNode;	 	
							popNode.style.left =  util.DomHelper.getLeft(aroundNode)-util.DomHelper.getWidth(popNode)+"px";
							popNode.style.top = util.DomHelper.getTop(aroundNode)+
										util.DomHelper.getHeight(aroundNode)-util.DomHelper.getHeight(popNode)+"px";
	        		 	
	        		 }
	        	};
	        	var close = function(args){
	        		 if(args.doCheck && !args.doCheck()){
	        		 	return false;
	        		 }
	        		 if(args.widget && args.widget.handlePageData && !args.notHandleData){
	        		 	if(args.widget.handlePageData() === false){
	        		 		return false;
	        		 	}
	        		 }
	        		 dijit.popup.close(args.widget);
	        	};
	        	
	        	orderaccept.custom.popup.open = open;
	        	
	        	orderaccept.custom.popup.close = close;        	
	        
        }

);