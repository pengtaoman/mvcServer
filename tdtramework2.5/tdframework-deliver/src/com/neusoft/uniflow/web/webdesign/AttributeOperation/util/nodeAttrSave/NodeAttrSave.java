package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeAttrSave;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.NodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ConstantsForAttr;
import com.neusoft.workflow.model.ExtendProperties;
import com.neusoft.workflow.model.ExtendProperty;
import com.neusoft.workflow.model.Node;

public class NodeAttrSave {
	
    public static Node save(Node node , NodeForm form ,String type){
    	
    	node.setName(form.getName());
    	node.setDescription(form.getDesc());
    	String str = form.getExtendProperties();
    	if(node.getExtendProperties() == null){
			node.addNewExtendProperties();
		}
    	
    	if(str!= null&&!str.equalsIgnoreCase("")){
    		String[] extendProperties=str.split(ConstantsForAttr.EXTENDPROPERTY_PRIMARY_PARTITION);
    		if (extendProperties.length > 0) {
    			node.setExtendProperties(ExtendProperties.Factory.newInstance());
    		}
    		for(int i=0;i<extendProperties.length;i++){
    			String property =extendProperties[i];
    			String[] keyValue=property.split(ConstantsForAttr.EXTENDPROPERTY_MINOR_PARTITION);
    			String name =keyValue[0];
    			String value="";
    			if(keyValue.length>1)
    				value = keyValue[1];
    			ExtendProperty extendPro=node.getExtendProperties().addNewExtendProperty();
    			extendPro.setName(name);
    			extendPro.setValue(value);
    		}
		}
		return node;
}
}
