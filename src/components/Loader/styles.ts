import {ScaledSheet} from 'react-native-size-matters';

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    backgroundColor: 'tomato',
    height: '20@ms',
    width: '20@ms',
    borderRadius: '20@ms',
    marginRight: '5@s',
  },
});
