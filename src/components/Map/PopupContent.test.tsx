import { render } from '../../common/test-utils';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PopupContent } from './PopupContent';

describe('PopupContent.tsx', () => {
  it('should render the popup', () => {
    const popup = {
      header: 'Popup Header',
      content: 'Popup Content'
    };

    render(<PopupContent popup={popup} />);

    expect(screen.getByText('Popup Header')).toBeInTheDocument();
    expect(screen.getByText('Popup Content')).toBeInTheDocument();
  });
});
