package com.neusoft.uniflow.web.standard.procdefmgt.creatandstart.beans;


public class RDBean {

  private String name = "";
  private int type;
  private String rd_value = "";

  public RDBean() {
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getType() {
    return type;
  }

  public void setType(int type) {
    this.type = type;
  }

  public String getRd_value() {
    return rd_value;
  }

  public void setRd_value(String rd_value) {
    this.rd_value = rd_value;
  }

}