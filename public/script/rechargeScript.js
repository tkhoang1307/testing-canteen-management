
function convertToVND(value) {
    value = value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

    return value
}
$('#recharge-balance-btn').click(function () {
    console.log('hehehe')
    var id = $('#bankcode').val()
    var value = $('#amount').val()



    if(id == 0)
    {
        $(".noti-content").html('Vui lòng chọn nhà mạng');
        $('.pop-up').removeClass('hidden')
    }
    else if( id != 0 &&  value == '')
    {
        $(".noti-content").html('Vui lòng nhập mã thẻ');
        $('.pop-up').removeClass('hidden')
    }
    else{
        $.ajax({
            method: 'post',
            url: '/recharge',
            data: { idBank: id, val: value },
            success: function (data) {
                if (data.res == 'success') {
                    var value = convertToVND(data.balance[0].so_du)
                    $(".noti-content").html(`Nạp tiền thành công <br>
                                            Số dư hiện tại: ${value}
    
                    `);
                    
                }
                else {

                    $(".noti-content").html('Nạp tiền thất bại<br>Mã thẻ không hợp lệ!');
                    
                }
                $('.pop-up').removeClass('hidden')
            }
        })
    }
    console.log(id, value)
    
})