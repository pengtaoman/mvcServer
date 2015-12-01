package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.util.StringUtil;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.GetNameUtil;

public class GetObjectNameByIDAction extends Action {

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		String objType = request.getParameter("objType"); 
		String objID = request.getParameter("objID");
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		if("application".equals(objType)){
			String[] objIDs = StringUtil.split(objID, ',');
			if(null != objIDs){
				StringBuffer names = new StringBuffer();
				for(int i=0;i<objIDs.length;i++){
					String appName = GetNameUtil.getAppName(objIDs[i], request);
					names.append(appName);
					names.append(",");
				}
				out.print(names.substring(0, names.length()-1));

			}
				

		}
		else if("subproc".equals(objType)){
			
		}
		else if("org".equals(objType)){
			String[] objIDs = StringUtil.split(objID, ',');
			if(null != objIDs){
				StringBuffer names = new StringBuffer();
				for(int i=0;i<objIDs.length;i++){
					String partiName = "";
					String[] parts = objIDs[i].split("\\|");
					if(null != parts && parts.length == 2)
					{
						partiName = GetNameUtil.getParticipantName(parts[0], parts[1], request);
					}
					names.append(partiName);
					names.append(",");
				}
				out.print(names.toString().substring(0, names.length()-1));

			}
		}
		return null;
	}
}
