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