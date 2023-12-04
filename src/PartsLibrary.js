import React, {useState, useEffect} from 'react';
import './PartsLibrary.css';
import {PartItem} from './PartItem';
import {PartItemPagination} from './PartItemPagination';

const fetchPartsURL = 'http://localhost:5555/parts?page=';

export function PartsLibrary() {
	const [page, setPage] = useState(1);
	const [partData, setPartData] = useState(null);
	const [totalPageCount, setTotalPageCount] = useState(0);

	useEffect(() => {
		fetch(`${fetchPartsURL}${page}`)
		.then((res) => {
			if (res.ok) {
				return Promise.all([res.json(), res.headers]);
			}
		})
		.then(([responseData, headers]) => {
			for (let pair of headers.entries()) {
				if (pair[0] === 'total-pages') {
					setTotalPageCount(Number(pair[1]));
				}
			}
			const data = responseData.data;
			if (data != null) {
				let partFileNames = data.map(d => {
					return d.part_file != null ? d.part_file : null;
				});
				partFileNames = partFileNames.filter(p => p != null);
				setPartData(partFileNames);
			}
		})
	}, [page]);


	return (
		<div className="PartsLibrary_root">
			<div className="PartsLibrary_title">
				Parts
			</div>
			<div className="PartsLibrary_table">
				{partData?.map(data => 
					<div key={data.file_name}>
						<PartItem
							id={data.id}
							file_name={data.file_name} 
						/>
					</div>
				)}
			</div>
			<div className="PartsLibrary_pagination">
				<PartItemPagination 
					currentPage={page} 
					onPageChange={(newPage: number) => setPage(newPage)}
					totalPageCount={totalPageCount}
				/>
			</div>
		</div>
	);	
}