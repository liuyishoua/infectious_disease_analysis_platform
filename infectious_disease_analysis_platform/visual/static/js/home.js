// 设置页面转化时间, 单位毫秒
time = 5000
$(function(){
  var num = 0;
  var gun = 0;

  var clone1 = $('.demo1').clone(true);
  $('.home').append(clone1[0]);
  setInterval(function(){
    num++;
    if(num>3){
      num = 1;
      $('.home').css('top', 0);
    }
    gun = num*(-100);
    $('.home').animate({'top': gun + '%'},500);
  },time)
})
