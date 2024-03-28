import React, { useState, useEffect } from 'react';
import './PartsLibrary.css';
import { PartItem } from '../../components/PartItem/PartItem';
import { PartItemPagination } from '../../components/PartItemPagination/PartItemPagination';
import { onGet, onGetManufacturers } from '../../utils/getPartItems';

export function PartsLibrary() {
	const [page, setPage] = useState(1);
	const [partData, setPartData] = useState(null);
	const [totalPageCount, setTotalPageCount] = useState(0);

	const [manufacturerData, setManufacturerData] = useState([]);
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { totalPageCount, partData } = await onGet(page);
				const { manufacturerData } = await onGetManufacturers();
				setPartData(partData);
				setTotalPageCount(totalPageCount);
				setManufacturerData(manufacturerData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
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
							manufacturer_data={manufacturerData}
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