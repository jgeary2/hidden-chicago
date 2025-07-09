import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MapStore } from '../../store/store';
import { clearSelection, SelectionData } from '../../features/selectionData/selectionDataSlice';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export const DetailsDrawer = () => {
  const dispatch = useDispatch();
  const map = useMap();
  const ref = useRef(null);
  const streetViewLibrary = useMapsLibrary('streetView');
  const selectionData: SelectionData = useSelector((state: MapStore) => state.selectionData);
  const [streetViewService, setStreetViewService] = useState(null);

  const { showDrawer, header, content, location } = selectionData;

  const initDrawer = useCallback(() => {
    if (!streetViewLibrary || !map || !location) {
      return;
    }
    setStreetViewService(
      new streetViewLibrary.StreetViewPanorama(ref.current, {
        position: location,
        pov: {
          heading: 34,
          pitch: 10
        }
      })
    );
  }, [location, map, streetViewLibrary]);

  useEffect(() => {
    initDrawer();
  }, [initDrawer, location]);

  useEffect(() => {
    if (streetViewService) {
      map.setStreetView(streetViewService);
    }
  }, [streetViewService, map]);

  const handleClose = () => {
    map.setStreetView(null);
    setStreetViewService(null);
    dispatch(clearSelection());
  };

  return (
    <Offcanvas
      className='w-25'
      backdrop={false}
      show={showDrawer}
      onHide={handleClose}
      onShow={initDrawer}
      placement='end'
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title as='h2'>{header}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div
          className='street-view'
          id={`details-street-view`}
          ref={ref}
          style={{ height: '300px', width: '100%' }}
        ></div>
        {content ? <div dangerouslySetInnerHTML={{ __html: content }}></div> : null}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
