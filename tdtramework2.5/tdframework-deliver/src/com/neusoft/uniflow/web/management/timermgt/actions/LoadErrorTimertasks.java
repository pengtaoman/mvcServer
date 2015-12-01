package com.neusoft.uniflow.web.management.timermgt.actions;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.neusoft.unieap.ria.IDataCenter;
import com.neusoft.unieap.ria.IDataStore;
import com.neusoft.unieap.ria.impl.DataCenter;
import com.neusoft.unieap.ria.io.DataCenterIOManager;
import com.neusoft.unieap.ria.io.DataCenterReader;
import com.neusoft.unieap.ria.io.DataCenterWriter;
import com.neusoft.uniflow.common.NWResultSet;
import com.neusoft.uniflow.service.WorkFlowContext;
import com.neusoft.uniflow.timer.TimerExecutionMgr;
import com.neusoft.uniflow.timer.checker.TimeOutInst;

public class LoadErrorTimertasks extends DispatchAction {

	public ActionForward loadErrorTimertasks(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		InputStream in = null;
		IDataCenter dc = null;

		int type = Integer.parseInt(request.getParameter("type"));
		String selectedProcInstID = request.getParameter("procInstID");
		TimerExecutionMgr timerexecutionMgr = TimerExecutionMgr.instance();
		in = request.getInputStream();
		DataCenterReader r = DataCenterIOManager.createReader(in);
		dc = r.parse();
		IDataStore ds = dc.getDataStore("processStore");
		try {
			int recordCount = timerexecutionMgr.getErrorTimertasksNoInProc("error",
					selectedProcInstID, type);
			int pageSize = ds.getPageSize();
			int pageNo = ds.getPageNo();
			if ((pageNo - 1) * pageSize >= recordCount && recordCount != 0) {
				pageNo -= 1;
				ds.setPageNo(pageNo);
			}
			DataCenterWriter writer;
			ds.setRecordCount(recordCount);
			NWResultSet rs = timerexecutionMgr.getErrorTimertasksInProc("error",
					selectedProcInstID, (pageNo - 1) * pageSize + 1, pageSize,
					type);
			while (rs.next()) {
				Map map = new HashMap();
				String instanceID = rs.getString(1);
				map.put("instance_id", rs.getString(1));
				map.put("current_state", Util.getStateName("instState", rs.getInt(2)));
				int objecttype = rs.getInt(3);
				if (objecttype == TimeOutInst.INST_TYPE_ACT) {
					map.put("instName", Util.getInstName(instanceID, "activity"));
					map.put("type", "节点");
					map.put("procName", Util.getProcName(instanceID, "activity"));
				} else if (objecttype == TimeOutInst.INST_TYPE_PROC) {
					map.put("instName", Util.getInstName(instanceID, "proc"));
					map.put("type", "流程");
					map.put("procName", Util.getProcName(instanceID, "proc"));
				} else {
					map.put("instName", Util.getInstName(instanceID, "workitem"));
					map.put("type", "工作项");
					map.put("procName", Util.getProcName(instanceID, "workitem"));
				}
				map.put("objecttype", new Integer(objecttype));
				int timerType = rs.getInt(4);
				map.put("timer_type", timerType == 1 ? "超时" : "预警");
				map.put("retries", new Integer(rs.getInt(5)));
				if(rs.getDate(6) != null)
					map.put("locktime", rs.getDate(6).toString());
				if(rs.getString(7) != null)
				map.put("exception", rs.getString(7));
				map.put("groupID", rs.getString(8));
				map.put("handlestate", Util.getStateName("errorState", rs.getInt(9)));
				ds.addRowData(map);
			}
			dc.addDataStore(ds);
			writer = DataCenterIOManager.createWriter(response
					.getOutputStream());
			writer.write((DataCenter) dc);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public ActionForward loadRunningTimertasks(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		InputStream in = null;
		IDataCenter dc = null;

		int type = Integer.parseInt(request.getParameter("type"));
		String selectedProcInstID = request.getParameter("procInstID");
		TimerExecutionMgr timerexecutionMgr = TimerExecutionMgr.instance();

		in = request.getInputStream();
		DataCenterReader r = DataCenterIOManager.createReader(in);
		dc = r.parse();
		IDataStore ds = dc.getDataStore("processStore");
		
		try {
			int recordCount = timerexecutionMgr.getErrorTimertasksNoInProc(
					"running", selectedProcInstID, type);
			int pageSize = ds.getPageSize();
			int pageNo = ds.getPageNo();
			if ((pageNo - 1) * pageSize >= recordCount && recordCount != 0) {
				pageNo -= 1;
				ds.setPageNo(pageNo);
			}
			DataCenterWriter writer;
			ds.setRecordCount(recordCount);
			NWResultSet rs = timerexecutionMgr.getErrorTimertasksInProc("running",
					selectedProcInstID, (pageNo - 1) * pageSize + 1, pageSize,
					type);
			while (rs.next()) {
				Map map = new HashMap();
				String instanceID = rs.getString(1);
				map.put("instance_id", rs.getString(1));
				map.put("current_state", Util.getStateName("instState", rs.getInt(2)));
				int objecttype = rs.getInt(3);
				if (objecttype == TimeOutInst.INST_TYPE_ACT) {
					map.put("instName", Util.getInstName(instanceID, "activity"));
					map.put("type", "节点");
					map.put("procName", Util.getProcName(instanceID, "activity"));
				} else if (objecttype == TimeOutInst.INST_TYPE_PROC) {
					map.put("instName", Util.getInstName(instanceID, "proc"));
					map.put("type", "流程");
					map.put("procName", Util.getProcName(instanceID, "proc"));
				} else {
					map.put("instName", Util.getInstName(instanceID, "workitem"));
					map.put("type", "工作项");
					map.put("procName", Util.getProcName(instanceID, "workitem"));
				}
				map.put("objecttype", new Integer(objecttype));
				int timerType = rs.getInt(4);
				map.put("timer_type", timerType == 1 ? "超时" : "预警");
				map.put("retries", new Integer(rs.getInt(5)));
				if(rs.getDate(6) != null)
					map.put("locktime", rs.getDate(6).toString());
				if(rs.getString(7) != null)
				map.put("exception", rs.getString(7));
				map.put("groupID", rs.getString(8));
				map.put("handlestate", Util.getStateName("errorState", rs.getInt(9)));
				map.put("runningTime", new Long((WorkFlowContext.getInstance().getPersistence().getDBTime().getTime() - rs.getDate(10).getTime())/1000));
				ds.addRowData(map);
			}
			dc.addDataStore(ds);
			writer = DataCenterIOManager.createWriter(response
					.getOutputStream());
			writer.write((DataCenter) dc);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
