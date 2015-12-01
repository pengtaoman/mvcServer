package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.RouteNodeForm;
import com.neusoft.workflow.model.RouteNode;

public class RouteNodeParse {
	public static RouteNodeForm xmlParse(RouteNode rouN , RouteNodeForm form){
		
		form = (RouteNodeForm)NodeParse.xmlParse(rouN, form);
		
		return form;
	}
}
