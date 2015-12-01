/*
 * Created on 2008-3-19
 * 
 * TODO To change the template for this generated file go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
package com.neusoft.uniflow.web.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.*;

public class FLASHPlugInDownload extends HttpServlet {
	private static final long serialVersionUID = 1234567000;

	public static String tab = System.getProperty("line.separator");

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {
			String path = request.getSession().getServletContext().getRealPath(
					File.separator);
			request.getSession().setAttribute("causation", "");
			path = path + File.separator + "unieap" + File.separator + "plugin"
					+ File.separator + "install_flash_player_active_x_forie.exe";
			File file = new File(path);
			if (!file.exists()) {
				request.getSession().setAttribute("causation",
						"noplugin");
			} else {
				FileInputStream in = new FileInputStream(file);
				response.setContentType("application/x-msdownload");
				response.setContentLength(in.available());
				response.setHeader("Content-Disposition", "attachment;"
						+ "filename=" + toUtf8String(file.getName()));
				OutputStream out = response.getOutputStream();
				byte[] bb = new byte[1024 * 4];
				int a = -1;
				while ((a = in.read(bb)) != -1) {
					out.write(bb, 0, a);
					out.flush();
				}
				in.close();
				out.close();
			}
		} catch (Exception e) {
		}
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
					b = Character.toString(c).getBytes("UTF-8");
				} catch (Exception ex) {
					System.out.println(ex);
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