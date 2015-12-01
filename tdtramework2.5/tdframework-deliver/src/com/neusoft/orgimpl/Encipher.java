package com.neusoft.orgimpl;

import java.lang.Math;

class Encipher
{
    private final static String m_strKey1 = "zxcvbnm,./asdfg";
    private final static String m_strKeya = "cjk;";
    private final static String m_strKey2 = "hjkl;'qwertyuiop";
    private final static String m_strKeyb = "cai2";
    private final static String m_strKey3 = "[]\\1234567890-";
    private final static String m_strKeyc = "%^@#";
    private final static String m_strKey4 = "=` ZXCVBNM<>?:LKJ";
    private final static String m_strKeyd = "*(N";
    private final static String m_strKey5 = "HGFDSAQWERTYUI";
    private final static String m_strKeye = "%^HJ";
    private final static String m_strKey6 = "OP{}|+_)(*&^%$#@!~";
    //adfasdfasd=========================
    protected static String EncodePasswd(String strPasswd)
    {
        String strEncodePasswd = new String("");
        int i;
        int n;
        char code;
        String des = new String ();
        String strKey = new String ();
        if ((strPasswd == null)| strPasswd.length () == 0 )
        {
            strEncodePasswd = "";
            return strEncodePasswd;
        }

        strKey = m_strKey1 + m_strKey2 + m_strKey3 + m_strKey4 + m_strKey5 + m_strKey6;

        while (strPasswd.length () < 8)
        {
            strPasswd = strPasswd + (char)1;
        }

        des = "";

        for (n = 0;n<=strPasswd.length ()-1;n++)
        {
            while(true)
            {
                code = (char)Math.rint(Math.random () * 100);
                while ( (code > 0) &&(((code ^ strPasswd.charAt (n) )< 0 )||((code ^ strPasswd.charAt (n) )> 90)))
                {
                    code = (char)((int)code - 1);
                }
                char mid = 0;
                int flag;
                flag = code ^ strPasswd.charAt (n);

                if (flag>93)
                {
                    mid =0;
                }
                else
                {
                    mid = strKey.charAt (flag); //Asc(Mid(strKey, (code Xor Asc(Mid(strPasswd, n, 1))) + 1, 1))
                }

                if(( code > 35)&(code < 122)&(code !=124)&(code != 39)&(code !=44)&	(mid != 124)&(mid != 39)&(mid != 44))
                {
                    break;
                }

                //ȷ����ɵ��ַ��ǿɼ��ַ�����SQL�������Ч
            }

            char temp = 0;
            temp = strKey.charAt (code ^ strPasswd.charAt (n));
            des = des + (char)code + temp;

        }

        strEncodePasswd = des;
        return strEncodePasswd;
    }

    protected static String DecodePasswd(String varCode)
    {
        int n ;
        String des = new String();
        String strKey =new String();

        if((varCode == null)||(varCode.length ()== 0 ))
        {
            return "";
        }

        strKey = m_strKey1 + m_strKey2 + m_strKey3 + m_strKey4 + m_strKey5 + m_strKey6;

        if(varCode.length() % 2 == 1 )
        {
            varCode = varCode + "?";
        }

        des = "";
        for (n = 0; n<= varCode.length()/2 - 1;n++)
        {
            char  b;
            b = varCode.charAt (n*2);
            int a;
            a = (int)strKey.indexOf (varCode.charAt(n*2+1));
            des = des +(char)((int)b ^ a);
        }

        n = des.indexOf (1);
        if (n > 0)
        {
            return des.substring(0,n);
        }
        else
        {
            return des;
        }

    }
}