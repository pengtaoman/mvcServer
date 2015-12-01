/**
 * <p>Name: nas_trim.js</p>
 * <p>Description: 去掉字符串中的空格</p>
 * <p>AppArea: CRM</p>
 * <p>Copyright: Copyright (c) 2004</p>
 * <p>Company: neusoft</p>
 * @author liyj
 * @date 20041110
 * @version 1.0
**/

//去掉字符串中的空格
function nas_trim(strValue)
{	
	var myRegExp = / /gi;
  strValue = strValue.replace(myRegExp, "");

	return strValue;

}
