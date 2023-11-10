var firebaseConfig = {
  apiKey: "AIzaSyBrKNB747xSRw5sV0ZGK73OFqHAXaFDSKk",
  authDomain: "uploading-img-a8c96.firebaseapp.com",
  projectId: "uploading-img-a8c96",
  storageBucket: "uploading-img-a8c96.appspot.com",
  messagingSenderId: "876723118070",
  appId: "1:876723118070:web:50c07a2b9a9d2a462f31d7",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

async function uploadImage(file) {
  const ref = firebase.storage().ref();
  const name = +new Date() + "-" + file.name;
  const metadata = {
    contentType: file.type,
  };

  try {
    const task = ref.child(name).put(file, metadata);
    await task;
    return await task.snapshot.ref.getDownloadURL();
  } catch (err) {
    return err;
  }
}

$("#confirm-btn-1").click(async function () {
  var ma_loai_hang = $("#category-field-1").val();
  var ten_mat_hang = $("#name-1").val();
  var tien_loi = $("#price-1").val();
  var han_su_dung=$("#life-span").val();
  if (
    $("#img-1")[0].files[0] &&
    ma_loai_hang != "" &&
    ten_mat_hang != "" &&
    tien_loi != "" && han_su_dung !=""
  ) {
    img_url = await uploadImage($("#img-1")[0].files[0]);
    if (img_url.includes("https")) {
      $.ajax({
        method: "post",
        data: {
          type: "matHang",
          ma_loai_hang: ma_loai_hang,
          ten_mat_hang: ten_mat_hang,
          tien_loi: tien_loi,
          img_url: img_url,
          han_su_dung:han_su_dung
        },
        url: "/add-new-item",
        success: function (data) {
          $(".noti-content").html(data);

          $(".pop-up").removeClass("hidden");
          $(".fa-window-close").click(function () {
            window.location.reload();
          });
        },
      });
    }
  }
});

$("#add-good-btn").click(function () {
  $("#row-1").removeClass("hidden");
  $("#row-2").addClass("hidden");
  $(this).removeClass("fade-out");
  $("#add-food-btn").addClass("fade-out");
});

$("#add-food-btn").click(function () {
  $("#row-2").removeClass("hidden");
  $("#row-1").addClass("hidden");
  $(this).removeClass("fade-out");
  $("#add-good-btn").addClass("fade-out");
});

$("#confirm-btn-2").click(async function () {
  ten_mon_an = $("#name-2").val();
  gia_ban = $("#price-2").val();
  if ($("#img-2")[0].files[0] && ten_mon_an != "" && gia_ban != "") {
    img_url = await uploadImage($("#img-2")[0].files[0]);
    if (img_url.includes("https")) {
      $.ajax({
        method: "post",
        data: {
          type: "monAn",
          ten_mon_an:ten_mon_an,
          gia_ban: gia_ban,
          img_url: img_url,
        },
        url: "/add-new-item",
        success: function (data) {
          $(".noti-content").html(data);

          $(".pop-up").removeClass("hidden");
          $(".fa-window-close").click(function () {
            window.location.reload();
          });
        },
      });
    }
  }
});
