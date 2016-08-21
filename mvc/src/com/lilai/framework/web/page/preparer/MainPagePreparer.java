//package com.lilai.framework.web.page.preparer;
//
//import org.apache.tiles.Attribute;
//import org.apache.tiles.AttributeContext;
//import org.apache.tiles.TilesContainer;
//import org.apache.tiles.access.TilesAccess;
//import org.apache.tiles.preparer.PreparerException;
//import org.apache.tiles.preparer.ViewPreparer;
//import org.apache.tiles.request.Request;
//
//public class MainPagePreparer implements ViewPreparer {
//	
//	public void execute(Request tilesRequest, AttributeContext attributeContext)
//			throws PreparerException {
//		System.out.println("KKKKKKKKKKKKKKKKKKKKKKKKKKK  " + attributeContext.getAttribute("body"));
////		attributeContext.putAttribute("body", new Attribute(
////				"/view/app/b.jsp"));
//		
//		System.out.println("KKKKKKKKKKKKKKKKKKKKKKKKKKK11222  " + tilesRequest.toString());
////		TilesContainer container = TilesAccess.getContainer(
////		        request.getSession().getServletContext());
////		container.render("myapp.homepage", request, response);
////		tilesRequest.getHeaderValues();
////		attributeContext.setTemplateAttribute(new Attribute("/view/hello11.jsp","layout"));
//		
//		//attributeContext.putAttribute("layout", new Attribute("/view/hello11.jsp"));
//		
//	}
//}
