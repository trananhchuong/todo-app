import React, { useEffect, useRef, useState } from 'react';
import AppUtils from '../../utils/AppUtils';
import _ from 'lodash';
import Axios from 'axios';
import { TodoType } from '../../types/TypeConstants';
import Loading from '../loading/Loading';
import './styles/todoStyles.scss';
import { AppState } from '../../types/InterfaceConstants';
import { Table, Tag, Space, Checkbox, Button, Modal } from 'antd';

const { Column, ColumnGroup } = Table;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => {
      <a>{text}</a>
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any) => (
      <>
        {
          tags.map((tag: any) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })
        }
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: any) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const stateDefault: AppState = {
  loading: true,
  todos: [],
  name: '',
  content: ''
}

function Todo() {

  const [appState, setAppState] = useState<AppState>(stateDefault);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    fetchDataTodo()
  }, []);

  const fetchDataTodo = async () => {
    try {
      const url: string = "/api/todo";
      const res = await AppUtils.Axios.get(url);

      if (res) {
        const dataRes = _.get(res, 'data');
        if (dataRes.success) {
          const todosRes = _.get(dataRes, 'results');
          setAppState({
            ...appState,
            todos: todosRes,
            loading: false
          });
        }
      }

    } catch (error) {
      console.log("App -> error", error)
    }
  }

  if (appState.loading) return <div className="loading-box">
    <Loading />
  </div>;

  const onChangeCompleted = (e: any) => {
    console.log(`checked = ${e.target.checked}`);
  }

  const renderTable = () => {
    return <Table dataSource={appState.todos}>
      <Column title="Name" dataIndex="name" key="name" />
      <Column
        title="Completed"
        dataIndex="completed"
        key="completed"
        render={
          (completed: any) => {
            const text = completed ? "completed" : "un-completed";
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
        render={(text, record: any) => (
          <Space size="small">
            <a>Update {record.lastName}</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  }

  const handleAdd = () => {
    console.log("add");
    setVisible(true)
  }

  const renderBtnAdd = () => {
    return <Button type="primary" onClick={handleAdd}>
      Add
      </Button>
  }

  const handleOk = () => {
    setVisible(false)

  };

  const handleCancel = () => {
    setVisible(false)
  };

  const renderModal = () => {
    return (
      <>
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    );
  }

  return <>
    {renderBtnAdd()}
    {renderTable()}
    {renderModal()}
  </>
}

export default Todo;
