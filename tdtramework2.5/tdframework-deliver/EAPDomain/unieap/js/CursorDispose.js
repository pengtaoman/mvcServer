   /**  
   **  用于精确度为n的obj的输入情况
  **/

function CursorDispose(obj,n){
         if(n==0&&window.event.keyCode == 46)return false; //当精确度为0时不能输入小数点
         obj.focus();//光标位置不变
         var r = document.selection.createRange();
         var selected_text = r.text;        
         r.collapse(false);
         r.setEndPoint("StartToStart", obj.createTextRange());
         var cursor_index = r.text.length; 
         if(selected_text==""){
            if(obj.value.indexOf(".")<0){  //当不存在小数点时  
               if(obj.value.indexOf("-")<0){  //当不是负数时              
                  if(cursor_index!=0&&window.event.keyCode == 45){ //其他位置上（不是第一位）不能出现"-"；
                      return false; 
                  }                  
                  else{ //其他的都允许 诸如："12[.]3456789"(超过精度范围知道舍掉不四舍五入) ,"[-]123" ,1[]等。
                      return true; 
                  }   
               }
               else{ //当是负数时   
                  if(cursor_index==0||window.event.keyCode == 45){ //当光标在"-"前面的时候什么也不能输入,其他地方也不能输入"-"。
                     return false;
                  }
                  else if(cursor_index==1&&window.event.keyCode == 46){ //"-" 后不能接 "."。
                     return false;
                  }
                  else{ //诸如如下情况 "-[4]123" "-123[.]" 等。
                     return true; 
                  }
               }                    
            }
            else{ //当存在小数点时 
               if(obj.value.length-obj.value.indexOf(".")>n&&cursor_index>obj.value.indexOf(".")){ //当精确度已经够的时候，小数点之后再也不能输入数字。
                     return false;
               }
               if(obj.value.indexOf("-")<0){  //当不是负数时    
                  if((cursor_index!=0&&window.event.keyCode == 45)||window.event.keyCode == 46){ //当焦点不在最前面时不能输入"-"和任何情况下不能输入"."。
                     return false;
                  }                 
                  else{ // "-.123" ,"3.12" 
                     return true;
                  }
               }
               else{
                  if(cursor_index==0||window.event.keyCode == 45||window.event.keyCode == 46){ //如果含有"-"和"."则不能再输入并且焦点在最前面时也不能输入数字。
                     return false;
                  }
                  else{
                     return true;
                  }
               }
            }
         }
         else{
            var len = cursor_index - selected_text.length;
           
            if(obj.value.indexOf(".")>=0){ //当含有小数点时
               if(len==0){  //从最开始部分被选中的情况
                  if(selected_text.indexOf(".")>=0){ //如果选中的文本含有小数点  型如 [-1.2]3 , [-.]1 ,[1.2]3 , [.]1 , [.] (可以用数字、"-"和"."替换)
                     return true;
                  }
                  else if(selected_text.indexOf(".")<0&&window.event.keyCode != 46){ //型如 [-1].23 , [-].12 , [12]3.4 (可以用数字和"-"替换) 
                     return true;
                  }
                  else{
                     return false;
                  }
               }
               else{ //当不包含第一个字符时
                  if(selected_text.indexOf(".")>=0&&window.event.keyCode != 45){ //型如 -[1.]23 , 12[.]3  (可以用数字和"."替换) 
                     return true;
                  }
                  else if(selected_text.indexOf(".")<0&&(window.event.keyCode != 45&&window.event.keyCode != 46)){ //型如 -[12]3.4 , 12.[3] (可以用数字替换) 
                     return true;
                  }
                  else{
                     return false;
                  }
               }
            } 
            else{ //不含小数点
               if(len==0){  //[-1234] , [-] , [123] (可以用数字、"-"和"."替换)
                  return true;
               }
               else{
                  if(window.event.keyCode != 45){
                     return true;
                  }
                  else{
                     return false;
                  }
               }
            }
         }
         return false;            
    }