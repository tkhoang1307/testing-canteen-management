$('.item-result').click(function()
{
    const id = $(this).attr('id')
    window.location.href=`/item-detail?id=${id}`
    console.log(id)
})