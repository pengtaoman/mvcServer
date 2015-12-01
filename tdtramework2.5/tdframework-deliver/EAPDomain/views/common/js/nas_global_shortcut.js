/** 无论在页面的任何地方点击某个快捷键要切换到相应的页面
 *  根据实际情况需要对应每个快捷键写一个JumpTo***(webPath)的函数，指出快捷键指向的页面
 *  webPath：web应用的根路径
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

//点击快捷键跳到某一个页面的示例
function JumpToBalanceFee(webPath){
  var pageName = webPath+"/feequery/balancefeequeryaction.do";
  try
  {
    parent.main.location.href = pageName;
  }
  catch(e)
  {
    alert('请直接点击相应的菜单！');
  }
}

//点击快捷键跳到某一个页面的示例
function JumpToCustomerModify(webPath){
  var pageName = webPath+"/customer/customermodify.do";
  try
  {
    parent.main.location.href = pageName;
  }
  catch(e)
  {
    alert('请直接点击相应的菜单！');
  }
}


//点击快捷键后显示具体页面所在的帧切换到快捷键指向的页面
//function OpenPage(webpath,PageName){
//   top.header.iFrameSrc.value = PageName;
//   top.main_text.location.href =webpath+"/mainframe/jsp/main_text.jsp";
//}