const fetchPartsURL = 'http://localhost:5555/parts?page=';
const fetchManufacturersURL = 'http://localhost:5555/manufacturing_processes';

export const onGet = (page) => {
    return fetch(`${fetchPartsURL}${page}`)
    .then((res) => {
        if (res.ok) {
            return Promise.all([res.json(), res.headers]);
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(([responseData, headers]) => {
        let totalPageCount = 0;
        let partData = null;
        for (let pair of headers.entries()) {
            if (pair[0] === 'total-pages') {
                totalPageCount = Number(pair[1]);
            }
        }
        const data = responseData.data;
        if (data != null) {
            let partFileNames = data.map(d => {
                return d.part_file != null ? d.part_file : null;
            });
            partFileNames = partFileNames.filter(p => p != null);
            partData = partFileNames;
        }

        return { totalPageCount, partData };
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
    });
};

export const onGetManufacturers = () => {
    return fetch(fetchManufacturersURL)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then((responseData) => {
        const data = responseData.data;
        if (data != null) {
            const manufacturerData = data
            return { manufacturerData };
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
    });
}
