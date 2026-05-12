import React from 'react';
import { View } from 'react-native';

const MapView = (props) => <View {...props}>{props.children}</View>;
const Marker = (props) => <View {...props}>{props.children}</View>;
const Polyline = (props) => <View {...props} />;
const PROVIDER_GOOGLE = 'google';

export { Marker, Polyline, PROVIDER_GOOGLE };
export default MapView;
