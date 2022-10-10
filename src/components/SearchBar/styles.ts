import {ScaledSheet} from 'react-native-size-matters';

export const styles = ScaledSheet.create({
  content: {
    marginHorizontal: '25@s',
    flexDirection: 'row',
  },
  input: {
    backgroundColor: '#f0f8ff',
    height: '50@vs',
    borderRadius: '8@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: '10@s',
    fontSize: '18@ms',
    flex: 1,
  },
  clearAnd: {
    position: 'absolute',
    right: 15,
    bottom: 20,
  },
  clearImg: {
    width: '20@s',
    height: '20@vs',
  },
});
