/* AUTHOR: YUHAO
 * CREATION DATE:2008-02-27
 * WORKFILE:resourceManager.js
 * DESCRIPTION: Javascrpt file . Init remind window(Layer).
 * Copyright: (R) 2008 东软 基础软件事业部版权所有
 *  */
Ext.Meg = function(){
    var msgCt;
    function createBox(t, s){
        return ['<div class="msg">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
    }
    return {
        msg : function(title, format){ 
        	if((Ext.isIE)&&(!Ext.isIE7))
        	{        		
        		alert(title);
        		return;
        	}
        	if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.getElementById("msg"), {id:'msg-div'}, true);
            }
            msgCt.alignTo(document, 't-t');
            var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, {html:createBox(title, s)}, true);
            // 提示信息停留时间
            m.slideIn('t').pause(1).ghost("t", {remove:true});           
        },
        init: function(){}
    };
}();

Ext.onReady(Ext.Meg.init,Ext.Meg);