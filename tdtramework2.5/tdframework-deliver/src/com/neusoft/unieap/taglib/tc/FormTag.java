package com.neusoft.unieap.taglib.tc;

/**
 * 自定义标签：FormTag，用于定制表单。
 *
 * @author  邵树力 shaosl@neusoft.com
 * @version 1.7
 */
/*--------------------------------------------------------------
  创建时间：2003-04-10
  修改履历：
  --------------------------------------------------------------*/

import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.struts.util.RequestUtils;
import org.apache.struts.util.ResponseUtils;

import com.neusoft.unieap.config.SystemConfig;
import com.neusoft.unieap.util.Globals;

public class FormTag extends TagSupport{
    /**
     * action 名称
     */
    protected String action = null;

    /**
     * EAPDispatchAction需要的 method.
     */
    protected String actionMethod = null;

    /**
     * POST submit需要的content encoding
     */
    protected String enctype = null;

    /**
     * FROM提交方法：GET/POST
     */
    protected String method = null;

    /**
     * 返回窗口目标
     */
    protected String target = null;

    /**
     * 构造函数
     */
    public FormTag(){
    }

    /**
     * 返回action
     */
    public String getAction(){
        return(this.action);
    }

    /**
     * 设置action
     */
    public void setAction(String action){
        this.action = action;
    }

    /**
     * 返回actionMethod
     */
    public String getActionMethod(){
        return(this.actionMethod);
    }

    /**
     * 设置actionMethod
     */
    public void setActionMethod(String actionMethod){
        this.actionMethod = actionMethod;
    }

    /**
     * 返回enctype
     */
    public String getEnctype(){
        return(this.enctype);
    }

    /**
     * 设置enctype
     */
    public void setEnctype(String enctype){
        this.enctype = enctype;
    }

    /**
     * 返回method
     */
    public String getMethod(){
        return(this.method);
    }

    /**
     * 设置method
     */
    public void setMethod(String method){
        this.method = method;
    }

    /**
     * 返回target
     */
    public String getTarget(){
        return(this.target);
    }

    /**
     * 设置target
     */
    public void setTarget(String target){
        this.target = target;
    }

    /**
     * 开始解读<unieap:form>时触发的事件：向界面输出的内容
     *
     * @exception JspException
     */
    public int doStartTag() throws JspException{
        HttpServletResponse response = (HttpServletResponse)pageContext.getResponse();

        StringBuffer results = new StringBuffer("<form");
        results.append(" id=\"");
        results.append(Globals.FORM_NAME);
        results.append("\"");
        results.append(" name=\"");
        results.append(Globals.FORM_NAME);
        results.append("\"");
        results.append(" method=\"");
        results.append(method == null ? "POST" : method);
        results.append("\" action=\"");
        results.append(response.encodeURL(RequestUtils.getActionMappingURL(action, pageContext)));
        results.append("\"");
        results.append(" onsubmit=\"if(checkValue()){assambleXMLData(this); return true;} return false;\"");
        if(enctype != null){
            results.append(" enctype=\"");
            results.append(enctype);
            results.append("\"");
        }
        if(target != null){
            results.append(" target=\"");
            results.append(target);
            results.append("\"");
        }
        results.append(">\n");

        //为actionMethod创建一个隐藏域
        results.append("<input type=\"hidden\" id=\"method\" name=\"method\" ");
        if(actionMethod != null){
            results.append("value=\"");
            results.append(actionMethod);
            results.append("\"");
        }
        results.append("/>\n");
        //为局部刷新的forward创建一个隐藏域
        results.append("<input type=\"hidden\" id=\"".concat(SystemConfig.FORWARD_NAME_IN_PARTLY_REFRESH).concat("\" name=\"").concat(SystemConfig.FORWARD_NAME_IN_PARTLY_REFRESH).concat("\" >\n"));
        // 20110505 zhangjn for auto logging button action
        results.append("<input type=\"hidden\" id=\"CREATE_BUTTON_ID\" name=\"CREATE_BUTTON_ID\" >\n");

        //为datawindow提交提供dwName和顺序
        results.append("<input type=\"hidden\" id=\"dwNames\" name=\"dwNames\" />\n");
        ResponseUtils.write(pageContext, results.toString());

        return(EVAL_BODY_INCLUDE);
    }

    /**
     * 解读完</unieap:form>时触发的事件：向界面输出的内容
     *
     * @exception JspException
     */
    public int doEndTag() throws JspException{
        ResponseUtils.write(pageContext, "</form>");
        return(EVAL_PAGE);
    }

    /**
     * 释放资源
     */
    public void release(){
        super.release();
        action = null;
        method = null;
        target = null;
        enctype = null;
    }
}

