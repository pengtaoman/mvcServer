package com.neusoft.uniflow.web.common.filter;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;


public class SessionListener implements HttpSessionListener
{
  private static int onlineUser = 0;

  public void sessionCreated(HttpSessionEvent event)
  {
    onlineUser++;
  }

  public void sessionDestroyed(HttpSessionEvent event)
  {
    if(onlineUser>0)
      onlineUser--;
  }

  public static int getOnlineUser()
  {
    return onlineUser;
  }
}