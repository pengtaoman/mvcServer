package com.neusoft.uniflow.web.monitor.procdef.beans;


public class WorkItemBean {
	String id;
	String name;
	String actname;
	String curstate;
	String createtime;
	String completetime;
	String username;
			
	/**
	 * @return Returns the actname.
	 */
	public String getActname() {
		return actname;
	}
	/**
	 * @param actname The actname to set.
	 */
	public void setActname(String actname) {
		this.actname = actname;
	}

	/**
	 * @return Returns the curstate.
	 */
	public String getCurstate() {
		return curstate;
	}
	/**
	 * @param curstate The curstate to set.
	 */
	public void setCurstate(String curstate) {
		this.curstate = curstate;
	}
	/**
	 * @return Returns the id.
	 */
	public String getId() {
		return id;
	}
	/**
	 * @param id The id to set.
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * @return Returns the name.
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name The name to set.
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return Returns the username.
	 */
	public String getUsername() {
		return username;
	}
	/**
	 * @param username The username to set.
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return Returns the completetime.
	 */
	public String getCompletetime() {
		return completetime;
	}
	/**
	 * @param completetime The completetime to set.
	 */
	public void setCompletetime(String completetime) {
		this.completetime = completetime;
	}
	/**
	 * @return Returns the createtime.
	 */
	public String getCreatetime() {
		return createtime;
	}
	/**
	 * @param createtime The createtime to set.
	 */
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
}