import {ScaledSheet} from 'react-native-size-matters';

export const styles = ScaledSheet.create({
  title: {
    color: 'tomato',
    fontSize: '60@s',
    fontWeight: '900',
    textAlign: 'center',
  },
  content: {
    // flex: 1,
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
  list: {
    flexGrow: 1,
    paddingHorizontal: '28@s',
    padding: '15@ms',
  },
  separator: {
    width: '10@s',
    height: '10@vs',
  },
});
