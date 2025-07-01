import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import ColorLensSharpIcon from '@mui/icons-material/ColorLensSharp';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import React from 'react';
import { PointStyles } from '../../models/MapMarkers';

type Props = {
  pointStyles: PointStyles;
};

export const CustomIcon = ({ pointStyles }: Props) => {
  const { icon } = pointStyles;

  switch (icon) {
    case 'SportsBarIcon':
      return <SportsBarIcon sx={pointStyles} />;
    case 'InterestsOutlinedIcon':
      return <InterestsOutlinedIcon sx={pointStyles} />;
    case 'ColorLensSharpIcon':
      return <ColorLensSharpIcon sx={pointStyles} />;
    default:
      return <LocationPinIcon sx={pointStyles} />;
  }
};
