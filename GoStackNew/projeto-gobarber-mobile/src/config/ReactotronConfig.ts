import Reactotron from 'reactotron-react-native';

process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure({
    host: '10.0.1.1',
  }).connect();

  console.tron = tron;
}
