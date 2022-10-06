import AsyncStorage from '@react-native-async-storage/async-storage';

// Save the current theme value
export const storeTheme = async (value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('@Theme', value);
  } catch (err) {
    console.log('================storeTheme====================');
    console.error(err);
    console.log('================storeTheme====================');
  }
};
// Geting the current theme value

export const getTheme = async (): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem('@Theme');
    if (!value) {
      throw new Error('No theme has been stored yet');
    }
    return value;
  } catch (err) {
    console.log('================getTheme====================');
    console.error(err);
    console.log('================getTheme====================');
  }
};
