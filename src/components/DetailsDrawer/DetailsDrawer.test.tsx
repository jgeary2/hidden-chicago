import { render } from '../../common/test-utils';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { SelectionData } from '../../features/selectionData/selectionDataSlice';
import { DetailsDrawer } from './DetailsDrawer';

const mockDispatch = jest.fn();
let mockSelectionData: SelectionData;
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelectionData
}));

const mockPanorama = jest.fn().mockReturnValue('a street view pano');
const mockSetStreetView = jest.fn();
jest.mock('@vis.gl/react-google-maps', () => ({
  useMap: () => ({
    setStreetView: mockSetStreetView
  }),
  useMapsLibrary: () => ({
    StreetViewPanorama: mockPanorama
  })
}));

describe('DetailsDrawer.tsx', () => {
  beforeEach(() => {
    mockSelectionData = {
      showDrawer: true,
      header: 'Drawer Header',
      content: 'Drawer Content',
      location: null
    };
  });

  it('should render the drawer component', () => {
    render(<DetailsDrawer />);

    expect(screen.getByTestId('details-drawer')).toBeInTheDocument();
    expect(screen.getByText('Drawer Header')).toBeInTheDocument();
    expect(screen.getByText('Drawer Content')).toBeInTheDocument();
  });

  it('should render the drawer component as hidden', () => {
    mockSelectionData.showDrawer = false;
    render(<DetailsDrawer />);

    expect(screen.queryByTestId('details-drawer')).not.toBeInTheDocument();
  });

  it('should render the drawer component with a StreetView', () => {
    mockSelectionData.location = {
      lat: 41.8832,
      lng: -87.6324
    };
    render(<DetailsDrawer />);

    expect(screen.getByTestId('details-drawer')).toBeInTheDocument();

    expect(mockPanorama).toHaveBeenCalledWith(null, {
      position: mockSelectionData.location,
      pov: {
        heading: 34,
        pitch: 10
      }
    });

    expect(mockSetStreetView).toHaveBeenCalled();
  });

  it('should close the drawer', async () => {
    render(<DetailsDrawer />);

    userEvent.click(await screen.findByLabelText('Close'));

    expect(mockSetStreetView).toHaveBeenCalledWith(null);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: undefined,
      type: 'selectionData/clearSelection'
    });
  });
});
