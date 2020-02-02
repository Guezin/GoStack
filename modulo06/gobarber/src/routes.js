import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home/Home';
import User from './pages/User/User';

const Routes = createAppContainer(
    createStackNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                title: 'Home'
            }
        },
        User: {
            screen: User,
            navigationOptions: {
                title: 'User'
            }
        },
    },
    {
        defaultNavigationOptions: {
            headerLayoutPreset: 'center',
            //headerBackTitleVisible: false, ** informar apenas quando for IOS
            headerStyle: {
                backgroundColor: '#7159C1',
            },
            headerTintColor: '#FFF'
        }

    }
    )
);

export default Routes;
