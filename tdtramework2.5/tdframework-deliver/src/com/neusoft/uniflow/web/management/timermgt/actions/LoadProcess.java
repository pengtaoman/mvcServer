package com.neusoft.uniflow.web.management.timermgt.actions;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.neusoft.unieap.ria.IDataCenter;
import com.neusoft.unieap.ria.IDataStore;
import com.neusoft.unieap.ria.exception.DataCenterException;
import com.neusoft.unieap.ria.impl.DataCenter;
import com.neusoft.unieap.ria.io.DataCenterIOManager;
import com.neusoft.unieap.ria.io.DataCenterReader;
import com.neusoft.unieap.ria.io.DataCenterWriter;
import com.neusoft.uniflow.common.NWResultSet;
import com.neusoft.uniflow.common.StorageException;
import com.neusoft.uniflow.timer.TimerExecutionMgr;

public class LoadProcess extends DispatchAction {

	public ActionForward loadErrorTimertaskProcess(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		InputStream in = null;
		IDataCenter dc = null;

		int type = Integer.parseInt(request.getParameter("type"));
		TimerExecutionMgr timerexecutionMgr = TimerExecutionMgr.instance();
		in = request.getInputStream();
		DataCenterReader r = DataCenterIOManager.createReader(in);
		dc = r.parse();
		IDataStore ds = dc.getDataStore("processStore");
		try {
			int recordCount = timerexecutionMgr
					.getProcInstNumContainErrorTimertask(type);
			int pageSize = ds.getPageSize();
			int pageNo = ds.getPageNo();
			if ((pageNo - 1) * pageSize >= recordCount && recordCount != 0) {
				pageNo -= 1;
				ds.setPageNo(pageNo);
			}
			DataCenterWriter writer;
			ds.setRecordCount(recordCount);
			NWResultSet rs = timerexecutionMgr
					.getProcInstContainErrorTimertask((pageNo - 1) * pageSize
							+ 1, pageSize, type);
			while (rs.next()) {
				Map map = new HashMap();
				int errorNum = 0;
				String procInstID = rs.getString(1);
				map.put("proc_instance_id", procInstID);
				map.put("name", rs.getString(2));
				map.put("templet_name", rs.getString(3));
				map.put("current_state", Util.getStateName("instState", rs
						.getInt(4)));
				map.put("category", rs.getString(5));
				map.put("start_time", rs.getDate(6).toString());
				if (rs.getDate(7) != null) {
					map.put("complete_time", rs.getDate(7).toString());
				}
				ds.addRowData(map);
			}
			dc.addDataStore(ds);
			writer = DataCenterIOManager.createWriter(response
					.getOutputStream());
			writer.write((DataCenter) dc);
		} catch (DataCenterException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public ActionForward loadRunningTimertaskProcess(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		InputStream in = null;
		IDataCenter dc = null;

		int type = Integer.parseInt(request.getParameter("type"));
		TimerExecutionMgr timerexecutionMgr = TimerExecutionMgr.instance();
		in = request.getInputStream();
		DataCenterReader r = DataCenterIOManager.createReader(in);
		dc = r.parse();
		IDataStore ds = dc.getDataStore("processStore");
		try {
			int recordCount = timerexecutionMgr
					.getProcInstNumContainRunningTimertask(type);
			int pageSize = ds.getPageSize();
			int pageNo = ds.getPageNo();
			if ((pageNo - 1) * pageSize >= recordCount && recordCount != 0) {
				pageNo -= 1;
				ds.setPageNo(pageNo);
			}
			DataCenterWriter writer;
			ds.setRecordCount(recordCount);
			NWResultSet rs = timerexecutionMgr
					.getProcInstContainRunningTimertask((pageNo - 1) * pageSize
							+ 1, pageSize, type);
			while (rs.next()) {
				Map map = new HashMap();
				int errorNum = 0;
				String procInstID = rs.getString(1);
				map.put("proc_instance_id", procInstID);
				map.put("name", rs.getString(2));
				map.put("templet_name", rs.getString(3));
				map.put("current_state", Util.getStateName("instState", rs
						.getInt(4)));
				map.put("category", rs.getString(5));
				map.put("start_time", rs.getDate(6).toString());
				if (rs.getDate(7) != null)
					map.put("complete_time", rs.getDate(7).toString());
				ds.addRowData(map);
			}
			dc.addDataStore(ds);
			writer = DataCenterIOManager.createWriter(response
					.getOutputStream());
			writer.write((DataCenter) dc);
		} catch (DataCenterException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (StorageException e) {
			e.printStackTrace();
		}

		return null;
	}

}
