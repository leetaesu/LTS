setInterval(() => {
    motionStart();    
}, 7000);
    motionStart();    
function motionStart(){
    console.log('sss')
    $('.number_ul').removeClass('rolling');
    $('.money_motion').removeClass('rolling');
    $('.number_ul li span').removeClass('on');
    $('.money_motion li span').removeClass('on');
    $('.percentData').text('?');
    $('.moneyData').text('?');
    setTimeout(() => {
        $('.number_ul').addClass('rolling');
        $('.number_ul li span').addClass('on');
    }, 1500);
    setTimeout(() => {
        $('.money_motion').eq(0).addClass('rolling');
        $('.money_motion').eq(0).find('span').addClass('on');
    }, 1500);
    setTimeout(() => {
        $('.money_motion').eq(1).addClass('rolling');
        $('.money_motion').eq(1).find('span').addClass('on');
    }, 2000);
    setTimeout(() => {
        $('.money_motion').eq(2).addClass('rolling');
        $('.money_motion').eq(2).find('span').addClass('on');
    }, 2500);
    setTimeout(() => {
        $('.money_motion').eq(3).addClass('rolling');
        $('.money_motion').eq(3).find('span').addClass('on');
    }, 3000);
    setTimeout(() => {
        $('.money_motion').eq(4).addClass('rolling');
        $('.money_motion').eq(4).find('span').addClass('on');
    }, 3500);

    setTimeout(() => {
        $('.percentData').text('7')
    }, 2000);
    setTimeout(() => {
        $('.money_motion').eq(0).find('.moneyData').text('1');
    }, 2000);
    setTimeout(() => {
        $('.money_motion').eq(1).find('.moneyData').text('5');
    }, 2500);
    setTimeout(() => {
        $('.money_motion').eq(2).find('.moneyData').text('2');
    }, 3000);
    setTimeout(() => {
        $('.money_motion').eq(3).find('.moneyData').text('8');
    }, 3500);
    setTimeout(() => {
        $('.money_motion').eq(4).find('.moneyData').text('3');
    }, 4000);

}

// camera interaction
cameraMotion();
setInterval(() => {
    cameraMotion();
}, 5500);
function cameraMotion(){
    setTimeout(() => {
        $('.camera_motion .ic_star_2').addClass('active');
    }, 1000);
    setTimeout(() => {
        $('.camera_motion .ic_border').show();
        $('.camera_motion .ic_border').addClass('active');
    }, 2500);
    setTimeout(() => {
        $('.camera_motion .ic_certify').show();
        $('.camera_motion .ic_certify').addClass('active');
    }, 2500);
    setTimeout(() => {
        $('.camera_motion .ic_certify').hide();
    }, 4500);
}

// 그래프 이벤트
graphStart();
setInterval(() => {
    graphStart();
}, 5000);
function graphStart(){

    var bull = $('.bull_sec'),
    bear = $('.bear_sec'),
    bullVal = $('.bull_val'),
    bearVal = $('.bear_val'),
    bullRanDom = Math.random()*(100-(-100))+(-100), // 난수 -100 ~ 100
    bearRanDom = Math.random()*(100-(-100))+(-100), // 난수 -100 ~ 100
    denominator = 0,
    bullSum = 0,
    bearSum = 0;    
    bull.css({'width': '0%',});
    bear.css({'width': '0%',});
    bull.removeClass('on');
    bullVal.text(0);
    bearVal.text(0);    
    if(bullRanDom > 0 && bearRanDom > 0){
        denominator = Math.abs(bullRanDom)+ Math.abs(bearRanDom);    // 분모 만들기            
        bullSum = (bullRanDom / denominator) * 100; // 분자(bull) 분모 계산
        bearSum = (bearRanDom / denominator) * 100; // 분자(bear) 분모 계산
    }else if(bullRanDom < 0 && bearRanDom < 0){
        denominator = Math.abs(bullRanDom)+ Math.abs(bearRanDom);
        bearSum = Math.abs((bullRanDom / -denominator) * 100);
        bullSum = Math.abs((bearRanDom / -denominator) * 100);

    }else if(bullRanDom < 0 && bearRanDom > 0){
        denominator = Math.abs(bullRanDom+100) + Math.abs(bearRanDom+100);    // 100을더함
        bullSum = ((bullRanDom+100) / denominator) * 100;
        bearSum = ((bearRanDom+100) / denominator) * 100;
    }else if(bullRanDom > 0 && bearRanDom < 0){
        denominator = Math.abs(bullRanDom+100) + Math.abs(bearRanDom+100);
        bullSum = ((bullRanDom+100) / denominator) * 100;
        bearSum = ((bearRanDom+100) / denominator) * 100;
    }else{
        bullSum = 50;
        bearSum = 50;
    }
    bull.animate({'width': Math.round(bullSum)+'%',},1500);
    bear.animate({'width': Math.round(bearSum)+'%',},1500);
    setTimeout(() => {
        bull.addClass('on');
    }, 1500);
    bullVal.text(bullRanDom.toFixed(2));
    bearVal.text(bearRanDom.toFixed(2));
}

//스와이프

