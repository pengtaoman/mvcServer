package com.neusoft.tdframework.common.trans;

import java.util.Properties;
import java.util.HashMap;
import java.util.Map;
import java.io.IOException;
import java.io.File;
import javax.activation.FileDataSource;
import javax.activation.DataHandler;

import javax.mail.*;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;

import com.neusoft.tdframework.common.util.FileUtil;

/**
 * Title: MailBox
 * Description: 
 * ������MAIL��. ʵ����,��MAIL. 
 * �ö����ù���MAIL Session���澲̬��Map��.
 * MAIL����Ϣ�����ļ��ķ�ʽ����. ��: <p>
 * <pre>
 * 	�����ļ�: mail/zhang.properties
 *	  	mail.transport.protocol=smtp
 *		mail.store.protocol=pop3
 *		mail.smtp.host=smtp.neusoft.com
 *		mail.pop3.host=mail.neusoft.com
 *		mail.port=25
 *		mail.from=zhang@neusoft.com
 *		mail.user=zhang
 *		mail.password=123456
 *		mail.smtp.auth=true
 *	
 *	����ֱ�ӵ��� sendMail(String mailName,String subject,String bodyInfo,String receiver)
 *	���ͼ򵥵Ĳ����������ż�.
 *	�������ö��ļ�������,mailName ������ֵΪ: mail/zhang
 *	
 *	�����Ҫ���ʹ��������ʼ�, ����Ҫ������Ա�Լ�����MimeMessage.
 *		��:
 *		import java.io.File;
 *		import javax.activation.FileDataSource;
 *		import javax.activation.DataHandler;
 *		
 *		import javax.mail.internet.MimeBodyPart;
 *		import javax.mail.internet.MimeMessage;
 *		import javax.mail.internet.MimeMultipart;
 *		//----------------------------------
 *				
 *		Session session = MailBox.getSession(mailName);
 *		
 *		MimeMessage msg = new MimeMessage(session);
 *		
 *		msg.setSubject(subject);
 *		
 *		MimeMultipart attachments = new MimeMultipart();
 *		
 *		// ����BODY������
 *		MimeBodyPart textbody = new MimeBodyPart();
 *      textbody.setContent(bodyInfo, "text/plain; charset=gb2312")      
 *      // ���츽��������
 *      MimeBodyPart filebody = new MimeBodyPart();
 *		FileDataSource fileData = new FileDataSource(file);
 *		DataHandler fileDataHandler = new DataHandler(fileData);
 *			
 *       filebody.setDataHandler(fileDataHandler);
 *       filebody.setFileName(file.getName());
 *
 *    // ��part�����BODY�͸���
 *      attachments.addBodyPart(textbody);
 *		attachments.addBodyPart(filebody);
 *		
 *		// ����MimeMessage��content.
 *		msg.setContent(attachments);
 *	// -----------------------------------------
 *	
 *	����������˵, ����ֻ��װ����ȡsubject��API.
 *	�÷���Ӧ��ͨ��MAIL���첽����.
 * </pre>
 * Company: neusoft
 * Date: 2004-10-15
 * @author liyj copy from oldframework
 * @version 1.0
 */

public class MailBox {
	// ��̬���ݴ洢��������
	private static Map mailBox = new HashMap();	
	//ǿ����ʵ��
	private MailBox(){}
	
	/**
	 * ��ȡsession
	 */
	public static Session getSession(String mailName) throws IOException{
		
		Properties mailProps = FileUtil.getProperties(mailName + ".properties");		
		Session session = (Session)mailBox.get(mailName);		
		// �����ֵ�Ļ�ֱ�ӷ���session
		if(session!=null) return session;
		// ----------------------------------------------------------------------
		
		// ���û��ֵ�Ļ�, ����Session
		String ifAuth = mailProps.getProperty("mail.smtp.auth").toLowerCase();		
		if(ifAuth==null) session = Session.getInstance(mailProps);		
		
		if(ifAuth.intern()=="true".intern()){
			String user = mailProps.getProperty("mail.user");
			String password = mailProps.getProperty("mail.password");
			session = Session.getInstance(mailProps,
			new MyAuthenticator(user,password));
		}else
			session = Session.getInstance(mailProps);
		
		mailBox.put(mailName,session);
		return session;
		
	}
	
	/**
	 * ����MAIL, �����ַ���Ϣ,��������
	 * @param mailName
	 *		mail�������ļ�����
	 * @param subject
	 *		�����ʼ�������
	 * @param bodyInfo
	 *		���͵���Ϣ�������
	 * @param receiver
	 *		������, ��:zhang@neusoft.com,li@neusoft.com,liu@neusoft.com
	 */	
	public static void sendMail(String mailName,String subject,String bodyInfo,String receiver) 
		throws Exception{
		
		Session session = getSession(mailName);		
		MimeMessage msg = new MimeMessage(session);		
		msg.setSubject(subject);		
		MimeMultipart attachments = new MimeMultipart();		
		MimeBodyPart textbody = new MimeBodyPart();
		textbody.setContent(bodyInfo, "text/plain; charset=gb2312");        
		attachments.addBodyPart(textbody);		
		msg.setContent(attachments);		
		sendMail(msg,receiver);		
	}

	/** 
	 * ���ʹ�������MAIL
	 */
	public static void sendMail(MimeMessage msg,String receiver) 
		throws Exception{		
		InternetAddress address[] = InternetAddress.parse(receiver);
		Transport.send(msg,address);		
	}
	
	/**
	 * ����MimeMessage
	 * @param mailName 
	 *		����������Ϣ�ļ���
	 * @param 
	 */
	public static MimeMessage getMessage(
			String mailName,
			String subject,
			String bodyInfo,
			String[] fileName) throws Exception{
    	
		MimeMessage msg = new MimeMessage(MailBox.getSession(mailName));		
		msg.setSubject(subject);		
		MimeMultipart attachments = new MimeMultipart();
		
		// ����BODY������
		MimeBodyPart textbody = new MimeBodyPart();
		textbody.setContent(bodyInfo, "text/plain; charset=gb2312");
        
		// ��part�����BODY
		attachments.addBodyPart(textbody);
        
		// ��Ӹ���������
		if(fileName!=null)
		for(int i=0;i<fileName.length;i++){
			MimeBodyPart filebody = new MimeBodyPart();
			File file = new File(fileName[i]);
			FileDataSource fileData = new FileDataSource(file);
			DataHandler fileDataHandler = new DataHandler(fileData);
				
			filebody.setDataHandler(fileDataHandler);
			filebody.setFileName(file.getName());
			
			attachments.addBodyPart(filebody);
		}
		
		// ����MimeMessage��content.
		msg.setContent(attachments);    	
		return msg;    	
	}	
	
	/**
	 * ���շ���, �õ���MAIL�����Ⲣɾ���ʼ�.
	 * @param mailName
	 *		�ʼ����õ���Դ����
	 */
	public static String receiveMail(String mailName) throws Exception{
		Session session = getSession(mailName);
		
		// �õ�Store����
		Store store = session.getStore();
		store.connect();
    	
		// �õ�Folder����
		Folder inbox = store.getDefaultFolder().getFolder("INBOX");
		inbox.open(Folder.READ_WRITE);
    	
		// ��ȡ��Ϣ����
		String subject = null;
		String from = null;    	
    	
		if(inbox.getMessageCount() > 0){
			Message message = inbox.getMessage(1);
			
			// ɾ����Ϣ���ʼ�
			message.setFlag(Flags.Flag.DELETED,true);			
			subject = message.getSubject();			
			Address[] addresses = message.getFrom();			
		} 
		
		// ǿ�ƹر�����,�ʼ���ɾ��
		inbox.close(true);
		store.close();
	    
		return subject;
	}
	
	public static void main(String args[]){
		try{
			/**
			String files[] = new String[2];
			files[0] = "d:\\devlop\\test\\FtpClient.java";
			files[1] = "d:\\devlop\\test\\JdbcTest.java";
			
			MimeMessage msg = MailBox.getMessage("mail_chenzt",
				"subject_info",
				"body information",
				files);
			
			sendMail(msg,"yz_dailybuild@td.neusoft.com");
			*/
			System.out.println(receiveMail("mail_chenzt"));
		}catch(Exception e){
			e.printStackTrace();
		}
	}	
}

/**
 * ��֤����
 */
class MyAuthenticator extends Authenticator{
	private String user;
	private String password;	
	
	MyAuthenticator(String user,String password){
		this.user = user;
		this.password = password;
	}
	
	public PasswordAuthentication getPasswordAuthentication(){
		return new PasswordAuthentication(user,password);
	}
}
