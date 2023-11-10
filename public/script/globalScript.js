var firebaseConfig = {
  apiKey: "AIzaSyBrKNB747xSRw5sV0ZGK73OFqHAXaFDSKk",
  authDomain: "uploading-img-a8c96.firebaseapp.com",
  projectId: "uploading-img-a8c96",
  storageBucket: "uploading-img-a8c96.appspot.com",
  messagingSenderId: "876723118070",
  appId: "1:876723118070:web:50c07a2b9a9d2a462f31d7"
};

firebase.initializeApp(firebaseConfig);

$('.fa-window-close').click(function(){
    $('.noti-content').html('')
    $('.pop-up-graph').toggleClass('visibility-hidden')
    if(!($('.pop-up').hasClass('hidden'))){
      $('.pop-up').addClass('hidden')
    }
  })


  $('.pop-up').click(function()
  {
    $(this).addClass('hidden')
  
  })
  
  $('.popup-container').click(function(event)
  {
    event.stopPropagation()
  })

  

$('.container-pos').click(function()
{
  $(this).addClass('hidden')

})

$('#invoice-POS').click(function(event)
{
  event.stopPropagation()
})


$('.graph-btn').click(function(){
  $('.pop-up-graph').toggleClass('visibility-hidden')
})


