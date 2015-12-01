package com.neusoft.uniflow.web.webdesign.AttributeOperation.actions.exportXmlAction;

import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

public class ExportJpgAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		BufferedImage bufferedImage = ImageIO.read(request.getInputStream());
		response.setHeader("Content-Length:", String.valueOf(request
				.getInputStream().available()));
		String name = request.getParameter("processName");
		name = name.replaceAll("~", "\\+");
		name = name.replaceAll(" ", "\\+");
		name = Base64Util.decodeStrByBASE64(name);
		
		String agent=request.getHeader("user-agent").toLowerCase();
		String xmlName=name;
		if(agent.indexOf("firefox")>0)
			xmlName=new String(name.getBytes("utf-8"),"iso-8859-1");
		else
			xmlName = java.net.URLEncoder.encode(name, "UTF-8");
		xmlName = xmlName.replaceAll("\\+", "%20");
		response.setContentType("application/x-download;charset=UTF-8");
		response.setHeader("Content-Disposition", "attachment; filename="
				+ xmlName + ".jpg");
		JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(response
				.getOutputStream());
		encoder.encode(bufferedImage);
		response.getOutputStream().close();
		return null;
	}

}
