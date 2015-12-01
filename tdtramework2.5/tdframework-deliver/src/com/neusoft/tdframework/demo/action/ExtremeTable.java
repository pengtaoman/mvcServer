package com.neusoft.tdframework.demo.action;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.neusoft.tdframework.common.GlobalParameters;
import com.neusoft.tdframework.common.util.grid.HeaderCell;
import com.neusoft.tdframework.common.util.grid.PrintingFormatter;
import com.neusoft.tdframework.demo.bo.staffer.OptrMaintBo;
import com.neusoft.tdframework.demo.dao.staffer.EmployeeVO;
import com.neusoft.tdframework.exception.ActionException;
import com.neusoft.tdframework.exception.ServiceException;
import com.neusoft.tdframework.log.SysLog;
import com.neusoft.tdframework.web.struts.TDDispatchAction;
import com.neusoft.unieap.util.RequestUtil;
import com.neusoft.unieap.util.ResponseUtil;

/**
 * brief description
 * <p>Date       : 2006-3-10</p>
 * <p>Module     : </p>
 * <p>Description: </p>
 * <p>Remark     : </p>
 * @author wanghx
 * @version 1.0
 * <p>------------------------------------------------------</p>
 * <p> �޸���ʷ</p>
 * <p>  ���		����		   �޸���			�޸�ԭ��   			</p>
 * <p>   1      2006-3-14  zhangjn      ʵ�����̨�߼�������    </p>
 * <p>   2      2008-11-14 w-huan       �������              </p>
 */

public class ExtremeTable extends TDDispatchAction {

	private static int DEFAULT_PAGE_SIZE = 5;//Ĭ��ÿҳ��ʾ��¼����

	public ExtremeTable() {
		super();
	}

	/**
	 * ���ܣ�ҳ�浼������ѯҳ��
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward init(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return actionMapping.findForward("init");
	}

	/**
	 * ���ܣ����ݿ��ҳ��ѯ����
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws ActionException
	 */
	public ActionForward query(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {

		OptrMaintBo bo = (OptrMaintBo) getServiceFacade("demoOptrMaintBo",actionMapping);

		int totalRows = getTotalRowsFromRequest(request);
		if (totalRows < 0) {
			totalRows = getOptrs(request, bo);//�����ݿ�ȡ��������
		}

		int[] startEnd = getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);

		List records = null;

		if (totalRows > 0) {
			records = getOptrs(request, bo, startEnd[0], startEnd[1]);
		}

		request.setAttribute("optrs", records);
		request.setAttribute("totalRows", new Integer(totalRows));

		return actionMapping.findForward("query");
	}
    
	/**
	 * ���ܣ�
	 */
	public ActionForward unspecified(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		return query(actionMapping, actionForm, request, response);
	}

	/**
	 * ���ܣ����ݿ�ȫ����ѯ����
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws ActionException
	 */
	public ActionForward queryAll(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {

		OptrMaintBo bo = (OptrMaintBo) getServiceFacade("demoOptrMaintBo",actionMapping);
	
		int totalRows = getTotalRowsFromRequest(request);
		if (totalRows < 0) {
			totalRows = getOptrs(request, bo);//�����ݿ�ȡ��������
		}
		
		getStartEnd(request, totalRows, DEFAULT_PAGE_SIZE);
		
		List records = null;
		
		if (totalRows > 0) {
			records = getAllOptrs(request, bo);
		}
		
		request.setAttribute("optrs", records);
		request.setAttribute("totalRows", new Integer(totalRows));

		return actionMapping.findForward("queryAll");
	}

	/**
	 * ���ܣ���ȡ������ͽ�ɫ��Ϣ��ѯ���ܼ�¼��
	 * @param request
	 * @param bo
	 * @return
	 * @throws ActionException
	 */
	private int getOptrs(HttpServletRequest request, OptrMaintBo bo)
			throws ActionException {
		
		int totalRows = 0;
		String queryType = (String) request.getParameter("queryType");
		
		try {
			if (queryType.equals("role")) {
				String area = request.getParameter("storeValue");
				String role = request.getParameter("select");
				totalRows = bo.getOptrsByRole(area, role);
			}
		} catch (Exception dae) {
			throw new ActionException(dae.getMessage());
		}
		
		request.setAttribute("queryType", queryType);
		return totalRows;
	}

	/**
	 * ���ܣ���ȡ������ͽ�ɫ��Ϣ��ѯ��ȫ������
	 * @param request
	 * @param bo
	 * @return
	 * @throws ActionException
	 */
	private List getAllOptrs(HttpServletRequest request, OptrMaintBo bo)
			throws ActionException {
		
		String queryType = (String) request.getParameter("queryType");
		List records = new ArrayList();

		try {
			if (queryType.equals("role")) {
				String area = request.getParameter("storeValue");
				String role = request.getParameter("select");
				records = bo.getAllOptrsByRole(area, role);
			}
		} catch (Exception dae) {
			throw new ActionException(dae.getMessage());
		}
		
		request.setAttribute("queryType", queryType);
		return records;
	}

	/**
	 * ���ܣ���ȡ������ͽ�ɫ��Ϣ��ѯ�ķ�ҳ����
	 * @param request
	 * @param bo
	 * @param beginNum
	 * @param endNum
	 * @return
	 * @throws ActionException
	 */
	private List getOptrs(HttpServletRequest request, OptrMaintBo bo,
			int beginNum, int endNum) throws ActionException {
		
		String queryType = (String) request.getParameter("queryType");
		List records = new ArrayList();

		try {
			if (queryType.equals("role")) {
				String area = request.getParameter("storeValue");
				String role = request.getParameter("select");
				records = bo.getOptrsByRole(area, role, beginNum, endNum);
			}
		} catch (Exception dae) {
			throw new ActionException(dae.getMessage());
		}

		request.setAttribute("queryType", queryType);
		return records;
	}

	/**
	 * ���ܣ�
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward delBatch(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
				
		RequestUtil requestUtil = new RequestUtil(request);
        ResponseUtil responseUtil = new ResponseUtil(response);

        //String[] cuser = request.getParameterValues("chkbx_user");
        
		return query(actionMapping, actionForm, request, response);
	}

	/**
	 * ���ܣ���ȡ��ӡ����
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward getPrintString(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		RequestUtil requestUtil = new RequestUtil(request);
		ResponseUtil responseUtil = new ResponseUtil(response);
	
		OptrMaintBo bo = (OptrMaintBo) getServiceFacade("demoOptrMaintBo",actionMapping);
		
		List records = null;
		int totalRows = 0; 
		
		String area = requestUtil.getParameter("storeValue");
		String role = requestUtil.getParameter("select");
		
		totalRows = bo.getOptrsByRole(area, role);
	
		if (totalRows > 0) {
			try {
				records = bo.getOptrsByRole(area, role, 1, totalRows);
			} catch (Exception dae) {
				throw new ActionException(dae.getMessage());
			}
		}
		
		PrintingFormatter formatter = new PrintingFormatter();
		formatter.setHeader(getPrintHeader());
		formatter.setData(records);
		
		response.getWriter().write(formatter.getString());
		
		return null;
	}
    
	/**
	 * ���ܣ���ȡ��ӡ����ͷ��Ϣ
	 * @return
	 */
	private List getPrintHeader() {
		
		List headLine = new ArrayList();
		
		HeaderCell cell1 = new HeaderCell();
		cell1.setName("id");
		cell1.setTitle("ID");
		cell1.setWidth(15);
		headLine.add(cell1);
		
		HeaderCell cell2 = new HeaderCell();
		cell2.setName("workno");
		cell2.setTitle("����");
		cell2.setWidth(15);
		headLine.add(cell2);
		
		HeaderCell cell3 = new HeaderCell();
		cell3.setName("name");
		cell3.setTitle("����");
		cell3.setWidth(15);
		headLine.add(cell3);
		
		HeaderCell cell4 = new HeaderCell();
		cell4.setName("organ");
		cell4.setTitle("����");
		cell4.setWidth(15);
		headLine.add(cell4);
		
		return headLine;
	}

	/**
	 * ���ܣ����ݵ���(Excel)
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	/*
	 * public static String encodeFileName(HttpServletRequest request, String
	 * fileName) throws UnsupportedEncodingException { String agent =
	 * request.getHeader("USER-AGENT"); String codedfilename = null;
	 * fileName=fileName.replaceAll("\n|\r", " ").trim(); if (null != agent &&
	 * -1 != agent.indexOf("MSIE")) { codedfilename =
	 * URLEncoder.encode(fileName, "UTF8"); } else if (null != agent && -1 !=
	 * agent.indexOf("Mozilla")) { codedfilename = "=?UTF-8?B?"+(new
	 * String(Base64.encodeBase64(fileName.getBytes("UTF-8"))))+"?="; } else {
	 * codedfilename = fileName; } return codedfilename; }
	 */

	public ActionForward doExport(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		try {
			
			response.setContentType("application/vnd.ms-excel");
			
			String codedfilename = URLEncoder.encode("��������ֱ�.xls","UTF8");
			response.setHeader("Content-Disposition", "attachment;filename=\""+ codedfilename + "\"");
			response.setHeader("Cache-Control","must-revalidate, post-check=0, pre-check=0");
			response.setHeader("Pragma", "public");
		
			ByteArrayOutputStream wb = createJxlSampleDataList();
			wb.writeTo(response.getOutputStream());
	
			response.getOutputStream().flush();
			response.getOutputStream().close();

		} catch (Exception e) {
			System.out.println("Error : " + e.toString());
		}
		return null;
	}
	
	/**
	 * ���ܣ����ݵ���(text)
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward doExportTXT(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		try {
		
			response.setContentType("text/plain");
			
			String codedfilename = URLEncoder.encode("��������ֱ�1���������.txt","UTF8");
			response.setHeader("Content-Disposition", "attachment;filename=\""+ codedfilename + "\"");
			response.setHeader("Cache-Control","must-revalidate, post-check=0, pre-check=0");
			response.setHeader("Pragma", "public");
		
			ByteArrayOutputStream wb = getTxtFileStream();
			wb.writeTo(response.getOutputStream());
			
			response.getOutputStream().flush();
			response.getOutputStream().close();

		} catch (Exception e) {
			System.out.println("Error : " + e.toString());
		}
		return null;
	}
	
	/**
	 * ���ܣ���ȡ�����ı��ļ���������
	 * @return
	 */
	private ByteArrayOutputStream getTxtFileStream() {
		
		ByteArrayOutputStream fos = new ByteArrayOutputStream();
		OutputStreamWriter osw = new OutputStreamWriter(fos);
		java.io.BufferedWriter bw = new BufferedWriter(osw);

		try {
			for (short i = 0; i < 20000; i++) {
				bw.write("�ӱ���ͨ");
				bw.newLine();
			}
			bw.flush();
			bw.close();

		} catch (IOException e) {
			e.printStackTrace();
		}
		return fos;
	}
	
	/**
	 * ���ܣ���ȡ����Excel�ļ���������
	 * @return
	 */
	private ByteArrayOutputStream createJxlSampleDataList() {
		
		WritableWorkbook book = null;
		ByteArrayOutputStream fos = null;
	
		try {
			
			fos = new ByteArrayOutputStream();
			book = Workbook.createWorkbook(fos);

			WritableSheet sheet = book.createSheet("��һҳ", 0);
			for (short i = 0; i < 10000; i++) {
				for (short j = 0; j < 10; j++) {
					Label label = new Label(j, i, "����������ͨӪҵ��");
					sheet.addCell(label);
				}
			}
			
			WritableSheet sheet2 = book.createSheet("�ڶ�ҳ", 1);
			for (short i = 0; i < 10000; i++) {
				for (short j = 0; j < 10; j++) {
					Label label = new Label(j, i, "����������ͨӪҵ��");
					sheet2.addCell(label);
				}
			}

			book.write();
			book.close();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		} catch (WriteException we) {
			we.printStackTrace();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return fos;
	}
	
	/**
	 * ���ܣ�
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward modify(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		RequestUtil rq = new RequestUtil(request);
		String str = rq.getParameter("linkData");
		request.setAttribute("id", str);
		return actionMapping.findForward("modify");
	}

	/**
	 * ���ܣ���������ҳ�浼�����޸�ҳ��
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward add(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return actionMapping.findForward("modify");
	}

	/**
	 * ���ܣ��޸����ݣ��������ת���б�չʾҳ��
	 * @param actionMapping
	 * @param actionForm
	 * @param request
	 * @param response
	 * @return
	 * @throws ActionException
	 */
	public ActionForward doModify(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {

		RequestUtil rq = new RequestUtil(request);
		
		String errorInfo = "";
		
		// ��������ο� TreeRender.java��ITreeNode.checknode+comp.getTree()
		// ��ȡѡ�����ڵ��value
		// "eap"������tree����ֵ
		String employeeId = rq.getParameter("name");
		String nickname = rq.getParameter("nickname");
		
		EmployeeVO vo = new EmployeeVO();
		vo.setAccountNo(employeeId);
		vo.setName(nickname);
		
		OptrMaintBo bo = (OptrMaintBo) getServiceFacade("demoOptrMaintBo",actionMapping);
		
		try {
			bo.updateOptrById(employeeId, vo);
		} catch (ServiceException se) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"ExtremeTable--doModify:" + se.getMessage());
			errorInfo = se.getMessage();
		} catch (Exception e) {
			SysLog.writeLogs("demo", GlobalParameters.ERROR,"ExtremeTable--doModify:" + e.getMessage());
			throw new ActionException(e);
		}
		
		request.setAttribute("errorInfo", errorInfo);

		return actionMapping.findForward("query");
	}
}
