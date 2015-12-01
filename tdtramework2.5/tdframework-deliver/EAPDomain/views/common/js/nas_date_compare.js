//<script language = "JavaScript">
//�����ַ���1�������������ַ���2
//���������stat_date_field:��ʼ���ڴ���YYYY-MM-DD hh:mm:ss;
//          end_date_field:�������ڴ���YYYY-MM-DD hh:mm:ss;
//          err_message:����ʱ����ʾ�Ĵ�����ʾ��Ϣ
//          splitone-������֮��ķָ���
//          splittwo-ʱ����֮��ķָ���
//          splitthree-�����պ�ʱ����֮��ķָ���

//����ֵ�����飺check_result
//		  ����Ԫ��check_result.status:true/false	У��ɹ�/ʧ��; 
//		  ����Ԫ��check_result.message:""/������ʾ��Ϣ	�մ�(У��ɹ���ʱ��)/������ʾ��Ϣ(У��ʧ�ܵ�ʱ��);
function nas_date_compare(stat_date_field,end_date_field,err_message,splitone,splittwo,splitthree)
{
	var start_date = stat_date_field.value;
	var end_date   = end_date_field.value;
    if(splitone == null || splitone == '')
	   splitone = '-';
    if(splittwo == null || splittwo == '')
       splittwo = ':';
    if(splitthree == null || splitthree == '')
       splitthree = ' ';
	var temp_str = '';
	var check_result = new Array();

	for (var i=1;i<3;i++)
	{
		start_date = start_date.replace(splitone,'*');
		start_date = start_date.replace(splittwo,'*');
		start_date = start_date.replace(splitthree,'*');
		end_date = end_date.replace(splitone,'*');
		end_date = end_date.replace(splittwo,'*');
		end_date = end_date.replace(splitthree,'*');
	}  
    while (start_date.indexOf("*") != -1)
    {
		temp_str = start_date.substring(0,start_date.indexOf("*"));
		start_date=temp_str+start_date.substring((start_date.indexOf("*")+1),start_date.length);
    }

	while (end_date.indexOf("*") != -1)
	{
		temp_str = end_date.substring(0,end_date.indexOf("*"));
		end_date=temp_str+end_date.substring((end_date.indexOf("*")+1),end_date.length);
    }
    start_date = start_date + '';
    end_date = end_date + '';
    
    var start_len = start_date.length;
    var end_len = end_date.length;
    if(start_len != 0 && end_len != 0){
        if(start_len > end_len){
            var gap = start_len - end_len;
            for(i=0;i<gap;i++){
                end_date = end_date + "0";
            }
        }
        if(start_len < end_len){
            var gap = end_len - start_len;
            for(i=0;i<gap;i++){
                start_date = start_date + "0";
            }
        }

        if(parseInt(start_date)>parseInt(end_date)){
            check_result.status=false; 
            check_result.message=err_message; 
            return check_result;
	   }
    }

	check_result.status=true; 
	check_result.message=""; 
	return check_result;
}
//</script>
