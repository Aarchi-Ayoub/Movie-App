import {ScaledSheet} from 'react-native-size-matters';

export const styles = ScaledSheet.create({
  title: {
    color: 'tomato',
    fontSize: '60@s',
    fontWeight: '900',
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
    borderWidth: 1,
  },
  raccourci: {
    alignItems: 'flex-end',
    paddingHorizontal: '10@s',
  },
  settingImg: {
    width: '40@s',
    height: '40@vs',
  },
  settingTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50@s',
    height: '50@vs',
  },
});
