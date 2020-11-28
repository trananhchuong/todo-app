import React, { FC } from 'react';
import Todo from './components/todo/Todo';
import { AppProvider } from './context/AppContext';

const App: FC = () => {
    return (
        <AppProvider>
            <Todo />
        </AppProvider>
    );
};

export default App;
