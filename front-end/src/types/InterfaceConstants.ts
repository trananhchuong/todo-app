import { ComboType, TodoType } from './TypeConstants';

export interface AppState {
    loading: boolean,
    todos: TodoType[],
    name: string,
    content: string,
    visible: boolean,
    loadingTable: boolean
}