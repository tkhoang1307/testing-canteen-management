// console.log('hehe')
const WEB = "https://nhom24-qlct.onrender.com"

$("#search-id-btn").click(function () {
  if ($("#id-order-search-field").val() != "") {
    window.location.href = `?id=${$("#id-order-search-field").val()}`;
  }
});
$("#print-bill").click(function () {

  id=$('.infor-container').attr('id')
  console.log(id)
  $.ajax({
    method: "post",
    data: {
        id:id
    },
    url: "/trading-details",
    success: function (data) {
      $('.pop-up').removeClass('hidden')
      $('.noti-content').html(data)
      setTimeout(function(){
        // window.location.reload()
        $('.pop-up').addClass('hidden')
        },1500)
      setTimeout(function(){
        // window.location.reload()
        $('#qr-order').attr("src", `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${WEB}/trading-details?id=${id}`);

        $('.container-pos').removeClass('hidden')
        },1500)

        // setTimeout(function(){
        //   // $('.pop-up').removeClass('hidden')
        //   window.location.reload()
        // },1500)
       
    },
});
});

$('#invoice-POS').click(function(event)
{
  event.stopPropagation()
})

$('.container-pos').click(function()
{
  window.location.reload()
  $(this).addClass('hidden')

})
