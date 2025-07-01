import React from 'react';
import { Popup } from '../../models/MapMarkers';

type Props = {
  popup: Popup;
};
export const PopupContent = ({ popup }: Props) => {
  const { content, header } = popup;
  return (
    <React.Fragment>
      {header ? <h3>{header}</h3> : null}
      {content ? <p>{content}</p> : null}
    </React.Fragment>
  );
};
