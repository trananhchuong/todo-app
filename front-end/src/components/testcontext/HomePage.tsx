import React, { useContext } from 'react';
import { useAppContext } from '../../context/AppContext';
import { UserType } from '../../types/TypeConstants';

export const HomePage = () => {
    const { userData, setUserData } = useAppContext()!;

    const handleClick = (): void => {
        const newBlock: UserType = {
            name: 'chuong',
            loggedIn: !userData.loggedIn
        };
        setUserData(newBlock);
    };

    return <>
        <button onClick={handleClick}>click</button>
        <div>Name: {userData.name}</div>
        <div>LoggedIn: {userData.loggedIn ? 'true' : 'false'}</div>
    </>;
};