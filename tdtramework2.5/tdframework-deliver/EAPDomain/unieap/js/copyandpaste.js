function  dealDocument(){
    if(window.event.shiftKey==true&&window.event.ctrlKey==true&&window.event.keyCode == 67){	
      copyToClipboard();
    }else if(window.event.shiftKey==true&&window.event.ctrlKey==true&&window.event.keyCode == 86){
      var foc= document.activeElement.id;
      pasteFromClipboard();
      if(typeof foc!='undefined'&&foc!=''){
      
       document.all[foc].focus();
      }
    }
  }
 
 
 function copyToClipboard() 
 { 
 
  
  var temp;
  var copytext='form+'+document.forms[0].id+';';
  temp=document.all;
  

  if(temp.length!=null){
    for(i=0;i<temp.length;i++){
    
  
    if(temp[i].value==null||temp[i].value=='') continue;
    
     if(temp[i].tagName.toLowerCase()!='input'&&temp[i].tagName.toLowerCase()!="select"&&temp[i].tagName.toLowerCase()!="textarea") continue; 
      
     if(temp[i].tagName.toLowerCase()=='input'&&temp[i].type.toLowerCase()!='text'&&temp[i].type.toLowerCase()!='password'&&temp[i].type.toLowerCase()!="checkbox"&&temp[i].type.toLowerCase()!="radio") continue;
     if(temp[i].tagName.toLowerCase()=='input'&&(temp[i].type.toLowerCase()=='radio'||temp[i].type.toLowerCase()=='checkbox')){
      if(temp[i].checked){
       copytext=copytext+temp[i].id+'+'+"**radioorcheckbox**"+';';
       }
     }else {
       copytext=copytext+temp[i].id+'+'+temp[i].value+';';
     }
     }
  }

  window.clipboardData.setData('text', copytext); 
  } 

 function pasteFromClipboard(){
  
   var pastetext=window.clipboardData.getData('text');
   var foccontent;
   try{
     if(pastetext!=null){
     
       var htmlArray=pastetext.split(';');
       var formArray=htmlArray[0].split('+');
       if(formArray[1]!=document.forms[0].id){
          
          alert('form不匹配！')
          return false;
       }
       var inner
         if(htmlArray.length!=null){
           for(i=1;i<htmlArray.length;i++){
             if(htmlArray[i]!=null&&htmlArray[i]!=""){
             
              inner=htmlArray[i].split('+');
              if(inner[0]==null||inner[0]=='') continue;
             if(inner[1]=="**radioorcheckbox**"){
              document.all[inner[0]].checked=true;
             }else{
             document.all[inner[0]].value=inner[1];
             }
             }
           }
         }
      }
     }catch(e){
    alert('剪贴板内容不是与本页有关的内容，请重新复制与本页相关网页');
    }
 }