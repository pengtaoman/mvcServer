˵�����ܽἰע�����

1.xmlӳ���ļ��������ռ����ȷ��Ψһ�ԣ�<mapper namespace="Ibatis3Users"></mapper>

2.������xmlӳ���ļ���idȡֵ���뱣��Ψһ�ԣ��������Ψһ���ڵ���ʱ������������ռ䣺
<select id="selectByLikeCount"  parameterType="ibatis3users" resultType="int"></select>
����������idȡֵ�������ڴ����е���ʱ����룺
List rList = super.baseService.queryByStatement("OrdersRefGoods.selectAllOrders", org);
List rList = super.baseService.queryByStatement("Ibatis3Orders.selectAllOrders", orders);

3.��һ�Զ������ϵ�У�
<collection property="ibatis3OrdersList" column="userId=userId" select="Ibatis3Orders.selectByProperties" />
��������selectȡֵ�����������ռ俪ͷ

4.��iBatis����Hibernateһ����ͬ������N+1���⣬�������������

5.������ϵ��Ŀǰֻ��select������������insert��delete��update�����ɳ���Աά��

6.CodeGen��generator.properties�ļ����jdbc.schema����Oracle���ݲ���Ϊ�գ�ȡֵΪ��¼���ݿ�Ĵ�д�˺�

7.�򹤾��Ǹ��ݱ�ṹģ��������Ӧ���룬�ʽ���ʱÿ�ű������Ψһ������ʶ������������Ϊvarchar2(32)����ܻ�ģ��Hibernate˼��Ϊ��������32λ����ַ���

8.������iBatis3����һ��map���ݼ�ʱ��keyֵ���뱣�������ݿ��ֶ�һ�£�Oracle���ݿ����ִ�Сд

9.ע��ģ���д������ɸ�ʽ��
<result property="memo" column="memo" javaType="java.lang.String" jdbcType="VARCHAR" />
javaType�������������ȫ·����jdbcType��������ݿ��ж�Ӧ�ֶ�������һ�£��������������ִ�Сд��Oracle������������Ĭ�Ͼ�Ϊ��д

10.ͨ��CodeGen���������ɵĴ��������޸ģ���������ѭOCԭ�򣬳���Ա���������������ɵ�xml�ļ��·���д�Լ���ҵ�����

11.ʵ�ֻ���SOA��OSGI�ܹ�˼����ƣ���������component��plugin��ʽ���

12.�𽥷���spring����������guice�����û��������bean xml�Ľ�����ʱ

13.�����guice������aop����ȫ�������ȷ�������

14.����ibatis2��ibatis3������ibatis����Ҫѷɫ�ڴ�jdbc���������Ե�������mapping xml�����ȽϺ�ʱ

15.������ȷ�װ�͹�����ƣ����С��ټ̳С��������������á�ԭ����java���������ջ��Ƽ�java�ķ�����Ƶ������Ч��

16.���Ǹ߶Ƚ��Ϊcomponent��plugin��ʽ����ṩǰ���Ҫ����

17.�����¼�������ķ����������ܣ�ͬʱҪ�����¼�������ı�Ҫ��

18.�����в��ײ��ù����ע�ⷽʽ��̣�����ע����˼����������java�ķ������ʵ�֣�ִ��Ч���д���������ע�ⷽʽ�ɶ��Բ�ǿ

19.����ע�͵����ף�ע�Ͳ��׹��࣬����д���붼�費�ϵ��ع�����������д��ע��δ��ʱ�������ʧȥ�������������������󵼺�����

20.ibatis2��ibaits3����
  a.ibaits3֧�ַ��������ӽӿڰ����ԣ�ibatis2����ǿת���ṩȫ��ע�ⷽʽ��
  b.ibaits3 xml��ǩ��ʽ�����仯��ģ����JSTL�ı�ǩд����
  c.���ڵ��� <sqlMap>  ����Ϊ <mapper>��
  d.���� parameterClass �������Ϊ parameterType��
  e.���� resultClass �������Ϊ resultType�� 
  f.���� class �������Ϊ type�� 
  g."groupBy" �����Ѿ�ɾ����
  h.Dynamic SQL �����仯��<if test="$1 != null" �û���isNotNull��
  
21.���о�iBaits3�����ݻ�����ơ��ӿڰ󶨻���

22.Guice���ܣ���������������ԭ��֮һ��ʹ���� ConcurrentHashMap��ԭ���� Collections.synchronized(new HashMap()) ����ͬ����������ƿ��
�ο�վ�㣺http://www.jroller.com/Solomon/entry/spring_2_5_perfomance_improvements
          http://code.google.com/p/google-guice/
          
23.����iBatis2�Եײ������з�װ���ṩ�������ӡ�ɾ�����޸Ĺ��ܣ�����������Ч�ʣ��ڱ���һ���Դ���4000���Ҷ���������ֻ��Ҫ��ʱ4������

24.�ṩ����Map�������ͽӿ�

25.�ڵײ��insert��update��deleteʵ�ְ��Զ���������ϵ����������ģ����Hibernate�����˼�룬�ṩ����Լ����������֧�֣���������ϵ�ڽ���ʱ���ܱ�����

26.�ṩ�����������ӡ����¡�ɾ����������

27.��iBatis2���е����Զ���ű�ʱ�������namespace���磺OrdersRefGoods.selectRefAllGoods

28.������TDFramework��batchSave��batchUpdate��batchRemove��������ʱ�����ڹ�����ϵ�ı��ܽ�����Ӧ�Ĺ�����ϵ�����򣬼�������ɾ���ġ�������

29.��iBatis2��insert��update��delete��select���������漰�����ֶα�����������ͣ��磺������#OrderId:VARCHAR#

30.�ṩ������֧�֣�ʵ�ֶ�̬����Bean����̬�л�����Դ����̬�л������������

31.�޸�����DAOģ�壺���saveOrUpdate�������������ɷ�ʽ��¶��ҵ����ҵ������д���

32.����CodeGen�������ɹ��ߣ���ơ�����UI���������������UI��ʽ

33.�޸�����ģ�壺��ģ����Ϊ���ɵĴ����Զ����ע��

34.����JDBCģ�壺Ϊ��ҳ��ѯ����ҳͳ�Ʒ����Զ�����AND����������nullֵ�ж�

35.�޸�JDBCģ��bug���޸�doBatchUpdateģ�巽��������������������forѭ�����У��sqlռλ����������forѭ������vo������˳��һ��


����

1.�޸�CodeGen���ߵ�ģ�壺����javaType��jdbcType�ֶε�������������������������������͵Ĵ��������ֶ�Ĭ��ֵ�����ȵ���������

2.�޸�CodeGen���ߵ�ģ�壺���в�ѯ������HashMap�����

3.�ڵײ�������չ������������ΪMap���ϵĽӿڣ����ֱ�������ʵ��

4.����Hibernate˼�룬ʵ��iBatis3��insert\delete\update\select�ļ�������

5.�ṩ�ӿڽ���ǰ̨��������pojo������iBatis3��xmlӳ���ļ����а󶨣�ͨ�����䷽ʽ��ȡ��javaType��jdbcType�������ͣ����ֶ�ֵ

6.ͨ�ýӿڳ�ȡ������¶�ӿڱ��ִ����ȣ������������������ܼ���������

7.������TDFramework�������Ŀ�ܴ�����г�ȡ�������һ������ΪIbaGuiceFramework�����Ĺ��̣������TDFramework�Ӵ���������

8.ʵ��ʵ��ӿ���xmlӳ���ļ������ݰ󶨣�������ʵ��ӿ�����ģ�壨ʵ��ӿ�����������xml�ļ�������һ�£�

9.�ṩͳһ��log�������쳣��sql�ű�����̨��ӡ�����֧��

10.����Guice��Spring���ṩ��AOP����

11.�ṩ����������֧��

12.�ṩ������Դ��������Դ����֧��

13.�ṩ�洢����֧��

14.�ṩ�û��ֲ�

15.�����Spring������������ʵ��������Խ���Guice������̬�йܣ�ͨ���ӿڰ󶨷�ʽʵ�֣�

16.�쳣����
dao: try..catch..����SQLException����service�׳�DataAccessException����ʱ�쳣
service: try..catch..����DataAccessException����action�׳�ServiceException�쳣
action: try..catch..����ServiceException�������׳�Exception�쳣
����AOP��ȡ���쳣����������ȫ·�������쳣�ķ��������쳣���͡��쳣���������쳣�־û�(�����Ϊ�����ļ�)

17.��xmlӳ���ļ���ʵ�֡�һ�Զࡱ�������һ��������Զࡱ�Ĺ�����ϵӳ�����

18.����iBatis2��������ģ�壬�ṩ����action��service��dao��pojo�ȶ�������ģ��

19.Batch������������bug��ƴsqlʱ������ġ�����ռλ�������󶨵�vo����ֵ����һһ��Ӧ����forѭ����ռλ�������������󶨵�vo����ֵҲ����һһ��Ӧ��
Ŀǰ�����ɵĴ��ڸ����⣬����취����forѭ���н����ɵ������ƶ���forѭ�����λ�ü���




 