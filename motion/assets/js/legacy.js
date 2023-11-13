// rem 수치 변환
const windowSize = $(window).innerWidth(),
baseSize = 640;
if(windowSize < baseSize){
  $(document).find('html').animate({fontSize:($(window).innerWidth())*10/36},0)
}else{
  $(document).find('html').animate({fontSize:baseSize*10/36},0)
}
// rem resize 수치 변환
$(window).on('resize',function(){
  if($(window).innerWidth() < baseSize){
    $(document).find('html').animate({fontSize:($(window).innerWidth())*10/36},0)
  }else{
    $(document).find('html').animate({fontSize:baseSize*10/36},0)
  }
});


$('.thema_infor li').on('click',function(){
  let idx = $('.thema_infor li').index(this);
  $('body').removeClass();
  $('.thema_infor li').removeClass('active');
  switch (idx) {
    case 0:
      $('body').addClass('light');
      break;
    case 1:
      $('body').addClass('mint');
      break;
    case 2:
      $('body').addClass('classic');
      break;
    case 3:
      $('body').addClass('dark');
      break;
    default:
      break;
  }
  $('.thema_infor li').eq(idx).addClass('active');
})

// 팝업 모듈
// onclick="popup.open('레이어명')" 팝업 오픈
// onclick="popup.close('레이어명')" 팝업 닫힘
// open 되면 active 클래스 추가
const popup = (function(){
  let dim = $('.dim'),
  ico_close = $('.popup .pop-header .btn_close');
  function popupOpen(el){
      el.removeClass('none');
      setTimeout(function () {
        el.addClass("active");
      }, 10);
      dim.show();
  }
  function popupClose(el){
      el.removeClass("active");
      setTimeout(function(){
          window.scrollTo(0,0);
          dim.hide();
          el.addClass('none');
      }, 500);
  }
  function popupCloseAll(el){
    el.removeClass("active");
    setTimeout(function(){
        window.scrollTo(0,0);
        dim.hide();
        el.addClass('none');
    }, 500);
  }
  return{
      init : function(){
        $(".dim").on("click",function(){
          popupCloseAll($(".popup"))
        });
        ico_close.on("click",function(){
          popupClose($(this).parents('.popup'));
        });
      },
      open : function(el){
          popupOpen($("."+el));
      },
      close : function(el){
          popupClose($("."+el));
      },
      closeAll : function(el){
        popupcloseAll(el);
      }
  }
})();
popup.init();

// 클래스 on off 효과
// TabOnOff(TimeSet,TimeSet.index(this),컨텐츠);
const OnOff = (function(){
  // const TimeSet = 엘리먼츠
  const TabLi = $('.tab_wrap .tab_head li'),
        TabCont = $('.tab_wrap .tab_cont'),
        TabScrollLi = $('.tab_wrap.tab_scroll > .tab_head li'),
        TabScrollCont = $('.tab_wrap.tab_scroll > .tab_cont');

  function ToggleOnOff(el){
    el.toggleClass('on');
  }
  function TabOnOff(el,idx,box){
    el.removeClass();
    el.eq(idx).addClass('on');
    if(box){
      box.hide();
      box.eq(idx).show();
    }
  }
  return {
    init : function(){
      // 탭 영역
      TabLi.on('click',function(){
        var idx = $(this).index();
        $(this).closest('.tab_depth').find('> .tab_cont').hide();
        $(this).closest('.tab_depth').find('> .tab_cont').eq(idx).show();

        $(this).closest('.tab_depth').find('> .tab_head .tab_list li').removeClass('on');
        $(this).closest('.tab_depth').find('> .tab_head .tab_list li').eq(idx).addClass('on');
      });


      // 탭 Scroll 영역
      TabScrollLi.on('click',function(){
        TabOnOff(TabScrollLi,TabScrollLi.index(this),TabScrollCont);
      });

      
      
    },
    Toggle : function(el){

    }
  }
})();
OnOff.init();

const control = (function(){
  let sortClick=0;
  function sortOpt(el){
    sortClick++;
    el.find('i').removeClass();
    el.find('i').addClass('ico_sort');
    switch (sortClick) {
      case 1:
        el.find('i').addClass('sort_up');
        break;
      case 2:
        el.find('i').addClass('sort_down');
        break;      
      default:      
        sortClick=0;
        break;
    }
  }
  return {
    init : function(){
      // 텍스트 삭제 초기화
      $(".btn_inputclear").on('click', function() {
        $(this).prev().val('')
      });
    },
    sort : function(el){
      sortOpt($(el));
    },
    timer : function(){

    }
  }
})();
control.init();


// 스와이퍼 
const swiperSet = (function(){
  let swiperDefault=[],
  swUnit = $(".swiper_unit");
  function SwOptionGet(swiperEl){
    // 스와이퍼 생성시 엘리먼트에 지정된 attr 상태로 옵션값 조정
    let option = {
      // slide 효과이며, 기본 속성 slide 로 적용됨, data-effect="fade" 로하면 fade 효과적용
      effect : swiperEl.attr('data-effect') ? swiperEl.data('effect') : 'slide',
      // auto 타이머 작동 여부 및 속도 조절 기본 false , 3000초
      auto : swiperEl.attr('data-auto') ? swiperEl.data('auto') : false, // swiper auto 여부
      speed : swiperEl.attr('data-speed') ? swiperEl.data('speed') : 3000,
      // centeredSlides 중앙 정렬 기본 true
      align : swiperEl.attr('data-align') ? swiperEl.data('align') : true,
      // 컨텐츠 loop 여부 기본 true
      loop : swiperEl.attr('data-loop') ? swiperEl.data('loop') : true,
      // 슬라이드 방향 기본은 가로
      direction : swiperEl.attr('data-direction') ? swiperEl.data('direction') : 'horizontal',
      // 처음 시작시 먼저 보여줄 컨텐츠 기본 0 
      initialSlide : swiperEl.attr('data-initial') ? swiperEl.data('initial') : 0,
      // perView 으로 기본은 auto 이며, 몇개씩 보여줄지 확인
      perView : swiperEl.attr('data-view') ? swiperEl.data('view') : 'auto',
      // slidesPerGroup 으로 2단 구성일지 1단 구성일지 초기 1개
      perGroup : swiperEl.attr('data-group') ? swiperEl.data('group') : 1,
      // free mode 활성화 하면 일반 스크롤처럼 표현된다.
      mode : swiperEl.attr('data-mode') ? swiperEl.data('mode') : false,
      // arrow navi prev button 버튼 여부
      navPrev : swiperEl.find('.swiper-button-prev').length ? "swiper-button-prev" : null,
      navNext : swiperEl.find('.swiper-button-next').length ? "swiper-button-next" : null,
      // pagation navi type 으로 모양 변경 가능 기본은 bullets
      pager : swiperEl.find('.swiper-pagination').length ? "swiper-pagination" : null,
      pagerType : swiperEl.find('.swiper-pagination').length ? (swiperEl.find('.swiper-pagination').hasClass('fraction') ? 'fraction' : 'bullets') : null,
      // 스크롤바 옵션 여부 엘리먼트 없으면 null 
      scrollbar : swiperEl.find('.swiper-scrollbar').length ? "swiper-scrollbar" : null,
    };
    return option;
  }
  function SwOptionSet(ElmOpt){
    let applyOpt = {
      effect: ElmOpt.effect,
      direction : ElmOpt.direction,
      slidesPerView: ElmOpt.perView,
      slidesPerGroup: ElmOpt.perGroup,
      centeredSlides: ElmOpt.align,
      loop: ElmOpt.loop,
      pagination: {
        el: "."+ElmOpt.pager,
        clickable: true,
        type: ElmOpt.pagerType
      },
      autoplay: {
        enabled: ElmOpt.auto,
        delay: ElmOpt.speed,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: "."+ElmOpt.navNext,
        prevEl: "."+ElmOpt.navPrev,
      },
      freeMode : ElmOpt.mode,
      freeModeMomentumRatio:1,
      freeModeMomentumBounce: false,
      scrollbar: {
        el: "."+ElmOpt.scrollbar,
        dragSize: 'auto',
        draggable: true,
      },
      initialSlide: ElmOpt.initialSlide,
      observer:true,
      observeParents:true,
    };
    return applyOpt;
  }
  return{
    init:function(){
      swUnit.each(function(index, swEl){  
        // swiper index로 구분
        $(swEl).addClass("sw-" + index);
        // swiper option 적용
        const swOpt = SwOptionSet(SwOptionGet($(swEl)));
        // swiper 각자 생성
        swiperDefault[index] = new Swiper(".sw-"+index,swOpt);
      });
    }
  }
})();
swiperSet.init();


if($('ul').hasClass('listNumber')){
  for(var i=0; i<$('.listNumber').find('li').length; i++){
    $('.listNumber').find('li').eq(i).append('<span class="numbering">'+(i+1)+'</span>')
  }
}

// 바 차트(마이랭킹 차트)
function columnChart(id) {
  var isDark = (document.body.getAttribute('class') || '').indexOf('dark') > 0
  var pointColor = isDark ? '#7664ff' : '#4f3fc6';
  var lineColor = isDark ? '#292C2E' : '#F0F2F4';
  var fontColor = isDark ? '#a0a0a0' : '#999999';
  return Highcharts.chart(id, {
    chart: {
      type: 'column',
      marginTop: 30,
      backgroundColor : null,// 백그라운드 없애기
      
    },
    title: {
      text: null
    },
    subtitle: {
        text: null
    },
    exporting: { enabled: false }, // 심볼 없애기
    xAxis: {
      title: {
        text: '수익률(%)',
        style: {
          color: fontColor,
          fontSize: '10px'
        },
        align: 'high',
        y: -20
      },
      lineColor: lineColor,
      tickWidth: 0,
      labels: {
        style: {
          color: fontColor
        },
      },
      tickPositions: [-20, -10, 0, 10, 20],
      // tickPixelInterval: 50,
    },
    yAxis: {
      title: {
          text: '인원(명)',
          style: {
            color: fontColor,
            fontSize: '10px'
          },
          align: 'high',
          reserveSpace: false,
          rotation: 0,
          x: 40,
          y: -15
      },
      gridLineColor: lineColor,
      lineColor: lineColor,
      labels: {
        enabled: false//label 미사용 시 false로 지정.
      },
    },
    tooltip: {
      enabled: true,
      borderWidth: 0,
      borderRadius: 20,
      backgroundColor: pointColor,
      shadow: false,
      useHTML: true,
      headerFormat: '<div class="tooptip_box" style="font-size:10px; padding: 0px 4px 8px">',
      pointFormat: '<p class="txt_white" style="color:#ffffff">상위 {point.y}%</p>',
      footerFormat: '<p class="txt_yellow" style="color:#fff946">수익률 {point.x}%</p></div>'
    },
    credits: {
      enabled: false  // 크레딧제거
    },
    legend: {
      enabled: false,   // 범례제거
    },
    plotOptions: {
      series: {
        pointPadding: 0,
        groupPadding: 0,
        allowPointSelect: true
      },
    },
    series: [{
        data: null,
        borderWidth: 0,
        states: {
          hover: {
            enabled:false,
            // color: '#4f3fc6'
          },
          select: {
            enabled:false,
            // color: 'transparent'
          }
        }
    }]
  });
}

// gauge chart (마이프로필)
function GaugeChart() {}
GaugeChart.prototype.option =  function () {
    var isDark = (document.body.getAttribute('class') || '').indexOf('dark') > 0
    var bg2 = isDark ? '#45464B' : '#DEE2E6';
    var inc1 = isDark ? '#FF3482' : '#E22D72';
    var dec1 = isDark ? '#225CFF' : '#1C4FDE';
    var tt5 = isDark ? '#666666' : '#cccccc';
    var ln2 = isDark ? '#45464B' : '#DEE2E6';
    var borderWidth = 8;
    return {
        chart: {
            type: 'solidgauge',
            height: '100%',
            margin: [0, 0, 0, 0],
            backgroundColor : null,// 백그라운드 없애기
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        exporting: { 
            enabled: false 
        }, // 심볼 없애기
        credits: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        labels: {
          enabled: false//label 미사용 시 false로 지정.
        },
        pane: {
            center: ['50%', '50%'],
            startAngle: 0,
            endAngle: 120,
            background: { // Track for Stand
                outerRadius: '100%', // 바깥 사이즈
                innerRadius: '100%', // 안 사이즈
                borderColor: bg2,
                borderWidth: borderWidth,
                shape: 'arc'
            }
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            color: ln2,
            tickColor: ln2,
            offset: -12,
            tickLength: 2,
            minorTickLength: 2,
            tickPositions: [0],
            labels: {
                style: {
                    color: tt5
                },
                y: -5
            },
        },

        plotOptions: {
            solidgauge: {
                // borderColor: inc1,
                borderWidth: borderWidth,
                radius: 100,
                innerRadius: '100%',
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: true
            }
        },

        series: [{
            data: []
            /*// value 값 바인딩 하는 곳 */
        }]
    }
}

GaugeChart.prototype.init = function (value, leftId, rightId, parentElementName) {
    var minusObj = this.option();
    var plusObj = this.option();
    var isDark = (document.body.getAttribute('class') || '').indexOf('dark') > 0
    var inc1 = isDark ? '#FF3482' : '#E22D72';
    var dec1 = isDark ? '#225CFF' : '#1C4FDE';

    if (value === 0) {
        minusObj.series[0].data = [];
        plusObj.series[0].data = [];
    } else if (value < 0) {
        minusObj.series[0].data = [{
            y: Math.abs(value)
        }];
        minusObj.plotOptions.solidgauge.borderColor = dec1;
        $(document.getElementById(leftId)).css({
            zIndex: 1
        })
    } else {
        plusObj.series[0].data = [{
            y: value
        }];
        plusObj.plotOptions.solidgauge.borderColor = inc1;
    }

    Highcharts.chart(leftId, minusObj);
    Highcharts.chart(rightId, plusObj);

    // value 값 label에 바인딩
    const labelElement = $(`${parentElementName} .label_box b`);
    labelElement.parent().addClass('active');
    labelElement.removeClass();
    labelElement.addClass(value < 0 ? 'down' : 'up');
    labelElement.prepend(value);

    // 아래 소스가 양쪽 끝 아래, 라운드 시키는 부분 
    var svg;
    svg = document.getElementById(leftId).getElementsByTagName('svg');
    if (svg.length > 0) {
        var path = svg[0].getElementsByTagName('path');
        if (path.length > 1) {
            // First path is gauge background
            path[0].setAttributeNS(null, 'stroke-linejoin', 'round');
            // Second path is gauge value
            path[1].setAttributeNS(null, 'stroke-linejoin', 'round');
        }
    }

    svg = document.getElementById(rightId).getElementsByTagName('svg');
    if (svg.length > 0) {
        var path = svg[0].getElementsByTagName('path');
        if (path.length > 1) {
            // First path is gauge background
            path[0].setAttributeNS(null, 'stroke-linejoin', 'round');
            // Second path is gauge value
            path[1].setAttributeNS(null, 'stroke-linejoin', 'round');
        }
    }
}

/**
 * period  - 1, 3, 6(20, 60, 120) default 1
 * data  - buy
 *         sell
 *         date        
 *         averageBuy
 *         averageSell
 */
function sellBuyLineChart(period, id, data) {
  if (!period) {
    period = 1;
  }
  if (!id) {
    return alert('잘못된 접근');
  }
  if (!data) {
    return alert('잘못된 접근');
  }

  if (!data.date) {
    return alert('잘못된 접근');
  }

  // 차트 컬러에 필요한 내용
  var isDark = (document.body.getAttribute('class') || '').indexOf('dark') > 0;
  var buyColor = isDark ? '#FF3482' : '#E22D72';
  var buyGradientColor = isDark ? ['#522B39', 'rgba(18,18,18,0)'] : ['#FFEEF4', 'rgba(255,255,255,0)'];

  var sellColor = isDark ? '#225CFF' : '#1C4FDE';
  var sellGradientColor = isDark ? ['#2F3557', 'rgba(18,18,18,0)'] : ['#EEF2FF', 'rgba(255,255,255,0)'];

  var yAxisColor = isDark ? '#a0a0a0' : '#999999';
  var xAxisColor = isDark ? '#a0a0a0' : '#999999';
  var bgColor = isDark ? '#202024' : '#F7F9FA';

  // 차트 데이터에 필요한 내용
  var buyResult = [];
  var buyMinMax = [100, 9999999];
  var isBuy = typeof data.buy === 'object';
  var sellResult = [];
  var sellMinMax = [100, 9999999];
  var isSell = typeof data.sell === 'object';
  var tickDateInteval = 24 * 60 * 60 * 1000 * 1;
  var dateFormat = '%m.%d';

  switch(period) {
    case 1:
      tickDateInteval = 24 * 60 * 60 * 1000 * 7;
      dateFormat = '%m.%d';
      break;
    case 3:
      tickDateInteval = 24 * 60 * 60 * 1000 * 15;
      dateFormat = '%y.%m.%d';
      break;
    case 6:
      tickDateInteval = 24 * 60 * 60 * 1000 * 30;
      dateFormat = '%y.%d';
      break;
  }

  // 매도/매수 날짜 이차원 배열로 변경
  for (var i = 0; i < data.date.length; i++) {
    if (isBuy) {
      buyResult.push(
        [data.date[i].getTime(), data.buy[i]]
      );
    }
    
    if (isSell) {
      sellResult.push(
        [data.date[i].getTime(), data.sell[i]]
      );
    }
  }

  if (isBuy) {
    buyMinMax = [
      Math.min.apply(null, buyResult.map((el) => el[1])),
      Math.max.apply(null, buyResult.map((el) => el[1]))
    ];
  }

  if (isSell) {
    sellMinMax = [
      Math.min.apply(null, sellResult.map((el) => el[1])),
      Math.max.apply(null, sellResult.map((el) => el[1]))
    ];
  }
  var yAxisMin = 0;
  var yAxisMax = 9999999;

  if (isBuy && isSell) {
    yAxisMin = Math.min.apply(null, [buyMinMax[0], sellMinMax[0]]); 
    yAxisMax = Math.max.apply(null, [buyMinMax[1], sellMinMax[1]]); 
  } else if (isBuy) {
    yAxisMin = Math.min.apply(null, buyResult.map((el) => el[1]));
    yAxisMax = Math.max.apply(null, buyResult.map((el) => el[1]));
  } else if (isSell) {
    yAxisMin = Math.min.apply(null, sellResult.map((el) => el[1]));
    yAxisMax = Math.max.apply(null, sellResult.map((el) => el[1]));
  }

  function plotLineLabel(value, type) {
    var plotOption = {
      dashStyle: 'solid', // Style of the plot line. Default to solid
      value: value, // Value of where the line will appear
      width: 2,// Width of the line   
      label: {
          className: 'highcharts-credits ' + type,
          align: 'left',
          useHTML: true,
          text: '<div class="yaxis_label">' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</div>',
          style: {
              display: 'block',
              width: '65px',
          },
          x: $(`#${id}`).width() - 65, 
          y: 4
      },
      zIndex: 10
    };
    if (type === 'buy') {
      plotOption.color = buyColor;
    } else if (type === 'sell') {
      plotOption.color = sellColor;
    }
    return plotOption
  }
  console.log(data.date);
  var highChartOption = {
    chart: {
        type: 'spline',
        backgroundColor : bgColor,// 백그라운드 없애기
        marginTop: 0,
        marginRight: 65,
        marginLeft: 0,
        scrollablePlotArea: {
            minWidth: 1000,
            scrollPositionX: 1
        }
    },
    title: {
        text: null
    },
    subtitle: {
        text: null
    },
    exporting: { 
        enabled: false 
    }, // 심볼 없애기
    credits: {
        enabled: false
    },
    tooltip: {
        enabled: false
    },
    xAxis: {
        plotBands: [{
          from: 0,
          to: 100000,
          color: '#ffffff'
        }],
        type: "datetime",                    
        labels: {
            formatter: function () {
                return Highcharts.dateFormat('%y.%m', this.value);
            }
        },
        // startOnTick: true,
        min: data.date[0].getTime(),
        max: data.date[data.date.length - 1].getTime(),
        color: xAxisColor,
        tickInterval: tickDateInteval,
        categories: data.date
    },
    yAxis: [
      { // 왼쪽
          title: {
              text: null
          },
          labels: {
              enabled: false
          }
      },
      { // 오른쪽
          tickPixelInterval: 40,
          plotLines: [
            plotLineLabel(data.averageSell, 'sell'),
            plotLineLabel(data.averageBuy, 'buy')
          ],
          
          title: {
              text: null
          },
          opposite: true,
          // startOnTick: false,
          // endOnTick: false,
          min: Math.floor(yAxisMin * 0.9),
          max: Math.floor(yAxisMax * 1.1),
          color: yAxisColor,
          labels: {
              align: 'right',
              useHTML: true,
              style: {
                  fontSize: '10px',
              },
              formatter: function () {
                  var min = this.axis.min;
                  var max = this.axis.max;
                  if (this.value <= min || this.value >= max) {
                      return '';
                  }
                  return this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              },
              x: 58
          }
          
      }
    ],
    legend: {// 범례제거
        enabled: false,   
    },
    plotOptions: {
        area: {
            allowPointSelect: false,
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: false
                    }
                },
                fillColor: 'transparent'
            }
        }
    }
  };
  highChartOption.colors = [];
  highChartOption.series = [];
  
  if (isSell) {
    highChartOption.colors.push(sellColor);
    highChartOption.series.push(
      {
        name: '매도',
        type : "area",
        yAxis: 1,
        fillColor : {
          linearGradient : [0, 50, 0, 200],
          stops : [
            [0, sellGradientColor[0]],
            [1, sellGradientColor[1]]
          ]
        },
        enableMouseTracking: false,
        data: sellResult
      } 
    )
  }
  if (isBuy) {
    highChartOption.colors.push(buyColor);
    highChartOption.series.push(
      {
        name: '매수',
        type : "area",
        yAxis: 1,
        fillColor : {
          linearGradient : [0, 50, 0, 200],
          stops : [
            [0, buyGradientColor[0]],
            [1, buyGradientColor[1]]  
          ]
        },
        enableMouseTracking: false,
        data: buyResult
        // crisp : true,
      }
    )
  }

  return Highcharts.chart(id, highChartOption);

}

function dualLineChart() {
  // 샘플들
  var buy = bigRandomNumber();
  var sell = bigRandomNumber();

  var sampleDate = dateArray();
  var buyList = dataArray();
  var sellList = dataArray();

  
  var sellResult = [];

  for(var i = 0; i < sampleDate.length; i++) {
      buyResult.push(
          [sampleDate[i].getTime(), buyList[i]]
      );
      sellResult.push(
          [sampleDate[i].getTime(), sellList[i]]
      );
  }

  var buyMin = Math.min.apply(null, buyResult.map((el) => el[1]));
  var buyMax = Math.max.apply(null, buyResult.map((el) => el[1]));

  console.log(buyMax, buyMin);

  function plotLineLabel(value, type) {
      return {
          color: type, // Color value
          dashStyle: 'solid', // Style of the plot line. Default to solid
          value: value, // Value of where the line will appear
          width: 2,// Width of the line   
          label: {
              className: 'highcharts-credits ' + type,
              align: 'left',
              useHTML: true,
              text: '<div class="yaxis_label">' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</div>',
              style: {
                  display: 'block',
                  width: '65px',
              },
              x: 638 - 65, 
              y: 4
          },
          zIndex: 10
      }
  }

  Highcharts.chart('dualLineChart', {
      chart: {
          type: 'spline',
          backgroundColor : '#f4f4f4',// 백그라운드 없애기
          marginTop: 0,
          marginRight: 65,
          marginLeft: 0,
          scrollablePlotArea: {
              minWidth: 1000,
              scrollPositionX: 1
          }
      },
      title: {
          text: null
      },
      subtitle: {
          text: null
      },
      exporting: { 
          enabled: false 
      }, // 심볼 없애기
      credits: {
          enabled: false
      },
      tooltip: {
          enabled: false
      },
      xAxis: {
          plotBands: [{
              from: 0,
              to: 10000,
              color: '#ffffff'
          }],
          type: "datetime",                    
          labels: {
              formatter: function () {
                  return Highcharts.dateFormat('%y.%m', this.value);
              }
          },
          // startOnTick: true,
          min: data.date[0].getTime(),
          max: data.date[data.date.length - 1].getTime(),
          tickInterval   : 24 * 3600 * 1000 * 30,
          categories: dateArray()
      },
      yAxis: [
          {
              title: {
                  text: null
              },
              labels: {
                  enabled: false
              }
          },
          {
              tickPixelInterval: 40,
              plotLines: [
                  plotLineLabel(sell, 'blue'),
                  plotLineLabel(buy, 'red')
                  // {
                  //     color: 'blue', // Color value
                  //     dashStyle: 'solid', // Style of the plot line. Default to solid
                  //     value: buy, // Value of where the line will appear
                  //     width: 1, // Width of the line
                  //     zIndex: 10,
                  //     label: {
                  //         align: 'right',
                  //         useHTML: true,
                  //         text:  '<em class="yaxis_label">' + buy.toString() + '</em>',
                  //         style: {
                  //             display: 'block',
                  //             width: '60px',
                  //             padding: '2px',
                  //             fontSize: '10px',
                  //             backgroundColor: 'blue'
                  //         },
                  //         x: 56,
                  //         y: 2
                  //     }
                  // },
                  
                  // {
                  //     color: 'red', // Color value
                  //     dashStyle: 'solid', // Style of the plot line. Default to solid
                  //     value: sell, // Value of where the line will appear
                  //     width: 2,// Width of the line   
                  //     label: {
                  //         className: 'highcharts-credits',
                  //         align: 'left',
                  //         useHTML: true,
                  //         text: '<div class="yaxis_label">' + sell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</div>',
                  //         style: {
                  //             display: 'block',
                  //             width: '60px',
                  //         },
                  //         x: 638 - 60, 
                  //         y: 4
                  //     }
                  // }
              ],
              
              title: {
                  text: null
              },
              opposite: true,
              // startOnTick: false,
              // endOnTick: false,
              min: Math.floor(buyMin * 0.9),
              max: Math.floor(buyMax * 1.1),
              color: '#999999',
              labels: {
                  align: 'right',
                  useHTML: true,
                  style: {
                      fontSize: '10px',
                  },
                  formatter: function () {
                      var min = this.axis.min;
                      var max = this.axis.max;
                      if (this.value <= min || this.value >= max) {
                          return '';
                      }
                      return this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  },
                  x: 58
              }
              
          }
      ],
      legend: {
          enabled: false,   // 범례제거
      },
      plotOptions: {
          area: {
              allowPointSelect: false,
              marker: {
                  enabled: false,
                  states: {
                      hover: {
                          enabled: false
                      }
                  },
                  fillColor: 'transparent'
              }
          }
      },
      // colors: ['#e22d72', '#1c4fde'],
      colors: ['#e22d72'],
      series: [
      {
          name: '매수',
          type : "area",
          fillColor : {
              linearGradient : [0, 0, 0, 500],
              stops : [
              [0, '#ffeef4'],
                  [1, 'rgba(255,255,255,0)']
                  
              ]
          },
          yAxis: 1,
          enableMouseTracking: false,
          data: sellResult,
          // crisp : true,
      }, 
      /*{
          name: '매도',
          type : "area",
          yAxis: 1,
          fillColor : {
              linearGradient : [0, 0, 0, 500],
              stops : [
                  [0, '#eef2ff'],
                  [1, 'rgba(255,255,255,0)']
              ]
          },
          data: buyResult,
          // crisp : true,
      }*/
  ]
  });
}

function tooltip(target, title, content, position) {
  console.log(target);
  var instance = tippy(target, {
    content: `
      <div class="tooltip_container">
        <h2>${title}</h2>
        <div>
          ${content}
        </div>
        <button type="button" class="btn_tooltip_close">
            <span class="hidden">닫기</span>
        </button>
      </div>
    `,
    arrow: false,
    allowHTML: true,
    interactive: true,
    trigger: 'click',
  });
  console.log(instance);
  if (position) {
    instance.props.placement = position
  }

  $(document).on('click', '.btn_tooltip_close', function () {
    instance.hide();
  })
}