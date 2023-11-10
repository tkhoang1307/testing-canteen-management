$('.custom-fc').click(function(){
    window.location.href= `/trading-details?id=${$(this).attr('value')}`
})

$('#search-receipt').click(function(){
    if($('#search-rec-id').val()!=""){
        window.location.href= `/trading-details?id=${$('#search-rec-id').val()}`
    }
    
})