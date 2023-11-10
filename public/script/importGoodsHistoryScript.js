$('#search-receipt-btn').click(function(){
    window.location.href=`/import-goods-history?searchID=${$('#search-rec-id').val()}`
})

$('#search-rec-id').on('keypress', function(event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector("button#search-receipt-btn").click();
        return false;
    }
})
$('.add-new-rec').click(function(){
    window.location.href=`/import-goods`
})