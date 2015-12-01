			dojo.addOnLoad(function(){
				dp.SyntaxHighlighter.HighlightAll('code');
			});
			function createTab(){
				new unieap.layout.TabContainer({
					id: 'createTab',
					style: {
						height: '130px',
						width: 'auto'
					}
				}).placeAt(dojo.byId('getTabButton'), 'after').startup();
				
				unieap.byId('createTabButton').setDisabled(true);
				unieap.byId('addTabButton').setDisabled(false);
				unieap.byId('removeTabButton').setDisabled(false);
				unieap.byId('getTabButton').setDisabled(false);
				
			}
			
			function addTab(){
				unieap.byId('createTab').addChild(new unieap.layout.ContentPane({
					title: "新增的Tab页"
				}));
			}
			
			function removeTab(){
				var t = unieap.byId('createTab');
				var c = t.getChildren();
				var n = Math.ceil(Math.random() * (c.length - 1));
				if (c[n]) {
					t.removeChild(c[n]);
				}
			}
			
			function getTab(){
				var t = unieap.byId('createTab');
				if (t && t.selectedChildWidget) 
					alert("id :" + t.selectedChildWidget.id + "\r\ntitle :" + t.selectedChildWidget.title)
				
			}