$('#add-to-cart').click(function()
{
    // console.log('hahaha')
    const id = $('.product-detail').attr('id')
    const quantity = $('#quantity').val()
    const name = $('.name-product').text()
    $.ajax({
        method: 'post',
        url: '/item-detail',
        data: {id: id,quantity:quantity,name:name},
        success: function(data)
        {
          // console.log('hhaha',data.name)
          if(data.name==false){
            $('.noti-content').html('Vui lòng đăng nhập')
            $('.pop-up').removeClass('hidden')
            $('.fa-window-close').click(
              function(){
                window.location.href='/sign-in'
              }
            )
          }else{
            console.log(data.name)
            if(data.name){
                $('.noti-content').html(`Thêm mặt hàng thành công. <br>Chi tiết: ${data.name} - Số lượng: ${quantity}`)
              }
              else{
                $('.noti-content').html(data)
              }
            console.log(data)
            $('.pop-up').removeClass('hidden')
          }


        }
    })
    // console.log(id,quantity)
})

$('#payment-now').click(function(e)
{
  const id = $('.product-detail').attr('id')
  const quantity = $('#quantity').val()
  const name = $('.name-product').text()
  console.log(id,quantity,name)


  $.ajax({
    method: 'post',
    url: '/item-detail',
    data: {id: id,quantity:quantity,name:name},
    success: function(data)
    {
        console.log(data.name)

        window.location.href = '/shopping-cart'
        // if(data.name){
        //     $('.noti-content').html(`Thêm mặt hàng thành công. <br>Chi tiết: ${data.name} - Số lượng: ${quantity}`)
        //   }
        //   else{
        //     $('.noti-content').html(data)
        //   }
        // console.log(data)
        // $('.pop-up').removeClass('hidden')

    }
})

})

