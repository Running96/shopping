import '../css/goodsInfo.less';
import $ from 'jquery';
import './goodsCover.js';


function getId() {
    var optionList = location.search.slice(1).split('&');
    var idNum;
    optionList.forEach(function (ele, index) {
        if (ele.indexOf('id=') != -1) {
            idNum = ele.slice(3);
        }
    })
    return idNum;
}

console.log(getId());
// 通过ID值取到当前ID数据

getGoodList();
function getGoodList() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/goodsList.json',
        success: function (data) {
            createInfo(data);
            // console.log(data);
        },
        error: function () {
            console.log('error');
        }
    })
}
function createInfo(data) {
    var idNum = getId();
    var dataList = data.list;
    var len = dataList.length;
    var listStr = '';
    var liStr = '';
    for (var i = 0; i < len; i++) {
        if (dataList[i].id == idNum) {
            $('.infor_one_img').html('<img src="' + dataList[i].imgurl[0] + '">');
            $('.one_name').html(dataList[i].name);
            dataList[i].spectList.sort(findPrice('price'));
            $('.one_price').html('￥' + dataList[i].spectList[0].price + '-' + dataList[i].spectList[dataList[i].spectList.length - 1].price);
            dataList[i].imgurl.forEach(function (ele, index) {
                listStr += '<img src="' + ele + '">'
            })
            $('.infor_th').append($(listStr));
            dataList[i].spectList.forEach(function (ele, index) {
                liStr = '<li class="buy_spect_li" data-price="' + ele.price + '">' + ele.spect + '</li>'
            })
            $('.buy_spect_wrap ul').html(liStr);
            $('.price_value').html($('.one_price').html());

        }
    }
}

function findPrice(price) {
    return function (a, b) {
        return a[price] - b[price];
    }
}

//点击出现/消失规格信息
function bindEvent(){
    $('.infor_two').on('click',function(){
        $('.buy_wrap').css('display','block');
        $('html').add($('body').css({'height':'100%','overflow':'hidden'}))
    })
    $('.buy_gray').click(function(){
        $('.buy_wrap').css('display','none');
        $('html').add($('body').css({'height':'auto','overflow':'visible'}))
    })
}
bindEvent();