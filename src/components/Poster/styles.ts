import {ScaledSheet} from 'react-native-size-matters';

export const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: '24@ms',
    padding: '5@ms',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '24@ms',
    fontStyle: 'italic',
    color: 'blue',
    textAlign: 'center',
  },
  image: {
    width: '300@s',
    height: '300@vs',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: '5@vs',
  },
  desc: {
    fontSize: '18@ms',
    color: '#E3E3E3',
  },
});
