//在输入框回车，直接提交
//调用举例：onkeypress="default_go(event,document.forms[0].numquery)"

function default_go(the_key,the_query)
{
	var scode=(navigator.appname=="Nwtscape")?the_key.which:the_key.keyCode;
    if(scode == 13)
    {
      	the_query.focus();
      	the_query.click();
    }	
}