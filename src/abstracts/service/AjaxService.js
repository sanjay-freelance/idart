function getFetch(url,method, body){
	body = JSON.stringify(body);
	const headerOptions = {
		'content-type': 'application/json',
		'Accept':'application/json'
	};
	const headers = new Headers(headerOptions);
	const fetchOptions = { method, body, headers};
	return fetch(url,fetchOptions).then((response)=>{
		if(response.redirected){
			window.location.replace(response.url);
			return response.url
		} else {
			return response.json();
		}

	});
}

export default function AjaxService(url, method ) {
	return (body)=> {
		return getFetch(url,method,body);
	}
}
