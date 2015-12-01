JSKit.tablerow=new function(){
	var Me=this;

	var lightLineClassName="listTableRowLight";
	var selectedLineClassName="listTableRowSelected";
	
	var currentLine=null;
	
	var isSelected=function(rowObj){
		return rowObj.className.indexOf(selectedLineClassName)>=0 && currentLine==rowObj;
	}
	var isLight=function(rowObj){
		return rowObj.className.indexOf(lightLineClassName)>=0;
	}
	
	Me.selectMe=function(rowObj){
		if (currentLine!=null){
			removeClass(currentLine,selectedLineClassName);
			removeClass(currentLine,lightLineClassName);
		}
		//if (!isSelected(rowObj)){
			addClass(rowObj,selectedLineClassName);
			currentLine=rowObj;
		//}
	}

	Me.lightMe=function(rowObj){
		if (!isSelected(rowObj)){
			addClass(rowObj,lightLineClassName);
		}
	}

	Me.resetMe=function(rowObj){
		if (!isSelected(rowObj) ){
			
			removeClass(rowObj,selectedLineClassName);
			removeClass(rowObj,lightLineClassName);
		}
	}
	
}
