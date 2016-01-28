angular.module('Anno')
    .controller('HeaderCtrl', ['$scope', function($scope) {

    	$('body').on('click', '.header-menu a', function() {
    		$('.header-menu a.active').removeClass('active');
    		$(this).addClass('active');
    	});

    	$('body').on('click', '.login-wrapper', function() {
    		$('.header-menu a.active').removeClass('active');
    	})

    	$('select[name="color-theme"]').on('change', function() {
    		$(this).css('background-color', $(this).val());

    		$('html').fadeOut(400);
    		setTimeout( function() {
    			$('html').attr('id', $('select[name="color-theme"] option:selected').attr('class') + '-theme');
    		}, 410);
    		$('html').fadeIn(400);
    	});

    	var images = [
	    	{
	    	    artist: "Birdy",
	    	    song: "Skinny love",
	    	    img: "../images/artists/birdy.jpg"		
			},
			{
				artist: "Hozier",
				song: "Take me to church",
	    	    img: "../images/artists/hozier.jpg"
			},
			{
				artist: "Godsmack",
				song: "Voodoo",
	    	    img: "../images/artists/godsmack.jpg"
			},
			{
				artist: "Moby",
				song: "Flower",
	    	    img: "../images/artists/moby.jpg"
			},
			{
				artist: "Sum 41",
				song: "Walking Disaster",
	    	    img: "../images/artists/sum41.jpg"
			}
		]

		var counter = 0;

    	setInterval( function() {
    		$('.artist-name').addClass("to-the-left");
    		$('.artist-song').addClass("to-the-right");
    		$('.homepage-slider img.first').fadeOut(50);

    		setTimeout(function() {
    			$('.homepage-slider img.second').fadeIn(50);
    		}, 30);

    		setTimeout( function() {
    			$('.homepage-slider img.first').attr('src', images[counter].img);
    			$('.homepage-slider .artist-name').text(images[counter].artist);
    			$('.homepage-slider .artist-song').text(images[counter].song);
    			$('.artist-name').removeClass('to-the-left');
    			$('.artist-song').removeClass('to-the-right');
    			$('.homepage-slider img.first').fadeIn(0);
    			$('.homepage-slider img.second').fadeOut(0);
    		}, 200);

    		setTimeout(function() {
    			$('.homepage-slider img.second').attr('src', counter < images.length-1 ? images[counter+1].img : images[0].img);
    		}, 300);

    		counter++;
    		if (counter >= images.length) counter = 0;
    	}, 5000);

        $('body').on('keyup','#autocomplete', function() {
           $scope.autocompleteList = []; 
            var data = {
                auto: $('#autocomplete').val()
            }
            
            if(data.auto == "" || data.auto == " ")
                $('.add-color').css('display','none');
            $.ajax({
                method: "POST",
                url: "/api/autocomplete",
                dataType: "json",
                data: data,
                success: function(res) {
                 for (var i = 0; i < res.length; i++) {
                    $scope.autocompleteList.push({id: res[i].id, name: res[i].name, artist: res[i].artist});
                 };
                 $scope.$apply();
                }
            });
        });
	}])
	.controller('HomepageCtrl', ['$scope', function($scope) {
		$(document).ready(function() {
			$('html').niceScroll();
			$('html').getNiceScroll().resize();
		});
	}])
    .controller('SongCtrl', ['$scope', 'SongService', function($scope, SongService) {
        $(document).ready(function() {
            $('html').niceScroll();
            $('html').getNiceScroll().resize();
            $('wave').niceScroll();
            $('wave').getNiceScroll().resize();
        });

        $('body').on('click', 'a', function() {
            wavesurfer.destroy();
        })

        var wavesurfer = WaveSurfer.create({
            container: '#song',
            waveColor: '#e6b800',
            progressColor: '#d2a800',
        });

        wavesurfer.on('ready', function() {
            $('.vinyl').fadeOut(500);
            setTimeout(function() {
                $('#song').css('opacity', 1);
            }, 250);

            setTimeout(function() {
                wavesurfer.play();
                $('.control-button span').removeClass('glyphicon-play');
                $('.control-button span').addClass('glyphicon-pause');
            }, 750);
        });

        wavesurfer.on('finish', function() {
            $('.control-button span').removeClass('glyphicon-pause');
            $('.control-button span').addClass('glyphicon-play');
        });

        $('body').on('click', '.control-button', function() {
            wavesurfer.playPause();
            $(this).find('span').toggleClass('glyphicon-play');
            $(this).find('span').toggleClass('glyphicon-pause');
        });

        $('body').on('keyup', '.add-annotation textarea, .add-annotation input', function() {
            if ($('.add-annotation textarea').val() != '' && $('.add-annotation input').val() != '') $('.overlay').fadeOut(300);
            else $('.overlay').fadeIn(300);
        });

        $('body').on('click', '.add-annotation button', function() {
            if ($('.add-annotation textarea').val() != '' && $('.add-annotation input').val() != '') {
                var data = {
                    comment: $('.add-annotation textarea').val(),
                    tags: $('.add-annotation input').val()
                }

                $.ajax({
                    method: "POST",
                    url: "/api/song/" + $scope.id,
                    dataType: "json",
                    data: data,
                    success: function(res) {
                        $('.add-annotation textarea').val('');
                        $('.add-annotation input').val('');
                        $('.overlay').fadeIn(300);

                        $('.annotation-wrapper').prepend("<div class='hidden-anno annotation theme-border-color'><div class='user-tags'><div class='annotation-icon theme-background-color'><span class='glyphicon glyphicon-eye-open'></span></div>anonymous - " + data.tags + "</div><div class='user-comment'><div class='annotation-icon theme-background-color'><span class='glyphicon glyphicon-comment'></span></div>" + data.comment + "</div></div>");

                        if ($('.no-anno').length) $('.no-anno').fadeOut(500);

                        setTimeout(function() {
                            $('.annotation.hidden-anno').fadeIn(500);
                        }, 500)
                    }
                });
            }
        })

        SongService.get().success(function(data) {
            console.log(data);
            $scope.bandName = data.songData[0].artist;
            $scope.songName = data.songData[0].name;
            $scope.imgPath = data.songData[0].image;
            $scope.id = data.songData[0].id;
            $scope.annotations = data.annotations;

            wavesurfer.load("../" + data.songData[0].path);
        })
    }])
	.controller('LoginCtrl', ['$scope', '$routeParams', '$filter', '$http', 'LoginService', function($scope, $routeParams, $filter, $http, LoginService) {
    	$(document).ready(function() {
			$('html').niceScroll();
			$('html').getNiceScroll().resize();
		});
    	$scope.errorCode = $routeParams.error;
    	console.log($scope.errorCode);

	    LoginService.post(function(data) {
	        console.log(data);
	    })
	}])
