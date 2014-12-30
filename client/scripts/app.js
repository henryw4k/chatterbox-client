
var app = {};
app.init= function() {
  app.server = 'https://api.parse.com/1/classes/chatterbox';
};

// send function
app.send = function(message) {
      $.ajax({
        // always use this url
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        // how data is presented
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          //app.refresh();
          $('#chats').empty();
          app.fetch();
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
      roomname: j_roomName,

     };
     app.send(message);
  });

});

// fetch function
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
          var $time = '<span class=time>' + _.escape(data.results[i].createdAt) + '</span>';
          var $roomname = '<span class=room>' + _.escape(data.results[i].roomname) + '</span>';
          // $('.chats').append(data.results[i].username + ": ").append(data.results[i].text).append("<br>");
            $('#chats').append($username + ': ' + $message + $time + $roomname + '<br>');
        }
        //console.log(newdata.results.length);
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message');
      }
    });
};






// LOOK AT CONFIG.JS!!!


// filtering room function
$(document).ready(function(){
  $('button.rooms').on('click', function () {
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
        var uniq_room = [];
        var jFilteredRoomname = $('.filterRoomBox').val();
        for( var i = 0; i < data.results.length; i++ ){
          if( data.results[i].roomname === jFilteredRoomname){
            uniq_room.push(data.results[i]);
          }// if
        }// for

        $('#chats').empty();


        for (var i = 0; i < uniq_room.length; i++) {
          var $username = '<span class = user>'+_.escape(uniq_room[i].username)+'</span>';
          var $message = '<span class = message>'+_.escape(uniq_room[i].text)+'</span>';
          var $time = '<span class=time>' + _.escape(uniq_room[i].createdAt) + '</span>';
          var $roomname = '<span class=room>' + _.escape(uniq_room[i].roomname) + '</span>';
          // $('.chats').append(data.results[i].username + ": ").append(data.results[i].text).append("<br>");
            $('#chats').append($username + ': ' + $message + $time + $roomname + '<br>');
        }
        //console.log(newdata.results.length);
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message');
      }
    }); //ajax
  }); // FILTERING ROOM

  // **** FUNCTIONS ***
app.clearMessages = function() {
  $('#chats').empty();
};

app.addMessage = function(message) {
  var $username = message.username;
  var $message = message.text;
  // var $time = '<span class=time>' + message.createdAt + '</span>';
  var $roomname = message.roomname;
  $('#chats').append($username + ': ' + $message + $roomname + '<br>');
};

app.refresh = function() {
 // $(document).ready(function(){
  $('.refresh').click(function(){
      $('#chats').empty();
      app.fetch();
    // });
  });
};

app.fetch();
app.refresh();
});//dom

var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

// List of HTML entities for escaping.
// Regex containing the keys listed immediately above.
var htmlEscaper = /[&<>"'\/]/g;

// Escape a string for HTML interpolation.
_.escape = function(string) {
  return ('' + string).replace(htmlEscaper, function(match) {
    return htmlEscapes[match];
  });
};

