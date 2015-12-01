package com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.fileUpLoadForms;

import javax.servlet.http.HttpServletRequest;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.upload.FormFile;

public class FileUpLoadForm extends ActionForm {
    private FormFile file1;
    private String action;
    private String xmlStr;
    public String getXmlStr() {
		return xmlStr;
	}

	public void setXmlStr(String xmlStr) {
		this.xmlStr = xmlStr;
	}

	public FormFile getFile1() {
        return file1;
    }

    public void setFile1(FormFile file1) {
        this.file1 = file1;
    }

    public ActionErrors validate(ActionMapping actionMapping,
                                 HttpServletRequest httpServletRequest) {
        return null;
    }

    public void reset(ActionMapping actionMapping,
                      HttpServletRequest servletRequest) {
    }

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

}
