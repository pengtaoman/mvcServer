package com.neusoft.uniflow.web.common.custom.forms;


import java.util.ArrayList;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.util.LabelValueBean;

public class CustomForm
    extends ActionForm {

  private static final long serialVersionUID = 123456711;
  private ArrayList elements = new ArrayList();
  private String[] selectedItems = {};
  private String elementLabel = "";
  private String elementsName = "";
  private String extendWINo = "";
  private String extendPINo = "";
  private String extendType = "";
  private String category = "";

  public static long getSerialVersionUID() {
	return serialVersionUID;
}

public String getCategory() {
	return category;
}

public void setCategory(String category) {
	this.category = category;
}

public String[] getSelectedItems() {
    return this.selectedItems;
  }

  public void setSelectedItems(String[] selectedItems) {
    this.selectedItems = selectedItems;
  }

  public ArrayList getElements() {
    return this.elements;
  }

  public void setElements(ArrayList elements) {
    this.elements = elements;
  }

  public String getElementsName() {
    return this.elementsName;
  }

  public void setElementsName(String elementsName) {
    this.elementsName = elementsName;
  }

  public void reset(ActionMapping mapping,
                    javax.servlet.http.HttpServletRequest request) {
    if (elements != null) {
      for (int i = 0; i < elements.size(); i++) {
        ( (LabelValueBean) elements.get(i)).setValue("0");
      }
    }
    this.elementsName = "";
  }

public String getElementLabel() {
	return elementLabel;
}

public void setElementLabel(String elementLabel) {
	this.elementLabel = elementLabel;
}

public String getExtendPINo() {
	return extendPINo;
}

public void setExtendPINo(String extendPINo) {
	this.extendPINo = extendPINo;
}

public String getExtendWINo() {
	return extendWINo;
}

public void setExtendWINo(String extendWINo) {
	this.extendWINo = extendWINo;
}

public String getExtendType() {
	return extendType;
}

public void setExtendType(String extendType) {
	this.extendType = extendType;
}


}