import { Button, Checkbox, Modal, Space, Table } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { getStatusApi, getTodoApi } from '../../constant/ApiConstant';
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
    statusList: []
};

const TodoTable = (props: any) => {
    const [appState, setAppState] = useState<AppState>(stateDefault);
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        fetchDataTodo();
    }, []);

    const fetchDataTodo = () => {
        const getTodoUrl = AppUtils.Axios.get(getTodoApi);
        const getStatusUrl = AppUtils.Axios.get(getStatusApi);

        AppUtils.Axios.all(
            [
                getTodoUrl,
                getStatusUrl
            ]
        ).then((res: any) => {
            const todoRes = _.get(res[0], 'data.results');
            const statusRes = _.get(res[1], 'data.results');

            setAppState({
                ...appState,
                statusList: statusRes,
                todos: todoRes,
                loading: false
            });
        })
            .catch((e: any) => {
                console.log('🚀 ~ file: TodoTable.tsx ~ line 42 ~ fetchDataTodo ~ e', e);
            });
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

    const handleOk = (dataForm: any) => {
        console.log('🚀 ~ file: TodoTable.tsx ~ line 93 ~ handleOk ~ dataForm', dataForm);
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const renderModal = () => {

        return (
            <>
                <Modal
                    title="Add Todo"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <TodoAddForm
                        onSubmitForm={handleOk}
                    />
                </Modal>
            </>
        );
    };

    const handleAdd = () => {
        setVisible(true);
    };

    const renderBtnAdd = () => {
        return <Button type="primary" onClick={handleAdd}>
            Add
      </Button>;
    };

    return <>
        {renderBtnAdd()}
        {renderTable()}
        {renderModal()}
    </>;

};

export default TodoTable;