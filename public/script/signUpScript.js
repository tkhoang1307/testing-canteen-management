$(document).ready(function () {
    $('.form-check-input').attr('checked', true)
    $('.form-check-input').click(
        function () {
            if ($('.form-check-input').attr('checked')) {
                $('.form-check-input').removeAttr("checked");
            }
            else {
                $('.form-check-input').attr("checked", '');
            }
        }
    )
})

$('#sign-up-btn').click((e) => {

    e.preventDefault();
    var checkFlag = true
    password = $('#password').val();
    confirmPassword = $('#confirm-password').val();
    $('.input-field').each(function () {
        if ($(this).val() == "") {
            $(this).addClass("red-border");
            checkFlag = false;
            return;
        }
        $(this).removeClass("red-border");
    })
    if (!$('.form-check-input').attr('checked')) {
        $('.form-check-input').addClass("red-border");
        checkFlag = false;
        return

    }
    else {
        $('.form-check-input').removeClass("red-border");
    }
    if (checkFlag == false) {
        return
    }
    else {
        if (password == confirmPassword) {
            var ajax1 = $.ajax({
                type: 'post',
                url: `/sign-up`,
                data: $('#sign-up-form').serialize(),
                success: function (data) {
                    window.alert(data);
                    $('.update-product-popup').removeClass('show').addClass('hidden');
                    window.location.reload();
                }
            })
        }
        else{
            $('#confirm-password').addClass("red-border");
            return
        }
    }

});
$('form').on('keypress', function(event) {
    // console.log(event);
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("sign-up-btn").click();
        return false;
    }
})