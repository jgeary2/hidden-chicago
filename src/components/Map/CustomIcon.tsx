import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ColorLensSharpIcon from '@mui/icons-material/ColorLensSharp';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import PetsIcon from '@mui/icons-material/Pets';
import CircleIcon from '@mui/icons-material/Circle';
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
    case 'BeachAccessIcon':
      return <BeachAccessIcon sx={pointStyles} />;
    case 'PetsIcon':
      return <PetsIcon sx={pointStyles} />;
    case 'CircleIcon':
      return <CircleIcon sx={pointStyles} />;
    default:
      return <LocationPinIcon sx={pointStyles} />;
  }
};
