//У�����������Ƿ����
//password_field ��һ�����������
//re_password_field �ڶ������������
//methodΪ0ʱ��ʾ��ʾ������Ϣ��������ֵ,Ϊ1ʱ��ʾ�����ش�����Ϣ
function compare_password(password_field,re_password_field,method){
        var message = "������ȷ�����벻��!";
        if (password_field.value != re_password_field.value){
            if (method == 0){
                alert(message);
                password_field.select();
                password_field.focus();
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

//����У�麯��
//target����
//min��С����
//max��󳤶�
//targetname��������
function check_length(target,min,max,targetname){
    if (target.value.length < min || target.value.length > max){
        alert(targetname+"����Ӧ��"+min+"��"+max+"λ֮�䣡");
        target.focus();
        target.select();
        return false;
    }
    return true;
}           
//У���ʺų���
function check_WorkNo_length(target){
    if (!check_length(target,3,18,'�ʺ�'))
        return false;
    return true;
}
//У�����볤��
function check_WorkPwd_length(target){
    if (!check_length(target,6,15,'����'))
        return false;
    return true;
}

	//��֤�������Ƿ�Ϸ�
	function checkForm(){
	    getValues();
	//��ʼУ��������Ŀ
		if(nas_check_no_null('����',myform.EmployeeName,0)==false)
			return false;
		if(nas_check_no_null('ְλ',myform.BusDutyId,1)==false)
			return false;
		if(nas_check_no_null('��������',myform.AreaId,0)==false)
			return false;
		if(nas_check_no_null('��֯����',myform.OrganId,0)==false)
			return false;
		if(nas_check_no_null('ְ��',myform.DutyId,1)==false)
			return false;
		if(nas_check_no_null('��½�˺�',myform.WorkNo,0)==false)
			return false;
		//��֤�ʺų���
		if  (check_WorkNo_length(myform.WorkNo)==false)
			return false;
		if(nas_check_no_null('����',myform.WorkPwd,0)==false)
			return false;
		//��֤���볤��
		if(check_WorkPwd_length(myform.WorkPwd)==false)
			return false;
		if(nas_check_no_null('ȷ������',myform.WorkPwdConfirm,0)==false)
			return false;
		//�˺�ʧЧ����
		if (nas_check_date(myform.InactiveDate,10)==false)
		{
			return false;
		}
		//����ʧЧ����
		if (nas_check_date(myform.InactivePwdDate,10)==false)
		{
			return false;
		}
		//��������
		if (nas_check_date(myform.Birthday,10)==false)
		{
			return false;
		}
		//��ְ����
		if (nas_check_date(myform.HiredDate,10)==false)
		{
			return false;
		}
		//ת������
		if (nas_check_date(myform.ContractDate,10)==false)
		{
			return false;
		}
		//��ְ����
		if (nas_check_date(myform.ResignedDate,10)==false)
		{
			return false;
		}
		//�������
		if (nas_check_date(myform.UpdateDate,10)==false)
		{
			return false;
		}
			
		if (myform.WorkPwd.value!=myform.WorkPwdConfirm.value){
			alert ('�����������벻��');
			myform.WorkPwdConfirm.focus();
			myform.WorkPwdConfirm.select();
			return false;
		}
//У������ֵ�ĺϷ���
		var myMsg=nas_ip_onlost(myform.WorkPwd,'ck_underline','�������ֻ����ĸ�����ֺ��»������');
		if (myMsg.status==false){
			alert (myMsg.message);
			myform.LoginIp.focus();
			return false;
		}

		if (strLoginIp.length!=0){				//У��IP��ַ�ĺϷ���
			var myMsg=nas_ip_onlost(myform.LoginIp,'ck_ip','������Ϸ���IP��ַ');
			if (myMsg.status==false){
				alert (myMsg.message);
				myform.LoginIp.focus();
				return false;
			}
		}
		if (strMac.length!=0){				//У��MAC��ַ�ĺϷ���
			var myMsg=nas_ip_onlost(myform.Mac,'ck_mac','������Ϸ���MAC��ַ');
			if (myMsg.status==false){
				alert (myMsg.message);
				myform.Mac.focus();
				return false;
			}
		}
		if (strMobile.length!=0){				//У���ƶ��绰�ĺϷ���
			var myMsg=nas_ip_onlost(myform.Mobile,'ck_mobile','������Ϸ����ֻ�����');
			if (myMsg.status==false){
				alert (myMsg.message);
				myform.Mobile.focus();
				return false;
			}
		}
		if (strEmail.length!=0){	//У��Email��ַ�ĺϷ���
			if (nas_email_check('�����ʼ�',myform.Email,1)==false)
				return false;
		}
		if (strWorkTelephone.length!=0){				//У��칫�绰�ĺϷ���
			var myMsg=nas_ip_onlost(myform.WorkTelephone,'ck_number','������Ϸ��ĵ绰����');
			if (myMsg.status==false){
				alert (myMsg.message);
				myform.WorkTelephone.focus();
				return false;
			}
		}
		if (strFax.length!=0){				//У�鴫��ĺϷ���
			var myMsg=nas_ip_onlost(myform.Fax,'ck_number','������Ϸ��ĵ绰');
			if (myMsg.status==false){
				alert (myMsg.message);
				myform.Fax.focus();
				return false;
			}
		}				
		if (strHoneTelephone.length!=0){				//У���ͥ�绰�ĺϷ���
			var myMsg=nas_ip_onlost(myform.HoneTelephone,'ck_number','������Ϸ��ĵ绰');
			if (myMsg.status==false){
				alert (myMsg.message);
				myform.HoneTelephone.focus();
				return false;
			}
		}	
		return true;	
	}
	function check_null(){
	}