
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});
var jsondata = "[{data:{id:'01',text:'01'},children:[{data:{text:'01-01',leaf:true}},{data:{text:'01-02'},children:[{data:{text:'01-02-01',leaf:true}},{data:{text:'01-02-02',leaf:true}}]},{data:{text:'01-03',leaf:true}}]},{data:{text:'02',leaf:true}},{data:{text:'03',leaf:true}}]";

function getCheckedValue(){
    unieap.byId('checkTree').getCheckLogic().getSelectedItems(function(items){
        var str = "";
        if (items.length < 1) {
            alert("请选择节点");
        }
        else {
            for (var i = 0; i < items.length; i++) {
                str += unieap.byId('checkTree').getBinding().getLabel(items[i]) + ",";
            }
            alert(str.substring(0, str.length - 1));
        }
    });
}
