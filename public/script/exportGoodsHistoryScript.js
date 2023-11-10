$('#search-receipt-btn-2').click(function(){
    window.location.href=`/export-goods-history?searchID=${$('#search-rec-id').val()}`
})
$('.add-new-rec').click(function(){
    window.location.href=`/import-goods`
})
$('#search-rec-id').on('keypress', function(event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector("button#search-receipt-btn").click();
        return false;
    }
})