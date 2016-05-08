// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');

  $('form').on('submit',function(event){
    event.preventDefault();
    var searchTerm = $('#search-term').val().trim();
    console.log('searchTerm',searchTerm);
    function getAlbums(searchTerm){
      var request = $.ajax({
        url:'https://api.spotify.com/v1/search',
        method:'GET',
        data: {
          q:"artist:"+searchTerm,
          type:"album",
          limit:18
        },
        dataType:'json'
      });
      request.done(function(response){
        var albums = response.albums.items;
        var print='';
        $.each(albums,function(i,album){
          var albumName = album.name;
          var albumImage = album.images[1].url;
          var spotifyLink = album.external_urls.spotify;
          print += "<li class='result'><a href='"+ spotifyLink + "'target='_blank'><img src='"+albumImage+"' alt='" + albumName + "'><p class='caption'>"+albumName+"</p></a></li>";
        });
        $(".results").html(print);
      });
    }
    getAlbums(searchTerm);
  })
});
