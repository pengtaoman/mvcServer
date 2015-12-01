/**
 * <p>Name: nas_mobile_relation_build.js</p>
 * <p>Description: 关联控件生成函数</p>
 * <p>AppArea: 营业系统公用</p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: neusoft</p>
 * @author koujy
 * @version 1.0
**/
//alert('nas_relation_build.js引用成功');
//XML定义固定。this_fild的值要定义成value
function nas_mobile_relation_build(this_fild,relation_fild,this_xml,prefix,have_empty)
{
	
	if (have_empty == "yes")
	{
		relation_fild.length = 0;
		relation_fild.add(window.parent.frames['header'].document.createElement("OPTION"));
		relation_fild.options[0].value='-200';
		relation_fild.options[0].text='';
		var m = 1;
	}
	else
	{
		relation_fild.length = 0;
		var m = 0;
	}

	var source = window.parent.frames['header'].document.XMLDocument;
	var mark = this_xml+prefix+this_fild.value;
	var v=source.selectNodes(mark);
	//var t=v.nextNode(); wangjj update 20030331
	for (var t = v.nextNode(); t != null; t = v.nextNode())//wangjj add 20030331
    {        		
		if (t)
		{
			var rel_mark_value = mark+'/option/value';
			var rel_mark_text = mark+'/option/caption';
			var rel_mark_default = mark+'/selected';
    	
			var rel_v_value=source.selectNodes(rel_mark_value);
			var rel_v_text=source.selectNodes(rel_mark_text);
			var rel_v_default=source.selectNodes(rel_mark_default);
			var t_default=rel_v_default.nextNode();
			
			if (t_default)
			{
				var rel_default = t_default.text;
			}
			else
			{
				var rel_default = "";
			}
    	
			for(var t_value=rel_v_value.nextNode();t_value;t_value=rel_v_value.nextNode())
			{
				var t_text=rel_v_text.nextNode();
    	
				if (t_text)
				{
					if (t_text.text != null && t_value.text != null)
					{
						relation_fild.add(window.parent.frames['header'].document.createElement("OPTION"));
						relation_fild.options[m].value=t_value.text;
						relation_fild.options[m].text=t_text.text;
    	
						if (t_value.text == rel_default)
						{
							relation_fild.options[m].selected = true;
						}
						m=m+1;
					}
				}
			}
		}
	}
}
