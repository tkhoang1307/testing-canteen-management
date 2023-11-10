$('#search-receipt-btn').click(function(){
    window.location.href=`/customer-cart-history?searchID=${$('#search-rec-id').val()}`
})

$('#search-rec-id').on('keypress', function(event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector("button#search-receipt-btn").click();
        return false;
    }
})