
isInArray=function(array,item){
       for(var i=0;i<array.length;i++){
         if(array[i]==item){
            return true;
         }
       }
       return false;
	 }
concatArr=function(arr1,arr2){	
	var concatArr=[];
	for(var i=0;i<arr1.length;i++){
		concatArr.push(arr1[i]);
	}	
	for(var i=0;i<arr2.length;i++){
		if(isInArray(arr1,arr2[i])){	
			continue;
		}else{
		concatArr.push(arr2[i]);
		}
	}
	return concatArr;
}
var isDelay=true;
var ComboBox=Class.create();

var ComboBoxManager=new Array();
ComboBox.prototype={
    initialize:function(id,data,value,options,optionMatch){   	
        this.id=id;
        this.comboBox=$(id);
        ComboBoxManager[this.id]=this;
        this.textInput=$(id+"_textInput");
        // this.textInput.value="请选择";
        this.textInput.setAttribute('autocomplete', 'off');
        this.arrowButton=$(id+"_arrowButton");
        this.listDiv=$(id+"_listDiv");
        this.hiddenValue=$(id+"_hideValue");
        if(!this.hiddenValue){
          this.hiddenValue=document.createElement("input");
          this.hiddenValue.type="hidden";
        }
        this.data=data;//存储combobox中数据项的文本，类型为数组
        this.value=value;//存储combobox中数据项的所对应的值，类型为数组
        this.optionMatch=optionMatch;//多匹配
        this.setOptions(options);
        this.setDefaultValue();
        this.setComboBoxStyle();
        this.addEventHandler();//添加事件处理函数
        this.currentEventType=null;//修改点击按钮后会被自动选中的bug,保存当前事件类型
        this.currentValue="";
     },
    setOptions:function(options){
        this.options={
            matchAnyWhere:false,
            ignoreCase:false,
            count:6,
            width:"200px",
            height:"245px",
            listcount:50,
            listDivClassName:"ComboBoxListDiv",
            comboBoxClassName:"ComboBox",
            multiDealFun:this.dealMultiResult,
            onchange:null,
            checkbox:false,
            popwin:true
        };
        Object.extend(this.options,options || {}); 
        if(this.options.checkbox){
            this.checkboxValues=[];//存储所选中项的值
            this.selectedCheckboxs=[]; //存储所选中项的文本
            this.popcheckboxs=[]; //存储弹出窗口中的checkbox
        }  
        if(this.options.popwin){
        	//  this.oPopup = window.createPopup();//创建弹出窗口	
        }    
        
    
    },
    setDefaultValue:function(){
    	if(this.options.defaultValue){
    		this.setTextAndValue(this.options.defaultValue);
    		//this.textInput.value=this.options.defaultValue;
    	}
    },
    
   /*
    * 设置样式
    */
    setComboBoxStyle:function(){
        this.listDiv.className=this.options.listDivClassName;
        this.comboBox.className=this.options.comboBoxClassName;	
    },
    
  /*
    * 添加事件
    */
    addEventHandler:function(){
        this.arrowButton.onclick=this.clickHandler.bindAsEventListener(this);//为按钮添家点击事件
        this.textInput.onkeyup=this.keyupHandler.bindAsEventListener(this); //为输入域添加键盘事件
       this.textInput.onkeydown=this.keydownHandler.bindAsEventListener(this); 
	//	this.textInput.onkeypress=this.keyPressHandler.bindAsEventListener(this); 
     
    },
	/*
          * 在英文输入法下可以屏蔽某些字符
           */
	keyPressHandler:function(event){
      if ((window.event.keyCode > 32 && window.event.keyCode < 48)
            || (window.event.keyCode > 57 &&window.event.keyCode < 65)
            || (window.event.keyCode > 90 && window.event.keyCode < 97)){
         window.event.keyCode = 0 ;
      }
      //屏蔽回车键,防止回车键提交表单
      if(window.event.keyCode==13){
      	 Event.stop(event);
      }
    },
    /*
     * 获得combobox组件所选中项的文本,多选时返回用逗号连接的所选中项的字符串
     */
    getSelectedText:function(){
    if(this.options.checkbox){
    	 return this.options.multiDealFun(this.selectedCheckboxs);
    }
   	 return this.textInput.value;  
   
   },
    /*
     * 获得combobox组件所选中项的值,多选时返回用逗号连接的所选中项的值的字符串
     */
   getSelectedValue:function(){
   	  if(this.options.checkbox){
   	  	
   	   return this.options.multiDealFun(this.checkboxValues);
   	  }
   	  var index=this.data.indexOf(this.textInput.value);
   	  if(index==-1)return "";
   	  return this.value[index];
   },
   
   setTextAndValue:function(text){
   	if(!this.options.checkbox){
   	 this.textInput.value=text;
   	}else{
   	 this.textInput.value = this.getSelectedText();
   	}
   	 this.hiddenValue.value=this.getSelectedValue();
   },
    keySearch:function(){    
        var searchString=this.textInput.value;
        if(searchString.length==0){
        	isDelay=true;
        	return;
        }
        var result=this.findMatchData(searchString);
        this.creatMatchList(result);
        isDelay=true;
    },
    findMatchData:function(searchString){
        if(searchString.length==0)
            return {matchData:this.data,matchString:searchString}; 
        var result=[ ];
        var regExpFlags="";
        if(this.options.ignoreCase){
            regExpFlags="i";
        }
        var startRegExp="^";
        if(this.options.matchAnyWhere){
            startRegExp="";
        }
		try{
        var regex=new RegExp(startRegExp+searchString,regExpFlags);
		}catch(e){
		  
		}
		
        result=this.getMatchResult(regex,searchString);
       
        return {matchData:result,matchString:searchString};    
    },
    dealMultiResult:function(result){
    	
    	var value=result.join(',');
    	return value;
    	
    },
    getMatchResult:function(regex,searchString){
    	var result=[ ];
    	if(this.options.multiMatch){
    		for(var optionCount=0;optionCount<this.optionMatch.length;optionCount++){
			var match=this.optionMatch[optionCount];
			for(var j=0;j<match.length;j++){
			   if(regex){
				 if(regex.test(match[j])){	
				 	 if(!isInArray(result,this.data[j])){		  
                          result.push(this.data[j]);
				 	 }
                 }
			    }else{
				  if(match[j].indexOf(searchString)!=-1){
				  	 if(!isInArray(result,this.data[j])){		  
                          result.push(this.data[j]);
				 	 }
			      }
				}
			}
		  }
    	}else
    	{		
		if(regex){
		  for(var  i=0;i<this.data.length;i++){
            if(regex.test(this.data[i])){
            	 
                result.push(this.data[i]);
            }
        }
		}else
          {for(var  i=0;i<this.data.length;i++){
		     if(this.data[i].indexOf(searchString)!=-1)
            {
                  
                result.push(this.data[i]);
            }
            }
		}
    	}   	
    	return result;
    },
  
    creatMatchList:function(matchResult){
        var matchData=matchResult.matchData;     
        if(this.options.checkbox){
        	matchData=concatArr(this.selectedCheckboxs,matchData);
        }
        var matchString=matchResult.matchString;
      //  if(matchData.length==0){
      //      return ;  
      //  }
        this.currentData=matchData;
        this.showList(matchData);
    },
    
    clickHandler:function(e){
       this.currentEventType="click_button";
       this.options.listcount=50;    
       var result=this.findMatchData("");
       this.creatMatchList(result);
       this.currentEventType=null;
    },
     
    showList:function(matchData){ 
        
   if(this.options.popwin){
      this.createPopWin(matchData);
       }       
    },
    /*
     * 创建弹出窗口
     */
    createPopWin:function(matchData){
                var self=this;
                this.popcheckboxs=[];
                var themeColor="#316ac5";
                this.oPopup=window.createPopup();
                var oPopup = this.oPopup;	
                var oPopupBody = oPopup.document.body;
                oPopupBody.innerHTML="";
	            oPopupBody.style.backgroundColor="transparent";
                 var pos=Position.page(this.listDiv);//定位弹出窗口的位置
                 var x=pos[0];
                 var y=pos[1]; 
	             var popDiv=oPopup.document.createElement("div");
	            popDiv.style.border="1px solid #afafaf";
	            popDiv.style.overflow="scroll";//设置纵向滚动条,显示,横向滚动条隐藏
                popDiv.style.overflowX ="hidden"; 
	             if(this.options.popDivWidth){
	                  popDiv.style.width=this.options.popDivWidth;//设置弹出窗口的宽度
	             }
	         
	           var temp=oPopup.document.createDocumentFragment();
	           for(var i=0;i<matchData.length&&i<this.options.listcount;i++){
	                  var itemSpan=oPopup.document.createElement("span");
                      itemSpan.style.width="100%";
                      itemSpan.style.display="block";          
                    if(this.options.checkbox){
              	       var checkbox=oPopup.document.createElement("<input type='checkbox' >");
              	       if(isInArray(this.selectedCheckboxs,matchData[i])){
                    	    checkbox=oPopup.document.createElement("<input type='checkbox' checked='true'>")          
		            }
		            if( (this.currentEventType==null)&&(matchData.length-this.selectedCheckboxs.length)==1){
		              
			            if(i==(matchData.length-1)){
			            	 checkbox=oPopup.document.createElement("<input type='checkbox' checked='true'>") 
				             
				              this.selectedCheckboxs.push(matchData[i]);
				              var index=this.data.indexOf(matchData[i]);
    	  			          if(index!=-1){
    	  				           this.checkboxValues.push(this.value[index]);
    	  			 }  		
				              this.textInput.focus();
				              this.textInput.select();
			          }
		          }	
                   
                    checkbox.setAttribute("id",this.id+"_checkbox_"+i);
                    checkbox.setAttribute("selectedValue",matchData[i]);
                    checkbox.attachEvent("onclick",this.saveData.bind(this));//绑定点击事件
                    this.popcheckboxs.push(checkbox);       
		            itemSpan.appendChild(checkbox);
					
                    } 
            if(!this.options.checkbox){
            	//itemSpan.style.paddingTop="1px";
            	itemSpan.style.paddingTop="1px";
				//在单选的情况下,全匹配后,自动选中 
				/*
            	if(matchData.length==1){
					      var index=this.data.indexOf(matchData[i]);
    	  			          if(index!=-1){
    	  			          	    this.setTextAndValue(matchData[i]);
							  	   // this.textInput.value=matchData[i];
							  	}
            	    }
            	*/
            }
            itemSpan.style.paddingLeft="2px";
            itemSpan.appendChild(oPopup.document.createTextNode(matchData[i]));  
		    itemSpan.setAttribute("selectedValue",matchData[i]);
		    itemSpan.setAttribute("index",i);
		    itemSpan.style.fontSize="12px";
            itemSpan.style.cursor="hand";
            itemSpan.attachEvent("onclick",this.selectItem.bind(this));//为span绑定点击事件
          if(i%2==0){
			itemSpan.style.backgroundColor="#fff";	
			/*
			 * 为span绑定鼠标滑进滑出事件
			 */	
			itemSpan.onmouseover=function(){			
				this.style.color="#fff";
				this.style.backgroundColor=themeColor;				
				selectedValue=this.getAttribute("selectedValue");
				//try{
				//       this.focus();
				//   }catch(e){}
			}
			itemSpan.onmouseout=function(){
				this.style.color="#000";
				this.style.backgroundColor="#fff";	
				//try{
				//   this.blur();	
				//}catch(e){}
			}
		}else{
			itemSpan.style.backgroundColor="#f4f4f4";
			itemSpan.onmouseover=function(){								
				this.style.color="#fff";
				this.style.backgroundColor=themeColor;				
				selectedValue=this.getAttribute("selectedValue");
				//try{
				//   this.focus();
				//}catch(e){}	
			}
			itemSpan.onmouseout=function(){
			this.style.color="#000";
			this.style.backgroundColor="#f4f4f4";			  
		    try{
				this.focus();
				}catch(e){}		  		  
			}
		}
            itemSpan.id=this.id+"_item_"+i;          
            itemSpan.setAttribute("selectedValue",matchData[i]);    
            //高亮选中
            if(matchData[i]== this.textInput.value){
                 	itemSpan.style.color="#fff";
				    itemSpan.style.backgroundColor=themeColor;		
            }
         //  itemSpan.attachEvent("onkeydown",this.keyOperator.bind(itemSpan));             
            temp.appendChild(itemSpan);    
        }
      if(matchData.length>this.options.listcount){
      	  var itemSpan=oPopup.document.createElement("span");
      	  
      	   itemSpan.style.fontSize="12px";
           itemSpan.style.cursor="hand";
           itemSpan.style.width="100%";
           itemSpan.style.paddingRight="5px";
           itemSpan.style.textAlign="right";
           itemSpan.setAttribute("maxindex",this.id+"_item_"+i);
           itemSpan.appendChild(oPopup.document.createTextNode("更多数据..."));
          // itemSpan.appendChild(CommonboxConstants.parameter_tip_more_data);
          
           itemSpan.attachEvent("onclick",this.searchMore.bind(this,this.id+"_item_"+i));     
          // itemSpan.style.backgroundColor="#464548";
      	   temp.appendChild(itemSpan);       
      }
      popDiv.appendChild(temp); 
      
      oPopupBody.appendChild(popDiv);
      if(this.options.checkbox){
      	popDiv.style.height=parseInt(this.options.height.substring(0,this.options.height.indexOf("px"))-21);
      	oPopupBody.appendChild(this.createSelectBtn(oPopup.document,themeColor))
      }
      else{
      	popDiv.style.height=parseInt(this.options.height.substring(0,this.options.height.indexOf("px")));
      }
      
      if(this.options.popDivWidth){
	    var width=parseInt(this.options.popDivWidth.substring(0,this.options.popDivWidth.indexOf("px")));
	  }else{
	  	var width=parseInt(this.options.width.substring(0,this.options.width.indexOf("px")));
	  }
      var height=parseInt(this.options.height.substring(0,this.options.height.indexOf("px")));
	  oPopupBody.attachEvent("oncontextmenu",function(){return false});
	 
	//  if(!oPopup.isOpen){
	     oPopup.show(x, y,width,height,document.body);
	//  }   
    },
    /*
     * 键盘事件处理函数,过滤匹配
     */    
    keyupHandler:function(e){
    	this.hiddenValue.value="";
    	this.options.listcount=50;
		if(e.keyCode==13){
           return;
        }
        /*
         * 设置延迟时间,如果不设置延迟时间,用户每次输入都会触发keySearch(),导致屏幕闪烁
         */
         if(isDelay){
        	setTimeout("ComboBoxManager['"+this.id+"'].keySearch()",35);
        	isDelay=false;
        }
       
    },
    /*
     * 创建全选checkbox
     */
    createSelectBtn:function(doc,themeColor){
                  var oDiv=doc.createElement("div");
	              var selectCheck=doc.createElement("<input type='checkbox'>");
	              selectCheck.attachEvent("onclick",this.select.bind(this));//绑定事件处理函数
	              oDiv.appendChild(selectCheck);
	              oDiv.appendChild(doc.createTextNode("全选"));	
	              //oDiv.appendChild(doc.createTextNode(CommonboxConstants.input_select_all));		              
	              oDiv.style.border="1px solid #afafaf";
	              oDiv.style.paddingLeft="2px";
	              oDiv.style.borderTop="0px";
	              oDiv.style.fontSize="12px";
	              oDiv.style.backgroundColor="#f4f4f4";
	               oDiv.style.paddingRight="10px";
	              return oDiv;
                  },
      saveData:function(event){
      	        if(event){
         	    var ele=Event.element(event);
         	    if(ele&&ele.checked==true){
         	       this.textInput.value=ele.getAttribute("selectedValue");
         	    }
         	    if(ele&&ele.checked==false){
         	       this.textInput.value="";
         	    }
      	         }
	             this.selectedCheckboxs=[];
                 this.checkboxValues=[];      
    	  	    for(var i=0;i<this.popcheckboxs.length;i++){
    	  		    var item=this.popcheckboxs[i];
    	  		    if(item.checked==true){   
    	  			this.selectedCheckboxs.push(item.getAttribute("selectedValue"));
    	  			var index=this.data.indexOf(item.getAttribute("selectedValue"))
    	  			if(index!=-1){
    	  				this.checkboxValues.push(this.value[index]);
    	  			   }
    	  		     }
    	  	    }	  
    	        this.setTextAndValue(this.options.multiDealFun(this.selectedCheckboxs));
    	  
		        
	        },
	   keyOperator:function(e){
	  
	     var index=this.getAttribute("index");
         if(e.keyCode==Event.KEY_UP){
             var node=this.previousSibling;
             if(node!=null){
                if(index%2==0){
                   this.style.color="#000";
				   this.style.backgroundColor="#fff";
                }else{
                  this.style.color="#000";
			      this.style.backgroundColor="#f4f4f4";
                }
                node.style.color="#fff";
				node.style.backgroundColor="#316ac5";
			//	node.attachEvent("onkeydown",this.keyOperator.bind(node));    
				this.blur();
                node.focus();
				
               }
           Event.stop(e);
          }else if(e.keyCode==Event.KEY_DOWN){
        	  var node=this.nextSibling;
             if(node!=null){
                if(index%2==0){
                   this.style.color="#000";
				   this.style.backgroundColor="#fff";
                }else{
                  this.style.color="#000";
			      this.style.backgroundColor="#f4f4f4";
                }
                node.style.color="#fff";
				node.style.backgroundColor="#316ac5";
			//	node.attachEvent("onkeydown",this.keyOperator.bind(node));
				this.blur();
                node.focus();
				
               }
               Event.stop(e);
         }else if(e.keyCode==32){             	
        	   this.click();
        	    Event.stop(e);
         }
        
         
	   },
	/*
	 * 选中弹出窗口中的所有checkbox
	 */
	  selectAll:function(){
	        this.popcheckboxs.each(
				function(checkbox){		
				  checkbox.checked=true;
				
		      })	
		  this.saveData.apply(this); 
		return ;
	},
	/*
	 * 清空弹出窗口中的所有checkbox
	 */
	cancelAll:function(){
	   this.popcheckboxs.each(
				function(checkbox){			
				  checkbox.checked=false;
		})	 
		 this.saveData.apply(this);  	 	
		return ;
	},
	/*
	 * 全选checkbox的事件处理函数
	 */
	select:function(event){
		var element=Event.element(event);
		if(element.checked==true){
			this.selectAll();
		}else{
			if(element.checked==false){
			     this.cancelAll();
		    }
		}
	},
	selectItem:function(event){
	 	var srcElement=Event.element(event);
	 	if(this.options.checkbox){
	 		  if(srcElement.tagName=="SPAN"){
	 		       srcElement.getElementsByTagName("input").item(0).click();
	 		   }
	 	}else{
	 		var oldValue=this.currentValue;
	 		this.setTextAndValue(srcElement.getAttribute("selectedValue"));
	 		//this.textInput.value=;
	 		var newValue=this.getSelectedValue();
	 		this.currentValue=newValue;
	 		if(this.oPopup){
	 		    this.oPopup.hide();
	 		}
	 		if(oldValue!=newValue&&this.options.onchange!=null){	 		      
	 		      this.options.onchange({"text":this.textInput.value,"value":newValue});
	 		}
	 	}
	 },
	 setContent:function(data){
	       // var temp=[];
	       //3.12修改解决文件导入的bug
	        var tempData=data.split(",");
	       for(var j=0;j<tempData.length;j++){
	      var index=this.data.indexOf(tempData[j]);
	     
		    if(index!=-1){
		    //4.2修改导入文件后,有重复记录的bug
		        if(this.selectedCheckboxs.indexOf(tempData[j])==-1){
		             this.selectedCheckboxs.push(tempData[j]);
		          }
		 	     if(this.checkboxValues.indexOf(this.value[index])==-1){
		 	          this.checkboxValues.push(this.value[index]);
		 	     }
		     }	 
	       }
	  
	 },
	 setValue:function(value){
	 var temp=value.split(",");
	 this.checkboxValues=[];
	  //同步this.selectedCheckboxs
	 this.selectedCheckboxs=[];
	  for(var i=0;i<temp.length;i++){
	  	 var item=temp[i];
	  	  var index=this.value.indexOf(item);
    	  if(index!=-1){
    	     this.selectedCheckboxs.push(this.data[index]);
    	     this.checkboxValues.push(item);
    	  }	  	 
	  }
	 },
	 searchMore:function(id){
	    this.options.listcount=this.options.listcount+50;
	    this.createPopWin(this.currentData);
	    if(this.oPopup&&this.oPopup.isOpen){
	            var item=  this.oPopup.document.getElementById(id);
	            item.focus();
	            item.style.color="#fff";
				item.style.backgroundColor="#316ac5";
	    	    var items=this.oPopup.document.getElementsByTagName("span");
				   for(var i=0;i<items.length;i++){
				    items.item(i).attachEvent("onkeydown",this.keyOperator.bind(items.item(i)));  
				   }  
	    }
	 },
	 keydownHandler:function(e){
	  
	
	 	if(e.keyCode==Event.KEY_DOWN){
	 	if(this.options.popwin){
	 		if(this.oPopup&&this.oPopup.isOpen){
	 			
	 			var items=this.oPopup.document.getElementsByTagName("span");
	 			
	 			if(items.length>0){
	 				this.textInput.blur();
	 				items.item(0).focus();
	 			    items.item(0).style.color="#fff";
				    items.item(0).style.backgroundColor="#316ac5";
				   for(var i=0;i<items.length;i++){
				    items.item(i).attachEvent("onkeydown",this.keyOperator.bind(items.item(i)));  
				   }  
				  
	 			}
				Event.stop(e);	  //3.12修改背景页面出现滚动条,向上或向下的键盘事件会导致背景页面的滚动条发生滚动
	 		}
	 	}
	 }
	 }
}

