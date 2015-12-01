/**
 * <p>Name: nas_enter_jump.js</p>
 * <p>Description: 自动识别跳转函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author zhouty
 * @version 1.0
**/

//alert('nas_enter_jump.js引用成功');
//在onkeydown事件中调用
function nas_enter(){
	var scode=(navigator.appname=="Nwtscape")?event.which:event.keyCode;
	if(scode == 13){
		event.keyCode = 9;
	}
}

//输入enter键后，焦点自动跳转到制定的控件上
//输入参数说明：
//event：事件
//this_field：当前焦点所在的控件
//next_field：输入enter键后需要跳转的目的控件
//enter_value：如果按下了回车键：在跳转的同时返回值是什么：'false':返回false；其他：返回true
function nas_enter_intent(key_event,this_field,next_field,enter_value){
    var witch_key = (navigator.appname=="Nwtscape")?key_event.which:key_event.keyCode;
    if(witch_key==13)
    {           
        if (typeof(next_field)!='undefined' && false==next_field.disabled && false==next_field.readOnly && this_field!=next_field)
        {   
            for (i=0;i<this_field.form.elements.length;i++)
            {
                if (this_field.form.elements[i].name == next_field.name && this_field.form.elements[i].type == next_field.type && this_field.form.elements[i] == next_field)
                {
                    next_field.focus();
                }
            }
        }
        else
        {
            
            for (i=0;i<this_field.form.elements.length;i++)
            {
                if (this_field.form.elements[i].name == this_field.name && this_field.form.elements[i].type == this_field.type && this_field.form.elements[i] == this_field)
                {
                    break;
                }
            }
            i++;                
            for (i;i<this_field.form.elements.length;i++)
            {
                if (this_field.form.elements[i].type == "submit" || this_field.form.elements[i].type == "select-one" || this_field.form.elements[i].type == "text" )
                {
                    if (this_field.form.elements[i].disabled != true )
                    {
                        this_field.form.elements[i].focus();
                        if (this_field.form.elements[i].type == "text" )
                        {
                            this_field.form.elements[i].select();
                        }
                    }
                    break;
                }
            }
            
        }
        if (enter_value == "false")
        {   
            return false;
        }
        else
        {   
            return true;
        }
    }
}

function nas_enter_jump(event,the_field)
{
	var scode=(navigator.appname=="Nwtscape")?event.which:event.keyCode;
	
	/*var the_form_name = the_field.form.name;
	var the_field_name = the_field.name;
	var do_focus="document."+the_form_name+"."+the_field_name+".focus()";
	var do_select="document."+the_form_name+"."+the_field_name+".select()";*/
	
	if(scode == 13)
	{
		/*if (next_field.disabled==false)
		{	
			eval(do_focus);
			if(next_field.type=="text"&&next_field.value!="")
			{	eval(do_select);   	}
		}
		return true;
		*/
		
		//alert(the_field.form.elements[the_field.name].index);
		
		for (i=0;i<the_field.form.elements.length;i++)
		{
			if (the_field.form.elements[i].name == the_field.name && the_field.form.elements[i].type == the_field.type && the_field.form.elements[i] == the_field)
			{
				//alert(i);
				break;
			}
		}
		//alert(i);
		i++;
		
		for (i;i<the_field.form.elements.length;i++)
		{
			//alert(the_field.form.elements[i].name+'--'+the_field.form.elements[i].type+'--'+the_field.form.elements[i].value);
			
			if (the_field.form.elements[i].type == "button" || the_field.form.elements[i].type == "select-one" || the_field.form.elements[i].type == "text" || the_field.form.elements[i].type == "submit" || the_field.form.elements[i].type == "password")
			{
				if (the_field.form.elements[i].disabled != true )
				{
					the_field.form.elements[i].focus();
					if (the_field.form.elements[i].type == "text" )
					{
						the_field.form.elements[i].select();
					}
					
					break;
				}
				
			}
		}
	}
}

