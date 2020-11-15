import React, { FC } from 'react';
import { AppProvider } from './context/AppContext';
import { HomePage } from './components/testcontext/HomePage';
import Todo from './components/todo/Todo';

const App: FC = () => {
    return (
        <AppProvider>
            <Todo />
        </AppProvider>
    );
};

export default App;
