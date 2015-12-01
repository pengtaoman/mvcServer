/**
 * Select校验组件
 * js组件：SelectObj.js
 * 应用例子:Select.html
 * 属性：isNullable：是否为空。 当为NO时不可以为空，需要非空校验；当为YES时可以为空，不需要非空校验。    
 * 说明：1、非空校验
 *       2、将Enter 键转换为 Tab 键。
 *             
 * @author  lixiangyu@neusoft.com,2003.04
 *          micy@neusoft.com	2003.07.21
 *				hugh@neusoft.com
 */
 var oPopup = window.createPopup();
 function SelectObj(editerObj){
	
	//定义输入对象
	this.edtObj = editerObj;
    	
	
	//公共方法
	this.getParentObj = SEL_getParentObj;
	this.getBaseObj = SEL_getBaseObj;
	
	this.onvalidate = SEL_onvalidate;
	
	this.onReady = SEL_onDocumentReady;
 	this.eventBand = SEL_eventBand;
	
	//this.mouseover = SEL_mouseover;
	//this.mouseout = SEL_mouserout;
	//私有方法
	
	//私有对象
    var ParObj=null;
    var BasObj=null;
}

 	function SEL_getParentObj(){
    	if(this.ParObj==null){
    		this.ParObj = new BaseObj(this.edtObj);
    		}
    		return this.ParObj;	
   	}
   function SEL_getBaseObj(){
   	if(this.BasObj==null){
   		this.BasObj = new BaseObj(this.edtObj);
   	}
   	return this.BasObj;
   	
   	}

    
    // var fixLength=this.edtObj.fixLength;
     
    function SEL_onvalidate() {
    
     //调用Base.htc中的公用函数检查数据合法性
     if(!this.getBaseObj().commonCheck())	return false;   
     return true;
    }   

/**
 *名称：onDocumentReady
 *功能：在select中自动增加这项<option value="">请选择</option>
 *形参：
 *
 *返回：
 */
function SEL_onDocumentReady() {	
    
    var isNoSelected = this.edtObj.getAttribute("isNoSelected");
    if(isNoSelected != null && isNoSelected.toUpperCase() == "TRUE"){
     	this.edtObj.selectedIndex = 0;  
     	return;
    }

//	var flag = false;
//	var isNotInDW = this.edtObj.getAttribute("isNotInDW");
//	isNotInDW = isNotInDW == null ? "false" : isNotInDW.toLowerCase();
//	for(var i=1; i<this.edtObj.options.length; i++){
//        if(this.edtObj.options(i).isSelectedInDW != null && this.edtObj.options(i).isSelectedInDW.toUpperCase() == "TRUE"){        	
//            this.edtObj.selectedIndex = i;
//            flag = true;
 //           break;
//        }          
//       if(isNotInDW != "true")
//       		if(this.edtObj.options(i).selected) flag = true;      
 //   }	
// if(!flag) this.edtObj.selectedIndex = 0;  
//   if(!flag&&this.edtObj.selectedIndex == 0) this.edtObj.selectedIndex = 0;
//zhoujj
			
			if (this.edtObj.selectedIndex == 0 )
					for(var i=1; i<this.edtObj.options.length; i++){
				        if(this.edtObj.options(i).isSelectedInDW != null && this.edtObj.options(i).isSelectedInDW.toUpperCase() == "TRUE"){        	
				            this.edtObj.selectedIndex = i;
				            flag = true;
				           break;
				        }          
					}
    //调用父类的初始化方法   	 
    this.getParentObj().onReady();
    
    //屏蔽提示框的右键
    oPopup.document.body.attachEvent("oncontextmenu",function(){return false});
    
    this.edtObj.attachEvent("onmouseover",function(){
	 var obj = event.srcElement;  
     if(obj.value == "") return ; 
     var text = obj.options(obj.selectedIndex).text;
     var oPopupBody = oPopup.document.body;
     var lefter = event.x-document.body.scrollLeft-1;
     var topper = event.y-document.body.scrollTop-1;
     oPopupBody.style.color = "#000000";
     oPopupBody.style.fontSize = "12px";
     oPopupBody.style.padding = "0";
     oPopupBody.style.backgroundColor="#FFFFE1";
     oPopupBody.style.border="1px solid #000000";
     
     var oMessage ="<table style='font-family:宋体;font-size: 12px;'>";
     oMessage+="<tr><td>"+text+"</td></tr>\n";
     oMessage+="</table>";
     
     var maxlen = parseInt(text.length/12);

     if(maxlen*12< text.length) 
          maxlen++;
         
     oPopupBody.innerHTML = oMessage;
     oPopup.show(lefter, topper, 2* 80 ,maxlen*(20-maxlen), document.body);
});
 	this.edtObj.attachEvent("onmouseout",function(){
 	
	oPopup.hide(); 
});
 	


}

function SEL_eventBand(){}


