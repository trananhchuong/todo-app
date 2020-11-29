import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Modal, Space, Table } from 'antd';
import _ from 'lodash';
import { getTodoApi } from '../../constant/ApiConstant';
import { AppState } from '../../types/InterfaceConstants';
import AppUtils from '../../utils/AppUtils';
import Loading from '../loading/Loading';
import TodoAddForm from './form/TodoAddForm';

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
                    loading: false
                });
            } else {
                //toast error message
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (appState.loading) {
        return <div className="loading-box">
            <Loading />
        </div>;
    }

    const onChangeCompleted = (e: any) => {
        console.log(`checked = ${e.target.checked}`);
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
                    (text, record: any) => (
                        <Space
                            size="small"
                        >
                            <a>Update {record.lastName}</a>
                            <a>Delete</a>
                        </Space>
                    )}
            />
        </Table>;
    };


    const handleCancel = () => {
        setAppState({
            ...appState,
            visible: false
        });
    };

    const renderModal = () => {
        return (
            <>
                <Modal
                    title="Add Todo"
                    visible={appState.visible}
                    footer={null}
                >
                    <TodoAddForm
                        ref={formTodoRef}
                        reLoadListTodo={fetchDataTodo}
                        onCloseModal={handleCancel}
                    />
                </Modal>
            </>
        );
    };

    const handleAdd = () => {
        setAppState({
            ...appState,
            visible: true
        });
    };

    const renderBtnAdd = () => {
        return <Button
            type="primary"
            onClick={handleAdd}
        >
            Add
      </Button>;
    };

    console.log('state: ', appState.visible);

    return <>
        {renderBtnAdd()}
        {renderTable()}
        {renderModal()}
    </>;

};

export default TodoTable;