$('.month-select').change(function(){
    month=$(this).val()
    window.location.href= `/statistic?month=${month}`
})