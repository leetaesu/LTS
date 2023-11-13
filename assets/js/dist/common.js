"use strict";

// resume-item recently
var recently_flag = false;

function recently(e) {
  if (recently_flag) {
    $(e).text('전체 근무 경력 보기');
    $(e).removeClass('btn-primary');
    $(e).addClass('btn-dark');
    $('.resume-title').hide();
    $('.resume-item').hide();
    $('.recently').show();
    recently_flag = false;
  } else {
    $(e).text('최근 3년 근무 경력만 보기');
    $(e).addClass('btn-primary');
    $(e).removeClass('btn-dark');
    $('.resume-title').show();
    $('.resume-item').show();
    recently_flag = true;
  }
}