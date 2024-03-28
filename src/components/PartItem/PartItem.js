import React, { useState } from 'react';
import { onSave } from '../../utils/savePartItems.js';
import './PartItem.css';

export function PartItem(props) {
	const [inputValue, setInputValue] = useState(null);
	const [manufacturerId, setManufacturerId] = useState(0);
    const [materialId, setMaterialId] = useState(0);

	const onInputChange = (e: Event) => {
		setInputValue(e.target.value);
	}

	const onMaterialChange = (e: Event) => {
		setManufacturerId(e.target.selectedIndex);
	}

	return (
		<div className="PartItem_root">
			<div className="PartItem_name">
				{props.file_name}
			</div>
			<div className="PartItem_part-name">
				<select onChange={(e) => onMaterialChange(e)}>
					{props.manufacturer_data.map((d, index) => {
						return <option key={index}>{d.name}</option>
					})}
				</select>
			</div>
			<div className="PartItem_material-name">
			<select onChange={(e) => setMaterialId(e.target.value)}>
				{props.manufacturer_data[manufacturerId]?.materials.map((material, index) =>
					<option key={index}>{material.name}</option>
				)}
			</select>

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