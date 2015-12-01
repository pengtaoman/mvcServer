var net=new Object;
net.READY_STATE_UNINITALIZED=0;
net.READY_STATE_LOADING=1;
net.READY_STATE_LOADED=2;
net.READY_STATE_INTERACTIVE=3;
net.READY_STATE_COMPLETE=4;
/**
 * Ajax 帮助类
 * 
 * */
net.ContentLoader=function(component,url,method,requestParams){
this.component=component;
this.url=url;
this.requestParams=requestParams;
this.method=method;

}

net.ContentLoader.prototype={
   //获得XMLHttpRequest对象
   getTransport:function(){
   var transport;
   if(window.XMLHttpRequest){
       transport=new XMLHttpRequest();
   }else if(window.ActiveXObject){
       try{
       transport= new ActiveXObject('Msxml2.XMLHTTP');
       }catch(err){
       transport=new ActiveXObject('Microsoft.XMLHTTP');
       }
   }
   return transport;
   },
   //发送请求
   sendRequest:function(){
     var requestParams=[ ];
     for(var i=0;i<arguments.length;i++){
       requestParams.push(arguments[i]);
     }
     var request=this.getTransport();
     request.open(this.method,this.url,true);
   
     request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     var oThis=this;
     request.onreadystatechange=function(){oThis.handleAjaxResponse(request)};
    
     request.send(this.queryString(requestParams));
   },
   
   //获取参数
   queryString:function(args){
   var requestParams=[];
   for(var i=0;i<this.requestParams.length;i++){
   requestParams.push(this.requestParams[i]);
   }
   for(var j=0;j<args.length;j++){
     requestParams.push(args[j]);
   }
   
   var queryString="";
   if(requestParams && requestParams.length>0){
     for(var i=0;i<requestParams.length;i++){
       queryString+=requestParams[i]+'&';
     }
     queryString=queryString.substring(0,queryString.length-1);
   }
   return queryString;
   },
   //处理Ajax的返回信息
   handleAjaxResponse:function(request){
   
      if(request.readyState== net.READY_STATE_COMPLETE){
          if(this.isSuccess(request)){
           
             this.component.ajaxUpdate(request);
             }
          else {
          	
              this.component.handleError(request);
              }
      }
   },
   
   isSuccess:function(request){
     return request.status == 0 || (request.status>=200 && request.status<300);
   }
}

/**
 * 级联下拉框类
 * masterId 主选择框id
 * slaveId  从选择框id
 * url      请求数据的url
 * options  可选的参数
 * */
DoubleCombo=function(masterId,slaveId,url,options){
    this.master=document.getElementById(masterId);
    this.slave =slaveId.split(':');
    this.options=options;
    this.ajaxHelper=new net.ContentLoader(this,url,"POST",options.requestParameters || [ ]);
    this.initializeBehavior();
}

DoubleCombo.prototype={
   initializeBehavior:function(){
     var oThis=this;
     this.master.onchange=function(){oThis.masterComboChanged();};
     },
    
   masterComboChanged:function(){
     var query=this.master.options[this.master.selectedIndex].value;     
     this.ajaxHelper.sendRequest('query='+query);
   },
   
   ajaxUpdate:function(request){ 
    for(var i=0;i<this.slave.length;i++){
      var slaveOptions=this.createOptionsById(request.responseXML.documentElement,this.slave[i]);
      var slaveSelect=document.getElementById(this.slave[i]);
          slaveSelect.length=0;
       for(var j=0;j<slaveOptions.length;j++){
        try{
          slaveSelect.add(slaveOptions[j],null);
        }catch(e){
          slaveSelect.add(slaveOptions[j],-1);
        }
     }
     
     }
   },
   
    createOptionsById:function(ajaxResponse,id){
    var newOptions=[ ];
    var entries=ajaxResponse.getElementsByTagName('entry'+'_'+id);
    
    if(entries.length==0)
        var entries=ajaxResponse.getElementsByTagName('entry');
    for(var i=0;i<entries.length;i++){
     var text=this.getElementContent(entries[i],'optionText');
  
     var value=this.getElementContent(entries[i],'optionValue');
    
     newOptions.push(new Option(text,value));
     
    }
    return newOptions;
   },
   
  getElementContent:function(element,tagName){
    var childElement=element.getElementsByTagName(tagName)[0];
       return childElement.firstChild.nodeValue
   }
}