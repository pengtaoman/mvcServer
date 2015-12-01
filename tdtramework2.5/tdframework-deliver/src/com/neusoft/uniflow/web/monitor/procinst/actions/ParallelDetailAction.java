package com.neusoft.uniflow.web.monitor.procinst.actions;

import java.util.HashMap;
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
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWBranchActInst;
import com.neusoft.uniflow.api.handler.NWParallelUnitActInst;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.web.monitor.procinst.forms.ParallelDetailForm;
import com.neusoft.uniflow.web.util.SessionManager;
import com.neusoft.uniflow.web.util.WorkflowManager;

public class ParallelDetailAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		NWSession nwsession = WorkflowManager.getNWSession();
		HashMap map = new HashMap();
		ParallelDetailForm paraform=(ParallelDetailForm)form;
		Vector keySet=new Vector();
		String actInstId = request.getParameter("actinstid");
		String userId = (String) session
				.getAttribute(SessionManager.BIZ_USERID);
		Vector branches = new Vector();
		try {
			NWParallelUnitActInst actInst = nwsession.getParallelUnitActInst(userId, actInstId);
			if(actInst!=null){
					paraform.setCompleteTime(actInst.getCompleteTimeString());
					paraform.setStartTime(actInst.getStartTimeString());
					paraform.setName(actInst.getName());
					paraform.setDescription(actInst.getDescription());
					branches = actInst.openAllBranchInstList(-1);
			}
		} catch (NWException e) {
			e.printStackTrace();
		}
		int branchcount = branches.size();
		for (int i = 0; i < branchcount; i++) {
			String instLine = "";
			NWBranchActInst branchAct = (NWBranchActInst) branches.elementAt(i);
			if (branchAct != null) {
				try {
					Hashtable procInst_Path = new Hashtable();
					Hashtable procInst_length=new Hashtable();
					int k = 0;
					int length=0;
					Vector complete_acts = branchAct
							.openActInstListInBranch(16);
					for (int j = 0; j < complete_acts.size(); j++) {
						NWActInst actinst = (NWActInst) complete_acts.elementAt(j);
						if (actinst.getCompleteTimeString()!=null&&!actinst.getCompleteTimeString().equals("")){
							if (actinst.getType()!=15 &&!(actinst.getType()>18 && actinst.getType()<=21)){
								if (!procInst_length.containsKey(actinst.getCompleteTimeString())){
									procInst_length.put(actinst.getCompleteTimeString(), "");
										length = length + 1;
								}
							}
						}
					}
					String[] act_ctime_str1 = new String[length];
					for (int j = 0; j < complete_acts.size(); j++) {
						NWActInst actinst = (NWActInst) complete_acts
								.elementAt(j);
						if (actinst.getCompleteTimeString() != null&& !actinst.getCompleteTimeString().equals("")) {
							if (actinst.getType() != 15&& !(actinst.getType() > 18 && actinst.getType() <= 21)) {
								if (procInst_Path.containsKey(actinst.getCompleteTimeString())) {
									String value = (String) procInst_Path
											.get(actinst
													.getCompleteTimeString());
									value = value + ","
											+ actinst.getActInstID();
									procInst_Path.put(actinst
											.getCompleteTimeString(), value);
								} else {
									procInst_Path.put(actinst
											.getCompleteTimeString(), actinst
											.getActInstID());
									act_ctime_str1[k++] = actinst
											.getCompleteTimeString();
								}
							}
						}
					}
					java.util.Arrays.sort(act_ctime_str1);// 按完成时间排序
					try {
						instLine = this.getRealProcInstPath(procInst_Path,
								act_ctime_str1, nwsession);
					} catch (Exception e) {
						e.printStackTrace();
					}
				} catch (NWException e) {
					e.printStackTrace();
				}
			}
			map.put(branchAct.getActInstID(), instLine);// 存储每个并发分支自己的轨迹
			keySet.add(branchAct.getActInstID());
		}
		request.setAttribute("parallelDetail", map);
		request.setAttribute("keySet", keySet);
		return mapping.findForward("success");
	}

	private String getRealProcInstPath(Hashtable procinst_path, String[] dates,
			NWSession session) throws Exception {// 轨迹回放时使用
		String realpath = "";
		if (dates.length > 2) {
			String firstStr = (String) procinst_path.get(dates[0]);
			realpath = this.transStartActivity(firstStr, session, "");
			for (int i = 1; i < dates.length - 1; i++) {
				String value = (String) procinst_path.get(dates[i]);
				if (realpath.length() > 0)
					realpath = realpath + "#" + value;
				else
					realpath = value;
			}
			String endStr = (String) procinst_path.get(dates[dates.length - 1]);
			realpath = realpath + "#"
					+ this.transEndActivity(endStr, session, "");
		} else if (dates.length == 2) {
			String firstStr = (String) procinst_path.get(dates[0]);
			realpath = this.transStartActivity(firstStr, session, "");
			String endStr = (String) procinst_path.get(dates[1]);
			realpath = realpath + "#"
					+ this.transEndActivity(endStr, session, "");
		} else if (dates.length == 1) {
			String firstStr = (String) procinst_path.get(dates[0]);
			realpath = this.transStartActivity(firstStr, session, "");
		}
		return realpath;
	}

	private String transStartActivity(String firstStr, NWSession session,
			String userID) throws NWException {
		String startStr = "";
		String otherStr = "";
		String retStr = "";
		String[] ais = firstStr.split(",");
		for (int i = 0; i < ais.length; i++) {
			NWActInst ai = session.getActInst(userID, ais[i]);
			if (ai.getType() == 8)
				startStr = ais[i];
			else {
				if (otherStr.equals(""))
					otherStr = ais[i];
				else
					otherStr = otherStr + "," + ais[i];
			}
		}

		if (!startStr.equals(""))
			retStr = startStr;
		if (!otherStr.equals("")) {
			if (!retStr.equals(""))
				retStr = retStr + "#" + otherStr;
			else
				retStr = otherStr;
		}
		return retStr;
	}

	private String transEndActivity(String endStrs, NWSession session,
			String userID) throws NWException {
		String endStr = "";
		String otherStr = "";
		String retStr = "";
		String[] ais = endStrs.split(",");
		for (int i = 0; i < ais.length; i++) {
			NWActInst ai = session.getActInst(userID, ais[i]);
			if (ai.getType() == 9)
				endStr = ais[i];
			else {
				if (otherStr.equals(""))
					otherStr = ais[i];
				else
					otherStr = otherStr + "," + ais[i];
			}
		}
		if (!otherStr.equals(""))
			retStr = otherStr;
		if (!endStr.equals("")) {
			if (!retStr.equals(""))
				retStr = retStr + "#" + endStr;
			else
				retStr = endStr;
		}
		return retStr;
	}
}