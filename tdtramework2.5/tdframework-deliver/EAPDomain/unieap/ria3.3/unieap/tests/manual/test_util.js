dojo.addOnLoad(function(){
	dojo.require('unieap.form.Button');
	dojo.forEach(test,function(item){
		if(item.init){
			item.init.call(this);
		}
		var node=dojo.byId(item.id);
		var table=dojo.create('table',{border:1},node);
		var tbody=dojo.create('tbody',null,table);
		var thead=dojo.create('tr',null,tbody);
		var ths=["说明","测试", "结果"];
		dojo.forEach(ths,function(th){
			dojo.create('th',{innerHTML:th},thead)
		})
		dojo.forEach(item.test,function(obj){
			var tr=dojo.create('tr',{});
			var summary_td=dojo.create('td',{innerHTML:obj.summary},tr);
			var button_td=dojo.create('td',null,tr);
			var result_td=dojo.create('td',{'class':'result',innerHTML:'&nbsp;'},tr);
			var button=new unieap.form.Button({
				label:obj.title
			})
			dojo.connect(button,'onClick',function(e){
				var rs=obj.fun.apply(this,obj.args||[]);
				dojo.stopEvent(e);
				dojo.query(".result",table).forEach(function(res_td){
					res_td.innerHTML="...";
				})
				result_td.innerHTML=rs||'&nbsp;';
			})
			dojo.place(button.domNode,button_td);
			dojo.place(tr,tbody);
		})
	})
})
