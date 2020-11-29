export type TodoType = {
    id: string,
    completed: boolean,
    content: string,
    name: string,
};

export interface ComboType {
    value: string,
    label: string
}

export interface UserType {
    name: string,
    loggedIn: boolean
}

export type AppContextType = {
    userData: UserType,
    setUserData: (userData: UserType) => void
};
