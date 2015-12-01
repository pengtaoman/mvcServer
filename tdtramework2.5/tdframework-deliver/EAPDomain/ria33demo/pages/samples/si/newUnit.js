   	var dataCenterObj,tempDs;
    
    //进行界面初始化操作
    dojo.addOnLoad(init);
	
    
    //定义单位参保信息默认初始化数据
    function init(){
    	//初始化界面元素 
    	//首先设置各按钮点击事件
    	
    	dojo.connect(unieap.byId("unitSave"),"onClick",unitSave);
    	
    	dojo.connect(unieap.byId("gridchange"),"onClick",gridchangefun);
       	dojo.connect(unieap.byId("addAB02"),"onClick",addAB02info);	
       	dojo.connect(unieap.byId("delAB02"),"onClick",delAB02info);	
    	dojo.connect(unieap.byId("addAE03"),"onClick",addAE03info);	
    	dojo.connect(unieap.byId("delAE03"),"onClick",delAE03info);	
    	dojo.connect(unieap.byId("addAE06"),"onClick",addAE06info);	
    	dojo.connect(unieap.byId("delAE06"),"onClick",delAE06info);	
    	dojo.connect(unieap.byId("unitprint"),"onClick",unitInfoPrint);	
    	
    	dojo.connect(unieap.byId("reportPrint"),"onClick",reportPrintCS);	
    	    	
    	dojo.connect(unieap.byId("AB01_AAB004"),"onChange",checkUnitExistByAAB004);	
    	dojo.connect(unieap.byId("AB01_AAE053"),"onChange",checkUnitExistByAAE053);	
    	dojo.connect(unieap.byId("AB01_AAB030"),"onChange",checkUnitExistByAAB030);	
    	
    	unieap.byId("ab01form").getBinding().bind(ab01ds.getRowSet().getRow(0));
	    unieap.byId("AB02grid").setDataStore(ab02ds);
	    
	    unieap.byId("AE06grid").setDataStore(ae06ds);
	    unieap.byId("AE03grid").setDataStore(ae03ds);

	   	unieap.byId("AB01_AAB004").focus();
	   	
    }
    
    function gridchangefun(){
    }
	
    function unitInfoPrint(){
    }
    
    function reportPrintCS(){
    }
	
    function unitSave(){
    }
   
    function checkUnitAb02Info(){
    }
    

    function getResult(dc){
    }
    
    function getError(responseText){
    }
    
    function addAB02info(){
    }
    //定义删除险种信息
    function delAB02info(){
    }
    //添加银行信息
    function addAE03info(){
    }
	//删除银行信息
    function delAE03info(){
    }
    //添加联系人
    function addAE06info(){
    }
	//删除联系人
    function delAE06info(){
    }
    //定义单位名称是否在系统中已经存在的检测
    function checkUnitExistByAAB004(){
    }
    //定义返回正确信息时的处理方法
    function getResultCheckUnitExistByAAB004(dc){
    }
    //定义返回错误信息时的处理方法
    function getErrorCheckUnitExistByAAB004(responseText){
    }
    //定义组织机构代码是否在系统中已经存在的检测
    function checkUnitExistByAAE053(){
    }
    //定义 税号 是否在系统中已经存在的检测
    function checkUnitExistByAAB030(){
    }
    //提示框
    function messagebox(message,num) {
    	MessageBox.alert({
    		type :'info',
    		message : message
    	})
    }
