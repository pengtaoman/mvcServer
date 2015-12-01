package com.neusoft.uniflow.web.util;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neusoft.uniflow.api.NWSession;
import com.neusoft.uniflow.api.handler.NWActInst;
import com.neusoft.uniflow.api.handler.NWWorkItem;
import com.neusoft.uniflow.web.common.categorytree.beans.CategoryTree;

public class AjaxUtil extends HttpServlet {
	private static final long serialVersionUID = 1234567000;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		OutputStream out = response.getOutputStream();
		OutputStreamWriter writer = new OutputStreamWriter(out, "utf-8");
		String method = request.getParameter("method");
		if (method.equals("subProcRestart")) {
			String subProcinstID = request.getParameter("subPid");
			NWSession session = WorkflowManager.getNWSession();
			try {
				if (subProcinstID != null) {
					session.getProcInstManager().doRestartSubProc(
							subProcinstID, "");
					writer.write("子流程重启动成功!");
				}
			} catch (Exception e) {
				writer.write("子流程重启动异常，请查看后台信息!");
				e.printStackTrace();
			}

		}
		if (method.equals("doCompleteAct")) {
			String actinstID = request.getParameter("actinstid");
			NWSession session = WorkflowManager.getNWSession();
			try {
				if (actinstID != null) {
					NWActInst act = session.getActInst("", actinstID);
					Vector wis = act.openWorkItemList(-1);
					// boolean flag = false;
					String alertStr = "节点完成成功!";
					// 备用代码
					// for (int i=0;i<wis.size();i++){
					// NWWorkItem wi = (NWWorkItem)wis.elementAt(i);
					// if (wi.getCurState()==2 || wi.getCurState()==3) {
					// flag = true;
					// alertStr = "存在激活态工作项，不能提交！";
					// }
					// }
					for (int i = 0; i < wis.size(); i++) {
						NWWorkItem wi = (NWWorkItem) wis.elementAt(i);
						if (wi.getCurState() == 1) {
							wi.doComplete(false);
						}
					}
					writer.write(alertStr);
				}
			} catch (Exception e) {
				writer.write("节点完成异常，请查看后台信息!");
				e.printStackTrace();
			}

		}
		if (method.equals("opAgentCPtree")) {
			String agentid = request.getParameter("agentid");
			String op = request.getParameter("op");
			String item = request.getParameter("item");
			CategoryTree cptree = (CategoryTree) request.getSession()
					.getAttribute(agentid);
			if (op.equals("view")) {
				writer.write(cptree.getSeletedItems());
			}
			if (op.equals("delete") && item != null) {
				cptree.getSelectedItem().remove(item);
				writer.write("success");
			}
		}
		if(method.equals("refreshMemory")){
			NWSession session = WorkflowManager.getNWSession();
			try{
				session.refreshTimerMemory();
				writer.write("success");
			}catch(Exception e){
				writer.write("fail");
				e.printStackTrace();
			}
		}
		writer.flush();
		writer.close();
		out.close();
	}
}
