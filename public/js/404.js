const pageX = $(document).width();
const pageY = $(document).height();
let mouseY = 0;
let mouseX = 0;

$(document).on('mousemove', (event) => {
  mouseY = event.pageY;
  const yAxis = (pageY / 2 - mouseY) / pageY * 300;
  mouseX = event.pageX / -pageX;
  const xAxis = -mouseX * 100 - 100;

  $('.box__ghost-eyes').css({
    transform: `translate(${xAxis}'%,-${yAxis}%)`,
  });
});
