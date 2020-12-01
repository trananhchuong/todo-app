import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Modal, Space, Table, Popconfirm, message } from 'antd';
import _ from 'lodash';
import { getTodoApi } from '../../../constant/ApiConstant';
import { AppState } from '../../../types/InterfaceConstants';
import AppUtils from '../../../utils/AppUtils';
import Loading from '../../loading/Loading';
import TodoAddForm from '../form/TodoAddForm';
import { deleteTodoApi } from '../../../constant/ApiConstant';

import '../styles/todoTable.scss';
import ModalComponent from './ModalComponent';

const { Column } = Table;

const stateDefault: AppState = {
    loading: true,
    todos: [],
    name: '',
    content: '',
    visible: false
};

type Prop = {

};

const TodoTable = (props: Prop) => {
    const [appState, setAppState] = useState<AppState>(stateDefault);
    const formTodoRef: any = useRef(null);
    const modalRef: any = useRef(null);

    useEffect(() => {
        fetchDataTodo();
    }, []);

    const fetchDataTodo = async () => {
        try {
            const response = await AppUtils.Axios.get(getTodoApi);
            const responseData = _.get(response, 'data');

            if (_.get(responseData, 'success', false)) {
                setAppState({
                    ...appState,
                    todos: _.get(responseData, 'results'),
                    loading: false,
                });
            } else {
                //toast error message
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (appState.loading) {
        return <div className="todo-table">
            <div className="loading-box">
                <Loading />
            </div>
        </div>;
    }

    const onChangeCompleted = (e: any) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleDetele = async (id: string) => {
        try {
            const url = `${deleteTodoApi}?id=${id}`;
            const response = await AppUtils.Axios.delete(url);
            const success = _.get(response, 'data.success');

            if (success) {
                message.success('Delete to do success');
                await fetchDataTodo();
            } else {
                message.error('Error!');
            }
        } catch (error) {
            console.log('🚀 ~ file: TodoTable.tsx ~ line 97 ~ handleDetele ~ error', error);

        }
    };

    const renderTable = () => {
        return <Table
            dataSource={appState.todos}
        >
            <Column
                title="Name"
                dataIndex="name"
                key="name"
            />
            <Column
                title="Completed"
                dataIndex="completed"
                key="completed"
                render={
                    (completed: any) => {
                        const text = completed ? 'completed' : 'un-completed';
                        return <Checkbox
                            defaultChecked={completed}
                            onChange={onChangeCompleted}
                        >
                            {text}
                        </Checkbox>;
                    }}
            />
            <Column
                title="Action"
                key="action"
                render={
                    (text, record: any) => {
                        return <Space
                            size="small"
                        >
                            <Button
                                onClick={() => handleUpdate(record.id)}
                            >
                                Update
                            </Button>
                            <Popconfirm
                                title="Are you sure to delete this to do?"
                                onConfirm={() => handleDetele(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger>
                                    Delete
                                </Button>
                            </Popconfirm>
                        </Space>;
                    }
                }
            />
        </Table>;
    };

    const renderModal = () => {
        return (
            <ModalComponent
                ref={modalRef}
            />
        );
    };

    const renderBtnAdd = () => {
        return <div className="btn-add-box">
            <Button
                type="primary"
                onClick={handleAdd}
            >
                Add
            </Button>
        </div>;
    };

    const handleUpdate = (id: string) => {
        try {
            modalRef.current.setDataChildren(
                <TodoAddForm
                    ref={formTodoRef}
                    reLoadListTodo={fetchDataTodo}
                    onCloseModal={() => setModalVisible(false)}
                    todoId={id}
                />
            );
            setModalVisible(true);
        } catch (error) {
            console.log('🚀 ~ file: TodoTable.tsx ~ line 169 ~ handleAdd ~ error', error);
        }
    };

    const handleAdd = () => {
        try {
            modalRef.current.setDataChildren(
                <TodoAddForm
                    ref={formTodoRef}
                    reLoadListTodo={fetchDataTodo}
                    onCloseModal={() => setModalVisible(false)}
                />
            );
            setModalVisible(true);
        } catch (error) {
            console.log('🚀 ~ file: TodoTable.tsx ~ line 169 ~ handleAdd ~ error', error);
        }
    };

    const setModalVisible = (value: boolean): void => {
        modalRef && modalRef.current && modalRef.current.setVisible(value);
    };

    return <div className="todo-table">
        {renderBtnAdd()}
        {renderTable()}
        {renderModal()}
    </div>;

};

export default TodoTable;