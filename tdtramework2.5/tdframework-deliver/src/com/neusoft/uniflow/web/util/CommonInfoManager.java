package com.neusoft.uniflow.web.util;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Hashtable;
import java.util.Vector;

import javax.servlet.http.HttpSession;

import org.apache.struts.util.LabelValueBean;

import com.neusoft.org.NWPerson;
import com.neusoft.org.NWRole;
import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.bizhandler.NWBizMetaDataManager;
import com.neusoft.uniflow.api.def.NWActDef;
import com.neusoft.uniflow.api.def.NWEngineEvent;
import com.neusoft.uniflow.api.def.NWProcDef;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWAgent;
import com.neusoft.uniflow.api.handler.NWProcInst;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.api.res.NWApplication;
import com.neusoft.uniflow.api.util.NWSessionFactoryUtil;
import com.neusoft.uniflow.common.NWException;
import com.neusoft.uniflow.common.NWMessageConst;
import com.neusoft.uniflow.engine.Engine;
import com.neusoft.uniflow.engine.EngineFactory;
import com.neusoft.uniflow.engine.def.DefinitionManager;
import com.neusoft.uniflow.engine.variable.Variable;
import com.neusoft.uniflow.util.Util;
import com.neusoft.uniflow.web.common.trees.beans.NWListTree;
import com.neusoft.uniflow.web.common.trees.beans.NWMenuTreeNode;

public class CommonInfoManager {
	// 取得代理信息
	public static String getAgentInfo(String userAccount, HttpSession session) {
		String agentInfo = "";
		StringBuffer strInfo = new StringBuffer(128);
		String userID;
		try {
			userID = UniflowManager.getNWOrg().getPersonByAccount(userAccount)
					.getID();
			// 作为指派人取得代理列表
			Vector agentList = UniflowManager.getNWSession().openAgentList(0, userID);
			if (agentList != null && agentList.size() > 0) {
				strInfo.setLength(0);
				for (int i = 0; i < agentList.size(); i++) {
					NWAgent agent = (NWAgent) agentList.elementAt(i);
					Date currentDate = new Date();
					if (agent.getStartTime().before(currentDate)
							&& agent.getEndTime().after(currentDate)) {
						String Info = UniflowManager.getNWOrg().getPerson(
								agent.getAssignee()).getName();
						strInfo.append(Info).append(",");
					}
				}
				strInfo.deleteCharAt(strInfo.length() - 1);
				agentInfo = MessageUtil.getString(
						"workflow.commoninfo.agent21", session)
						+ strInfo.toString()
						+ MessageUtil.getString("workflow.commoninfo.agent22",
								session);
			}
			Vector agentList0 = UniflowManager.getNWSession().openAgentList(1, userID);
			if (agentList0 != null && agentList0.size() > 0) {
				strInfo.setLength(0);
				for (int i = 0; i < agentList0.size(); i++) {
					NWAgent agent = (NWAgent) agentList0.elementAt(i);
					Date currentDate = new Date();
					if (agent.getStartTime().before(currentDate)
							&& agent.getEndTime().after(currentDate)) {
						String Info = UniflowManager.getNWOrg().getPerson(
								agent.getAssigner()).getName();
						strInfo.append(Info).append(",");
					}
				}
				strInfo.deleteCharAt(strInfo.length() - 1);
				agentInfo = MessageUtil.getString(
						"workflow.commoninfo.agent11", session)
						+ strInfo.toString()
						+ MessageUtil.getString("workflow.commoninfo.agent12",
								session);
			}

		} catch (Exception e) {
		}
		return agentInfo;
	}

	// 取得用户信息
	public static String getUserInfo(String userAcount, HttpSession session) {
		String userInfo = "";
		try {
			String userName = UniflowManager.getNWOrg().getPersonByAccount(
					userAcount).getName();
			if (userName != null && !userName.equals(""))
				userInfo = MessageUtil.getString("workflow.current.user",
						session)
						+ userName;
			else
				userInfo = MessageUtil.getString("workflow.current.user",
						session)
						+ userAcount;
		} catch (Exception e) {
		}
		return userInfo;
	}

	public static Date str2StartDate(String strDate) {
		try {
			Calendar calDate = Calendar.getInstance();
			int loc = strDate.indexOf(" ");
			if (loc != -1) {
				strDate = strDate.substring(0, loc);
			}
			String[] strD = strDate.split("-");
			calDate.set(Integer.parseInt(strD[0]),
					Integer.parseInt(strD[1]) - 1, Integer.parseInt(strD[2]));
			calDate.set(Calendar.HOUR_OF_DAY, 0);
			calDate.set(Calendar.MINUTE, 0);
			calDate.set(Calendar.SECOND, 0);
			calDate.set(Calendar.MILLISECOND, 0);
			return calDate.getTime();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public static Date str2EndDate(String strDate) {
		try {
			Calendar calDate = Calendar.getInstance();
			int loc = strDate.indexOf(" ");
			if (loc != -1) {
				strDate = strDate.substring(0, loc);
			}
			String[] strD = strDate.split("-");
			calDate.set(Integer.parseInt(strD[0]),
					Integer.parseInt(strD[1]) - 1, Integer.parseInt(strD[2]));
			calDate.set(Calendar.HOUR_OF_DAY, 23);
			calDate.set(Calendar.MINUTE, 59);
			calDate.set(Calendar.SECOND, 59);
			calDate.set(Calendar.MILLISECOND, 0);
			return calDate.getTime();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public static boolean isRollBackProc(String procinstID) {
		boolean isRollBack = false;
		try {
			NWProcInst procinst = UniflowManager.getNWSession().getProcInst("",
					procinstID);
			NWProcDef procdef = UniflowManager.getNWSession().getProcDef("",
					procinst.getProcDefID(), 0);
			Vector actList = procdef.openActivityList();
			for (int i = 0; i < actList.size(); i++) {
				NWActDef actdef = (NWActDef) actList.elementAt(i);
				// 含有补偿信息
				if (actdef.getType() == 13) {
					isRollBack = true;
					i = actList.size() - 1;
				}
			}
		} catch (NWException e) {
			System.out.println(e.getMessage());
		}
		return isRollBack;
	}
	/* For Common Style */
	public static NWListTree getNWListTree(HttpSession session)
	throws Exception {

		NWListTree listtree = null;
		String strutsUrl = WorkflowManager.getWorkflowConfigPath();
		if (strutsUrl != null && !strutsUrl.equals("")) {
			ListTreeRead read = new ListTreeRead(strutsUrl, session);
			listtree = read.getListtree();
		}
		return listtree;
	}
	
	/* For Style 2009 */
	public static NWMenuTreeNode getMenuTree(HttpSession session)
	throws Exception {
		NWMenuTreeNode listtree = null;
		String strutsUrl = WorkflowManager.getWorkflowConfigPath();
		if (strutsUrl != null && !strutsUrl.equals("")) {
			ListTreeRead2009 read = new ListTreeRead2009(strutsUrl, session);
			listtree = read.getMenuTree();
		}
		return listtree;
	}

	public static Vector getQueryOper() {
		Vector oper = new Vector();
		oper.addElement(new LabelValueBean(">", ">"));
		oper.addElement(new LabelValueBean(">=", ">="));
		oper.addElement(new LabelValueBean("=", "="));
		oper.addElement(new LabelValueBean("<=", "<="));
		oper.addElement(new LabelValueBean("<", "<"));
		oper.addElement(new LabelValueBean("<>", "<>"));
		return oper;
	}

	public static Vector getQueryConOper() {
		Vector oper = new Vector();
		oper.addElement(new LabelValueBean("AND", "and"));
		oper.addElement(new LabelValueBean("OR", "or"));
		return oper;
	}

	public static Vector getBizQueryCond(NWSession nwsession, String category) {
		Vector cond = new Vector();
		try {
			NWBizMetaDataManager manager = nwsession.getBizMetaDataManager();
			cond = manager.openBizMetaDataListByCategory(category);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cond;
	}

	public static String getStateStr(int state, HttpSession session) {
		String stateStr = MessageUtil.getString(
				"workflow.commoninfo.translate.state", session);
		String[] states = stateStr.split(",");
		if (states.length > state)
			return states[state];
		else
			return "";
	}

	public static String getSynchModeStr(int SynchMode, HttpSession session) {
		String SynchModeStr = MessageUtil.getString(
				"workflow.commoninfo.translate.synchmode", session);
		String[] synchmodes = SynchModeStr.split(",");
		if (synchmodes.length > SynchMode)
			return synchmodes[SynchMode];
		else
			return "";
	}

	public static String getWorkItemType(int type, HttpSession session) {
		String wtype = MessageUtil.getString(
				"workflow.commoninfo.translate.witype", session);
		String[] wtypes = wtype.split(",");
		if (wtypes.length >= type && type > 0)
			return wtypes[type - 1];
		else
			return "";
	}

	public static String getActInstState(int type, HttpSession session) {
		String state = MessageUtil.getString(
				"workflow.commoninfo.translate.state", session);
		String[] states = state.split(",");
		if (states.length > type && type > 0)
			return states[type];
		else
			return "";
	}
	
	public static String getSubTypeStr(int type, HttpSession session) {
		String substr = MessageUtil.getString(
				"workflow.commoninfo.translate.subproc.type", session);
		String[] substrs = substr.split(",");
		if (substrs.length > type && type > 0)
			return substrs[type];
		else
			return substrs[0];
	}

	public static String getOperInfo(int level, HttpSession session) {
		String OperInfo = MessageUtil.getString(
				"workflow.commoninfo.translate.operinfo", session);
		String[] operinfos = OperInfo.split(",");
		if (operinfos.length > level && level >= 0)
			return operinfos[level];
		else
			return "";
	}

	public static String getRuleInfo(int rule, HttpSession session) {
		String ruleInfo = MessageUtil.getString(
				"workflow.commoninfo.translate.ruleinfo", session);
		String[] ruleInfos = ruleInfo.split(",");
		if (ruleInfos.length > rule && rule >= 0)
			return ruleInfos[rule];
		else
			return "";
	}

	public static String getOverTimeAction(int type, HttpSession session) {
		String actionName = MessageUtil.getString(
				"workflow.commoninfo.translate.action.name", session);
		String[] actionNames = actionName.split(",");
		if (actionNames.length > type && type >= 0)
			return actionNames[type];
		else
			return "";
	}

	public static String getCoupleInfo(int type, HttpSession session) {
		String couple = MessageUtil.getString(
				"workflow.commoninfo.translate.couple", session);
		String[] couples = couple.split(",");

		if (couples.length > type && type >= 0)
			return couples[type];
		else
			return "";
	}

	public static String getAppLocStr(int AppLoc, HttpSession session) {
		String AppLocStr = MessageUtil.getString(
				"workflow.commoninfo.translate.apploc", session);
		String[] applocs = AppLocStr.split(",");
		if (applocs.length >= AppLoc && AppLoc >= 0)
			return applocs[AppLoc];
		else
			return "";
	}

	public static String getColorValue(String state) {
		String color = "#000000";
		if (state.equals("0"))
			color = "#cccccc";
		else if (state.equals("1"))
			color = "#00FF00";
		else if (state.equals("2"))
			color = "blue";
		else if (state.equals("3"))
			color = "yellow";
		else if (state.equals("4"))
			color = "#800000";
		else if (state.equals("5"))
			color = "red";
		return color;
	}

	public static String getMemberInfo(String memID) {
		String memInfo = memID;
		try {
			NWPerson person = WorkflowManager.getNWOrg().getPerson(memID);
			if (person != null) {
				String memName = person.getName();
				if (person != null)
					memName = person.getName();
				if (memName != null && !memName.equals(""))
					memInfo = memName + "[" + person.getAccount() + "]";
				else
					memInfo = person.getAccount();
			} else {
				NWRole role = WorkflowManager.getNWOrg().getRole(memID);
				if (role != null)
					memInfo = role.getName() + "(Role)";
			}
		} catch (Exception e) {
		}
		return memInfo;
	}

	public static String getUserInfo(String userID, int type) {
		String userInfo = "";
		try {
			if (type != 1) {
				NWPerson person = WorkflowManager.getNWOrg().getPerson(userID);
				String memName = "";
				if (person != null)
					memName = person.getName();
				else
					userInfo = userID;
				if (memName != null && !memName.equals(""))
					userInfo = memName;
				else
					userInfo = person.getAccount();
			} else if (type == 1) {
				NWRole role = WorkflowManager.getNWOrg().getRole(userID);
				if (role != null)
					userInfo = role.getName();
			} else {
				userInfo = userID;
			}
		} catch (Exception e) {
		}
		return userInfo;
	}

	public static String getDateStr(Date date) {
		String dateStr = "--";
		if (date != null && !date.equals(""))
			dateStr = Util.format(date);
		return dateStr;
	}

	public static ArrayList getSelectInfo(HttpSession session) {
		ArrayList arrayPro = new ArrayList();
		String allvalue = MessageUtil.getString(
				"workflow.commoninfo.translate.wi.allvalue", session);
		String[] sPro = allvalue.split(",");
		String[] sProvalue = { "-1", "6", "8", "16", "32" };
		for (int i = 0; i < sPro.length; i++) {
			arrayPro.add(new LabelValueBean(sPro[i], sProvalue[i])); // table--value
		}
		return arrayPro;
	}

	public static ArrayList getAPPSelectInfo(HttpSession session) {
		ArrayList arrayPro = new ArrayList();
		String allvalue = MessageUtil.getString(
				"workflow.commoninfo.translate.application.allvalue", session);
		String[] sPro = allvalue.split(",");
		String[] sProvalue = { "-1", "0", "1", "2", "3" };
		for (int i = 0; i < sPro.length; i++) {
			arrayPro.add(new LabelValueBean(sPro[i], sProvalue[i])); // table--value
		}
		return arrayPro;
	}

	public static ArrayList getApplicationSelectInfo(HttpSession session) {
		ArrayList arrayPro = new ArrayList();
		String allvalue = MessageUtil.getString(
				"workflow.system.application.selectinfo", session);
		String[] sPro = allvalue.split(",");
		String[] sProvalue = { "error", "run", "complete", "all" };
		for (int i = 0; i < sPro.length; i++) {
			arrayPro.add(new LabelValueBean(sPro[i], sProvalue[i])); // table--value
		}
		return arrayPro;
	}

	public static String toUtf8String(String s) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);
			if (c >= 0 && c <= 255) {
				sb.append(c);
			} else {
				byte[] b;
				try {
					b = Character.toString(c).getBytes("UTF-8");
				} catch (Exception ex) {
					System.out.println(ex);
					b = new byte[0];
				}
				for (int j = 0; j < b.length; j++) {
					int k = b[j];
					if (k < 0)
						k += 256;
					sb.append("%" + Integer.toHexString(k).toUpperCase());
				}
			}
		}
		return sb.toString();
	}

	public static String getPreActName(String wid) {
		String preactname = "";
		try {
			NWWorkItem wi = WorkflowManager.getNWSession().getWorkItem("", wid);
			Hashtable ht = wi.openExtendPropertyList();
			if (ht.get("preactname") != null)
				preactname = (String) ht.get("preactname");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return preactname;
	}

	public static String getPreActUser(String wid) {
		String preactpart = "";
		try {
			NWWorkItem wi = WorkflowManager.getNWSession().getWorkItem("", wid);
			Hashtable ht = wi.openExtendPropertyList();
			if (ht.get("preactpart") != null)
				preactpart = (String) ht.get("preactpart");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return preactpart;
	}

	public static String getProcInstName(String wid) {
		String pname = "";
		try {
			NWWorkItem wi = WorkflowManager.getNWSession().getWorkItem("", wid);
			NWProcInst pi = wi.getProcInst();
			pname = pi.getName();
		} catch (NWException e) {
			System.out.println(e.getMessage());
		}

		return pname;
	}

	public static String getProcessPath(String line) {
		String path = "";
		String acts[] = line.split("#");
		StringBuffer img = new StringBuffer();
		String imgpath = WorkflowManager.getWorkflowStylePath()
				+ "/style1/process_img/";
		String start = imgpath + "start.png";
		String end = imgpath + "end.png";
		String manual = imgpath + "manual.png";
		String auto = imgpath + "auto.png";
		String choice = imgpath + "choice.png";
		String event = imgpath + "event.png";
		String subproc = imgpath + "subproc.png";
		String parallel = imgpath + "parallel.png";
		String branch = imgpath + "case.gif";
		String procInstID="";
		if (!line.equals(""))
			for (int i = 0; i < acts.length; i++) {
				try {
					if (acts[i].indexOf(",") > 0) {
						String temp[] = acts[i].split(",");
						String pp = "";
						for (int j = 0; j < temp.length; j++) {
							NWActInst ai = WorkflowManager.getNWSession()
									.getActInst("", temp[j]);
							procInstID=ai.getProcInstID();
							int actType=ai.getType();
							String actName=formatName(ai.getName());
							String nodeClass=getNodeClass(ai);
							if (actType==NWActDef.ACT_TYPE_MANUAL||actType==NWActDef.ACT_TYPE_MANUAL_COMPENSATION) {
								if (!pp.equals(""))
									pp = pp
											+ ","
											+ "<img src='"
											+ manual
											+ "' border = '0' />"
											+ "<a "+nodeClass+" href=\"javascript:his_manual_onClick('"
											+ temp[j] + "','"
											+ ai.getActDefID() + "')\">"
											+ img.toString() + actName
											+ "</a>";
								else
									pp = pp
											+ "<img src='"
											+ manual
											+ "' border = '0' />"
											+ "<a "+nodeClass+"href=\"javascript:his_manual_onClick('"
											+ temp[j] + "','"
											+ ai.getActDefID() + "')\">"
											+ img.toString() + actName
											+ "</a>";
							} else if (actType ==NWActDef.ACT_TYPE_AUTO||actType==NWActDef.ACT_TYPE_AUTO_COMPENSATION) {
								if (!pp.equals(""))
									pp = pp
											+ ","
											+ "<img src='"
											+ auto
											+ "' border = '0' />"
											+ "<a "+nodeClass+"href=\"javascript:his_auto_onClick('"
											+ temp[j] + "','"
											+ ai.getActDefID() + "')\">"
											+ img.toString() + actName
											+ "</a>";
								else
									pp = pp
											+ "<img src='"
											+ auto
											+ "' border = '0' />"
											+ "<a "+nodeClass+"href=\"javascript:his_auto_onClick('"
											+ temp[j] + "','"
											+ ai.getActDefID() + "')\">"
											+ img.toString() + actName
											+ "</a>";
							} else if (actType== 2 || ai.getType() == 3) {
								if (!pp.equals(""))
									pp = pp + "," + "<img src='" + subproc
											+ "' border = '0' />"
											+ actName;
								else
									pp = pp + "<img src='" + subproc
											+ "' border = '0' />"
											+ actName;
							} else if (actType== 4) {
								if (!pp.equals(""))
									pp = pp + "," + "<img src='" + event
											+ "' border = '0' />"
											+ actName;
								else
									pp = pp + "<img src='" + event
											+ "' border = '0' />"
											+ actName;
							} else if (actType== 5) {
								if (!pp.equals(""))
									pp = pp + "," + "<img src='" + choice
											+ "' border = '0' />"
											+ actName;
								else
									pp = pp + "<img src='" + choice
											+ "' border = '0' />"
											+ actName;
							} else if (actType== 6 || actType== 7
									|| actType== 16) {
								if (!pp.equals(""))
									pp = pp + "," + "<img src='" + parallel
											+ "' border = '0' />"
											+ actName;
								else
									pp = pp + "<img src='" + parallel
											+ "' border = '0' />"
											+ actName;
							} else if (actType== 19) {
								if (!pp.equals(""))
									pp = pp + "," + "<img src='" + branch
											+ "' border = '0' />"
											+ actName;
								else
									pp = pp + "<img src='" + branch
											+ "' border = '0' />"
											+ actName;
							} else if (actType== 8) {
								if (!pp.equals(""))
									pp = pp + "," + "<img src='" + start
											+ "' border = '0' />"
											+ actName;
								else
									pp = pp + "<img src='" + start
											+ "' border = '0' />"
											+ actName;
							} else if (actType== 9) {
								if (!pp.equals(""))
									pp = pp + "," + "<img src='" + end
											+ "' border = '0' />"
											+actName;
								else
									pp = pp + "<img src='" + end
											+ "' border = '0' />"
											+ actName;
							} else {
								if (!pp.equals(""))
									pp = pp + "," + img.toString()
											+ actName;
								else
									pp = pp + "" + img.toString()
											+ actName;
							}
						}
						if (!pp.equals(""))
							if (!path.equals(""))
								path = path + "-->" + pp;
							else
								path = path + pp;
					} else {
						NWActInst ai = WorkflowManager.getNWSession()
								.getActInst("", acts[i]);
						procInstID=ai.getProcInstID();
						int actType=ai.getType();
						String actName=formatName(ai.getName());
						String nodeClass=getNodeClass(ai);
						if (actType==NWActDef.ACT_TYPE_MANUAL||actType==NWActDef.ACT_TYPE_MANUAL_COMPENSATION) {
							if (!path.equals(""))
								path = path
										+ "-->"
										+ "<img src='"
										+ manual
										+ "' border = '0' />"
										+ "<a "+nodeClass+"href=\"javascript:his_manual_onClick('"
										+ acts[i] + "','" + ai.getActDefID()
										+ "')\">" + img.toString()
										+actName + "</a>";
							else
								path = path
										+ "<img src='"
										+ manual
										+ "' border = '0' />"
										+ "<a "+nodeClass+"href=\"javascript:his_manual_onClick('"
										+ acts[i] + "','" + ai.getActDefID()
										+ "')\">" + img.toString()
										+ actName + "</a>";
						} else if (actType==NWActDef.ACT_TYPE_AUTO||actType==NWActDef.ACT_TYPE_AUTO_COMPENSATION) {
							if (!path.equals(""))
								path = path
										+ "-->"
										+ "<img src='"
										+ auto
										+ "' border = '0' />"
										+ "<a "+nodeClass+"href=\"javascript:his_auto_onClick('"
										+ acts[i] + "','" + ai.getActDefID()
										+ "')\">" + img.toString()
										+ actName + "</a>";
							else
								path = path
										+ "<img src='"
										+ auto
										+ "' border = '0' />"
										+ "<a "+nodeClass+"href=\"javascript:his_auto_onClick('"
										+ acts[i] + "','" + ai.getActDefID()
										+ "')\">" + img.toString()
										+ actName + "</a>";
						} else if (ai.getType() == 4 ) {
							if (!path.equals(""))
								path = path + "-->" + "<img src='" + event
										+ "' border = '0' />" + actName;
							else
								path = path + "<img src='" + event
										+ "' border = '0' />" + actName;
						} else if ((ai.getType() == 2 || ai.getType() == 3) ) {
							if (!path.equals(""))
								path = path + "-->" + "<img src='" + subproc
										+ "' border = '0' />" + actName;
							else
								path = path + "<img src='" + subproc
										+ "' border = '0' />" + actName;
						} else if (ai.getType() == 5 ) {
							if (!path.equals(""))
								path = path + "-->" + "<img src='" + choice
										+ "' border = '0' />" + actName;
							else
								path = path + "<img src='" + choice
										+ "' border = '0' />" + actName;
						} else if (ai.getType() == 6 || ai.getType() == 7
								|| ai.getType() == 16) {
							if (!path.equals(""))
								path = path + "-->" + "<img src='" + parallel
										+ "' border = '0' />" +"<a "+nodeClass+"href=\" javascript:his_parallel_onClick('"+acts[i]+"','"+ai.getActDefID()+"')\">"+ actName+"</a>";
							else
								path = path + "<img src='" + parallel
										+ "' border = '0' />" + "<a "+nodeClass+"href=\" javascript:his_parallel_onClick('"+acts[i]+"','"+ai.getActDefID()+"')\">"+ actName+"</a>";
						} else if (ai.getType() == 19) {
							if (!path.equals(""))
								path = path + "-->" + "<img src='" + branch
										+ "' border = '0' />" + actName;
							else
								path = path + "<img src='" + branch
										+ "' border = '0' />" + actName;
						} else if (ai.getType() == 8) {
							if (!path.equals(""))
								path = path + "-->" + "<img src='" + start
										+ "' border = '0' />" + actName;
							else
								path = path + "<img src='" + start
										+ "' border = '0' />" +actName;
						} else if (ai.getType() == 9) {
							if (!path.equals(""))
								path = path + "-->" + "<img src='" + end
										+ "' border = '0' />" + actName;
							else
								path = path + "<img src='" + end
										+ "' border = '0' />" + actName;
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		try {
			path=path+addProcessAbortEvent(procInstID);
		} catch (NWException e) {
			e.printStackTrace();
		}
		return path;
	}

	private static String formatName(String name){
		if (name.indexOf(">")>0 || name.startsWith(">")) 
			   name = name.replaceAll(">","&gt;");
		   if (name.indexOf("<")>0 || name.startsWith("<")) 
			   name = name.replaceAll("<","&lt;");
		   return name;
	}
	private static String getNodeClass(NWActInst actInst){
		int currentState=actInst.getCurState();
		String nodeClass="";
		if(currentState==NWActInst.STATE_ACTIVE)
			nodeClass=" class='active' ";
		else if(currentState==NWActInst.STATE_RUNNING)
			nodeClass=" class='run' ";
		else if(currentState==NWActInst.STATE_SUSPEND)
			nodeClass=" class='suspend' ";
		else if(currentState==NWActInst.STATE_COMPLETE)
			nodeClass=" class='complete' ";
		else if(currentState==NWActInst.STATE_TERMINATE)
			nodeClass=" class='terminate' ";
		return nodeClass;
	}
	private static String addProcessAbortEvent(String procInstID) throws NWException{
		if(Util.isNullOrEmpty(procInstID))
			return"";
		NWSession session=NWSessionFactoryUtil.getGlobalNWSession();
		NWProcInst procInst=session.getProcInst("", procInstID);
		if(procInst.getCurState()!=5)
			return"";
		StringBuffer path=new StringBuffer();
		String imgpath = WorkflowManager.getWorkflowStylePath()+ "/style1/process_img/";
		String auto = imgpath + "auto.png";
		Variable relData=(Variable)procInst.getRelData("isProcessCompensation");
		String isProcessCompensation="";
		if(relData!=null){
			String application=relData.getApplication();
			if(!Util.isNullOrEmpty(application))
				isProcessCompensation=relData.getStringValue(procInstID);
			else
				isProcessCompensation=relData.getValue();
		}
		if(!Util.isNullOrEmpty(isProcessCompensation)&&isProcessCompensation.equalsIgnoreCase("true"))
		{
			Engine engine = EngineFactory.getEngine();
			DefinitionManager dm = engine.getDefinitionManager();
			NWEngineEvent event=dm.getProcEvent(procInst.getProcDefID(),procInst.getProcTempVersionName(), NWMessageConst.ME_ABORTPROCESS);
			NWApplication app = dm.getAppDef(event.getAction());
			path.append("--><img src='").append(auto).append("' border = '0' />")
			.append("<a class='complete' href=\"#\">").append(app.getName()).append("</a>");
		}
			
		return path.toString();
	}
	public static String getRDTypeStr(int i) {
		if (i == 0)
			return "整数";
		else if (i == 1)
			return "字符串";
		else if(i == 3)
			return "浮点数";
		else if(i == 4)
			return "日期";
		else
			return "";
	}
	public static String changeMinuteToDay(int Minutes){
//		工作日数
		String result=""; 
		if(Minutes<=0){
			return result;
		}
		int dayCount= Minutes / (24 * 60);
		//小时数
		int hours=(Minutes-dayCount*24*60)/60;
		//定义的工作分钟数 
		int minutesCount= (Minutes - dayCount * 24 * 60)%60;
		result=dayCount!=0?dayCount+"天":"";
		result+=hours!=0?hours+"小时":"";
		result+=minutesCount!=0?minutesCount+"分钟":"";
		return  result;
	}
	public static String calculatePlanTime(Date startDate,int limiteTime){
		Date date=null;
		if(limiteTime>0){
			long totaltime=startDate.getTime()+limiteTime*60*1000;
			date=new Date(totaltime);
			return Util.format(date);
		}else{
			return "";
		}
		
	}
}