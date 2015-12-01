package com.neusoft.uniflow.web.management.organization.actions;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.util.LabelValueBean;

import com.neusoft.uniflow.web.management.organization.forms.PersonForm;
import com.neusoft.uniflow.web.util.MessageUtil;

public class SetuserAction
    extends Action {
  public ActionForward execute(ActionMapping mapping,
                               ActionForm form,
                               HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
    PersonForm personForm = (PersonForm) form;

    String page = personForm.getPage();
    if (page != null && page.equals("basattrib")) {
      return mapping.findForward("basattrib");
    }
    else if (page.equals("othattrib")) {
      ArrayList sexinfo = new ArrayList();
      sexinfo.add(new LabelValueBean(MessageUtil.getString("workflow.org.user.sex.male",request.getSession()),"0"));
      sexinfo.add(new LabelValueBean(MessageUtil.getString("workflow.org.user.sex.female",request.getSession()),"1"));
      request.setAttribute("sexinfo",sexinfo);
      return mapping.findForward("othattrib");
    }
    else if (page.equals("resvattrib")) {
      return mapping.findForward("resvattrib");
    }

    return mapping.findForward("basattrib");
  }
}