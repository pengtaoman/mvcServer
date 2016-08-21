//package com.lilai.framework.security.servlet;
//
//import java.awt.image.BufferedImage;
//import java.io.IOException;
//import java.util.Locale;
//
//import javax.imageio.ImageIO;
//import javax.servlet.Servlet;
//import javax.servlet.ServletException;
//import javax.servlet.ServletOutputStream;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.web.context.WebApplicationContext;
//import org.springframework.web.context.support.WebApplicationContextUtils;
//
//import com.lilai.framework.security.service.TDUserService;
//import com.octo.captcha.service.CaptchaServiceException;
//import com.octo.captcha.service.image.DefaultManageableImageCaptchaService;
//import com.octo.captcha.service.image.ImageCaptchaService;
//import com.octo.captcha.service.multitype.GenericManageableCaptchaService;
//
//public class TDCaptchaServlet extends HttpServlet implements Servlet {
//	/**
//	 * 
//	 */
//	private static final long serialVersionUID = 1L;
//	//public static ImageCaptchaService service = new DefaultManageableImageCaptchaService();
//
//	protected void doGet(HttpServletRequest httpServletRequest,
//			HttpServletResponse httpServletResponse) throws ServletException,
//			IOException {
//		httpServletResponse.setDateHeader("Expires", 0L);
//		WebApplicationContext wac = WebApplicationContextUtils.getWebApplicationContext(httpServletRequest.getServletContext());
//		GenericManageableCaptchaService genericManageableCaptchaService = wac.getBean(GenericManageableCaptchaService.class);
//		//System.out.println("MMMMMMMMMMMMMMMMMMMMMMMMMM " + genericManageableCaptchaService);
//		httpServletResponse.setHeader("Cache-Control",
//				"no-store, no-cache, must-revalidate");
//
//		httpServletResponse.addHeader("Cache-Control",
//				"post-check=0, pre-check=0");
//
//		httpServletResponse.setHeader("Pragma", "no-cache");
//
//		httpServletResponse.setContentType("image/jpeg");
//		String ss = genericManageableCaptchaService.getQuestionForID(httpServletRequest
//				.getSession(true).getId(), Locale.CHINA);
//		
//		//System.out.println("?MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM  " + ss);
//		BufferedImage bi = genericManageableCaptchaService.getImageChallengeForID(httpServletRequest
//				.getSession(true).getId());
//
//		ServletOutputStream out = httpServletResponse.getOutputStream();
//
//		ImageIO.write(bi, "jpg", out);
//		try {
//			out.flush();
//		} finally {
//			out.close();
//		}
//	}
//
//	public static boolean validateResponse(HttpServletRequest request,
//			String userCaptchaResponse) {
//		if (request.getSession(false) == null)
//			return false;
//
//		boolean validated = false;
//		try {
//			WebApplicationContext wac = WebApplicationContextUtils.getWebApplicationContext(request.getServletContext());
//			GenericManageableCaptchaService genericManageableCaptchaService = wac.getBean(GenericManageableCaptchaService.class);
//			validated = genericManageableCaptchaService.validateResponseForID(
//					request.getSession().getId(), userCaptchaResponse)
//					.booleanValue();
//		} catch (CaptchaServiceException e) {
//		}
//		return validated;
//	}
//}