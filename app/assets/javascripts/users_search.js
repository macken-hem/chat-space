$(function() {
  
  function buildUsersHTML(users){
    var html = `<div class="chat-group-user clearfix">
               <p class="chat-group-user__name">${users.name}</p>
               <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${users.id}" data-user-name="${users.name}">追加</a>
               </div>`
    return html;
  }

  function appendNotFind(users){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${users}</p>
                </div>`
    return html;
  }

  function appendNotUser(users){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${users}</p>
                </div>`
    return html;
  }

  function addUser(name,user_id) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id="chat-group-user-${user_id}">
               <input name="group[user_ids][]" type="hidden" value="${user_id}">
               <p class="chat-group-user__name">${name}</p>
               <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn data-user-id=${user_id} data-user-name=${name}"> 削除</a>
              </div>`
    $("#chat-group-users").append(html);
  }

  
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
     $("#user-search-result").empty()
     if (users.length !== 0) {
      users.forEach(function(user){
      var html = buildUsersHTML(user)
        $(`#user-search-result`).append(html)
      })
     }

     else if(input.length === 0){
      var html = appendNotFind("")
      $(`#user-search-result`).append(html);
     }
     
     else {
      var html = appendNotUser("一致するユーザーがいません")
       $(`#user-search-result`).append(html);
     }
     })
     .fail(function() {
      alert('検索に失敗しました');
   })
  });


  $("#user-search-result").on("click", ".chat-group-user__btn--add", function(e){
    var name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    addUser(name,user_id);
    $(this).parent().remove();
  });
  $("#chat-group-users").on("click", ".js-remove-btn", function(e){
    $(this).parent().remove();
  });
});
