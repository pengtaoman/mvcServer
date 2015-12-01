 function init()
  {
  	var flag=document.getElementById("flag").value;
    if(parseInt(flag)>=0)
    {
      alert(document.getElementById("prompt").value);
      parent.document.getElementById("commitBtn").disabled = true;
      //parent.document.getElementById("printBtn").disabled = true;
      
      parent.document.getElementById("oldfchargeId").value = document.getElementById("fchargeId").value;
      parent.document.getElementById("oldffavourId").value = document.getElementById("ffavourId").value;
      parent.document.getElementById("oldfbegReg").value = document.getElementById("fbegReg").value;
      parent.document.getElementById("oldfbegDate").value = document.getElementById("fbegDate").value;
      parent.document.getElementById("oldfproductCity").value = document.getElementById("fproductCity").value;
    }else 
    {
      alert(document.all("prompt").value);
      window.close();
    }
     
  }