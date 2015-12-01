dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});

function groupFormatter(name, value){
    if (name == "attr_province") {
        return "省份---" + (value == 12 ? "辽宁" : "浙江");
    }
    else {
        return name + "+++" + value;
    }
}
