import '../css/goodsCover.less';
import $ from 'jquery';
var state = {
    num:1,
    choice:false
}

function bindEvent(){
    $('.buy_spect_wrap ul').on('click','.buy_spect_li',function(){
        state.choice = true;
        $('.buy_spect_li').removeClass('active');
        $(this).addClass('active');
        $('.price_value').html($(this).attr('data-price'));
        state.num = 1;
        $('.buy_number_value').html(state.num);
    })
    $('.buy_number_decrease').click(function(){
        if(state.num >1){
            $('.buy_number_value').html(--state.num);
        }
    })
    $('.buy_number_add').click(function(){
            $('.buy_number_value').html(++state.num);
    })
    $('.buy_ok').click(function(){
        if(state.choice){
            alert('提交成功')
            // window.open()
        }else{
            alert('请选择规格')
        }
    })
}

bindEvent();