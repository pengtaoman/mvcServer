package com.neusoft.uniflow.web.webdesign.data.beans;

import org.apache.struts.action.ActionForm;

import com.neusoft.workflow.globaldatamodel.GlobalDatasDocument;

public class GlobalDataReadForm extends ActionForm {
    private GlobalDatasDocument datas = null;

	public GlobalDatasDocument getDatas() {
		return datas;
	}

	public void setDatas(GlobalDatasDocument datas) {
		this.datas = datas;
	}
}
