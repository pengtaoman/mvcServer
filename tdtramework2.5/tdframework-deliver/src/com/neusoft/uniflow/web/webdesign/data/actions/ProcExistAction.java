package com.neusoft.uniflow.web.webdesign.data.actions;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.util.UniflowManager;

public class ProcExistAction extends Action{

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		String procID = request.getParameter("procID");
		String isExist = "false";
		try {
			if (UniflowManager.getServerIO().procExist(procID))
			{
				isExist = "true";
			}
		} catch (Exception e) {
			e.printStackTrace();
			isExist = "false";
		}
		try {
			response.getOutputStream().write(isExist.getBytes());
			response.getOutputStream().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
