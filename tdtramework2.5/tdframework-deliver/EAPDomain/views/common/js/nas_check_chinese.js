/**���ĳ���ı��������ֵ�Ƿ�������
 * @param checkField����Ҫ����ҳ��Ԫ�ص�����
 * @param returnType����Ҫ����ֵ������ 1:���������Ϣ��0��ֻ���ز���ֵ
 * @param errorMessage�����returnType������Ϊ1����Ҫ����Ĵ�����Ϣ
 * @author liyj
 * @date 20041111
 * @version 1.0
*/
function check_chinese(checkField,returnType,errorMessage)
{
	var inputstring = checkField.value;	
	var string_length = inputstring.length;
	if (string_length == 0)
	{
		return true;
	}	
	for (var i=0;i<string_length;i++)
	{		
		if (inputstring.charAt(i).charCodeAt()>127)
		{
			if(returnType == 1){
				alert(errorMessage);
				return false;		
			}
			else{
				return false;
			}
		}		
	}
	return true;
}