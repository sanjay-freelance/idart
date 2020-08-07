import { useEffect, useState } from 'react';
import axios from 'axios/index';

export default function useRequest(request) {
	const [loading, setLoading] = useState(!!request);
	const [error, setError] = useState();
	const [response, setResponse] = useState();

	useEffect(
	() => {
		if (request && request.url) {
			loadData();
		}
	},
	[request],
	);

	function loadData() {
		if (!request) {
			return;
		}
		setLoading(true);

		if (request.method === 'GET') {
			delete request.data;
		}

		axios(request)
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				setResponse(response);
				setError(null);
			} else if (response.status >= 400 && response.status < 600) {
				setResponse(null);
				setError(response);
			}
		})
		.catch(() => {
			// todo: How to render UI Errors?
			// UI Try catch Error
		})
		.finally(() => {
			setLoading(false);
		});
	}

	return { response, loading, error };
}
