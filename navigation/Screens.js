import React from 'react';

// import GridsScreen from '../containers/MainGrid';
import GridsScreen from '../screens/GridsScreen';
import SeedlingsScreen from '../screens/SeedlingsScreen';
import CalendarScreen from '../screens/CalendarScreen';


export const GridsScreenNav = { key: "GRIDS", screen: <GridsScreen /> };
export const SeedlingsScreenNav = { key: "SEEDLINGS", screen: <SeedlingsScreen /> };
export const CalendarScreenNav = { key: "CALENDAR", screen: <CalendarScreen /> };