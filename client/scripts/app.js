
var app = {};
app.init= function() {
  app.server = 'https://api.parse.com/1/classes/chatterbox';
};

app.fetch= function() {
  $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      // how we extract data - by reverse chronological order
      // how data is presented
      data: {
        order: "-createdAt"
      },
      success: function (data) {
        console.log('chatterbox: got the message');
        console.log(data);

        for (var i = 0; i < data.results.length; i++) {
          var $username = '<span class = user>'+data.results[i].username+'</span>';
          var $message = '<span class = message>'+data.results[i].innerText+'</span>';
          var $time = '<span class=time>' + data.results[i].createdAt + '</span>'
          // $('.chats').append(data.results[i].username + ": ").append(data.results[i].text).append("<br>");
            $('.chats').append($username + ': ' + $message + $time + '<br>');
        }
        console.log(data.results.length);
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message');
      }
    });
};


app.refresh = function() {
 $(document).ready(function(){
  $('.refresh').click(function(){
      $('.chats').empty();
      app.fetch();
    });
});


};
// var message = {
//       // createdAt: "2013-10-07T17:24:40.668Z",
//       // objectId: "8noEr4Pu8J",
//       username: 'jillian',
//       text: 'hello',
//       roomname: 'lobby'
//       // updatedAt: "2013-10-07T17:24:40.668Z",
//     };//message from input form
  // var message = {
  //   username: $('userBox').val(),
  //   text: $('textBox').val(),
  //   roomname: $('roomBox').val()
  // };
    var message = {
    username: "sup brotthhhaa",
    text: "duueeeedddeeerrr",
    roomname: "rooommmmmm"
  };
app.send = function() {
    $('.send').click(function(){
      $.ajax({
        // always use this url
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        // how data is presented
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          // console.log($('.textBox').val());
          // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }
      });
    });
  }


app.fetch();
app.refresh();
app.send();

