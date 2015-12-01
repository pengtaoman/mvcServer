package com.neusoft.uniflow.web.webdesign.data.actions;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.category.ICategoryEntry;
import com.neusoft.uniflow.category.adapter.ResourceAdapter;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.toollistener.ServerIO.ServerIO;
import com.neusoft.uniflow.web.util.UniflowManager;
import com.neusoft.uniflow.web.webdesign.data.beans.DataWriteForm;
import com.neusoft.workflow.model.ProcessContentDocument;

public class DataWriteAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		ServerIO serverIO = UniflowManager.getServerIO();
		String categoryID = request.getParameter("categoryID");
		ProcessContentDocument processDoc = null;

		try {
			processDoc = getdoc(request.getInputStream());
			NWSession session = serverIO.getWFSession();
			try {
				if (null != processDoc.getProcessContent().getProcess() && !"".equals(categoryID) && null != categoryID) {
					ResourceAdapter resource = new ResourceAdapter();
					resource.setId(processDoc.getProcessContent().getProcess()
							.getID());
					ICategoryEntry cateEntry = session.getCategoryEntry();
					cateEntry.addResourceToCategory(categoryID, resource);
				}
			} catch (NWException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}

		DataWriteForm dWriteForm = (DataWriteForm) form;
		dWriteForm.setPCD(processDoc);
		try {
			//写数据
			serverIO.writeProcToServer(processDoc);
			//写业务数据
			
		} catch (Exception e) {
			dWriteForm.setHasError("Yes");
			e.printStackTrace();
		}

		// String procLog = "";
		// try {
		// procLog = new String(
		// request.getParameter("procLog").getBytes("iso8859-1"),"gbk");
		// } catch (UnsupportedEncodingException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		// //Add operation log .......
		// System.out.println("procinstID:"+request.getParameter("procinstID"));
		// System.out.println("isNewVersion:"+request.getParameter("isNewVersion"));
		// System.out.println("procLog:"+procLog);
		return mapping.findForward("success");
	}


	public ProcessContentDocument getdoc(InputStream stream) throws Exception {
		ProcessContentDocument doc = ProcessContentDocument.Factory
				.parse(stream);
		return doc;
	}
}
