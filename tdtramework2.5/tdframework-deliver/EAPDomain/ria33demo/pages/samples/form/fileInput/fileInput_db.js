
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});


var store = new unieap.ds.DataStore("demo");
store.setRowSetName("form_fileinput");
dataCenter.addDataStore(store);


function persist(){
    if (unieap.byId("ename").getValue() != "" && unieap.byId("dept").getValue() != "") {
        var no = new Date().getTime();
        dataCenter.addParameter("empno", no);
        var data = {
            "UP_DEMO_FORM_FILEINPUT_ID": no,
            "UP_DEMO_FORM_FILEINPUT_NAME": unieap.byId("ename").getValue(),
            "UP_DEMO_FORM_FILEINPUT_DEPT": unieap.byId("dept").getValue()
        };
        dataCenter.getDataStore("demo").getRowSet().insertRow(data);
        unieap.Action.upload({
            url: unieap.WEB_APP_NAME + "/upload_downLoad_file.do?method=uploadWithBlob",
            form: 'blob_form',
            parameters: {
                dc: dataCenter.toJson()
            },
            load: function(res){
                dataCenter.getDataStore("demo").getRowSet().reset();
                alert(res.result);
                
            },
            error: function(res){
                unieap.debug(res);
            }
        });
    }
    else {
        alert("员工姓名、所在部门不能为空");
    }
}
