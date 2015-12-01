dojo.addOnLoad(test);
 function test(){
 	var testWidget = dijit.byId("testTree");
	//当树初始化后测试树的属性是否正确
	doh.register("Test Tree Attribute", [
		function test_label(){
			doh.is("树根节点",testWidget.attr("label"));
		},
		function test_pathSeparator(){
			doh.is("/",testWidget.attr("pathSeparator"));
		},
		function test_expandRoot(){
			doh.is(true,testWidget.attr("expandRoot"));
		},
		function test_templateString(){
			doh.is("<div class=\"dijitTreeContainer\" dojoAttachPoint=\"treeNode\"></div>",testWidget.attr("templateString"));
		}
	]);
	doh.register("Test Tree  Functions",[
		//getIconStyle还没实现，写一个会失败的用例
		function test_getIconStyle(){
			var node = testWidget.getNodeById("1231035443386");
			//getIconStyle没有返回任何值，所以下面的断言会失败。
			doh.t(testWidget.getIconStyle(node.getItem(),true,true));
		},
		function test_getNodeById(){
			var node = testWidget.getNodeById("1231035443386");
			//每个断言前最好写一下注释，这样当断言失败时，在报告中会显示这段注释信息。
			//节点不能为空
			doh.t(node);
            doh.is("数据结构",node.getLabel());
			doh.is(0,node.getPosition());
			doh.is(false,node.isOpend());
			doh.is(false,node.isRoot());
			doh.is(false,node.isLeaf());
			doh.is(false,node.isChecked());
			doh.is(1,node.getLevel());
		},
		function test_getIconClass(){
			var node = testWidget.getNodeById("1231035443386");
			doh.is("dijitFolderClosed",testWidget.getIconClass(node.getItem(),false,true));
            doh.is("dijitFolderOpened",testWidget.getIconClass(node.getItem(),true,true));
			doh.is("dijitLeaf",testWidget.getIconClass(node.getItem(),false,false));
			doh.is("dijitLeaf",testWidget.getIconClass(node.getItem(),true,false));
		},
		function test_getLabelClass(){
			var node = testWidget.getNodeById("1231035443386");
			//考虑空值的情况
			var labelClass = testWidget.getLabelClass(null,true,true);
			doh.f(labelClass);
            
			labelClass = testWidget.getLabelClass(node.getItem(),false,true);
			doh.t(labelClass);
			doh.is("dijitFolderClosed",labelClass);
			
			labelClass = testWidget.getLabelClass(node.getItem(),true,true);
			doh.t(labelClass);
			doh.is("dijitFolderClosed",labelClass);
			
			labelClass = testWidget.getLabelClass(node.getItem(),true,false);
			doh.t(labelClass);
			doh.is("dijitFolderClosed",labelClass);
			
			labelClass = testWidget.getLabelClass(node.getItem(),false,false);
			doh.t(labelClass);
			doh.is("dijitFolderClosed",labelClass);
		}

	]);
	
	doh.run();
}
