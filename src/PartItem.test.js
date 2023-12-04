import {render, screen, fireEvent} from '@testing-library/react';
import {PartItem} from './PartItem';
import {onSave} from './utils/savePartItems';

jest.mock('./utils/savePartItems');

test('Save gets called on button click', () => {
	render(<PartItem file_name="test.stl" id={1} />);
	expect(screen.getByText('Save')).toBeInTheDocument();
	fireEvent.click(screen.getByText(/Save/i));

	expect(onSave).toHaveBeenCalledTimes(1);
})