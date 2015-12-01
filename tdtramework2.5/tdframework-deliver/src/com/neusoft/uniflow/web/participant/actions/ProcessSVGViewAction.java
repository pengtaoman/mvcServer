package com.neusoft.uniflow.web.participant.actions;

import java.util.Hashtable;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.res.NWApplication;
import com.neusoft.uniflow.web.authorization.uniform.beans.SVGTranstion;
import com.neusoft.uniflow.web.participant.forms.ProcessSVGViewForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.TranslateUtil;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ProcessSVGViewAction extends Action {
	public static String tab = System.getProperty("line.separator");

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession httpsession = request.getSession();
		NWSession session = WorkflowManager.getSysNWSession();
		ProcessSVGViewForm monitorForm = (ProcessSVGViewForm) form;
		String processid = request.getParameter("processid");
		String version = request.getParameter("version");
		Hashtable activityXY = new Hashtable();
		Hashtable apps = new Hashtable();

		if (monitorForm.getProcessid() == null || monitorForm.getProcessid().equals(""))
			monitorForm.setProcessid(processid);
		if (monitorForm.getVersion() == null || monitorForm.getVersion().equals(""))
			monitorForm.setVersion(version);
		try {
			boolean isNewVersion = false;
			NWProcDef process = session.getProcDef(session.getUserID(),monitorForm.getProcessid(), monitorForm.getVersion(), 0);
			Vector activities = process.openActivityList();
			Vector procapps = process.openApplicationList();
			Vector applications = session.openApplicationList();
			for (int i = 0; i < procapps.size(); i++) {
				NWApplication app = (NWApplication) procapps.elementAt(i);
				apps.put(app.getID(), app.getType());
			}

			for (int i = 0; i < activities.size(); i++) {
				NWActDef actdef = (NWActDef) activities.elementAt(i);
				if (actdef.getParentActDefID().equals(process.getID())&&!isNewVersion)
					isNewVersion = true;
				for (int j = 0; j < applications.size(); j++) {
					NWApplication app = (NWApplication) applications.elementAt(j);
					if (actdef.getAppID()!=null &&actdef.getAppID().equals(app.getID()))
						apps.put(app.getID(), app.getType());
				}
			}
			Vector transitions = process.openTransitionList();
			
			if (!isNewVersion){
				int actNum = activities.size();
				int[] activitiesX = new int[actNum];
				int[] activitiesY = new int[actNum];
				int maxX = 0, maxY = 0;
				for (int i = 0; i < activities.size(); i++) {
					NWActDef actdef = (NWActDef) activities.elementAt(i);
					String actPosition = actdef.getPosition();
					String pos[] = actPosition.split(",");
					activitiesX[i] = Integer.valueOf(pos[0]).intValue();
					activitiesY[i] = Integer.valueOf(pos[1]).intValue();
				}
				activitiesX = TranslateUtil.translateSVGpoint(activitiesX);
				activitiesY = TranslateUtil.translateSVGpoint(activitiesY);
				maxX = TranslateUtil.getSVGpointMaxXY(activitiesX) + 200;
				if (maxX < 600) maxX = 600;
				maxY = TranslateUtil.getSVGpointMaxXY(activitiesY) + 100;
				activityXY = TranslateUtil.translateSVGActivity(activities);
				httpsession.setAttribute("maxX", String.valueOf(maxX));
				httpsession.setAttribute("maxY", String.valueOf(maxY));
				httpsession.setAttribute("activitiesX", activitiesX);
				httpsession.setAttribute("activitiesY", activitiesY);
				httpsession.setAttribute("activitiesXY", activityXY);
			}else{
				SVGTranstion tran = new SVGTranstion(session,activities,process.getID());
				httpsession.setAttribute("workflow-svgtranstion",tran);
				httpsession.setAttribute("maxX", String.valueOf(tran.getMaxX()));
				httpsession.setAttribute("maxY", String.valueOf(tran.getMaxY()));
			}

			httpsession.setAttribute("process", process.getID()+"#"+process.getVersionName());
			httpsession.setAttribute("apps", apps);
			StringBuffer sb = new StringBuffer();
			sb.append("流程定义："+process.getName());
			httpsession.setAttribute("procTitle", sb.toString());

			if (!isNewVersion)
				return mapping.findForward("oldversion");
			else
				return mapping.findForward("newversion");
		} catch (Exception e) {
			httpsession.setAttribute(SessionManager.ERROR, new UniException(e));
			return mapping.findForward("error");
		}
	}
}
