/**检查某个文本框的输入值是否是中文
 * @param checkField：需要检查的页面元素的名称
 * @param returnType：需要返回值的类型 1:输出错误信息；0：只返回布尔值
 * @param errorMessage：如果returnType的类型为1，需要输出的错误信息
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