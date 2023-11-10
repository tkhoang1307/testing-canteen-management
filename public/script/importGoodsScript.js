function setDate() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  var today = year + "-" + month + "-" + day;
  $(".mf-date").each(function(){
    $(this).attr("value", today);
  })
}
setDate();
count = 2;
$(".add-new-line").click(function () {
  var clone = $("#row-1").clone();
  clone.attr("id", `row-${count}`);
  for (i = 0; i < 2; i++) {
    clone.children("input").eq(i).val("");
  }

  clone.children().last().attr("id", `delete-btn-${count}`);
  clone.children().last().prev('input').attr("id",`date-${count}`)
  $(".import-good-main-panel").append(clone);
  count++;
  setDate();

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
    $(this).parent().remove();
    count--;
  }
});

$("input").on("change", function () {
  if ($(this).val() != "") {
    $(this).removeClass("red-border");
  }
});

$("#confirm-btn").click(function () {
  var checkFlag = true;
  var categoryArr = [];
  var amountArr = [];
  var priceArr = [];
  var mfDateArr = [];
  $(".category-field").each(function () {
    if ($(this).val() == "" && !$(this).prop('disabled',false)) {
      $(this).addClass("red-border");
      checkFlag = false;
      return;
    }
    $(this).removeClass("red-border");
    categoryArr.push($(this).val());
  });

  $(".amount-field").each(function () {
    if ($(this).val() == "" && !$(this).prop('disabled',false)) {
      $(this).addClass("red-border");
      checkFlag = false;
      return;
    }
    $(this).removeClass("red-border");
    amountArr.push($(this).val());
  });

  $(".price-field").each(function () {
    if ($(this).val() == "" && !$(this).prop('disabled',false)) {
      $(this).addClass("red-border");
      checkFlag = false;
      return;
    }
    $(this).removeClass("red-border");
    priceArr.push($(this).val());
  });

  $(".mf-date").each(function () {
    if ($(this).val() == "" && !$(this).prop('disabled',false)) {
      $(this).addClass("red-border");
      checkFlag = false;
      return;
    }
    $(this).removeClass("red-border");
    mfDateArr.push($(this).val());
  });
  if (checkFlag == false) {
    return;
  } else {
    $.ajax({
      method: "post",
      data: {
        category: categoryArr,
        amount: amountArr,
        price: priceArr,
        mfDate: mfDateArr,
      },
      url: "/import-goods",
      success: function (data) {
        if(data.trangthai){
          $('.noti-content').html(`Thao tác thành công. <br>Mã đơn hàng của bạn: ${data.trangthai}`)
        }
        else{
          $('.noti-content').html(data)
        }
        $('.pop-up').removeClass('hidden')
      },
    });
  }
});

