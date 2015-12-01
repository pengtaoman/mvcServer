
function generate_table_radio(table_info,border,width,row_show_col,check_radio_type)
{	
	html="<table border='"+border+"' cellpadding='1' cellspacing='2' width='"+width+"' bordercolor='#E6E6E6' bgcolor='#FFFFFF'>";						
    table_info_len=table_info.length;	
    	
	//计算空白列
	col_null=table_info_len%row_show_col;			
	if (table_info_len > 0)//有查询结果
	{
	    if(table_info_len>row_show_col)
	    {
	    	td_width="width='"+parseInt(100/(row_show_col*2))+"%'";		
			for (i=0;i<table_info_len;i++)
			{			
				if(i==0)
					ifchecked="checked='1'";
				else
					ifchecked="";
				if (i%row_show_col=="0")
				    html+="<TR class = 'trType'>";
				    
			    html+="<TD bgcolor='#E6E6E6' bordercolor='#E6E6E6' "+td_width+">";
			    if (check_radio_type=="radio")
			    {		    
			    	html+="<input type='radio' value='"+table_info[i][0]+"`"+table_info[i][1]+"`"+table_info[i][2]+"`"+table_info[i][3]+"' name='radio_res' onclick='thisclick(this)' "+ifchecked+">";
				}
				else
				{
					html+="<input type='checkbox' value='"+table_info[i][0]+"`"+table_info[i][1]+"`"+table_info[i][2]+"`"+table_info[i][3]+"' name='radio_res' onclick='thisclick(this)' "+ifchecked+">";
				}
			    html+=table_info[i][1]+"</input> </TD>";				   						
			}
			//把空白填上
			if(col_null!=0)
			{
				 col_null=(row_show_col-col_null)*2;	
				 html+="<TD bgcolor='#E6E6E6' bordercolor='#E6E6E6' colspan='"+col_null+"'>&nbsp;</TD>";
			}
		}
		else
		{
			html+="<TR class = 'trType'>";
			for (i=0;i<table_info_len;i++)
			{			
				if(i==0)
					ifchecked="checked='1'";
				else
					ifchecked="";
												    
			    html+="<TD bgcolor='#E6E6E6' bordercolor='#E6E6E6'>";
			    if (check_radio_type=="radio")
			    {		    
			    	html+="<input type='radio' value='"+table_info[i][0]+"`"+table_info[i][1]+"`"+table_info[i][2]+"`"+table_info[i][3]+"' name='radio_res' onclick='thisclick(this)' "+ifchecked+">";
				}
				else
				{
					html+="<input type='checkbox' value='"+table_info[i][0]+"`"+table_info[i][1]+"`"+table_info[i][2]+"`"+table_info[i][3]+"' name='radio_res' onclick='thisclick(this)' "+ifchecked+">";
				}
			    html+=table_info[i][1]+"</input> </TD>";		         																
			}
			html+="</TR>";	
		}
	}	
	html+="</table>";	
	return html;
	
}