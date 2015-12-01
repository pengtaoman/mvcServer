package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.fileUpLoadActions;

import java.io.IOException;
import java.io.InputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.upload.FormFile;
import org.apache.xmlbeans.XmlException;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.fileUpLoadForms.FileUpLoadForm;
import com.neusoft.workflow.model.ProcessContentDocument;

public class FileUpLoadAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws XmlException, IOException {

		FileUpLoadForm theForm = (FileUpLoadForm) form;
		String action = ((FileUpLoadForm) form).getAction();
		FormFile file1 = theForm.getFile1();
		InputStream in = null;
		ProcessContentDocument doc = null;

		try {
			doc = ProcessContentDocument.Factory.parse(file1.getInputStream());
		} catch (Exception e) {

			try {
				return mapping.findForward("error");
			} catch (Exception ee) {

			}

		}
		request.setAttribute("xmlStr", doc.toString());
		request.setAttribute("action", "close");
		return mapping.findForward("toFileUpLoad");

	}

}
