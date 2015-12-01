package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.RouteNodeForm;
import com.neusoft.workflow.model.RouteNode;

public class RouteNodeAttrSave {
public static RouteNode save(RouteNode rouN , RouteNodeForm form , String type ){
    	
    	NodeAttrSave.save(rouN, form , type);
    	
    	return rouN;
    }
}
