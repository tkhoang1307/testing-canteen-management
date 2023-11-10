$(document).ready(function () {
    $('.filterable .btn-filter').click(function () {
        var $panel = $(this).parents('.filterable'),
            $filters = $panel.find('.filters input'),
            $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    });

    $('.filterable .filters input').keyup(function (e) {
        /* Ignore tab key */
        var code = e.keyCode || e.which;
        if (code == '9') return;
        /* Useful DOM data and selectors */
        var $input = $(this),
            inputContent = $input.val().toLowerCase(),
            $panel = $input.parents('.filterable'),
            column = $panel.find('.filters th').index($input.parents('th')),
            $table = $panel.find('.table'),
            $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        var $filteredRows = $rows.filter(function () {
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();
        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
        $rows.show();
        $filteredRows.hide();
        /* Prepend no-result row if all rows are filtered */
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
        }
    });
    $(".fa-delete-left").click(function () {
        if (!$(this).attr("id").includes("btn-1")) {
            $(this).parent().parent().parent().attr('deleted','true');
            $('.pop-up').removeClass('hidden')
            $('.confirm-delete').removeClass('hidden')
        }
    });

    $('.confirm-delete').click(
        function(){
           const id= $('tr[deleted=true]').attr('ProID');
           $('.confirm-delete').addClass('hidden')
           $('.pop-up').addClass('hidden')
           console.log(id);
        //    $.ajax({
        //     method: "post",
        //     data: {
        //         id: categoryArr,
        //         amount: amountArr,

        //     },
        //     url: "/today-menu",
        //     success: function (data) {
        //         $('.noti-content').html(data)
       
        //         $('.pop-up').removeClass('hidden')
        //         $('.fa-window-close').click(function () {
        //             window.location.reload()
        //           })
        //     },
        // });
        }
    )
    $('#show-details-btn').click(
        function(){
            window.location.href='/in-stock?section=details'
            //window.location.reload()
        }
    )
    
});
