   /**  
   **  ���ھ�ȷ��Ϊn��obj���������
  **/

function CursorDispose(obj,n){
         if(n==0&&window.event.keyCode == 46)return false; //����ȷ��Ϊ0ʱ��������С����
         obj.focus();//���λ�ò���
         var r = document.selection.createRange();
         var selected_text = r.text;        
         r.collapse(false);
         r.setEndPoint("StartToStart", obj.createTextRange());
         var cursor_index = r.text.length; 
         if(selected_text==""){
            if(obj.value.indexOf(".")<0){  //��������С����ʱ  
               if(obj.value.indexOf("-")<0){  //�����Ǹ���ʱ              
                  if(cursor_index!=0&&window.event.keyCode == 45){ //����λ���ϣ����ǵ�һλ�����ܳ���"-"��
                      return false; 
                  }                  
                  else{ //�����Ķ����� ���磺"12[.]3456789"(�������ȷ�Χ֪���������������) ,"[-]123" ,1[]�ȡ�
                      return true; 
                  }   
               }
               else{ //���Ǹ���ʱ   
                  if(cursor_index==0||window.event.keyCode == 45){ //�������"-"ǰ���ʱ��ʲôҲ��������,�����ط�Ҳ��������"-"��
                     return false;
                  }
                  else if(cursor_index==1&&window.event.keyCode == 46){ //"-" ���ܽ� "."��
                     return false;
                  }
                  else{ //����������� "-[4]123" "-123[.]" �ȡ�
                     return true; 
                  }
               }                    
            }
            else{ //������С����ʱ 
               if(obj.value.length-obj.value.indexOf(".")>n&&cursor_index>obj.value.indexOf(".")){ //����ȷ���Ѿ�����ʱ��С����֮����Ҳ�����������֡�
                     return false;
               }
               if(obj.value.indexOf("-")<0){  //�����Ǹ���ʱ    
                  if((cursor_index!=0&&window.event.keyCode == 45)||window.event.keyCode == 46){ //�����㲻����ǰ��ʱ��������"-"���κ�����²�������"."��
                     return false;
                  }                 
                  else{ // "-.123" ,"3.12" 
                     return true;
                  }
               }
               else{
                  if(cursor_index==0||window.event.keyCode == 45||window.event.keyCode == 46){ //�������"-"��"."���������벢�ҽ�������ǰ��ʱҲ�����������֡�
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
           
            if(obj.value.indexOf(".")>=0){ //������С����ʱ
               if(len==0){  //���ʼ���ֱ�ѡ�е����
                  if(selected_text.indexOf(".")>=0){ //���ѡ�е��ı�����С����  ���� [-1.2]3 , [-.]1 ,[1.2]3 , [.]1 , [.] (���������֡�"-"��"."�滻)
                     return true;
                  }
                  else if(selected_text.indexOf(".")<0&&window.event.keyCode != 46){ //���� [-1].23 , [-].12 , [12]3.4 (���������ֺ�"-"�滻) 
                     return true;
                  }
                  else{
                     return false;
                  }
               }
               else{ //����������һ���ַ�ʱ
                  if(selected_text.indexOf(".")>=0&&window.event.keyCode != 45){ //���� -[1.]23 , 12[.]3  (���������ֺ�"."�滻) 
                     return true;
                  }
                  else if(selected_text.indexOf(".")<0&&(window.event.keyCode != 45&&window.event.keyCode != 46)){ //���� -[12]3.4 , 12.[3] (�����������滻) 
                     return true;
                  }
                  else{
                     return false;
                  }
               }
            } 
            else{ //����С����
               if(len==0){  //[-1234] , [-] , [123] (���������֡�"-"��"."�滻)
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