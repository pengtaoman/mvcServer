var key = "߹���������˒�������鱼�Ȱn���������h�m��Ʋβ֓كԍ������{���������p�Գ����u�݄V���I���ڴӴմ�����ڴ�ߗ������������z�g�Ɓ��ǔ�������G���ʄ��Z���ֶ����C�E�������ηɷַ�҅������긁�ɸԸ޸�������������ϹԹع��ح�Êo���˺�ƒڭ�\�����Y���J���������x�һ腿آ��ꧽ�ܴ�׽�i��L�H���پ��ǿ�������\�G���ՏW�H������������������������ܨ�o�����|�G�օ����￩��¦��¿�������ۇ`����򩠯è�ۅЗȒ��_���ؿ����������ĳĸ���G����ث�ڊ���ǂ����������À���ũ��ūŮű�f���ފr�ıe���������اƬ����ƹ����������ǧǺ�������i�^�����ZȲ�恒�߷y�����������օ��]��M���횺������ɫɱɸɽ�ˏ�������ʬ����ˢ˥��˫˭���������⡉���������̮������Ć������G����͵͹������ر����^��Σ�e������Ϧ�����瞼Щ���������煺�T�_Ѿ�����ۂ�Čһ�]ӦӴӶ�ŒG��Ի�C���ă�����������߸��մ�Ł�����J֮������ץקרױ���d׿�ЌI�����℮������".split("");
var pinyin = "AAiAnAngAoBaBaiBanBangBaoBeiBenBengBiBianBiaoBieBinBingBoBuCaCaiCanCangCaoCeCenCengChaChaiChanChangChaoCheChenChengChiChongChouChuChuaiChuanChuangChuiChunChuoCiCongCouCuCuanChuanCuanCuiCunCuoDaDaiDanDangDaoDeDenDengDiDiaDianDiaoDieDingDiuDongDouDuDuanDuiDunDuoEEnEngErFaFanFangFeiFenFengFiaoFoFouFuGaGaiGanGangGaoGeGeiGenGengGongGouGuGuaGuaiGuanGuangGuiGunGuoHaHaiHanHangHaoHeHeiHenHengHoHongHouHuHuaHuaiHuanHuangHuiHunHuoJiJiaJianJiangJiaoJieJinJingJiongJiuJuJuanJueJunKaKaiKanKangKaoKeKenKengKongKouKuKuaKuaiKuanKuangKuiKunKuoLaLaiLanLangLaoLeLeiLengLiLiaLianLiangLiaoLieLinLingLiuLoLongLouLuLvLuanLveLunLuoMMaMaiManMangMaoMeMeiMenMengMiMianMiaoMieMinMingMiuMoMouMeiMuNaNaiNanNangNaoNeNeiNenNNiNianNiangNiaoNieNinNingNiuNongNouNuNvNveNuanNuoOuPaPaiPanPangPaoPeiPenPengPiPianPiaoPiePinPingPoPouPuQiQiaQianQiangQiaoQieQinQingQiongQiuQuQuanQueQunRaRanRangRaoReRenRengRiRongRouRuRuanRuiRunRuoSaSaiSanSangSaoSeShaShaiShanShangShaoSheShenShengShiShouShuShuaShuaiShuanShuangShuiShuoSiSongSouSuSuanSuiSunSuoTaTaiTanTangTaoTeTengTiTianTiaoTieTingTongTouTuTuanTuiTunTuoWaWaiWanWangWeiWenWengWoWuXiXiaXianXiangXiaoXieXinXingXiongXiuXuXuanXueXunYaYanYangYaoYeYenYiYinYingYoYongYouYuYuanYueYunZaZaiZanZangZaoZeZeiZenZengZhaZhaiZhanZhangZhaoZheZhenZhengZhiZhongZhouZhuZhuaZhuaiZhuanZhuangZhuiZhunZhuoZaiZiZongZouZuZuanZuiZunZuo".split(/(?=[A-Z])/g);
 
var cache = {};
var arrTree = [];
 
/*
 * ����: Cn2PinYin(w)
 * ע��: wΪ��ת����ƴ���ĺ���
 */
var Cn2PinYin;
 
/*
 * ����һ��������֧�Ķ�����
 */
function walk(a,b)
{
	var c = Math.floor((a+b) / 2);
 
	if(c==b && b<a)						//�ڵ�
	{
		arrTree.push("r='", pinyin[c], "';");
		return;
	}
 
	arrTree.push(						//���֧
		"if(w.localeCompare('", key[c], "')<0)");
	walk(a, c-1);
 
	arrTree.push("else ");				//�ҷ�֧
	walk(c+1, b);
}
 
 
/*
 * ��ʼ��Cn2PinYin����
 *    ����ת�����ĺ��������洦��
 */
function init()
{
	arrTree.push("var r=cache[w];if(r)return r;");		//��黺��
	walk(0, key.length-1);								//-�ݹ�����Դ��
	arrTree.push("return cache[w]=r;");					//-д�뻺��
 
	Cn2PinYin = new Function("w", arrTree.join(""));	//����
}
 
init();
 
/*
 * �����������ת�������Ǻ�������
 */
function spell(content)
{
	var fn = Cn2PinYin;
	var arr = [];
	var ch;
 
	for(var i=0,n=content.length; i<n; i++)
	{
		ch = content.charAt(i);
		arr[i] = (ch<"һ" || ch>"��")?			//�Ǻ��֣�
						   ch:fn(ch);			//������ת��
	}
 
	return arr.join("");
}
 
 
/*
 * ����
 */
var $=function(v){return document.getElementById(v)};