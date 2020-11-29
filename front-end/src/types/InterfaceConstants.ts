import { ComboType, TodoType } from './TypeConstants';

export interface AppState {
    loading: boolean,
    todos: TodoType[],
    statusOption: ComboType[],
    name: string,
    content: string,
    visible: boolean
}