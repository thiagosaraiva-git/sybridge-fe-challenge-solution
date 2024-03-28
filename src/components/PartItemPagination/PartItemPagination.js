import React from 'react';
import './PartItemPagination.css';

export function PartItemPagination(props) {

	const pageArray = new Array(props.totalPageCount).fill(0);

	const onPrevClick = () => {
		if (props.currentPage > 1) {
			props.onPageChange(props.currentPage - 1);			
		}
	}

	const onNextClick = () => {
		if (props.currentPage < props.totalPageCount) {
			props.onPageChange(props.currentPage + 1);
		}
	}

	const onPageClick = (newPage) => {
		props.onPageChange(newPage);
	}

	return (
		<div className="PartItemPagination_root">
			<div className="PartItemPagination_prev">
				<button 
					className="PartItemPagination_endButton" 
					disabled={props.currentPage <= 1}
					onClick={onPrevClick}>
					Prev
				</button>
			</div>
			<div className="PartItemPagination_count">
				{pageArray.map((page, index) => {
					return (
						<button
							key={index}
							onClick={() => onPageClick(index + 1)}
							className={"PartItemPagination_countButton " + (index + 1 === props.currentPage ? "PartItemPagination_activeButton" : "")}>
							{index + 1}
						</button>
					);
				})}
			</div>
			<div className="PartItemPagination_next">
				<button 
					className="PartItemPagination_endButton" 
					disabled={props.currentPage >= props.totalPageCount}
					onClick={onNextClick}>
					Next
				</button>
			</div>
		</div>
	);

}