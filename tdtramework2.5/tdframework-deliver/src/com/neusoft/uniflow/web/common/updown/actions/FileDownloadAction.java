/*
 * Created on 2004-7-13
 * 
 * TODO To change the template for this generated file go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.uniflow.web.common.updown.actions;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;

import org.apache.struts.action.*;
import javax.servlet.http.*;

public class FileDownloadAction extends Action {

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		try {
			String fileid = request.getParameter("fileid");
			// String productId = request.getParameter("productid");
			if (fileid == null || fileid.equals("")) {
				request.setAttribute("causation", "缺少相关信息：请求无效!");
				return mapping.findForward("failure");
			}
			String path = request.getSession().getServletContext().getRealPath(
					File.separator);
			path = path + "WEB-INF" + File.separator + "uploads"
					+ File.separator + fileid;
			File file = new File(path);
			if (!file.exists()) {
				request.setAttribute("causation", "文件没有找到。");
				return mapping.findForward("failure");
			}
			File[] licenseFiles = file.listFiles();
			if (licenseFiles.length == 0) {
				request.setAttribute("causation", "文件没有找到。");
				return mapping.findForward("failure");
			}
			File currentFile = licenseFiles[0];
			FileInputStream in = new FileInputStream(currentFile);
			response.setContentType("application/x-msdownload");
			response.setContentLength(in.available());
			response.setHeader("Content-Disposition", "attachment;"
					+ "filename=" + toUtf8String(currentFile.getName()));
			OutputStream out = response.getOutputStream();
			byte[] bb = new byte[1024];
			int a = -1;
			while ((a = in.read(bb)) != -1) {
				out.write(bb, 0, a);
			}
			in.close();
			out.close();
		} catch (Exception e) {
			// e.printStackTrace();
			request.setAttribute("causation", "处理请求出错。");
			return mapping.findForward("failure");
		}
		return mapping.findForward("success");
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
					b = Character.toString(c).getBytes("utf-8");
				} catch (Exception ex) {
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
}