const putPartsQuantityURL = 'http://localhost:5555/parts/';

export function onSave(id, inputValue) {
	if (!isNaN(inputValue)) {
		const requestOptions = {
			method: 'PUT',
			body: JSON.stringify({quantity: inputValue})
		};
		fetch(`${putPartsQuantityURL}${id}`, requestOptions)
			.then(resp => {
				if (resp.ok) {
					console.log('succesfully put to', id);
					return resp.json();
				}
			});
	}
}