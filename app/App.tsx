import React from 'react';
import { registerRootComponent } from 'expo';
import { ApplicationProvider } from '@ui-kitten/components';
import { AppNavigator } from './navigation/bottom-tab-navigator';
import * as eva from '@eva-design/eva';

const App: React.FC = () => {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <AppNavigator />
        </ApplicationProvider>
    );
};

registerRootComponent(App);

export default App;
