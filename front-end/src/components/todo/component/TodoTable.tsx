import { Button, Checkbox, message, Popconfirm, Space, Table } from 'antd';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { deleteTodoApi, getTodoApi, updateTodoApi } from '../../../constant/ApiConstant';
import { AppState } from '../../../types/InterfaceConstants';
import AppUtils from '../../../utils/AppUtils';
import Loading from '../../loading/Loading';
import TodoAddForm from '../form/TodoAddForm';
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

    const onChangeCompleted = async (e: any, record: any) => {
        try {

            const statusCode = e.target.checked ? 'completed' : 'new';

            const dataPost = { ...record, statusCode };
            const response = await AppUtils.Axios.post(updateTodoApi, dataPost);
            const success = _.get(response, 'data.success', false);

            if (success) {
                message.success('updated success');
                fetchDataTodo();
            }
        } catch (error) {
            console.log(error);
        }

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
            scroll={{ x: 500 }}
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
                    (completed: boolean, record: any) => {
                        const text = completed ? 'completed' : 'new';
                        return <Checkbox
                            checked={completed}
                            onChange={(e) => onChangeCompleted(e, record)}
                        >
                            {text}
                        </Checkbox>;
                    }}
            />
            <Column
                title="Action"
                key="action"
                fixed="right"
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