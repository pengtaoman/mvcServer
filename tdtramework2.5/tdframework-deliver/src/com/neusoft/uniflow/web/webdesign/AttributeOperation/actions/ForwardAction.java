package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.uniflow.web.toollistener.FileIO.UWBPIO;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.ForwardForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.autoNodeForms.AutoNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.subProcNodeForms.SubProcNodeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.workflowResourceForms.AppForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ActTemplateToFormConversion;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.ModelElementToAttributeForm;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.XMLParse;
import com.neusoft.workflow.ActTempletsDocument;
import com.neusoft.workflow.AutoActTemplet;
import com.neusoft.workflow.ManualActTemplet;
import com.neusoft.workflow.SubProcActTemplet;
import com.neusoft.workflow.model.Application;
import com.neusoft.workflow.model.ApplicationBean;
import com.neusoft.workflow.model.AutoNode;
import com.neusoft.workflow.model.Data;
import com.neusoft.workflow.model.GlobalApplications;
import com.neusoft.workflow.model.ProcessContentDocument;
import com.neusoft.workflow.model.ManualNode;
import com.neusoft.workflow.model.SubprocNode;
import com.neusoft.uniflow.web.webdesign.AttributeOperation.util.FlexElementToModelElement;


public class ForwardAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		String type = ((ForwardForm) form).getType();
		String id = ((ForwardForm) form).getId();
		String xmlStr = ((ForwardForm) form).getXmlStr();

		request.setAttribute("xmlStr", xmlStr);
		request.setAttribute("id", id);

		// For midea
		String flag = ((ForwardForm) form).getFlag();
		String isNewVersion = ((ForwardForm) form).getIsNewVersion();
		String editable = ((ForwardForm) form).getEditable();
		String operatable = ((ForwardForm) form).getOperatable();

		request.setAttribute("isNewVersion", isNewVersion);
		request.setAttribute("flag", flag);
		request.setAttribute("editable", editable);
		request.setAttribute("operatable", operatable);

		ProcessContentDocument doc = null;
		String forward = "";
		if(flag.equals("resourceTree"))
		{
			//显示资源树中的元素	
			InputStream in = null;
			try
			{
				in = new ByteArrayInputStream(xmlStr.getBytes("utf-8"));
				if(!type.equals("appTreeNode"))
				{
				   //节点模板树
					ActTempletsDocument actDoc = ActTempletsDocument.Factory.parse(in);
					if(type.equals("1"))
					{
					   //手动节点
						ManualActTemplet[] manualActTemplets = actDoc.getActTemplets().getManualActTempletArray();	
						ManualActTemplet manualActTemplet = manualActTemplets[0];
						ManualNode manualNode = FlexElementToModelElement.getManualNodeFromTemplet(manualActTemplet);
						ManualNodeForm  manualNodeForm = ModelElementToAttributeForm.getManualNodeForm(manualNode, request);
						ActTemplateToFormConversion.convertActivityForm(manualNodeForm, manualActTemplet);
						//设置旧的xml
						 manualNodeForm.setXmlStr(xmlStr);
						request.setAttribute("ManualNodeForm", manualNodeForm );
			    		forward = "toManual";		
					}
					else if(type.equals("0"))
					{
						AutoActTemplet[] autoActTemplets = actDoc.getActTemplets().getAutoActTempletArray();
						AutoActTemplet autoActTemplet = autoActTemplets[0];
						AutoNode autoNode = FlexElementToModelElement.getAutoNodeFromTemplet(autoActTemplet);
						AutoNodeForm autoNodeForm = ModelElementToAttributeForm.getAutoNodeForm(autoNode, request);
						ActTemplateToFormConversion.convertActivityForm(autoNodeForm, autoActTemplet);
						autoNodeForm.setXmlStr(xmlStr);
						request.setAttribute("AutoNodeForm", autoNodeForm );
			    		forward = "toAuto";	
					
					}
					else if(type.equals("2"))
					{
						//子流程节点
						SubProcActTemplet[] subProcActTemplets = actDoc.getActTemplets().getSubProcActTempletArray();
						SubProcActTemplet subProcActTemplet = subProcActTemplets[0];
						SubprocNode subProcNode = FlexElementToModelElement.getSubProcNodeFromTemplet(subProcActTemplet);
						SubProcNodeForm  subProcNodeForm = ModelElementToAttributeForm.getSubProcNodeForm(subProcNode, request);
						ActTemplateToFormConversion.convertActivityForm(subProcNodeForm, subProcActTemplet);
						subProcNodeForm.setXmlStr(xmlStr);
						request.setAttribute("SubProcNodeForm", subProcNodeForm);
			    		forward = "toSubproc";	
						
					}
				}
				else
				{
					//应用程序树 根据
					GlobalApplications globalApplicaions = UWBPIO.getInstance().readProgListFromStream(in);
					if(globalApplicaions != null)
					{
						ApplicationBean[] applications = globalApplicaions.getApplicationBeanArray();
						ApplicationBean applicationBean = applications[0];
						Application application = FlexElementToModelElement.getApplication(applicationBean);
						AppForm appForm = ModelElementToAttributeForm.getAppForm(application,request);
						appForm.setXmlStr(xmlStr);
						request.setAttribute("AppForm", appForm);
			    		forward = "toApp";
					}
				}
				
				
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			finally
			{
				if(in != null)
				{
					try
					{
						in.close();
					}
					catch(Exception e)
					{
						e.printStackTrace();
					}
				}
			}
			
		}
		else
		{
			//显示流程模板中的元素
			try {
				doc = ProcessContentDocument.Factory.parse(xmlStr);
			} catch (Exception e) {
				e.printStackTrace();
			}
	
			if (doc.getProcessContent().getProcess().getDatas() != null) {
				Data[] datas = doc.getProcessContent().getProcess().getDatas()
						.getDataArray();
				// For midea
				String variables = "";
				String transitionVariables = "";
				for (int i = 0; i < datas.length; i++) {
					transitionVariables = transitionVariables + datas[i].getId()
							+ "," + datas[i].getName() + ","
							+ datas[i].getDataType().toString() + ";";
					if (!datas[i].getDataType().toString().equals("1")) {
						variables = variables + datas[i].getId() + ","
								+ datas[i].getName() + ";";
					}
				}
				request.setAttribute("variableSelect", variables);
				request.setAttribute("transitionVariables", transitionVariables);
			} else {
				String vector = "";
				request.setAttribute("variables", vector);
			}
	
			
			try {
				forward = XMLParse.parse(doc, type, id, request);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return mapping.findForward(forward);


	}
}
