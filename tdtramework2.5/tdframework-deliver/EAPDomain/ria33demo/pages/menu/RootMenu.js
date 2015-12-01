
function init(){
     if(isEnabled!=undefined&&isEnabled==true){
	      writeNewsTips();
	      setInterval("writeNewsTips()",10000);
      }
}
//dojo.addOnLoad(init);
var userName="";
var userId="";
var orgstring="";
var org="";
//dojo.addOnLoad(showInfo);
function showInfo(){
 var dc;
    unieap.Action.requestData({
					url:unieap.WEB_APP_NAME + "/getUserInfo.do?method=getUserInfo", 
					sync:true,
					load:function(a){
					   dc=a;
					}
			});
  userName=dc.getParameter("userName");
  userId=dc.getParameter("userId");
  orgstring=dc.getParameter("orgs");
  var orgs=orgstring.split("&");
  org=orgs[0];
  document.getElementById("userName").innerText=userName;
  if(org!=""){
    document.getElementById("org").innerText=":"+org;
  }else{
    document.getElementById("org").innerText=org;
  }
  
}
function changePersonProps(){
  var row={"userId":userId,"userName":userName};
  _DialogUtil.showDialog({
			name: "Information Center",
			url: appPath+"/pages/menu/userpassword.jsp",
			width: "440",
			height: "280",
			title: "修改密码",
			div: true,
			dialogData:row
	 });
}
function showToolTip(src){
	  var title=orgstring;
	  if(title.indexOf("&")!=-1){
	    title=  title.replace(new RegExp("&","g"),"\n"); 
	  }
      src.title=title;
}
function lockSystem(){
     _DialogUtil.showDialog({
			name: "锁定系统",
			url: appPath+"/pages/menu/lock.jsp",
			width: "350",
			height: "250",
			title: "锁定系统",
			div: true,
			onComplete:closeDia
	 });
	 
	 
}
function closeDia(obj){
     if(obj){
     
     }else{
        alert("请输入解锁密码");
        lockSystem();
     }
}