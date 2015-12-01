package com.neusoft.uniflow.web.management.applicationmgt.actions;

import java.io.IOException;
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
import com.neusoft.uniflow.appmgr.AppExecutionMgr;
import com.neusoft.uniflow.common.NWResultSet;
import com.neusoft.uniflow.service.WorkFlowContext;

public class LoadErrorApps extends DispatchAction {

	public ActionForward loadErrorApps(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		InputStream in = null;
		IDataCenter dc = null;

		int type = Integer.parseInt(request.getParameter("type"));
		String selectedProcInstID = request.getParameter("procInstID");
		AppExecutionMgr appExecutionMgr = AppExecutionMgr.instance();

		in = request.getInputStream();
		DataCenterReader r = DataCenterIOManager.createReader(in);
		dc = r.parse();
		IDataStore ds = dc.getDataStore("processStore");
		try {
			int recordCount = appExecutionMgr.getErrorAppsNumInProc("error",
					selectedProcInstID, type);
			int pageSize = ds.getPageSize();
			int pageNo = ds.getPageNo();
			if ((pageNo - 1) * pageSize >= recordCount && recordCount != 0) {
				pageNo -= 1;
				ds.setPageNo(pageNo);
			}
			DataCenterWriter writer;

			ds.setRecordCount(recordCount);
			NWResultSet rs = appExecutionMgr.getErrorAppsInProc("error",
					selectedProcInstID, (pageNo - 1) * pageSize + 1, pageSize,
					type);
			while (rs.next()) {
				Map map = new HashMap();
				map.put("groupID", rs.getString(1));
//				map.put("parameter", rs.getString(2));
				map.put("instName", rs.getString(8));
				int eventID = rs.getInt(7);
				map.put("event_id", Util.getLiteralEventName(eventID));
//				if (eventID == 600 || (eventID > 520 && eventID < 532)) {
//					map.put("type", "节点");
//				} else if (eventID > 500 && eventID < 509) {
//					map.put("type", "流程");
//				} else {
//					map.put("type", "工作项");
//				}
				map.put("procName", rs.getString(9));
				map.put("state", Util.getLiteralStateName("errorState", rs
						.getInt(3)));
				map.put("retries", new Integer(rs.getInt(4)));
				String locktime=Util.parseDate(rs.getDate(5).getTime());
				map.put("locktime", locktime);
				map.put("exception", rs.getString(6));
				ds.addRowData(map);
			}
			dc.addDataStore(ds);
			writer = DataCenterIOManager.createWriter(response
					.getOutputStream());
			writer.write((DataCenter) dc);
		}catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public ActionForward loadRunningApps(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		InputStream in = null;
		IDataCenter dc = null;

		int type = Integer.parseInt(request.getParameter("type"));
		String selectedProcInstID = request.getParameter("procInstID");
		AppExecutionMgr appExecutionMgr = AppExecutionMgr.instance();

		in = request.getInputStream();
		DataCenterReader r = DataCenterIOManager.createReader(in);
		dc = r.parse();
		IDataStore ds = dc.getDataStore("processStore");
		try {
			int recordCount = appExecutionMgr.getErrorAppsNumInProc("running",
					selectedProcInstID, type);
			int pageSize = ds.getPageSize();
			int pageNo = ds.getPageNo();
			if ((pageNo - 1) * pageSize >= recordCount && recordCount != 0) {
				pageNo -= 1;
				ds.setPageNo(pageNo);
			}
			DataCenterWriter writer;

			ds.setRecordCount(recordCount);
			NWResultSet rs = appExecutionMgr.getErrorAppsInProc("running",
					selectedProcInstID, (pageNo - 1) * pageSize + 1, pageSize,
					type);
			while (rs.next()) {
				Map map = new HashMap();
				map.put("groupID", rs.getString(1));
//				map.put("parameter", rs.getString(2));
				map.put("instName", rs.getString(8));
				int eventID = rs.getInt(7);
//				if (eventID == 600 || (eventID > 520 && eventID < 532)) {
//					map.put("type", "节点");
//				} else if (eventID > 500 && eventID < 509) {
//					map.put("type", "流程");
//				} else {
//					map.put("type", "工作项");
//				}
				map.put("procName", rs.getString(9));
				map.put("event_id", Util.getLiteralEventName(eventID));
				map.put("state", Util.getLiteralStateName("errorState", rs
						.getInt(3)));
				map.put("retries", new Integer(rs.getInt(4)));
				map.put("runningTime", new Long((WorkFlowContext.getInstance()
						.getPersistence().getDBTime().getTime() - rs
						.getDate(10).getTime())/1000));
				if (rs.getDate(5) != null)
					map.put("locktime", rs.getDate(5).toString());
				if (rs.getString(7) != null)
					map.put("exception", rs.getString(6));
				ds.addRowData(map);
			}
			dc.addDataStore(ds);
			writer = DataCenterIOManager.createWriter(response
					.getOutputStream());
			writer.write((DataCenter) dc);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

}
