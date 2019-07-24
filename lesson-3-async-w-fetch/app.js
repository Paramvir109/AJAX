//fetch return a promise function


(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
	
	function addImage(data) { //Here data is Json object
		let responseHTML = '';
		let firstImg = data.results[0];
		responseHTML += ` <figure>
		<img src = "${firstImg.urls.regular}" alt = "${searchedForText}">
		<figcaption>${searchedForText} by ${firstImg.user.name}</figcaption>
		</figure>`
		responseContainer.insertAdjacentHTML('afterbegin', responseHTML);
 
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
	
	function requestError(e, part) {
    console.log(e);
    responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
	}
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
		
		fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
			headers: {
				Authorization: 'Client-ID 88d4f8cb9e93b833bbd27d3b18ebb42ea79cf5f2c149623522889efaa4dce3fa'
			}
		}).then( response => response.json()
			//response here is type of Response object;   (Not here but)-->.blob() will extract the image body from the response.
		).then(addImage).catch(requestError);
		//The .json() method on a Response object returns a Promise, so we need to chain on 
		//another .then() to actually get and start using the returned data.
		fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${nytAPI}`).then(response => response.json()).then(addArticles).catch(requestError);
    });
})();
