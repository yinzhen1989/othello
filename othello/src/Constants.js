import {Platform, Dimensions} from 'react-native';

// Font
global.TitleFont = {
  fontSize: Platform.select({ios: 34, android: 29}),
  fontFamily: 'SFProDisplay-Bold'
};

global.BodyTitleFont = {
  fontSize: Platform.select({ios: 20, android: 20}),
  fontFamily: 'SFProDisplay-Bold',
};

global.BodyTextFont = {
  fontSize: Platform.select({ios: 17, android: 17}),
  fontFamily: 'SFProDisplay-Regular'
};

global.BodyBoldTextFont = {
  fontSize: Platform.select({ios: 17, android: 17}),
  fontFamily: 'SFProDisplay-Bold',
};

// Color
global.WhiteColor = 'white';
global.BlackColor = 'black';
global.RedColor = '#C76855';
global.PinkColor = '#FF0071';
global.LightGreyColor = '#BACED0';
global.PurpleColor = '#B57AFF';
global.DarkGreenColor = '#30868F';

// Dimension
global.width = Dimensions.get('screen').width;
global.height = Dimensions.get('screen').height;
global.unit = Dimensions.get('screen').height / 896;
