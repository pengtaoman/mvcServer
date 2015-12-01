package com.neusoft.uniflow.web.monitor.procdef.actions;

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

import com.neusoft.uniflow.web.monitor.procdef.beans.SVGTranstion;
import com.neusoft.uniflow.web.monitor.procdef.forms.SVGMonitorForm;
import com.neusoft.uniflow.web.monitor.procdef.beans.SVGTranstionManager;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.TranslateUtil;
import com.neusoft.uniflow.web.util.UniException;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class SVGMonitorAction extends Action {
	public static String tab = System.getProperty("line.separator");

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession httpsession = request.getSession();
		NWSession session = WorkflowManager.getSysNWSession();
		SVGMonitorForm monitorForm = (SVGMonitorForm) form;
		String processid = request.getParameter("processid");
		String version = request.getParameter("version");
		Hashtable activityXY = new Hashtable();
		Hashtable apps = new Hashtable();
		
		//lincx 增加的查看子流程节点对应的流程模板开始	
		String isSubProcess =  request.getParameter("isSubProcess");
		if (isSubProcess != null && !"".equals(isSubProcess)&& new Boolean(isSubProcess).booleanValue())
		{
			String subProcessNodeID = request.getParameter("subProcessNodeID");		
			NWActDef subProcessNode = session.getActDef(subProcessNodeID, 0);		
			processid = subProcessNode.getSubprocID();
			version = subProcessNode.getSubprocVersionName();
			request.setAttribute("processid", processid);
			request.setAttribute("version", version);
			request.setAttribute("isSubProcess", isSubProcess);
		}
		//lincx 增加的监控子流程结束
		if (monitorForm.getProcessid() == null || monitorForm.getProcessid().equals(""))
			monitorForm.setProcessid(processid);
		if (monitorForm.getVersion() == null || monitorForm.getVersion().equals(""))
			monitorForm.setVersion(version);
		try {
			boolean isNewVersion = false;
			NWProcDef process = session.getProcDef(session.getUserID(),monitorForm.getProcessid(), monitorForm.getVersion(), 0);
			if(process == null){
				throw new Exception("流程定义不存在");
			}
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
				SVGTranstionManager tranManager=SVGTranstionManager.getInstance();
				SVGTranstion tran=(SVGTranstion)tranManager.getTranstion(processid);
				if(tran==null){
					 tran = new SVGTranstion(process);//初始化新版工具对象
					 tranManager.put(processid, tran);
				 }
//				SVGTranstion tran = new SVGTranstion(session,activities,process.getID());
//				request.setAttribute("workflow-svgtranstion",tran);
				request.setAttribute("processid", processid);//jsp中设置流程定义的id
				request.setAttribute("version", version);//流程定义版本
				request.setAttribute("maxX", String.valueOf(tran.getMaxX()));
				request.setAttribute("maxY", String.valueOf(tran.getMaxY()));
			}

//			httpsession.setAttribute("process", process.getID()+"#"+process.getVersionName());
//			httpsession.setAttribute("apps", apps);
			
			int runNum = session.getProcInstNumByProcDef(session.getUserID(),15L, processid, version);
			int comNum = session.getProcInstNumByProcDef(session.getUserID(),16L, processid, version);
			int allNum = session.getProcInstNumByProcDef(session.getUserID(),-1, processid, version);
			StringBuffer sb = new StringBuffer();
			sb.append(process.getName());
			sb.append(" <a href=\"javascript:showRunProcinst()\">");
			if(isSubProcess == null)
			{
				sb.append(" 未完成[").append(runNum).append("]</a>");
				sb.append(" <a href=\"javascript:showComProcinst()\">");
				sb.append(" 已完成[").append(comNum).append("]</a>");
				sb.append(" <a href=\"javascript:showAbortProcinst()\">");
				sb.append(" 已终止[").append(allNum-runNum-comNum).append("]</a>");
				sb.append(" <a href=\"javascript:showAllProcinst()\">");
				sb.append(" 所有[").append(allNum).append("]</a>");
			}
			request.setAttribute("procTitle", sb.toString());

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