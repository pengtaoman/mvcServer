BusCard.define('/buscardapp/rela/js/card_132_100151.js',function(_buscard,cardParam){ 
var Me = this;
var cardInstance = this;

Me.setDisabled=function(arg,info){
	if(arg){
		arg.disabled=info;
	}
};



Me.setDisabled($("100634"),true);
Me.setDisabled($("100633"),true);
Me.setDisabled($("100629"),true);
Me.setDisabled($("100630"),true);
Me.setDisabled($("100631"),true);

//��һվʽ���𡱵����ԣ�����������ѡ��ֵΪ"ʡ�ڿ籾����"ʱ��ҳ�桰����ʡ�ݡ���������С�����ˮ�š��ûҲ����޸ġ�
 if($("100625")){
	 $("100625").onchange=function(){
			 if($("100625").value==4){
			   Me.setDisabled($("100629"),true);
               Me.setDisabled($("100630"),true);
               Me.setDisabled($("100631"),true);
			  }else{
			   Me.setDisabled($("100629"),false);
               Me.setDisabled($("100630"),false);
               Me.setDisabled($("100631"),false);
			  }
	  }
	}
 //���շѵء������ԣ�����������ѡ��ֵΪ"�������շ�"ʱ��ҳ�桰�տ�ʡ�ݡ����տλ�����޸ģ����򲻿��޸ġ�
  if($("100628")){
	  $("100628").onchange=function(){
			 if($("100628").value!=3){
			 	  Me.setDisabled($("100634"),true);
                  Me.setDisabled($("100633"),true);
			  }else{
			      Me.setDisabled($("100634"),false);
                  Me.setDisabled($("100633"),false);
			  }
	    }
   }
  


});
