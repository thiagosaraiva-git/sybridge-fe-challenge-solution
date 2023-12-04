import React, {useState} from 'react';
import {onSave} from './utils/savePartItems.js';
import './PartItem.css';


export function PartItem(props) {
	const [inputValue, setInputValue] = useState(null);

	function onInputChange(e: Event) {
		setInputValue(e.target.value);
	}

	return (
		<div className="PartItem_root">
			<div className="PartItem_name">
				{props.file_name}
			</div>
			<div className="PartItem_inputAndSave">
				<input 
					className="PartItem_input" 
					onChange={(e: Event) => onInputChange(e)}
					placeholder="Quantity">
				</input>
				<button className="PartItem_button" onClick={() => onSave(props.id, inputValue)}>Save</button>
			</div>
		</div>
	);
}