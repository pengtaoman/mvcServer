package com.neusoft.uniflow.web.common.updown.actions;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.struts.action.*;
import javax.servlet.http.*;
import org.apache.struts.upload.FormFile;
import org.apache.struts.upload.MultipartRequestHandler;

import com.neusoft.uniflow.web.common.updown.forms.FileUploadsForm;

import java.util.Hashtable;

public class FileUploadsAction extends Action {

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		String fileid = request.getParameter("fileid");
		if (fileid == null || fileid.equals("")) {
			return mapping.findForward("failure");
		}
		// String filePath =
		// request.getSession().getServletContext().getRealPath(
		// File.separator)
		// + "web-inf"
		// + File.separator
		// + "uploads"
		// + File.separator
		// + fileid + File.separator;
		String filePath = "D:" + File.separator + "uploads" + File.separator
				+ fileid + File.separator;
		File file = new File(filePath);
		if (!file.exists()) {
			file.mkdirs();
		}
		File[] fileList = file.listFiles();
		if (fileList != null && fileList.length > 0) {
			for (int i = 0; i < fileList.length; i++) {
				fileList[i].delete();
			}
		}
		FileUploadsForm theForm = (FileUploadsForm) form;
		MultipartRequestHandler mrh = theForm.getMultipartRequestHandler();
		if (mrh == null) {
			return mapping.findForward("failure");
		}
		Hashtable files = mrh.getFileElements();
		FormFile f[] = null;
		if (files == null || files.size() == 0) {
			System.out.println("文件上传信息:" + " 文件大小为0!");
		} else {
			f = new FormFile[files.size()];
			int i = 0;
			String fname = "";
			java.util.Enumeration enumeration = files.keys();
			while (enumeration.hasMoreElements()) {
				fname = (String) enumeration.nextElement();
				f[i] = (FormFile) files.get(fname);
				i++;
			}
			int realFileCount = 0;
			try {
				for (int a = 0; a < f.length; a++) {
					if (f[a] == null || f[a].getFileSize() == 0
							|| f[a].getFileName() == null
							|| f[a].getFileName().equals("")) {

					} else {
						InputStream stream = f[a].getInputStream();
						OutputStream bos = new FileOutputStream(filePath
								+ f[a].getFileName());
						int bytesRead = 0;
						byte[] buffer = new byte[1024];
						while ((bytesRead = stream.read(buffer, 0, 1024)) != -1) {
							bos.write(buffer, 0, bytesRead);
						}
						bos.flush();
						bos.close();
						stream.close();
						realFileCount++;
						return mapping.findForward("haveResult");
					}
				}
			} catch (FileNotFoundException fnfe) {
				fnfe.printStackTrace(System.out);
			} catch (IOException ioe) {
				ioe.printStackTrace(System.out);
			}

		}
		return mapping.findForward("failure");
	}

}