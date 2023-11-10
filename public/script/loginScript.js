$("#admin-login-btn").click(() => {
    // preparedData=$('#admin-login-form').serialize();
    // console.log(preparedData)
    // finalData=preparedData["role"]='admin';
    var checkFlag=true;
    $('.admin-input-field').each(function () {
        if ($(this).val() == "") {
            $(this).addClass("red-border");
            checkFlag = false;
            return;
        }
        $(this).removeClass("red-border");
    })

    if (checkFlag == false) {
        return
    }
    console.log('yes')
    var ajax1 = $.ajax({
        type: 'post',
        url: `/sign-in`,
        data: $('#admin-login-form').serialize() + '&role=admin',
        success: function (data) {
            if (data) {
                $('.noti-content').html(`${data}`)
                if (data.includes('thành công')) {
                    setTimeout(function () {
                        window.location.href = '/';
                    }, 800)
                }
            }
            else {
                $('.noti-content').html(data)
            }
            $('.pop-up').removeClass('hidden')

        }
    })
})

$("#user-login-btn").click(() => {

    // preparedData=$('#user-login-form').serialize();
    // // console.log(preparedData)
    // finalData=preparedData+'&role=user';
    // console.log(finalData)
    var checkFlag=true;
    $('.input-field').each(function () {
        if ($(this).val() == "") {
            $(this).addClass("red-border");
            checkFlag = false;
            return;
        }
        $(this).removeClass("red-border");
    })

    if (checkFlag == false) {
        return
    }
    var ajax1 = $.ajax({
        type: 'post',
        url: `/sign-in`,
        data: $('#user-login-form').serialize() + '&role=user',
        success: function (data) {
            if (data) {
                $('.noti-content').html(`${data}`)
                if (data.includes('thành công')) {
                    setTimeout(function () {
                        window.location.href = '/';
                    }, 800)
                }
            }
            else {
                $('.noti-content').html(data)
            }
            $('.pop-up').removeClass('hidden')
        }
    })
})



$('form').on('keypress', function(event) {
    // console.log(event);
    if (event.keyCode === 13) {
        event.preventDefault();
        if($('.user-tab').hasClass('active')){
            document.getElementById("user-login-btn").click();
        }
        else{
            document.getElementById("admin-login-btn").click();
        }
        return false;
    }
})