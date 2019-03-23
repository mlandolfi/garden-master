import React from 'react';

import GridsScreen from '../screens/GridsScreen';
import SeedlingsScreen from '../screens/SeedlingsScreen';
import CalendarScreen from '../screens/CalendarScreen';


export const GridsScreenNav = { key: "GRIDS", screen: <GridsScreen locationID={0} /> };
export const SeedlingsScreenNav = { key: "SEEDLINGS", screen: <SeedlingsScreen /> };
export const CalendarScreenNav = { key: "CALENDAR", screen: <CalendarScreen /> };