import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { AppContextType, UserType } from '../types/TypeConstants';


const defaultDataUser = { name: 'Joe', loggedIn: true };

type Props = {
    children: ReactNode;
};

const AppContext = createContext<AppContextType | undefined>(
    undefined
);

export const AppProvider = ({ children }: Props): JSX.Element => {
    const [userData, setUserData] = useState<UserType>(defaultDataUser);
    const value = useMemo(() => ({
        userData,
        setUserData
    }), [userData]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;