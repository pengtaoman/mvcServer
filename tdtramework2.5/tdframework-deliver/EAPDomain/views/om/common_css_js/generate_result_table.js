function generate_result_table(table_header,table_info,events,row_id_table,row_id,display_col,check_radio_type,display_sum,sum_flag_array,sum_symbol,border,width,appendix_str)
{	
	html="<table id='mytable' border='"+border+"' cellpadding='1' cellspacing='2' width='"+width+"' bordercolor='#E6E6E6' bgcolor='#FFFFFF'>";
	tab_hea_len=table_header.length;	  
	dis_col_len=display_col.length;	
	tab_info_len=table_info.length;
	row_id_len=row_id_table.length;
	if (tab_hea_len > 0)
		html+="<TR BGCOLOR='#a2bee1' class = 'trType'>";					
	td_width="";
	k=0;
	for (k=0;k<dis_col_len;k++)
	{
		if(display_col[k]=="true")
		{
			k++;
		}
	}
	if(k<5)
	{
		td_width="width='"+parseInt(100/k)+"%'";		
	}	
	if (check_radio_type=="radio")
	{	
		if (tab_hea_len > 0)
			html+="<TD>选择</TD>";
			count = -1;//记录数		
	}
	else if (check_radio_type=="check")
	{		
		if (tab_hea_len > 0)
			html+="<TD>选择</TD>";
			count = -1;//记录数	
	}		
    else
			count = 0;//记录数			
	count_col = 0;					    				    
	if (tab_hea_len > 0)
	{
	    for (i=0; i<=tab_hea_len; i++) 
	    {                
	    	if (display_col[count_col])
	    	{		    	   
		    	html+="<TD>"+((table_header[i]!="")?table_header[i]:" ");
		    }
		    count_col++;
	    }
	}
	if (tab_hea_len > 0)	
		html+="</TR>";//画表头	
	var sel_col=new Array();
	sel_col_num=0;
	if(row_id_len > 0)
	{		
		for(i=0;i<row_id_len;i++)
		{
			if (row_id_table[i])
			{
				sel_col[sel_col_num]=i;//得到哪列需传递
				sel_col_num=sel_col_num +1;//需传递的个数				
			}
		}
	}
	var count_array =new Array();//求和的数组
	for (j=0;j<tab_hea_len;j++)
	{
		count_array[j]=0;
	}					
	var row =new Array();
	if (tab_info_len > 0)//有查询结果
	{	    			
		for (i=0;i<tab_info_len;i++)
		{
			mid_html="";
			checkbox_value="";//需传递的值
			count_col = 0;					
			if (table_info[i]!="")
			{
				for (j=0;j<sel_col_num;j++)
				{
					checkbox_value=(j==0) ? table_info[i][sel_col[j]] :checkbox_value+"~"+table_info[i][sel_col[j]];
				}
				count=count+1;
				if (check_radio_type=="radio")
				{						
					if(row_id == checkbox_value)
						ifchecked="checked";
					else
						ifchecked="";
					mid_html+="<TD> <input type='radio' value='"+checkbox_value+"' name='radio_result' onclick='thisclick(this)' "+ifchecked+" > </TD>";
				}
				else if (check_radio_type=="check")
				{										
				    mid_html+="<TD> <input type='checkbox' value='"+checkbox_value+"' name='check_result' onclick='thisclick(this)'> </TD>";				                                                                                                                              				
				}						              
			    for (j=0;j<table_info[i].length;j++)
			    {			    				    				    				    				    						
					if (display_col[count_col])
					{						
					    mid_html+="<TD "+td_width+">"+((table_info[i][j]!="") ? table_info[i][j] : "&nbsp;");
					    mid_html+="</TD>";					   				   
					    if (sum_flag_array[count_col]&& table_info[i][j]!="")
					    {						    				    			    					    
					    	count_array[count_col]=eval(count_array[count_col])+eval(table_info[i][j]);					   
					    }					   
					}
					count_col++;																								
			    }			    				
			}
			bgcolor="#E6E6E6";
			if (check_radio_type=="radio" ||check_radio_type=="check")
			{				
				checkbox_value=" id='"+count+"' ";
			}
			else 
			{							
				if(row_id == checkbox_value)
					bgcolor="#A6A6A6";
				else
					bgcolor="#E6E6E6";
				if (checkbox_value != "")
					checkbox_value=" id='"+checkbox_value+"' ";									
			}		
		
			if(mid_html!="")
			{
				html+="<TR BGCOLOR='"+bgcolor+"' VALIGN=TOP class = 'newtrType' "+checkbox_value+events+">";
				html+=mid_html;
				html+="</TR>";
			}
			count_col++; 
		}
	}	
	count_col = 0;
	all_total=0;
	endhtml="";
	temp_count=0;
	if (display_sum=="true")//画合计
	{
		for (j=0;j<sum_flag_array.length;j++)
		{
			if(!sum_flag_array[j] && display_col[j])
				temp_count = temp_count + 1;
			if(!sum_flag_array[j] || !display_col[j])
				count_col = count_col + 1;
		}
		html+="<TR align=left BGCOLOR='#E6E6E6' class = 'newtrType'>";
		html+="<TD colspan="+temp_count+" align='CENTER'>";
		html+="合计:";
		if (tab_hea_len > 0)
		{
		    for (i=0; i<=tab_hea_len; i++)
		    {				
				if (display_col[count_col])
				{					 					
					if(count_col>0 || check_radio_type!="")
						endhtml+="<TD>";
					if(count_col!=0)
					{ 						    	   	
			    		if((count_array[count_col]!="") && (sum_flag_array[count_col]))
			    		{
							//endhtml+= number_format(count_array[count_col], 2);
							if (!sum_symbol[count_col])
								all_total=all_total - count_array[count_col];
							else
								all_total=all_total+count_array[count_col];
															
							if(all_total=="" || all_total==null)
								endhtml+="&nbsp;";
							else
							{
								all_total = (Math.round(all_total*100))/100;
								endhtml+= all_total;								
							}
							
						}else if(sum_flag_array[count_col])
							endhtml+= "0.00";							
					}else
						endhtml+="&nbsp;";
			    }			    
			    count_col++;
			    all_total=0;
		    }
	    }	    
	    html=html+endhtml+"</TR>";
	}
	html+="</TABLE>";	
	note_html="";
	if(appendix_str.length>0)
	{
		note_html+="<table border='"+border+"' cellpadding='1' cellspacing='2' width='"+width+"' bordercolor='#E6E6E6' bgcolor='#FFFFFF'>";
		note_html+="<TR align=left BORDERCOLOR='#E6E6E6' BGCOLOR='#E6E6E6' class = 'newtrType'>";
		note_html+="<TD width='15%' BORDERCOLOR='#a2bee1' BGCOLOR='#a2bee1'>"+appendix_str[0];			
		note_html+="<TD width='85%'><input type='text' maxLength='256' value='"+appendix_str[1]+"' name='table_note' size='72'>";
		note_html+="</TR>";
		note_html+="</TABLE>";
	}
	html+=note_html;
	return html;
}