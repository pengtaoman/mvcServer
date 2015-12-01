
dojo.require("unieap.form.RichTextEditor");
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});

var des = new unieap.ds.DataStore('des_store', [{
    description: "富文本编辑器绑定DataStore样例。"
}]);

dataCenter.addDataStore(des);
