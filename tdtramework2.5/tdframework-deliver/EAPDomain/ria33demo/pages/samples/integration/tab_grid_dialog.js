
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});
var inner = "对话框显示的内容预先定义，可以为字符串或Dom对象"
function getFunc(inRowIndex){
    return "第" + (inRowIndex + 1) + "行";
}

function formatterFunc(inValue, inRowIndex){
    if ((inRowIndex - 1) % 2 == 0) {
        inValue = "<label style='color:red'>" + inValue + "</label>"
    }
    return inValue;
}

function fn(){
    alert('初始化Grid组件');
}

function testInner(){
    var dialog = new unieap.dialog.Dialog({
        inner: unieap.byId('grid').domNode,
        width: 600
    });
    dialog.show(document.getElementById("test1"));
}
