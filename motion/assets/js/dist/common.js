"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

$('.thema_infor li').on('click', function () {
  var idx = $('.thema_infor li').index(this);
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
}); // 팝업 모듈
// onclick="popup.open('레이어명')" 팝업 오픈
// onclick="popup.close('레이어명')" 팝업 닫힘
// open 되면 active 클래스 추가

var popup = function () {
  var dim = $('.dim'),
      ico_close = $('.popup .pop-header .btn_close');

  function popupOpen(el) {
    el.removeClass('none');
    $("body").addClass('non_scroll');
    setTimeout(function () {
      var popupButtonHeight = el.find(".pop-body").children(".btn_wrap").height() || 0;
      var popupHeaderHeight = el.find(".pop-header").height() || 0;
      var popupContainerHeight = el.children(".popup_container").height() || 0;
      el.find(".pop-scroll").css({
        height: popupContainerHeight - popupButtonHeight - popupHeaderHeight + 'px'
      });
      el.addClass("active");
    }, 10); // dim.show();
  }

  function popupClose(el) {
    el.removeClass("active");
    setTimeout(function () {
      el.addClass('none');

      if ($('.popup.active').length <= 1) {
        $("body").removeClass('non_scroll');
      }
    }, 500);
  }

  function popupCloseAll(el) {
    el.removeClass("active");
    setTimeout(function () {
      // window.scrollTo(0,0);
      dim.hide();
      $("body").removeClass('non_scroll');
      el.addClass('none');
    }, 500);
  }

  return {
    init: function init() {
      dim.on("click", function () {
        popupClose($(this).parents('.popup'));
      });
      ico_close.on("click", function () {
        popupClose($(this).parents('.popup'));
      });
    },
    open: function open(el) {
      popupOpen($("." + el));
    },
    close: function close(el) {
      popupClose($("." + el));
    },
    restoreChange: function restoreChange(el, before, after) {
      popupClose($("." + el));
      setTimeout(function () {
        $(".".concat(el, " .").concat(before)).show(0);
        $(".".concat(el, " .").concat(after)).hide(0);
      }, 501);
    },
    closeAll: function closeAll(el) {
      popupcloseAll(el);
    }
  };
}();

popup.init(); // 클래스 on off 효과
// TabOnOff(TimeSet,TimeSet.index(this),컨텐츠);

var OnOff = function () {
  // const TimeSet = 엘리먼츠
  var TabLi = $('.tab_wrap .tab_head li'),
      TabCont = $('.tab_wrap .tab_cont'),
      TabScrollLi = $('.tab_wrap.tab_scroll > .tab_head li'),
      TabScrollCont = $('.tab_wrap.tab_scroll > .tab_cont');

  function ToggleOnOff(el) {
    el.toggleClass('on');
  }

  function TabOnOff(el, idx, box) {
    el.removeClass();
    el.eq(idx).addClass('on');

    if (box) {
      box.hide();
      box.eq(idx).show();
    }
  }

  return {
    init: function init() {
      // 탭 영역
      TabLi.on('click', function () {
        var idx = $(this).index();
        $(this).closest('.tab_depth').find('> .tab_cont').hide();
        $(this).closest('.tab_depth').find('> .tab_cont').eq(idx).show();
        $(this).closest('.tab_depth').find('> .tab_head .tab_list li').removeClass('on');
        $(this).closest('.tab_depth').find('> .tab_head .tab_list li').eq(idx).addClass('on');
      }); // 탭 Scroll 영역

      TabScrollLi.on('click', function () {
        TabOnOff(TabScrollLi, TabScrollLi.index(this), TabScrollCont);
      });
    },
    Toggle: function Toggle(el) {
      ToggleOnOff($(el));
    }
  };
}();

OnOff.init();

var control = function () {
  function sortOpt(el) {
    var toggleActiveElement = el.find('i');

    if (toggleActiveElement.hasClass("sort_down")) {
      toggleActiveElement.removeClass('sort_down');
      toggleActiveElement.addClass('sort_up');
      el.children('.sort_txt').text(el.data('up'));
    } else if (toggleActiveElement.hasClass("sort_up") && el.data('mid')) {
      toggleActiveElement.removeClass('sort_up');
      toggleActiveElement.addClass('sort_mid');
      el.children('.sort_txt').text(el.data('mid'));
    } else {
      toggleActiveElement.removeClass('sort_mid');
      toggleActiveElement.addClass('sort_down');
      el.children('.sort_txt').text(el.data('down'));
    }
  }

  return {
    init: function init() {
      // 텍스트 삭제 초기화
      $(".btn_inputclear").on('click', function () {
        $(this).prev().val('');
      });
    },
    sort: function sort(el) {
      sortOpt($(el));
    },
    timer: function timer() {}
  };
}();

control.init(); // 스와이퍼 

var swiperSet = function () {
  var swiperDefault = [],
      swUnit = $(".swiper_unit");

  function SwOptionGet(swiperEl) {
    // 스와이퍼 생성시 엘리먼트에 지정된 attr 상태로 옵션값 조정
    var option = {
      // slide 효과이며, 기본 속성 slide 로 적용됨, data-effect="fade" 로하면 fade 효과적용
      effect: swiperEl.attr('data-effect') ? swiperEl.data('effect') : 'slide',
      // auto 타이머 작동 여부 및 속도 조절 기본 false , 3000초
      auto: swiperEl.attr('data-auto') ? swiperEl.data('auto') : false,
      // swiper auto 여부
      speed: swiperEl.attr('data-speed') ? swiperEl.data('speed') : 3000,
      // centeredSlides 중앙 정렬 기본 true
      align: swiperEl.attr('data-align') ? swiperEl.data('align') : true,
      // 컨텐츠 loop 여부 기본 true
      loop: swiperEl.attr('data-loop') ? swiperEl.data('loop') : true,
      // 슬라이드 방향 기본은 가로
      direction: swiperEl.attr('data-direction') ? swiperEl.data('direction') : 'horizontal',
      // 처음 시작시 먼저 보여줄 컨텐츠 기본 0 
      initialSlide: swiperEl.attr('data-initial') ? swiperEl.data('initial') : 0,
      // perView 으로 기본은 auto 이며, 몇개씩 보여줄지 확인
      perView: swiperEl.attr('data-view') ? swiperEl.data('view') : 'auto',
      // slidesPerGroup 으로 2단 구성일지 1단 구성일지 초기 1개
      perGroup: swiperEl.attr('data-group') ? swiperEl.data('group') : 1,
      // free mode 활성화 하면 일반 스크롤처럼 표현된다.
      mode: swiperEl.attr('data-mode') ? swiperEl.data('mode') : false,
      // arrow navi prev button 버튼 여부
      navPrev: swiperEl.find('.swiper-button-prev').length ? "swiper-button-prev" : null,
      navNext: swiperEl.find('.swiper-button-next').length ? "swiper-button-next" : null,
      // pagation navi type 으로 모양 변경 가능 기본은 bullets
      pager: swiperEl.find('.swiper-pagination').length ? "swiper-pagination" : null,
      pagerType: swiperEl.find('.swiper-pagination').length ? swiperEl.find('.swiper-pagination').hasClass('fraction') ? 'fraction' : 'bullets' : null,
      // 스크롤바 옵션 여부 엘리먼트 없으면 null 
      scrollbar: swiperEl.find('.swiper-scrollbar').length ? "swiper-scrollbar" : null
    };
    return option;
  }

  function SwOptionSet(ElmOpt) {
    var applyOpt = {
      effect: ElmOpt.effect,
      direction: ElmOpt.direction,
      slidesPerView: ElmOpt.perView,
      slidesPerGroup: ElmOpt.perGroup,
      centeredSlides: ElmOpt.align,
      loop: ElmOpt.loop,
      pagination: {
        el: "." + ElmOpt.pager,
        clickable: true,
        type: ElmOpt.pagerType
      },
      autoplay: {
        enabled: ElmOpt.auto,
        delay: ElmOpt.speed,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: "." + ElmOpt.navNext,
        prevEl: "." + ElmOpt.navPrev
      },
      freeMode: ElmOpt.mode,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: false,
      scrollbar: {
        el: "." + ElmOpt.scrollbar,
        dragSize: 'auto',
        draggable: true
      },
      initialSlide: ElmOpt.initialSlide,
      observer: true,
      observeParents: true
    };
    return applyOpt;
  }

  return {
    init: function init() {
      swUnit.each(function (index, swEl) {
        // swiper index로 구분
        $(swEl).addClass("sw-" + index); // swiper option 적용

        var swOpt = SwOptionSet(SwOptionGet($(swEl))); // swiper 각자 생성

        swiperDefault[index] = new Swiper(".sw-" + index, swOpt);
      });
    },
    getter: function getter() {
      return swiperDefault;
    }
  };
}();

swiperSet.init();
$(function () {
  $('ul.listNumber').each(function () {
    $("> li", $(this)).each(function (idx, n) {
      $(this).append('<span class="numbering">' + (idx + 1) + '</span>');
    });
  });
}); // tooltip

function tooltip(target, title, content, position) {
  var instance = tippy(target, {
    content: "\n      <div class=\"tooltip_container\">\n        <h2>".concat(title, "</h2>\n        <div>\n          ").concat(content, "\n        </div>\n        <button type=\"button\" class=\"btn_tooltip_close\">\n            <span class=\"hidden\">\uB2EB\uAE30</span>\n        </button>\n      </div>\n    "),
    arrow: false,
    allowHTML: true,
    interactive: true,
    trigger: 'click',
    placement: 'bottom',
    offset: [0, 8]
  });

  if (position) {
    instance.props.placement = position;
  }

  $(document).on('click', '.btn_tooltip_close', function () {
    instance.hide();
  });
} // accordion


$(".accordion_list > button").on('click', function () {
  var txtAttrExpend = 'aria-expanded';
  var isExpand = $(this).attr(txtAttrExpend) === 'true'; // var offsetTop = $(this).offset().top;

  $(this).attr(txtAttrExpend, !isExpand); // setTimeout(() => {
  //   $(window).scrollTop(offsetTop);
  // }, 100);
}); // clipboard copy

function copyTxtToClipboard(that, txt) {
  var textArea = document.createElement("textarea");
  textArea.value = txt;
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0'; // textArea.style.visibility = 'hidden';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");

    if (successful) {
      console.log(this, $(that).closest(".header_line"));
      $(that).closest(".header_line").hide(0);
      $(".pop_copy_complete").show(0);
    } else {}
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
} // 바 차트(마이랭킹 차트)


function columnChart(id) {
  var isDark = (document.body.getAttribute('class') || '').indexOf('dark') > -1;
  var pointColor = isDark ? '#7664ff' : '#4f3fc6';
  var lineColor = isDark ? '#292C2E' : '#F0F2F4';
  var fontColor = isDark ? '#a0a0a0' : '#999999';
  var xAxisTextIndex = 0;
  return Highcharts.chart(id, {
    chart: {
      type: 'column',
      marginTop: 30,
      marginBottom: 18 + 16,
      backgroundColor: null // 백그라운드 없애기

    },
    title: {
      text: "수익률(%)",
      style: {
        color: fontColor,
        fontSize: '10px'
      },
      align: 'right'
    },
    subtitle: {
      text: null
    },
    exporting: {
      enabled: false
    },
    // 심볼 없애기
    xAxis: {
      title: {
        text: null
      },
      lineColor: lineColor,
      tickWidth: 0,
      labels: {
        style: {
          color: fontColor
        },
        formatter: function formatter() {
          var textBox = ['-50%', '-25%', '0', '25%', '50%'];
          xAxisTextIndex += 1;
          return textBox[xAxisTextIndex - 1];
        }
      },
      tickPositions: [-20, -10, 0, 10, 20] // tick 위치 옵션
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
        enabled: false //label 미사용 시 false로 지정.

      }
    },
    tooltip: {
      enabled: true,
      borderWidth: 0,
      borderRadius: 20,
      backgroundColor: pointColor,
      shadow: false,
      useHTML: true,
      headerFormat: '<div class="tooptip_box" style="font-size:10px; padding: 0px 4px 8px">',
      // pointFormat: '<p class="txt_white" style="color:#ffffff">상위 {point.y}%</p>',
      pointFormat: '<p class="txt_yellow" style="color:#fff946">수익률 {point.x}%</p>',
      footerFormat: '</div>'
    },
    credits: {
      enabled: false // 크레딧제거

    },
    legend: {
      enabled: false // 범례제거

    },
    plotOptions: {
      series: {
        pointPadding: 0,
        groupPadding: 0,
        allowPointSelect: true
      }
    },
    series: [{
      data: null,
      borderWidth: 0,
      states: {
        hover: {
          enabled: false // color: '#4f3fc6'

        },
        select: {
          enabled: false // color: 'transparent'

        }
      }
    }]
  });
} // gauge chart (마이프로필)


function GaugeChart() {}

GaugeChart.prototype.option = function () {
  var isDark = (document.body.getAttribute('class') || '').indexOf('dark') > -1;
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
      backgroundColor: null // 백그라운드 없애기

    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    exporting: {
      enabled: false
    },
    // 심볼 없애기
    credits: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    labels: {
      enabled: false //label 미사용 시 false로 지정.

    },
    pane: {
      center: ['50%', '50%'],
      startAngle: 0,
      endAngle: 120,
      background: {
        // Track for Stand
        outerRadius: '100%',
        // 바깥 사이즈
        innerRadius: '100%',
        // 안 사이즈
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
      }
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
  };
};

GaugeChart.prototype.init = function (rateValue, leftId, rightId, parentElementName, originalvalue) {
  var minusObj = this.option();
  var plusObj = this.option();
  var isDark = (document.body.getAttribute('class') || '').indexOf('dark') > -1;
  var inc1 = isDark ? '#FF3482' : '#E22D72';
  var dec1 = isDark ? '#225CFF' : '#1C4FDE';

  if (rateValue === 0) {
    minusObj.series[0].data = [];
    plusObj.series[0].data = [];
  } else if (rateValue < 0) {
    minusObj.series[0].data = [{
      y: Math.abs(rateValue)
    }];
    minusObj.plotOptions.solidgauge.borderColor = dec1;
    $(document.getElementById(leftId)).css({
      zIndex: 1
    });
  } else {
    plusObj.series[0].data = [{
      y: rateValue
    }];
    plusObj.plotOptions.solidgauge.borderColor = inc1;
  }

  Highcharts.chart(leftId, minusObj);
  Highcharts.chart(rightId, plusObj); // value 값 label에 바인딩

  var labelElement = $("".concat(parentElementName, " .label_box b"));
  labelElement.parent().addClass('active');
  labelElement.removeClass();

  if (rateValue > 0) {
    labelElement.addClass('up');
  } else if (rateValue < 0) {
    labelElement.addClass('down');
  }

  if (originalvalue > 999 || rateValue > 999) {
    labelElement.addClass('fzSmall');
  }

  labelElement.text('');
  labelElement.prepend(originalvalue ? originalvalue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : rateValue + '<span>%</span>'); // 아래 소스가 양쪽 끝 아래, 라운드 시키는 부분 

  var svg;
  svg = document.getElementById(leftId).getElementsByTagName('svg');

  if (svg.length > 0) {
    var path = svg[0].getElementsByTagName('path');

    if (path.length > 1) {
      // First path is gauge background
      path[0].setAttributeNS(null, 'stroke-linejoin', 'round'); // Second path is gauge value

      path[1].setAttributeNS(null, 'stroke-linejoin', 'round');
    }
  }

  svg = document.getElementById(rightId).getElementsByTagName('svg');

  if (svg.length > 0) {
    var path = svg[0].getElementsByTagName('path');

    if (path.length > 1) {
      // First path is gauge background
      path[0].setAttributeNS(null, 'stroke-linejoin', 'round'); // Second path is gauge value

      path[1].setAttributeNS(null, 'stroke-linejoin', 'round');
    }
  }
};
/**
 * 체결 내역 차트 함수(sell 데이터는 사용하지 않음. 필요 할 경우 대비해 만듦)
 * period  - // 체결 일 수 number - 1, 3, 6(20, 60, 120) default 1
 * id - chart가 그려질 아이디 string
 * data  - buy // 매수 배열 값 array<number>
 *         sell // 매도 배열 값 array<number>
 *         date // 날짜 array<date> x축에 들어갈 날짜 배열 vo type이 date로 전달 필요(dateTime일 경우 변경 작업 필요)
 *         averageBuy // 매수 평균 값 number
 *         averageSell // 매도 평균 값 number
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
  } // 차트 컬러에 필요한 내용


  var isDark = (document.body.getAttribute('class') || '').indexOf('dark') > -1;
  var buyColor = isDark ? '#FF3482' : '#E22D72';
  var buyGradientColor = isDark ? ['#522B39', 'rgba(18,18,18,0)'] : ['#FFEEF4', 'rgba(255,255,255,0)'];
  var sellColor = isDark ? '#225CFF' : '#1C4FDE';
  var sellGradientColor = isDark ? ['#2F3557', 'rgba(18,18,18,0)'] : ['#EEF2FF', 'rgba(255,255,255,0)'];
  var xPlotColor = isDark ? '#DDDDDD' : '#333333';
  var yAxisColor = isDark ? '#a0a0a0' : '#999999';
  var xAxisColor = isDark ? '#a0a0a0' : '#999999';
  var bgColor = isDark ? '#202024' : '#F7F9FA';
  var pointColor = isDark ? '#7664ff' : '#4f3fc6'; // 차트 데이터에 필요한 내용

  var buyResult = [];
  var buyMinMax = [100, 9999999];
  var isBuy = _typeof(data.buy) === 'object';
  var sellResult = [];
  var sellMinMax = [100, 9999999];
  var isSell = _typeof(data.sell) === 'object';
  var tickDateInteval = 24 * 60 * 60 * 1000 * 1;
  var dateFormat = '%m.%d';
  var chartSize = $("#".concat(id)).width();

  switch (period) {
    case 1:
      tickDateInteval = 24 * 60 * 60 * 1000 * 5;
      dateFormat = '%m.%d';
      chartSize = $("#".concat(id)).width();
      break;

    case 3:
      tickDateInteval = 24 * 60 * 60 * 1000 * 30;
      dateFormat = '%m.%d';
      chartSize = $("#".concat(id)).width();
      break;

    case 6:
      tickDateInteval = 24 * 60 * 60 * 1000 * 30;
      dateFormat = '%m.%d';
      chartSize = $("#".concat(id)).width();
      break;
  } // 매도/매수 날짜 이차원 배열로 변경


  for (var i = 0; i < data.date.length; i++) {
    if (isBuy) {
      buyResult.push([data.date[i].getTime(), data.buy[i]]);
    }

    if (isSell) {
      sellResult.push([data.date[i].getTime(), data.sell[i]]);
    }
  }

  if (isBuy) {
    buyMinMax = [Math.min.apply(null, buyResult.map(function (el) {
      return el[1];
    })), Math.max.apply(null, buyResult.map(function (el) {
      return el[1];
    }))];
  }

  if (isSell) {
    sellMinMax = [Math.min.apply(null, sellResult.map(function (el) {
      return el[1];
    })), Math.max.apply(null, sellResult.map(function (el) {
      return el[1];
    }))];
  }

  var yAxisMin = 0;
  var yAxisMax = 9999999;

  if (isBuy && isSell) {
    yAxisMin = Math.min.apply(null, [buyMinMax[0], sellMinMax[0]]);
    yAxisMax = Math.max.apply(null, [buyMinMax[1], sellMinMax[1]]);
  } else if (isBuy) {
    yAxisMin = Math.min.apply(null, buyResult.map(function (el) {
      return el[1];
    }));
    yAxisMax = Math.max.apply(null, buyResult.map(function (el) {
      return el[1];
    }));
  } else if (isSell) {
    yAxisMin = Math.min.apply(null, sellResult.map(function (el) {
      return el[1];
    }));
    yAxisMax = Math.max.apply(null, sellResult.map(function (el) {
      return el[1];
    }));
  } // Y축 매도/매수 평균가


  function plotLineLabel(value, type) {
    var plotOption = {
      dashStyle: 'dash',
      // Style of the plot line. Default to solid
      value: value,
      // Value of where the line will appear
      width: 1,
      // Width of the line   
      label: {
        className: 'highcharts-credits ' + type,
        align: 'left',
        useHTML: true,
        text: '<div class="yaxis_label">' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</div>',
        style: {
          display: 'block',
          width: '65px'
        },
        x: $("#".concat(id)).width() - 65,
        y: 4
      },
      zIndex: 10
    };

    if (type === 'buy') {
      plotOption.color = buyColor;
    } else if (type === 'sell') {
      plotOption.color = sellColor;
    }

    return plotOption;
  } // 차트 옵션


  var highChartOption = {
    chart: {
      // type: 'spline',
      backgroundColor: bgColor,
      // 백그라운드 없애기
      marginTop: 0,
      marginRight: 65,
      marginLeft: 1,
      scrollablePlotArea: {
        minWidth: chartSize,
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
    },
    // 심볼 없애기
    credits: {
      enabled: false
    },
    tooltip: {
      positioner: function positioner() {
        var windowWidth = window.innerWidth;
        var top = $("#" + id).offset().top - 20;

        if (windowWidth === 360) {
          top = 0;
        }

        return {
          x: 0,
          y: top
        };
      },
      borderWidth: 0,
      backgroundColor: 'transparent',
      useHTML: true,
      followPointer: false,
      shadow: false,
      formatter: function formatter() {
        var series = this.series;
        var xValue = this.x;
        var yValue = this.y;
        var windowWidth = window.innerWidth;
        var chartWidth = document.querySelector("#".concat(id)).clientWidth;
        var rightYAxisWidth = 65;
        var leftMargin = 16;

        if (windowWidth === 360) {
          leftMargin = 0;
        } else {
          leftMargin = $("#" + id).offset().left;
        }
        /* X축 선택한 날짜 기준 표시 */


        series.xAxis.removePlotLine('xPlotLine');
        $(".x-plot-date-line").each(function (index) {
          $(this).remove();
          $('.xaxis_label_box').eq(index).remove();
        });
        var xPlotLabel = -27;

        if (parseInt(this.point.plotX) < 27) {
          xPlotLabel = -parseInt(this.point.plotX + 4);
        }

        series.xAxis.addPlotLine({
          className: "x-plot-date-line ".concat(id),
          dashStyle: 'dash',
          value: xValue,
          color: xPlotColor,
          width: 1,
          id: 'xPlotLine',
          zIndex: 10,
          label: {
            className: 'xaxis_label_box',
            align: 'left',
            useHTML: true,
            text: '<div class="xaxis_label">' + Highcharts.dateFormat("%y.".concat(dateFormat), xValue) + '</div>',
            style: {
              display: 'block',
              height: 31,
              transform: 'rotate(0)'
            },
            x: xPlotLabel,
            //-27
            y: 185
          }
        });
        $(".x-plot-date-line.".concat(id)).attr('d', $(".x-plot-date-line.".concat(id)).attr('d').replace(' 0 ', ' 44 ')); // position을 제대로 못구하는 버그 있음

        setTimeout(function () {
          var priceBoxElement = document.querySelector(".".concat(id, ".close_price_box"));
          var parentElement = priceBoxElement.parentNode;
          var grandParentElement = parentElement.parentNode;
          $(".x-plot-date-line.".concat(id)).show(0);
          console.log('leftMargin : ', leftMargin);
          priceBoxElement.style.visibility = 'visible'; // 까닥이는 모습을 없애기 위해 사용

          parentElement.style.left = 0;
          grandParentElement.style.left = "".concat(leftMargin, "px");
        }, 0);
        return "\n          <div class=\"".concat(id, " close_price_box\" style=\"width: ").concat(chartWidth - rightYAxisWidth, "px\">\n            <span>\uC885\uAC00</span>\n            <span>").concat(yValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), "</span>\n          </div>\n        ");
      }
    },
    xAxis: {
      plotBands: [{
        from: 0,
        to: 100000,
        color: '#ffffff'
      }],
      type: "datetime",
      labels: {
        formatter: function formatter() {
          return Highcharts.dateFormat(dateFormat, this.value);
        },
        y: 20
      },
      // startOnTick: true,
      min: data.date[0].getTime(),
      max: data.date[data.date.length - 1].getTime(),
      color: xAxisColor,
      tickInterval: tickDateInteval,
      categories: data.date
    },
    yAxis: [{
      // 왼쪽
      title: {
        text: null
      },
      labels: {
        enabled: false
      },
      gridLineWidth: 1,
      tickPixelInterval: 40,
      min: Math.floor(yAxisMin * 0.9),
      max: Math.floor(yAxisMax * 1.1)
    }, {
      // 오른쪽
      plotLines: [plotLineLabel(data.averageSell, 'sell'), plotLineLabel(data.averageBuy, 'buy')],
      title: {
        text: null
      },
      opposite: true,
      // tickInterval: Math.floor(yAxisMax * 1.5),
      tickPixelInterval: 20,
      min: Math.floor(yAxisMin * 0.9),
      max: Math.floor(yAxisMax * 1.3),
      color: yAxisColor,
      gridLineWidth: 0,
      labels: {
        align: 'right',
        useHTML: true,
        style: {
          fontSize: '10px',
          width: 58
        },
        formatter: function formatter() {
          var min = this.axis.min;
          var max = this.axis.max;
          var tickPosition = this.axis.tickPositions;
          var index = tickPosition.indexOf(this.value);

          if (index === 1 || index === tickPosition.length - 2) {
            return this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

          return '';
        },
        x: 58
      }
    }],
    legend: {
      // 범례제거
      enabled: false
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
      },
      series: {
        events: {
          mouseOut: function mouseOut() {
            setTimeout(function () {
              $(".x-plot-date-line").each(function (index) {
                $(this).remove();
                $('.xaxis_label_box').eq(index).remove();
              });
            }, 550);
          }
        }
      }
    }
  };
  highChartOption.colors = [];
  highChartOption.series = [];

  if (isSell) {
    highChartOption.colors.push(sellColor);
    highChartOption.series.push({
      name: '매도',
      type: "area",
      yAxis: 1,
      fillColor: {
        linearGradient: [0, 50, 0, 200],
        stops: [[0, sellGradientColor[0]], [1, sellGradientColor[1]]]
      },
      // enableMouseTracking: false,
      data: sellResult
    });
  }

  if (isBuy) {
    highChartOption.colors.push(buyColor);
    highChartOption.series.push({
      name: '매수',
      type: "area",
      yAxis: 1,
      fillColor: {
        linearGradient: [0, 50, 0, 200],
        stops: [[0, buyGradientColor[0]], [1, buyGradientColor[1]]]
      },
      // enableMouseTracking: false,
      // crisp : true,
      data: buyResult
    });
  }

  return Highcharts.chart(id, highChartOption, function (e) {
    var averages = [];
    var yAxisMin = 158;
    var yAxisMax = 25; // 0

    var bigIndex = 0;
    var smallIndex = 0;
    $("#".concat(id, " .yaxis_label")).each(function (item) {
      var averageObj = {};
      var parentElement = $(this).parent();
      var top = parentElement.css("top").replace(/px/g, '');
      var price = $(this).text().replace(/,/g, '');
      var height = $(this).height();
      var averageNull = $("#" + id).find('.yaxis_label').eq(item).text();

      if (averageNull == 0 || averageNull == '0') {
        $("#" + id).find('.yaxis_label').eq(item).css('display', 'none');
      }

      averageObj = {
        top: parseInt(top),
        price: parseInt(price),
        height: height,
        name: parentElement.hasClass('sell') ? 'sell' : 'buy'
      };
      averages.push(averageObj);
    });
    var bigValue = Math.max.apply(Math, averages.map(function (item) {
      return item.price;
    }));
    bigIndex = averages.findIndex(function (item) {
      return item.price === bigValue;
    });
    var smallValue = Math.min.apply(Math, averages.map(function (item) {
      return item.price;
    }));
    smallIndex = averages.findIndex(function (item) {
      return item.price === smallValue;
    });

    function positionChange(type) {
      // type이 small일 경우에는 높은 값을 위치를 변경
      var selectIndex = type === 'small' ? bigIndex : smallIndex;
      var changeIndex = type === 'small' ? smallIndex : bigIndex;
      var selector = $("#".concat(id, " .yaxis_label")).eq(selectIndex);
      var parentSelector = selector.parent();

      if (type === 'small') {
        parentSelector.css({
          top: averages[changeIndex].top - averages[changeIndex].height
        });
      } else {
        parentSelector.css({
          top: averages[changeIndex].top + averages[changeIndex].height
        });
      }
    }

    if (averages[smallIndex] != null || averages[smallIndex] != undefined || averages[smallIndex] == 0 || averages[bigIndex] != null || averages[bigIndex] != undefined || averages[bigIndex] == 0) {
      if (yAxisMin - averages[smallIndex].height < averages[smallIndex].top) {
        if (averages[smallIndex].top - averages[smallIndex].height < averages[bigIndex].top && averages[smallIndex].top + averages[smallIndex].height > averages[bigIndex].top) {
          positionChange('small');
        }
      } else if (yAxisMax + averages[bigIndex].height > averages[bigIndex].top) {
        if (averages[bigIndex].top - averages[bigIndex].height < averages[smallIndex].top && averages[bigIndex].top + averages[bigIndex].height > averages[smallIndex].top) {
          positionChange('big');
        }
      } else {
        if (averages[bigIndex].top - averages[bigIndex].height < averages[smallIndex].top && averages[bigIndex].top + averages[bigIndex].height > averages[smallIndex].top) {
          positionChange('big');
        }
      }
    }
  });
} //vs chart

/**
 * target - id or class (unique 해야됨)
 * data: {
 *   my: {
 *     percent: number(float, double 등 상관 없음)
 *     price: number
 *   }
 *   closing: number
 *   kiwoom: {
 *     percent: number(float, double 등 상관 없음)
 *     price: number
 *   }
 * }
 * 
*/


function columnVsChart(target, data) {
  if (!target) {
    return alert('잘못된 접근');
  }

  if (!data) {
    return alert('잘못된 접근');
  }

  var maxHeight = 0.8;
  var minHeight = 0.32;
  var myData = data.my;
  var closing = data.closing;
  var kiwoomData = data.kiwoom;

  function selector(bindingTarget) {
    return $(target + ' ' + bindingTarget);
  }

  function html(isRise, percent, price) {
    if (isRise) {
      return "\n              <b>".concat(parseFloat(percent).toFixed(2), "%</b>\n              <span>").concat(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), "\uC6D0</span>\n          ");
    } else {
      return "\n              <span>".concat(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), "\uC6D0</span>\n              <b>").concat(parseFloat(percent).toFixed(2), "%</b>\n          ");
    }
  }

  var myHeight = Math.abs(myData.percent / 100) * maxHeight + 0.32;

  if (myHeight > maxHeight) {
    myHeight = maxHeight;
  }

  if (myHeight < minHeight) {
    myHeight = minHeight;
  }

  if (myData.percent > 0) {
    selector('.my').addClass('up');
    setTimeout(function () {
      selector('.my').css({
        top: myHeight * -1 + 'rem'
      });
    }, 100);
  } else if (myData.percent < 0) {
    selector('.my').addClass('down');
    setTimeout(function () {
      selector('.my').css({
        bottom: myHeight * -1 + 'rem'
      });
    }, 100);
  }

  selector('.my .txt').html(html(selector('.my').hasClass('up'), myData.percent, myData.price));
  var kiwoomHeight = Math.abs(kiwoomData.percent / 100) * maxHeight + 0.32;

  if (kiwoomHeight > 0.8) {
    kiwoomHeight = maxHeight;
  }

  if (kiwoomData.percent > 0) {
    selector('.kiwoom').addClass('up');
    setTimeout(function () {
      selector('.kiwoom').css({
        top: kiwoomHeight * -1 + 'rem'
      });
    }, 100);
  } else if (kiwoomData.percent < 0) {
    selector('.kiwoom').addClass('down');
    setTimeout(function () {
      selector('.kiwoom').css({
        bottom: kiwoomHeight * -1 + 'rem'
      });
    }, 100);
  }

  selector('.kiwoom .txt').html(html(selector('.kiwoom').hasClass('up'), kiwoomData.percent, kiwoomData.price));
  selector('.closing_price_box b').text("".concat(data.closing.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), "\uC6D0"));

  if (myData.percent > 0 && kiwoomData.percent > 0) {
    $(target).addClass('up_all_wrap');
  } else if (myData.percent < 0 && kiwoomData.percent < 0) {
    $(target).addClass('down_all_wrap');
  } else {
    $(target).addClass('cross_wrap');
  }
}

$(".btn_cycle_toggle").on('click', function () {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
  } else {
    $(this).addClass('active');
  }
});

function horizonEqualBarChart(leftValue, rightValue, selector) {
  if (typeof leftValue !== 'number' || typeof rightValue !== 'number') {
    console.log('숫자로 입력');
    return;
  }

  var persent = leftValue / (leftValue + rightValue) * 100;
  var labelSelector = selector.find('.label');
  var barSelector = selector.find('.horizon_bar');
  labelSelector.find('.up').children('span').prop("counter", 0).animate({
    counter: leftValue
  }, {
    duration: 300,
    easing: "swing",
    step: function step(now) {
      now = Number(Math.ceil(now)).toLocaleString('en');
      $(this).text(now);
    }
  });
  labelSelector.find('.down').children('span').prop("counter", 0).animate({
    counter: rightValue
  }, {
    duration: 300,
    easing: "swing",
    step: function step(now) {
      now = Number(Math.ceil(now)).toLocaleString('en');
      $(this).text(now);
    }
  });
  barSelector.children('.buy').css({
    width: persent + '%'
  });
} // share
// https://ui.toast.com/weekly-pick/ko_20190618