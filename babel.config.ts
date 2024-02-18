export default (api: { cache: (arg0: boolean) => void }) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['expo-router/babel', 'react-native-reanimated/plugin'],
  };
};
