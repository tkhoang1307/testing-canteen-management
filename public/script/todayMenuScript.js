

count = 0;
$(document).ready(
    function(){
        var row=1;
        $('.input-row').each(
            function(){
                count++;
                $(this).attr('id',`row-${row}`)
                row++
            }
        )
        $('.option-val').each(   
            function(){
                if($(this).val()==$(this).parent().attr('curr-value')){
                    $(this).attr('selected','');
                }
            }
        )
    }
)
$(".add-new-line").click(function () {
    var clone = $("#row-1").clone();
    clone.attr("id", `row-${count+1}`);
    for (i = 0; i < 2; i++) {
        clone.children("input").eq(i).val("");
    }

    clone.children().last().attr("id", `delete-btn-${count}`);

    $(".import-good-main-panel").append(clone);
    count++;

    $(".fa-delete-left").click(function () {
        if (!$(this).attr("id").includes("btn-1")) {
            $(this).parent().remove();
            count--;
        }
    });

    $("input").on("change", function () {
        if ($(this).val() != "") {
            $(this).removeClass("red-border");
        }
    });
});

$(".fa-delete-left").click(function () {
    if (!$(this).attr("id").includes("btn-1")) {
        console.log( $(this).parent())
        $(this).parent().remove();
        count--;
    }
});

$("input").on("change", function () {
    if ($(this).val() != "") {
        $(this).removeClass("red-border");
    }
});

$("#today-menu-confirm-btn").click(function () {
    var checkFlag = true;
    var categoryArr = [];
    var amountArr = [];
    $(".category-field").each(function () {

        for(var i=0;i<categoryArr.length;i++){
            if($(this).val()==categoryArr[i]){
                $(this).addClass("red-border");
                checkFlag = false;
                return
            }
        }
        if ($(this).val() == "") {
            $(this).addClass("red-border");
            checkFlag = false;
            return;
        }
        $(this).removeClass("red-border");
        categoryArr.push($(this).val());
    });

    $(".amount-field").each(function () {
        if ($(this).val() == "") {
            $(this).addClass("red-border");
            checkFlag = false;
            return;
        }
        $(this).removeClass("red-border");
        amountArr.push($(this).val());
    });



    if (checkFlag == false) {
        return;
    } else {
        $.ajax({
            method: "post",
            data: {
                id: categoryArr,
                amount: amountArr,

            },
            url: "/today-menu",
            success: function (data) {
                $('.noti-content').html(data)
                $('.pop-up').removeClass('hidden')
                $('.fa-window-close').click(function () {
                    window.location.reload()
                  })
            },
        });
    }
});

