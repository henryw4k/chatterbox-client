
var app = {};

// List of HTML entities for escaping.
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

// Regex containing the keys listed immediately above.
var htmlEscaper = /[&<>"'\/]/g;

// Escape a string for HTML interpolation.
_.escape = function(string) {
  return ('' + string).replace(htmlEscaper, function(match) {
    return htmlEscapes[match];
  });
};

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
        // console.log('chatterbox: got the message');
        // console.log(data);

        for (var i = 0; i < data.results.length; i++) {
          var $username = '<span class = user>'+_.escape(data.results[i].username)+'</span>';
          var $message = '<span class = message>'+_.escape(data.results[i].text)+'</span>';
          var $time = '<span class=time>' + _.escape(data.results[i].createdAt) + '</span>'
          // $('.chats').append(data.results[i].username + ": ").append(data.results[i].text).append("<br>");
            $('.chats').append($username + ': ' + $message + $time + '<br>');
        }
        //console.log(newdata.results.length);
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


// LOOK AT CONFIG.JS!!!
app.send = function(message) {
      $.ajax({
        // always use this url
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        // how data is presented
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {

        },
        error: function (data) {

          // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }
      });
  };

$(document).ready(function(){
  $('button.send').on('click', function () {
     var j_username = $('.userBox').val();
     var j_texts = $('.messageBox').val();
     var j_roomName = $('.roomBox').val();

     console.log("send button works");

     var message = {
      username: j_username,
      text: j_texts,
      roomname: j_roomName
     };
     app.send(message);
  });

});


app.fetch();
app.refresh();

