function init(path){           
    var message = document.myform.Message.value;
    var APP_PATH = path;
	if (message == "") return;
	alert(message);
	if(message=="�����޸ĳɹ�!"){
		if(confirm("ȷ��Ҫ���µ�½��?"))
		{
			
			var paramters = "storeValue=aa";
			var result = executeRequest("login","logout",paramters);
			top.location = APP_PATH + "/";
		}
    } else if (message=="�������������!") {
    	document.myform.OldPassword.focus();
    }
}
                    
//������ȷ������У��
function compare_password(password_field,re_password_field,method){
        var message = "������ȷ�����벻��!";
        if (password_field.value != re_password_field.value){
            if (method == 0){
                alert(message);
                select_focus(re_password_field);
                return;
                }else{
                return message;
                }
            }
    if (method == 0){
        return;
        }else{
        return "";
    }
}   

//����У������뽹��
function select_focus(form_field){
    var this_form = "forms[0]";
    var this_field = form_field.name;
    var select_express = "document." + this_form + "." + this_field + ".select()";
    var focus_express = "document." + this_form + "." + this_field + ".focus()";
    eval("setTimeout('" + select_express + "',1)");
    eval("setTimeout('" + focus_express + "',1)");
}           

function checkLength(){
	var newPwd = document.myform.NewPassword.value;
	var pwdMaxLength = document.myform.pwdMaxLength.value;
	var pwdMinLength = document.myform.pwdMinLength.value;
	if(newPwd.length < Number(pwdMinLength)|| newPwd.length > Number(pwdMaxLength)){
		alert("���볤��Ӧ����"+pwdMinLength+"λ��"+pwdMaxLength+"λ֮�䣬��������д");
		document.myform.NewPassword.focus();
		return false;
	}else{
		return true;
	}
}

//У�鳤��
function check_length(obj,msgName){
    if (obj.value.length < 6 || obj.value.length > 15){
        document.getElementById(msgName).style.display="block";
        obj.focus();
        return false;
    }else{
         document.getElementById(msgName).style.display="none";
    	return true;
    }
}           
            
function update(){
    var return_message = "";
    return_message = return_message + 
    check_null('������',document.myform.OldPassword,1) +
    check_null('������',document.myform.NewPassword,1) +
    check_null('�ٴ�����������',document.myform.RePassword,1);
    if(!checkLength()){
	    return false;
    }
    if(document.myform.NewPassword.value!=document.myform.RePassword.value){
    	alert("������ȷ�����벻��!");
    	return;
    }else{
    	if (return_message != ""){
		     return_message = cut_message(return_message);
		     alert(return_message);
		     return false;
		 }
		 if(!legalPassWord(document.myform.NewPassword.value)){
		 	alert("����������Ҫ������ĸ�����֣�����������");
		 	document.myform.NewPassword.value='';
		 	document.myform.RePassword.value = '';
		 	document.myform.NewPassword.focus();
		 	return false;
		 }
		document.forms[0].submit()
    }

}

function legalPassWord(password){
    var number = false;
    var string = false;
	for (i=0; i <password.length; i++){
		var pchar = password.charAt(i);
		var num = new RegExp("^[0-9]+$", "gi");
		var chr = new RegExp("^[A-Za-z]+$", "gi");
		if (num.test(pchar)){
			number = true;
		}
		if (chr.test(pchar)){
			string = true;
		}
				
	}
	if(number == true && string == true){
		return true;
	}else {
		return false;
	}
}

function check_null(field_name,form_field,method)
    {
        //������ǿ�У��
        var message = field_name + "��ӦΪ��!";
        var v_text = form_field.value;
        if (v_text != null)
            {
            for (logo = 0;logo <= form_field.value.length;logo = logo + 1)
                {
                v_text = v_text.replace(" ","");
                }
            }
        if (v_text == "" || v_text == null)
            {
            if (method == 0)
                {
                alert(message);
                select_focus(form_field);
                return;
                }else{
                return message;
                }
            }
        if (method == 0)
            {
            return;
            }else{
            return "";
            }
    }
    
    function cut_message(message)
    {
        //�����ظ���ʾ��Ϣ
        var message_in = message;
        var message_Array = message_in.split("!");
        var Array_length = message_Array.length;
        for (logo = 0;logo <= Array_length;logo = logo + 1)
            {
            if (message_Array[logo] == null || message_Array[logo] == "")
                {
                message_Array[logo] = "";
                }else{
                message_Array[logo] = message_Array[logo] + "��";
                }
            }
        for (logo_1 = 0;logo_1 <= Array_length;logo_1 = logo_1 + 1)
            {
            for (logo_2 = logo_1 + 1;logo_2 <= Array_length;logo_2 = logo_2 + 1)
                {
                if (message_Array[logo_1] == message_Array[logo_2])
                    {
                    message_Array[logo_2] = "";
                    }
                }
            }
        var message_out = message_Array.join("");
        return message_out;
    }
  
  
function enterToSubmit(){
  if (event.keyCode == 13){
    update();
  }
}

function enterToTab(){

 if(event.srcElement.type != 'button' 
  && event.srcElement.type != 'textarea' && event.keyCode == 13){
   event.keyCode = 9;
  }
 }
 




    
    