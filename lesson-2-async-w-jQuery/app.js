/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
	
	function addImage(response) {//Here automatically converted from json to javascrpt
		let responseHTML = '';
		let firstImg = response.results[0];
		responseHTML += ` <figure>
		<img src = "${firstImg.urls.regular}" alt = "${searchedForText}">
		<figcaption>${searchedForText} by ${firstImg.user.name}</figcaption>
		</figure>`
		responseContainer.insertAdjacentHTML('afterbegin', responseHTML);
		//The first argument is one of "beforebegin", "afterbegin", "beforeend", or "afterend" 
		//and gives the insertion point relative to the node that insertAdjacentHTML() is invoked on. 
	}
	
	function addArticles(serverresponse) {
		let responseHTML = '<ul>';
		for(article of serverresponse.response.docs) {
			responseHTML += `<li class = "article">
			<h2><a href = "${article.web_url}">${article.headline.main}</a></h2>
			<p>${article.snippet}</p>
			</li>`
		}
		responseHTML += `</ul>`;
		responseContainer.insertAdjacentHTML('beforeend', responseHTML);
	}

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
		$.ajax({
			url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
			headers : {
				Authorization:'Client-ID 88d4f8cb9e93b833bbd27d3b18ebb42ea79cf5f2c149623522889efaa4dce3fa'
			}//This is a configuration object
		}).done(addImage);
		
		$.ajax({
			url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${nytAPI}`
			
		}).done(addArticles);
    });
})();
