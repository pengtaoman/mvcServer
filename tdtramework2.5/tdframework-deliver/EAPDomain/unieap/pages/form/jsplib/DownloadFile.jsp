<%@page language="java" contentType="application/x-msdownload" import="java.io.*,java.net.*" pageEncoding="gb2312"%>
<%
    response.reset();
    response.setContentType("application/x-download");
    String filenamedownload = application.getRealPath("/")+"/unieap/pages/form/jatoolsP.exe";
    String filenamedisplay = "jatoolsP.exe";
    filenamedisplay = URLEncoder.encode(filenamedisplay,"UTF-8");
    response.addHeader("Content-Disposition","attachment;filename=" + filenamedisplay);

    OutputStream output = null;
    FileInputStream fis = null;
    try
    {
        output  = response.getOutputStream();
        fis = new FileInputStream(filenamedownload);

        byte[] b = new byte[1024];
        int i = 0;

        while((i = fis.read(b)) > 0)
        {
            output.write(b, 0, i);
        }
        output.flush();
    }
    catch(Exception e)
    {
        System.out.println("Error!");
        e.printStackTrace();
    }
    finally
    {
        if(fis != null)
        {
            fis.close();
            fis = null;
        }
        if(output != null)
        {
            output.close();
            output = null;
        }
    }
%>