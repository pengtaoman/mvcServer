//var APP_PATH = document.getElementsByTagName("ContextPath")[0].value;
var eccn=new ECCN("ec");

function init() {
    eccn.doPrep=false;    
    eccn.init();     
}
/**
 * 获取详细信息
 * getDetail
 */
 function getDetail(id) {
    window.showModalDialog(APP_PATH +'/om/loginUserListAction.do?method=getDetail&id=' + id,'','dialogHeight=620px; dialogWidth=700px; status=no');
 }