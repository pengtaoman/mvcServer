package com.neusoft.uniflow.web.webdesign.AttributeOperation.util.nodeParse;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.NodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ConstantsForAttr;
import com.neusoft.workflow.model.ExtendProperty;
import com.neusoft.workflow.model.Node;

public class NodeParse {
	
	public static NodeForm xmlParse(Node node , NodeForm nform){
		if(node == null){
		   }else{
			   nform.setId(node.getID());
			   nform.setName(node.getName());
			   nform.setDesc(node.getDescription());
			   nform.setStyle(node.getStyle());
			   
			   if(node.getExtendProperties() != null){
				   ExtendProperty [] properties = node.getExtendProperties().getExtendPropertyArray();
				   String str = "";
				   if(properties !=null){
					   for(int i=0; i<properties.length;i++ ){
						   str += properties[i].getName() + ConstantsForAttr.EXTENDPROPERTY_MINOR_PARTITION
						   		+ properties[i].getValue() + ConstantsForAttr.EXTENDPROPERTY_PRIMARY_PARTITION;
					   }
					   if("".equals(str)){
						   str = null;
		    			}else if(str != null){
							int n = str.length();
							str = str.substring(0, n-ConstantsForAttr.EXTENDPROPERTY_PRIMARY_PARTITION.length());
						}
				   }
				   
				   nform.setExtendProperties(str);
			   }
		   }
		
		return nform;
	}
	
}
