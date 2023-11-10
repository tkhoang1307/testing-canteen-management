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

    $('.change-user-balance-btn').click(
        function(){
            const line_id=$(this).attr('line-id');
            if($(`input[line-id=${line_id}]`).hasClass('user-info-display')){
                $(`input[line-id=${line_id}]`).removeAttr('disabled').removeClass('user-info-display');
            }
            else{
                $(`input[line-id=${line_id}]`).addClass("user-info-display");
                $(`input[line-id=${line_id}]`).attr('disabled','');
          
            }
         
        }
    ),
    $('.user-balance').click(
        function(){
            var currency =$(this).val();
            var number = Number(currency.replace(/[^0-9-]+/g,""));
            $(this).val(number)

        }
    )
    $('.user-balance').change(
        function(){
            $(this).attr('change-balance','');
        }
    )
    $('.update-user-balance-submit').click(
        function(){
            var users=[];
            var index=0;
            var checkFlag=true
            $("input[change-balance='']").each(
                function(){
                    var id =$(this).attr('line-id');
                    var balance=$(this).val();
                    index++;
                    console.log(id, balance);
                    users[index]={'id':id,'balance':balance}
                    if(balance==''){

                        checkFlag=false
                    }
                }
            )
            if(checkFlag==false){
                $('.noti-content').html(`Vui lòng không để trống số dư`)
                $('.pop-up').removeClass('hidden')
                return;
            }
            if(users.length==0){
                $('.noti-content').html(`Oops! Bạn chưa thực hiện thay đổi`)
                $('.pop-up').removeClass('hidden')
                return;
            }
            $.ajax({
                method: "post",
                data: {
                    users:users
                },
                url: "/manage-users",
                success: function (data) {
                  $('.noti-content').html(data);
                  $('.pop-up').removeClass('hidden')
                  $('.fa-window-close').click(function () {
                    window.location.reload()
                  })
          
                },
              });
        }
    )
});
