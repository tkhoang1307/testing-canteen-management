count = 2;

function convertToVND(value) {
  try {
    value = value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

    return value
  } catch (error) {
    return value
  }
  
}
$(".add-new-line").click(function () {
  var clone = $("#row-1").clone();
  clone.attr("id", `row-${count}`);
  for (i = 0; i < 2; i++) {
    clone.children("input").eq(i).val("");
  }

  clone.children().last().attr("id", `delete-btn-${count}`);
  clone.children().last().prev("input").attr("id", `date-${count}`);
  // clone.children('.category-field').attr("id",`category-${count}`)
  // clone.children('.category-field').attr("id",`category-${count}`)
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

  $(".category-field").on("change", function (e) {
    var id = this.value;
    clone = $(this);
    $.ajax({
      method: "POST",
      data: {
        id: id,
      },
      url: "/create-new-bill",
      success: function (data) {
        if (data[0].so_luong && data[0].gia_ban_ra) {
          sl = data[0].so_luong;
          gia = data[0].gia_ban_ra;
          gia=convertToVND(gia)
          clone.siblings(".price-field").val(gia);
          clone.siblings(".remain-amount-field").val(sl);
        }
      },
    });
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
  var idArr = [];
  var amountArr = [];
  checkFlag = true;
  $(".category-field").each(function () {
    if ($(this).val() == "") {
      checkFlag = false;
    }

    idArr.push($(this).val());
  });

  $(".amount-field").each(function () {
    if ($(this).val() == "") {
      checkFlag = false;
    }

    amountArr.push($(this).val());
  });

  if (checkFlag == false) {
    return;
  } else {
    $.ajax({
      type: "post",
      data: {
        command: "taoDonHang",
        id: idArr,
        amount: amountArr,
      },
      url: "/create-new-bill",
      success: function (data) {
        if (data.result == "OK") {
          console.log(data.orderID);
          $("#orderID").html(`Mã đơn hàng: ${data.orderID}`);
          $(".noti-content").html(`Tạo đơn thành công<br>Mã đơn hàng: ${data.orderID}`);
          // window.location.href='/shopping-cart'

          // $("#qr-order").attr(
          //   "src",
          //   `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data.orderID}`
          // );

          
          // window.location.reload()
          $(".pop-up").removeClass("hidden");
          $("#view-receipt-btn").removeClass("hidden");
        } else {
          console.log(data);
        }
      },
    });
  }
});

$(".category-field").on("change", function (e) {
  var id = this.value;
  clone = $(this);
  $.ajax({
    method: "POST",
    data: {
      id: id,
    },
    url: "/create-new-bill",
    success: function (data) {
      if (data[0].so_luong && data[0].gia_ban_ra) {
        sl = data[0].so_luong;
        gia = data[0].gia_ban_ra;
        gia=convertToVND(gia)
        clone.siblings(".price-field").val(gia);
        clone.siblings(".remain-amount-field").val(sl);
      }
    },
  });
});
