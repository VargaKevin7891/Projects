(function($) {

    "use strict";

    $(document).ready(function() {

      var mainSwiper = new Swiper(".main-swiper", {
        speed: 500,
        navigation: {
          nextEl: ".main-slider-button-next",
          prevEl: ".main-slider-button-prev",
        },
      });

      var productSwiper = new Swiper(".product-swiper", {
        spaceBetween: 20,        
        navigation: {
          nextEl: ".product-slider-button-next",
          prevEl: ".product-slider-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          660: {
            slidesPerView: 3,
          },
          980: {
            slidesPerView: 4,
          },
          1500: {
            slidesPerView: 5,
          }
        },
      });      


    });

})(jQuery);


$(document).ready(function(){
	var apiKey = '4211ecb643f7d2f96a079cd77efd1b46';
	var apiBaseURL = 'http://api.themoviedb.org/3/';
	var imageBaseUrl = 'https://image.tmdb.org/t/p/';
	const nowPlayingURL = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;

	function getNowPlayingData(){
		$.getJSON(nowPlayingURL, function(nowPlayingData){
			for(let i = 0; i<nowPlayingData.results.length; i++){
				var mid = nowPlayingData.results[i].id;
				var thisMovieUrl = apiBaseURL+'movie/'+mid+'/videos?api_key=' + apiKey;


				$.getJSON(thisMovieUrl, function(movieKey){
					var getGenreNameUrl = apiBaseURL + 'movie/' +movieKey.id+ '?api_key=' + apiKey;

					$.getJSON(getGenreNameUrl, function(genreNames){

					for (let j=0; j<genreNames.genres.length; j++){
					 		var genre = genreNames.genres[0].name;
					 	}
					 })
					var poster = imageBaseUrl+'w300'+nowPlayingData.results[i].poster_path;
					var title = nowPlayingData.results[i].original_title;
					var releaseDate = nowPlayingData.results[i].release_date;
					var overview = nowPlayingData.results[i].overview;
					var voteAverage = nowPlayingData.results[i].vote_average;				
					var youtubeKey = movieKey.results[0].key;
					var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
					var nowPlayingHTML = '';        

					if(i == 0)	nowPlayingHTML +=	'<div class="swiper-slide swiper-slide-active" role="group" aria-label="'+i+'/'+nowPlayingData.results.length+'" style="width: 218.667px;height: 503px; margin-right: 20px;">';
					if(i == 1)	nowPlayingHTML +=	'<div class="swiper-slide swiper-slide-next" role="group" aria-label="'+i+'/'+nowPlayingData.results.length+'" style="width: 218.667px;height: 503px; margin-right: 20px;">';
					else	nowPlayingHTML +=		'<div class="swiper-slide" role="group" aria-label="'+i+'/'+nowPlayingData.results.length+'" style="width: 218.667px;height: 503px; margin-right: 20px;">';
						nowPlayingHTML +=				'<div class="card position-relative p-4 border rounded-3" style="height: 503px;">';
						
					if(i >=0 && i < 5)	nowPlayingHTML +=					'<div class="position-absolute">';
					if(i >=0 && i < 5)	nowPlayingHTML +=						'<p class="bg-primary py-1 px-3 fs-6 text-white rounded-2">'+(i+1)+'</p>';
					if(i >=0 && i < 5)	nowPlayingHTML +=					'</div>';

						nowPlayingHTML +=					'<img src="'+poster+'" class="img-fluid shadow-sm" style="width: 169px; height: 253px;">';
						nowPlayingHTML +=					'<h6 class="mt-4 mb-0 fw-bold"><a href="">'+title+'</a></h6>';
						nowPlayingHTML +=					'<div class="review-content d-flex">';
						nowPlayingHTML +=						'<p class="my-2 me-2 fs-6 text-black-50">Rating : </p>';
						nowPlayingHTML +=							'<div class="rating text-warning d-flex align-items-center">';
					if(voteAverage/2 >= 1)	nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg>';
					else if(voteAverage/2 >= 0.5) nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-half"></use> </svg>';
					else nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-empty"></use> </svg>';
					if(voteAverage/2 >= 2)	nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg>';
					else if(voteAverage/2 >= 1.5) nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-half"></use> </svg>';
					else nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-empty"></use> </svg>';
					if(voteAverage/2 >= 3)	nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg>';
					else if(voteAverage/2 >= 2.5) nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-half"></use> </svg>';
					else nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-empty"></use> </svg>';
					if(voteAverage/2 >= 4)	nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg>';
					else if(voteAverage/2 >= 3.5) nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-half"></use> </svg>';
					else nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-empty"></use> </svg>';
					if(voteAverage/2 >= 5)	nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg>';
					else if(voteAverage/2 >= 4.5) nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-half"></use> </svg>';
					else nowPlayingHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-empty"></use> </svg>';
					nowPlayingHTML +=	'</div>';
						nowPlayingHTML +=	'</div>';
						nowPlayingHTML +=						'<p class="my-2 me-2 fs-6 text-black-50">Release : '+releaseDate+'</p>';
						nowPlayingHTML +=	'<a href="'+youtubeLink+'" class="price text-primary fw-bold mb-2 fs-5" target=”_blank”><button class="trailer-button noselect"><span class="text">Trailer</span><span class="icon"><svg class="youtube"><use xlink:href="#youtube"></use></svg></span></button></a>';
						nowPlayingHTML +=	'</div>';
						nowPlayingHTML += '</div>';

					$('#movie-grid').append(nowPlayingHTML);
				})
			}
		}) 
	}

		// http://api.themoviedb.org/3/movie/:movieID?api_key=<<>>
					//28 = action 			
					//12 = adventure		
					//16 = animation		
					//35 = comedy			
					//80 = crime			
					//18 = drama			
					//10751 = family		
					//14 = fantasy			
					//36 = history			
					//27 = horror			
					//10402 = music			
					//10749 = romance		
					//878 = science fiction	
					//53 = thriller
					const genreTitles = {
						1: 'Now Playing',
						28: 'Action',
						12: 'Adventure',
						16: 'Animation',
						35: 'Comedy',
						80: 'Crime',
						99: 'Documentary',
						18: 'Drama',
						10751: 'Family',
						14: 'Fantasy',
						36: 'History',
						27: 'Horror',
						10402: 'Music',
						9648: 'Mystery',
						10749: 'Romance',
						878: 'Science Fiction',
						10770: 'TV Movie',
						53: 'Thriller',
						10752: 'War',
						37: 'Western'
					};			
	

	function getMoviesByGenre(genre_id, section_id){
		const getMoviesByGenreURL = apiBaseURL + 'genre/' + genre_id + '/movies?api_key=' + apiKey + '&language=en-US&include_adult=false&sort_by=created_at.asc';

		$.getJSON(getMoviesByGenreURL, function(genreData){
			for(let i = 0; i<genreData.results.length && i<5; i++){
				var mid = genreData.results[i].id;
				var thisMovieUrl = apiBaseURL+'movie/'+mid+'/videos?api_key=' + apiKey;

				$.getJSON(thisMovieUrl, function(movieKey){
					var poster = imageBaseUrl+'w300'+genreData.results[i].poster_path;
					var title = genreData.results[i].original_title;
					var releaseDate = genreData.results[i].release_date;
					var genreIds = genreData.results[i].genre_ids;
					var overview = genreData.results[i].overview;
					var voteAverage = genreData.results[i].vote_average;				
					var youtubeKey = movieKey.results[0].key;
					var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
					var genreHTML = '';
					genreHTML +='			<div class="genre-movie-title"><h6 class="mb-0 fw-bold">'+title+'</h6></div>';
					genreHTML +='	<div class="item d-flex">';
					genreHTML +='		<img src="'+poster+'" class="img-fluid shadow-sm">';
					genreHTML +='		<div class="item-content ms-3">';
					genreHTML +='			<p class="fs-6 text-black-50">Release date :</p>';
					genreHTML +='			<p class="fs-6 text-black-50">'+releaseDate+'</p>';
					genreHTML +='			<div class="review-content d-flex">';
					genreHTML +='			<p class="my-2 me-2 fs-6 text-black-50">Rating : </p>';
					genreHTML +='			<div class="rating text-warning d-flex align-items-center">';
					if(voteAverage/2 >= 1)	genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg>';
					else if(voteAverage/2 >= 0.5) genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-half"></use> </svg>';
					else genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-empty"></use> </svg>';
					if(voteAverage/2 >= 2)	genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg>';
					else if(voteAverage/2 >= 1.5) genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-half"></use> </svg>';
					else genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-empty"></use> </svg>';
					if(voteAverage/2 >= 3)	genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg>';
					else if(voteAverage/2 >= 2.5) genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-half"></use> </svg>';
					else genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-empty"></use> </svg>';
					if(voteAverage/2 >= 4)	genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg>';
					else if(voteAverage/2 >= 3.5) genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-half"></use> </svg>';
					else genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-empty"></use> </svg>';
					if(voteAverage/2 >= 5)	genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg>';
					else if(voteAverage/2 >= 4.5) genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-half"></use> </svg>';
					else genreHTML +=								'<svg class="star star-fill"> <use xlink:href="#star-empty"></use> </svg>';
					genreHTML +='			</div>';
					genreHTML +='			</div>';
					genreHTML +=	'<button type="button" class="button" data-bs-toggle="modal" data-bs-target="#movieModal'+ i +genre_id+ '">';
					genreHTML +=		'<span class="button__text">Details</span>';
					genreHTML +=		'<span class="button__icon"><svg class="css-i6dzq1" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="#FFF" height="18" width="18" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle r="3" cy="12" cx="12"></circle></svg></span>';
					genreHTML +=	'</button>';
					genreHTML +='		</div>';
					genreHTML += '<div class="modal fade" id="movieModal' + i +genre_id+'" role="dialog" aria-hidden="true">';
					genreHTML += '<div class="modal-dialog modal-lg">';
					genreHTML += '<div class="modal-content">';
					genreHTML += `<article class="postcard light blue">
										<a class="postcard__img_link" href="${youtubeLink}">
											<img class="postcard__img" src="${poster}" alt="Poster" />
										</a>
										<div class="postcard__text t-dark">
											<h1 class="postcard__title blue"><a href="${youtubeLink}">${title}</a></h1>
											<div class="postcard__subtitle small">
												<time datetime="2020-05-25 12:00:00">
													<i class="fas fa-calendar-alt mr-2"></i>${releaseDate}
												</time>
											</div>
											<div class="postcard__bar"></div>
											<div class="postcard__preview-txt">${overview}</div>
											<ul class="postcard__tagbox">
											`;
											for(j = 0; j < genreIds.length; j++){

												genreHTML +=`
												<li class="tag__item">${genreTitles[genreIds[j]]}</li>
												`;
											}
											genreHTML += `
											<li class="tag__item rating">
											<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg> ${voteAverage}
											</li>
												<li class="tag__item play blue">
													<a href="${youtubeLink}"><i class="fas fa-play mr-2"></i>Play Trailer</a>
												</li>
											</ul>
										</div>
									</article>
									`;
								genreHTML += '</div>';
							genreHTML += '</div>';
						genreHTML += '</div>';
					genreHTML +='	</div>';
					genreHTML += '<hr class="gray-400">';
					
					$(section_id).append(genreHTML);
				})
			}

		})
		
	}

	//index.html feltöltése
	getNowPlayingData();

	getMoviesByGenre(28, '#action-movies');
	getMoviesByGenre(10749, '#romance-movies');
	getMoviesByGenre(35, '#comedy-movies');
	getMoviesByGenre(16, '#animation-movies');

	//genre.html

	function setMoviesForGenre(genre_id, label_name){
		let getMoviesByGenreURL;
		if(genre_id != 1) {
			getMoviesByGenreURL = apiBaseURL + 'genre/' + genre_id + '/movies?api_key=' + apiKey + '&language=en-US&include_adult=false&sort_by=created_at.asc';
		}else{
			getMoviesByGenreURL = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;
		}
		$.getJSON(getMoviesByGenreURL, function(genreData){
			for(let i = 0; i<genreData.results.length; i++){
				var mid = genreData.results[i].id;
				var thisMovieUrl = apiBaseURL+'movie/'+mid+'/videos?api_key=' + apiKey;
	
				$.getJSON(thisMovieUrl, function(movieKey){
					var poster = imageBaseUrl+'w300'+genreData.results[i].poster_path;
					var title = genreData.results[i].original_title;
					var releaseDate = genreData.results[i].release_date;
					var overview = genreData.results[i].overview;
					var voteAverage = genreData.results[i].vote_average;
					var genreIds = genreData.results[i].genre_ids;				
					var youtubeKey = movieKey.results[0].key;
					var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
					var genreCard = '';
					if( i % 4 == 0){
					genreCard += `
							<article class="postcard light blue">
								<a class="postcard__img_link" href="#">
									<img class="postcard__img" src="${poster}" alt="Poster" />
								</a>
								<div class="postcard__text t-dark">
									<h1 class="postcard__title blue"><a href="${youtubeLink}">${title}</a></h1>
									<div class="postcard__subtitle small">
										<time datetime="2020-05-25 12:00:00">
											<i class="fas fa-calendar-alt mr-2"></i>${releaseDate}
										</time>
									</div>
									<div class="postcard__bar"></div>
									<div class="postcard__preview-txt">${overview}</div>
									<ul class="postcard__tagbox">
									`;
					for(j = 0; j < genreIds.length; j++){

						genreCard +=`
						<li class="tag__item">${genreTitles[genreIds[j]]}</li>
						`;
					}
									genreCard += `
									<li class="tag__item rating">
									<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg> ${voteAverage}
									</li>
										<li class="tag__item play blue">
											<a href="${youtubeLink}"><i class="fas fa-play mr-2"></i>Play Trailer</a>
										</li>
									</ul>
								</div>
							</article>
							`;
					}
					else if( i % 4 == 1) {
					genreCard += `
							<article class="postcard light red">
								<a class="postcard__img_link" href="#">
									<img class="postcard__img" src="${poster}" alt="Poster" />	
								</a>
								<div class="postcard__text t-dark">
									<h1 class="postcard__title red"><a href="${youtubeLink}">${title}</a></h1>
									<div class="postcard__subtitle small">
										<time datetime="2020-05-25 12:00:00">
											<i class="fas fa-calendar-alt mr-2"></i>${releaseDate}
										</time>
									</div>
									<div class="postcard__bar"></div>
									<div class="postcard__preview-txt">${overview}</div>
									<ul class="postcard__tagbox">`;
									for(j = 0; j < genreIds.length; j++){
										genreCard +=`
										<li class="tag__item">${genreTitles[genreIds[j]]}</li>
										`;
									}
									genreCard +=`
									<li class="tag__item rating">
									<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg> ${voteAverage}
									</li>
										<li class="tag__item play red">
											<a href="${youtubeLink}"><i class="fas fa-play mr-2"></i>Play Trailer</a>
										</li>
									</ul>
								</div>
							</article>
							`;
					}
					else if( i % 4 == 2) {
					genreCard += `
							<article class="postcard light green">
								<a class="postcard__img_link" href="#">
									<img class="postcard__img" src="${poster}" alt="Poster" />
								</a>
								<div class="postcard__text t-dark">
									<h1 class="postcard__title green"><a href="#">${title}</a></h1>
									<div class="postcard__subtitle small">
										<time datetime="2020-05-25 12:00:00">
											<i class="fas fa-calendar-alt mr-2"></i>${releaseDate}
										</time>
									</div>
									<div class="postcard__bar"></div>
									<div class="postcard__preview-txt">${overview}</div>
									<ul class="postcard__tagbox">`;
									for(j = 0; j < genreIds.length; j++){
										genreCard +=`
										<li class="tag__item">${genreTitles[genreIds[j]]}</li>
										`;
									}
									genreCard +=`
									<li class="tag__item rating">
									<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg> ${voteAverage}
									</li>
										<li class="tag__item play green">
											<a href="${youtubeLink}"><i class="fas fa-play mr-2"></i>Play Trailer</a>
										</li>
									</ul>
								</div>
							</article>
							`;
					}
					else{
					genreCard += `
							<article class="postcard light yellow">
								<a class="postcard__img_link" href="#">
									<img class="postcard__img" src="${poster}" alt="Poster" />
								</a>
								<div class="postcard__text t-dark">
									<h1 class="postcard__title yellow"><a href="#">${title}</a></h1>
									<div class="postcard__subtitle small">
										<time datetime="2020-05-25 12:00:00">
											<i class="fas fa-calendar-alt mr-2"></i>${releaseDate}
										</time>
									</div>
									<div class="postcard__bar"></div>
									<div class="postcard__preview-txt">${overview}</div>
									<ul class="postcard__tagbox">`;
									for(j = 0; j < genreIds.length; j++){
										genreCard +=`
										<li class="tag__item">${genreTitles[genreIds[j]]}</li>
										`;
									}
									genreCard +=`
									<li class="tag__item rating">
									<svg class="star star-fill"> <use xlink:href="#star-fill"></use> </svg> ${voteAverage}
									</li>
										<li class="tag__item play yellow">
											<a href="${youtubeLink}"><i class="fas fa-play mr-2"></i>Play Trailer</a>
										</li>
									</ul>
								</div>
							</article>
							`;
					}
					
					$('#movie-grid-genre').append(genreCard);
					$('#pageHeaderTitle').html(label_name);
				})
			}
	
		})
		
	}

	setMoviesForGenre(genreValue, labelValue);
});