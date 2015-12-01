package com.neusoft.uniflow.web.webdesign.util.parser;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.parser.beans.DataBean;
import com.neusoft.uniflow.util.ParseUtil;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.AttrSave;

public class TransitionValidateAction extends Action {

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String expression = request.getParameter("expression");
		String xmlStr = request.getParameter("xmlStr");
		String variableString = request.getParameter("variableString");
		String message = "";
		if (xmlStr.indexOf(AttrSave.ACTTEMPLETS_IDENTIFICATION) >= 0) {
			message = ParseUtil.validateCondition(expression, new DataBean[0]);
		} else {
			DataBean[] datas = new DataBean[0];
			if (variableString.indexOf(";") > -1) {
				String[] variables = variableString.split(";");
				datas = new DataBean[variables.length];
				for (int i = 0; i < variables.length; i++) {
					String variable = variables[i];
					String[] variableProperties = variable.split(",");
					DataBean temp = new DataBean();
					temp.setDataName(variableProperties[1]);
					temp.setDataType(Integer.parseInt(variableProperties[2]));
					datas[i] = temp;
				}
			}
			message = ParseUtil.validateCondition(expression, datas);
		}
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().write(message);
		return null;
	}
}