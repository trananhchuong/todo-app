import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Input, Button, message } from 'antd';
import _ from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { addTodoApi, getStatusApi, showTodoApi, updateTodoApi } from '../../../constant/ApiConstant';
import { ComboType } from '../../../types/TypeConstants';
import AppUtils from '../../../utils/AppUtils';
import Loading from '../../loading/Loading';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import '../styles/todoFormStyles.scss';

type Prop = {
    todoId?: string,
    reLoadListTodo: () => void,
    onCloseModal: () => void,
}

interface dataTodoForm {
    name: string,
    indexStatusCode?: number
}

interface ToDoFormState {
    loading: boolean,
    statusOption: ComboType[],
    dataTodo: dataTodoForm
}

const ToDoFormStateDefault: ToDoFormState = {
    loading: true,
    statusOption: [],
    dataTodo: {
        name: '',
    }
};

const TodoAddForm = forwardRef((prop: Prop, ref: any): JSX.Element => {
    const { todoId } = prop;
    const [todoFormState, setTodoFromState] = useStateWithCallbackLazy<ToDoFormState>(ToDoFormStateDefault);
    const { errors, control, getValues, trigger, handleSubmit } = useForm();
    const isUpdate = todoId ? true : false;

    useImperativeHandle(
        ref,
        () => ({
            getFormsValue
        }),
    );

    useEffect(() => {
        //case update
        if (isUpdate) {
            fetchDataUpdate();
        } else {
            fetchDataAdd();
        }
    }, []);

    const fetchDataUpdate = async () => {
        const requestGetTodo = AppUtils.Axios.get(`${showTodoApi}?id=${todoId}`);
        const requestGetStatus = AppUtils.Axios.get(getStatusApi);

        AppUtils.Axios.all([requestGetTodo, requestGetStatus])
            .then((res) => {
                const dataTodoRes = _.get(res[0], 'data.results');
                const dataStatusRes = _.get(res[1], 'data.results');
                const indexStatus = _.findIndex(dataStatusRes, (item: any) => {
                    return item.value === _.get(dataTodoRes, 'statusCode');
                });

                setTodoFromState({
                    ...todoFormState,
                    loading: false,
                    statusOption: dataStatusRes,
                    dataTodo: {
                        name: _.get(dataTodoRes, 'name'),
                        indexStatusCode: indexStatus,
                    }
                }, undefined);
            })
            .catch((error) => {
                console.log('🚀 ~ file: TodoAddForm.tsx ~ line 67 ~ fetchDataUpdate ~ error', error);
            });
    };

    const fetchDataAdd = async () => {
        try {
            const response = await AppUtils.Axios.get(getStatusApi);
            const responseData = _.get(response, 'data');
            if (_.get(responseData, 'success', false)) {
                setTodoFromState({
                    ...todoFormState,
                    loading: false,
                    statusOption: _.get(responseData, 'results')
                }, undefined);
            } else {
                //toast error message
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getFormsValue = () => {
        if (trigger()) {
            const valuesForm = getValues();
            return {
                name: valuesForm.name,
                statusCode: _.get(valuesForm, 'statusCode.value')
            };
        }
    };

    const handleSave = async (data: any) => {
        try {
            setTodoFromState({
                ...todoFormState,
                loading: true
            }, undefined);
            const dataTransform = {
                name: data.name,
                statusCode: _.get(data, 'statusCode.value')
            };
            const dataPost = isUpdate ? { ...dataTransform, id: todoId } : dataTransform;
            const url = isUpdate ? updateTodoApi : addTodoApi;
            const response = await AppUtils.Axios.post(url, dataPost);
            const success = _.get(response, 'data.success', false);
            const messageNoti = isUpdate ? 'updated' : 'add';

            if (success) {
                setTodoFromState({
                    ...todoFormState,
                    loading: false
                }, () => {
                    prop.onCloseModal();
                    prop.reLoadListTodo();
                    message.success(`${messageNoti} success`);

                });
            }
            console.log('🚀 ~ file: TodoAddForm.tsx ~ line 117 ~ handleSave ~ data', data);
            return;

        } catch (error) {
            console.log(error);
        }
    };

    if (todoFormState.loading)
        return <Loading />;


    return (
        <div className="todo-form">
            <form onSubmit={handleSubmit(handleSave)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        defaultValue={todoFormState.dataTodo.name}
                        render={(propsInput) => {
                            return <Input.TextArea
                                placeholder="type name todo..."
                                value={propsInput.value}
                                onChange={propsInput.onChange}
                            />;
                        }}
                    />
                    {
                        errors.name && <div style={{ color: 'red' }}>
                            <p>This is required</p>
                        </div>
                    }
                    <label htmlFor="statusCode">Status</label>
                    <Controller
                        name="statusCode"
                        control={control}
                        rules={{
                            required: true
                        }}
                        defaultValue={todoFormState.statusOption[todoFormState.dataTodo.indexStatusCode!]}
                        render={(propsInput) => (
                            <Select
                                options={todoFormState.statusOption}
                                onChange={propsInput.onChange}
                                value={propsInput.value}
                            />
                        )}
                    />
                    {
                        errors.statusCode && <div style={{ color: 'red' }}>
                            <p>This is required</p>
                        </div>
                    }
                    <div className="button-footer">
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Save
                        </Button>
                        <Button
                            type="primary"
                            danger
                            className="btn-close"
                            onClick={prop.onCloseModal}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
});

export default TodoAddForm;
