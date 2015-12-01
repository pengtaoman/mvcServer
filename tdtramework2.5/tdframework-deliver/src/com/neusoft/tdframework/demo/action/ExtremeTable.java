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
 * <p> 修改历史</p>
 * <p>  序号		日期		   修改人			修改原因   			</p>
 * <p>   1      2006-3-14  zhangjn      实现与后台逻辑的整合    </p>
 * <p>   2      2008-11-14 w-huan       整理代码              </p>
 */

public class ExtremeTable extends TDDispatchAction {

	private static int DEFAULT_PAGE_SIZE = 5;//默认每页显示记录条数

	public ExtremeTable() {
		super();
	}

	/**
	 * 功能：页面导航至查询页面
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
	 * 功能：数据库分页查询方法
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
			totalRows = getOptrs(request, bo);//从数据库取得总行数
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
	 * 功能：
	 */
	public ActionForward unspecified(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse response) throws ActionException {
		return query(actionMapping, actionForm, request, response);
	}

	/**
	 * 功能：数据库全部查询方法
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
			totalRows = getOptrs(request, bo);//从数据库取得总行数
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
	 * 功能：获取按区域和角色信息查询的总记录数
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
	 * 功能：获取按区域和角色信息查询的全部数据
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
	 * 功能：获取按区域和角色信息查询的分页数据
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
	 * 功能：
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
	 * 功能：获取打印数据
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
	 * 功能：获取打印数据头信息
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
		cell2.setTitle("工号");
		cell2.setWidth(15);
		headLine.add(cell2);
		
		HeaderCell cell3 = new HeaderCell();
		cell3.setName("name");
		cell3.setTitle("姓名");
		cell3.setWidth(15);
		headLine.add(cell3);
		
		HeaderCell cell4 = new HeaderCell();
		cell4.setName("organ");
		cell4.setTitle("部门");
		cell4.setWidth(15);
		headLine.add(cell4);
		
		return headLine;
	}

	/**
	 * 功能：数据导出(Excel)
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
			
			String codedfilename = URLEncoder.encode("务开帐收入分表.xls","UTF8");
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
	 * 功能：数据导出(text)
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
			
			String codedfilename = URLEncoder.encode("务开帐收入分表1务开帐收入分.txt","UTF8");
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
	 * 功能：获取导出文本文件基础数据
	 * @return
	 */
	private ByteArrayOutputStream getTxtFileStream() {
		
		ByteArrayOutputStream fos = new ByteArrayOutputStream();
		OutputStreamWriter osw = new OutputStreamWriter(fos);
		java.io.BufferedWriter bw = new BufferedWriter(osw);

		try {
			for (short i = 0; i < 20000; i++) {
				bw.write("河北联通");
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
	 * 功能：获取导出Excel文件基础数据
	 * @return
	 */
	private ByteArrayOutputStream createJxlSampleDataList() {
		
		WritableWorkbook book = null;
		ByteArrayOutputStream fos = null;
	
		try {
			
			fos = new ByteArrayOutputStream();
			book = Workbook.createWorkbook(fos);

			WritableSheet sheet = book.createSheet("第一页", 0);
			for (short i = 0; i < 10000; i++) {
				for (short j = 0; j < 10; j++) {
					Label label = new Label(j, i, "辽宁大连联通营业厅");
					sheet.addCell(label);
				}
			}
			
			WritableSheet sheet2 = book.createSheet("第二页", 1);
			for (short i = 0; i < 10000; i++) {
				for (short j = 0; j < 10; j++) {
					Label label = new Label(j, i, "辽宁大连联通营业厅");
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
	 * 功能：
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
	 * 功能：新增数据页面导航至修改页面
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
	 * 功能：修改数据，保存后跳转至列表展示页面
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
		
		// 命名规则参看 TreeRender.java中ITreeNode.checknode+comp.getTree()
		// 获取选中树节点的value
		// "eap"是树的tree属性值
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
