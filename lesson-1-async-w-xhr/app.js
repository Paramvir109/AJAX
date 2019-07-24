
(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
	
	
	function addImage() {
		const data = JSON.parse(this.responseText);
		let responseHTML = '';
		let firstImg = data.results[0];
		responseHTML += ` <figure>
		<img src = "${firstImg.urls.regular}" alt = "${searchedForText}">
		<figcaption>${searchedForText} by ${firstImg.user.name}</figcaption>
		</figure>`
		responseContainer.insertAdjacentHTML('afterbegin', responseHTML);
		//The first argument is one of "beforebegin", "afterbegin", "beforeend", or "afterend" 
		//and gives the insertion point relative to the node that insertAdjacentHTML() is invoked on. 
	}
	
	function addArticles() {
		const data = JSON.parse(this.responseText);
		let responseHTML = '<ul>';
		for(article of data.response.docs) {
			responseHTML += `<li class = "article">
			<h2><a href = "${article.web_url}">${article.headline.main}</a></h2>
			<p>${article.snippet}</p>
			</li>`
		}
		responseHTML += `</ul>`;
		responseContainer.insertAdjacentHTML('beforeend', responseHTML);
	}
	
	function err(e) {
		alert(e.statusText);
	}
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
		const unsplashRequest = new XMLHttpRequest();
		const url = `https://api.unsplash.com/search/photos?client_id=${key}&page=1&query=${searchedForText}`;
		//Can be read easily by network tools/scripts (authentication, meta info, ...)
		//Keeps urls free from security stuff (safer, not in browser/proxy caches)
		//Keeps urls cleaner: allows for better caching of resources(//Here we could send client_id as a custom header)
		
		unsplashRequest.open('GET', url);
		unsplashRequest.onload = addImage;//Takes only one function assigned to it;
		unsplashRequest.onerror = err;
		unsplashRequest.send();
		

		const articleRequest = new XMLHttpRequest();
		articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${nytAPI}`);
		articleRequest.onload = addArticles;
		articleRequest.onerror = err;
		articleRequest.send();

    });
	
})();

