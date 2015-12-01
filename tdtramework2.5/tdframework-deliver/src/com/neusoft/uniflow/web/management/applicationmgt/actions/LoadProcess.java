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
import com.neusoft.unieap.ria.exception.DataCenterException;
import com.neusoft.unieap.ria.impl.DataCenter;
import com.neusoft.unieap.ria.io.DataCenterIOManager;
import com.neusoft.unieap.ria.io.DataCenterReader;
import com.neusoft.unieap.ria.io.DataCenterWriter;
import com.neusoft.uniflow.appmgr.AppExecutionMgr;
import com.neusoft.uniflow.common.NWResultSet;

public class LoadProcess extends DispatchAction {

	public ActionForward loadErrorAppProcess(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		InputStream in = null;
		IDataCenter dc = null;
		int type = Integer.parseInt(request.getParameter("type"));

		AppExecutionMgr appExecutionMgr = AppExecutionMgr.instance();
		in = request.getInputStream();
		DataCenterReader r = DataCenterIOManager.createReader(in);
		dc = r.parse();
		IDataStore ds = dc.getDataStore("processStore");
		try {
			int recordCount = appExecutionMgr.getProcInstNumContainErrorApp(type);
			int pageSize = ds.getPageSize();
			int pageNo = ds.getPageNo();
			if ((pageNo - 1) * pageSize >= recordCount && recordCount != 0) {
				pageNo -= 1;
				ds.setPageNo(pageNo);
			}
			DataCenterWriter writer;
			ds.setRecordCount(recordCount);
			NWResultSet rs = appExecutionMgr.getProcInstContainErrorApp(
					(pageNo - 1) * pageSize + 1, pageSize, type);
			while (rs.next()) {
				Map map = new HashMap();
				String procInstID = rs.getString(1);
				map.put("proc_instance_id", procInstID);
				map.put("name", rs.getString(2));
				map.put("templet_name", rs.getString(3));
				map.put("current_state", Util.getLiteralStateName("instState", rs.getInt(4)));
				map.put("category", rs.getString(5));
				String startTime=Util.parseDate(rs.getDate(6).getTime());
				map.put("start_time",startTime);
				if (rs.getDate(7) != null)
				{
					String completeTime=Util.parseDate(rs.getDate(7).getTime());
					map.put("complete_time",completeTime);
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

	public ActionForward loadRunningAppProcess(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		InputStream in = null;
		IDataCenter dc = null;

		int type = Integer.parseInt(request.getParameter("type"));
		AppExecutionMgr appExecutionMgr = AppExecutionMgr.instance();
		in = request.getInputStream();
		DataCenterReader r = DataCenterIOManager.createReader(in);
		dc = r.parse();
		IDataStore ds = dc.getDataStore("processStore");
		int recordCount = 0;
		try{
			recordCount = appExecutionMgr.getProcInstNumContainRunningApp(type);
			int pageSize = ds.getPageSize();
			int pageNo = ds.getPageNo();
			if ((pageNo - 1) * pageSize >= recordCount && recordCount != 0) {
				pageNo -= 1;
				ds.setPageNo(pageNo);
			}
			DataCenterWriter writer;
			ds.setRecordCount(recordCount);
			NWResultSet rs = appExecutionMgr.getProcInstContainRunningApp(
					(pageNo - 1) * pageSize + 1, pageSize, type);
			while (rs.next()) {
				Map map = new HashMap();
				String procInstID = rs.getString(1);
				map.put("proc_instance_id", procInstID);
				map.put("name", rs.getString(2));
				map.put("templet_name", rs.getString(3));
				map.put("current_state", Util.getLiteralStateName("instState", rs.getInt(4)));
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
		}
		return null;
	}

}
