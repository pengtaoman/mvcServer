// JavaScript Document
window.onload = function(){
    var o=document.getElementById("searchKey");
    o.setAttribute("valueCache",o.value);
    o.onblur = function(){
        if(o.value=="")
        {
            o.valueCache="";
            o.value=o.tips;
        }
        else
            o.valueCache=o.value;
    }
    o.onfocus = function(){
        o.value=o.valueCache; 
        //光标始终在文字最后
      var e = event.srcElement;
        var r =e.createTextRange();
        r.moveStart('character',e.value.length);
        r.collapse(true);
        r.select();
    }
    o.onblur();
}