import { render, screen } from '@testing-library/react';
import { PartItemPagination } from './PartItemPagination';

test('renders Prev and Next buttons', () => {
	render(<PartItemPagination />);
	const prevButton = screen.getByText(/Prev/i);
	const nextButton = screen.getByText(/Next/i);
	expect(prevButton).toBeInTheDocument();
	expect(nextButton).toBeInTheDocument();
})

test('Prev button is inactive on first page', () => {
	const {getByText} = render(<PartItemPagination currentPage={1} />);
	expect(getByText(/Prev/i).closest('button')).toBeDisabled();
})

test('Next button is inactive on last page', () => {
	const {getByText} = render(<PartItemPagination totalPageCount={4} currentPage={4} />);
	expect(getByText(/Next/i).closest('button')).toBeDisabled();
})