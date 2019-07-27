$(function() {
  $('form').on('submit', function() {
    console.log($('form'))
    $.ajax({
      method: 'POST',
      url: 'user',
      data: {
        name: $("input[name='name'").val(),
        age: $("input[name='age'").val(),
        gender: $("input[name='gender'").val()
      },
      success: function() {
        window.location.reload()
      }
    })

    return false
  })

  $('.delete-btn').on('click', function() {
    console.log($(this).attr('user-name'))
    var userName = $(this).attr('user-name')
    $.ajax({
      method: 'DELETE',
      url: `/user/${userName}`,
      success: function() {
        console.log('delete success')
        window.location.reload()
      }
    })
  })
})
