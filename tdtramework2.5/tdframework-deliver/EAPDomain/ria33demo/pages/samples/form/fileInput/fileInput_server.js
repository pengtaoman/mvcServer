
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});

function common_upload(){
    unieap.Action.upload({
        url: unieap.WEB_APP_NAME + "/upload_downLoad_file.do?method=commonUpLoad",
        form: 'common_form',
        load: function(res){
            alert(res.result);
        },
        error: function(res){
            alert('发生错误,开始显示错误信息');
            unieap.debug(res);
        }
    });
}

function common_download(){
    dojo.require("unieap.dialog.Dialog");
    var dialog = new unieap.dialog.Dialog({
        url: unieap.appPath + "/pages/samples/form/fileInput/fileList.jsp"
    });
    dialog.show(document.getElementById("downLoadBtn"));
}
