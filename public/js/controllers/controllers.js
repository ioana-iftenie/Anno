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

	}])
	.controller('HomepageCtrl', ['$scope', function($scope) {
		$(document).ready(function() {
			$('html').niceScroll();
			$('html').getNiceScroll().resize();
		});
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
