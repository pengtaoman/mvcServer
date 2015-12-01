function generate_table_by_col(table_header,table_info,border,width,row_show_col)
{	
	html="<table border='"+border+"' cellpadding='1' cellspacing='2' width='"+width+"' bordercolor='#E6E6E6' bgcolor='#FFFFFF'>";
					
	table_header_len=table_header.length;	  	
    table_info_len=table_info.length;	
    	
	//计算空白列
	col_null=table_info_len%row_show_col;			
	if (table_info_len > 0)//有查询结果
	{
	    td_width="width='"+parseInt(100/(row_show_col*2))+"%'";		
		for (i=0;i<table_info_len;i++)
		{			
			if (i%row_show_col=="0")
			    html+="<TR class = 'trType'>";
		    html+="<TD BORDERCOLOR='#a2bee1' BGCOLOR='#a2bee1' "+td_width+">"+((table_header[i]!="")?table_header[i]:" ");		   
            html+="<TD BORDERCOLOR='#E6E6E6' BGCOLOR='#E6E6E6' "+td_width+">"+((table_info[i]!="") ? table_info[i] : "&nbsp;");       
			if (i%row_show_col!="0")
			    html+="</TR>";									
		}
		//把空白填上
		if(col_null!=0)
		{
			 col_null=(row_show_col-col_null)*2;	
			 html+="<TD BORDERCOLOR='#E6E6E6' BGCOLOR='#E6E6E6' colspan='"+col_null+"'>&nbsp;</TD>";
		}
	}	
	html+="</table>";
	return html;
}