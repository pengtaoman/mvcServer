/** ������ҳ����κεط����ĳ����ݼ�Ҫ�л�����Ӧ��ҳ��
 *  ����ʵ�������Ҫ��Ӧÿ����ݼ�дһ��JumpTo***(webPath)�ĺ�����ָ����ݼ�ָ���ҳ��
 *  webPath��webӦ�õĸ�·��
*/
function nas_global_shortcut(webPath){
    if (event.keyCode == 113){//F2
        event.keyCode=0;
        JumpToBalanceFee(webPath);
        event.returnValue=false;
    }
    else if (event.keyCode == 117){//F6
        event.keyCode=0;
        JumpToCustomerModify(webPath);
        event.returnValue=false;
    }    
    else if (event.keyCode == 118){//F7
        event.keyCode=0;
        
        event.returnValue=false;
    }    
    else if (event.keyCode == 119){//F8
        event.keyCode=0;
        
        event.returnValue=false;
    }
    else if (event.keyCode == 120){//F9
        event.keyCode=0;
        
        event.returnValue=false;
    }
    else if (event.keyCode == 121){//F10
        event.keyCode=0;
        
        event.returnValue=false;
    }
    else if (event.keyCode == 123){//F12
        event.keyCode=0;
        
        event.returnValue=false;
    }
    
}

//�����ݼ�����ĳһ��ҳ���ʾ��
function JumpToBalanceFee(webPath){
  var pageName = webPath+"/feequery/balancefeequeryaction.do";
  try
  {
    parent.main.location.href = pageName;
  }
  catch(e)
  {
    alert('��ֱ�ӵ����Ӧ�Ĳ˵���');
  }
}

//�����ݼ�����ĳһ��ҳ���ʾ��
function JumpToCustomerModify(webPath){
  var pageName = webPath+"/customer/customermodify.do";
  try
  {
    parent.main.location.href = pageName;
  }
  catch(e)
  {
    alert('��ֱ�ӵ����Ӧ�Ĳ˵���');
  }
}


//�����ݼ�����ʾ����ҳ�����ڵ�֡�л�����ݼ�ָ���ҳ��
//function OpenPage(webpath,PageName){
//   top.header.iFrameSrc.value = PageName;
//   top.main_text.location.href =webpath+"/mainframe/jsp/main_text.jsp";
//}