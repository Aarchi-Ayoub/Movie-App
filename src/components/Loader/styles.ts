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
    height: '10@ms',
    width: '10@ms',
    borderRadius: '10@ms',
    marginRight: '5@s',
  },
});
