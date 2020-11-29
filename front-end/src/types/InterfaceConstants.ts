import { ComboType, TodoType } from './TypeConstants';

export interface AppState {
    loading: boolean,
    todos: TodoType[],
    statusList: ComboType[],
    name: string,
    content: string
}