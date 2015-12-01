package com.neusoft.uniflow.web.webdesign.AttributeOperation.util;

import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.ActivityNodeForm;
import com.neusoft.workflow.ActTemplet;

public class ActTemplateToFormConversion {

	public static void convertActivityForm(ActivityNodeForm actNodeForm ,ActTemplet actTemplate) {
		actNodeForm.setCategory(actTemplate.getCategory());
		actNodeForm.setPreCondition(actTemplate.getPreCondition());
		actNodeForm.setPostCondition(actTemplate.getPostCondition());
		actNodeForm.setExtendProperties(actTemplate.getExtensionProper());
	}
}
