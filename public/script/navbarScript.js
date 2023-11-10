$('#sign-out-btn').click(()=>{
    location.replace('/sign-out');
})

$('.sign-up-btn').click(()=>{
    location.replace('/sign-up');
})

$('.sign-in-btn').click(()=>{
    location.replace('/sign-in');
})

$('#user-avatar-btn').click(()=>{
    var ajax1 = $.ajax({
        type: 'post',
        url: `/user-profile`,
        success: function (data) {
            var value = convertToVND(data[0].so_du)
            console.log(data[0])
            $('#user-balance').html('Số dư tài khoản: '+ value);
            // $('#user-avatar-img').attr('src',`${data[0].img_url}`);
        }
    })
})

function convertToVND(value) {
    try{
        value = value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

        return value
    }catch(err){
        return value
    }

}

$('#search-product-btn').click(function(e)
{
    console.log('hahaha')
    const key = $('#search-key').val()
    console.log(key)
    window.location.href=`/search-goods?key=${key}`
    // $.ajax({
    //     method:'get',
    //     data:{key:key},
    //     url:`/search-goods?key=${key}`,
    
    // })
})

$('#shopping-cart').click(function(){
    console.log('tui ne haha')
    window.location.href = "/shopping-cart"
})


function openNav() {
    $("#mySidenav").css('width',"400px");
}

function closeNav() {
    $("#mySidenav").css('width',"0px");
}
$('.close-btn-container').click(function(){
    closeNav()
})
$('#close-nav-btn').click(function(){
    closeNav()
})

$('#menu-icon').click(function(){
    openNav()
})


$('input.search-field').on('keypress', function(event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector("button.search-items").click();
        return false;
    }
})


$('#recharge-btn').click(function(e)
{
    console.log('hahaha')
    window.location.href = '/recharge'
})

$('#search-receipt-btn').click(function(){
    window.location.href = `/trading-details?id=${$('#search-id-key').val()}`
    
})
$('#cart-history-btn').click(function(){
    window.location.href='/tradings-history'
})