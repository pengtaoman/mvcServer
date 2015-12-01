///*
// * Created on 2004-12-24
// *
// * To change the template for this generated file go to
// * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
// */
//package com.neusoft.tdframework.authorization.support;
//
//import java.util.Hashtable;
//import java.util.List;
//
//import com.neusoft.bpm.BPService;
//import com.neusoft.bpm.BPVarPart;
//import com.neusoft.tdframework.authorization.WorkFlowInfo;
//import com.neusoft.tdframework.core.BaseBO;
//import com.neusoft.tdframework.exception.ServiceException;
//
///**
// * @author chenzt
// *
// * 实现调用WebSphere工作流接口功能
// */
//public class WorkFlowInfoWAS implements WorkFlowInfo,BaseBO{
//	
//	/* (non-Javadoc)
//	 * @see com.neusoft.tdframework.authorization.WorkFlowInfo#getWorkItems()
//	 */
//	public String getWorkItems() throws ServiceException {
//		String[] parts = new String[1];
//		parts[0] = "FlowInstanceName";
//		BPVarPart vp = new BPVarPart();
//		vp.setVarParts("FlowInfo",parts);
//
//		BPService bps = new BPService();
//		List workL = bps.getWorkItemList(null,vp,null);
//		
//		if(workL==null) return null;
//		
//		StringBuffer buffer = new StringBuffer();
//		for(int i=0;i<workL.size();i++) {
//			buffer.append(((Hashtable)workL.get(i)).get("FlowInstanceName")).append(" | ");
//		}
//		
//		return buffer.toString();
//	}
//}
