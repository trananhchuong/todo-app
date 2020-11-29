import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Input, Button } from 'antd';
import _ from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { addTodoApi, getStatusApi } from '../../../constant/ApiConstant';
import { ComboType } from '../../../types/TypeConstants';
import AppUtils from '../../../utils/AppUtils';
import Loading from '../../loading/Loading';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import '../styles/todoFormStyles.scss';

const defaultValues = {
    name: '',
    statusId: ''
};

type Prop = {
    todoId?: string,
    reLoadListTodo: () => void,
    onCloseModal: () => void,
}
interface ToDoFormState {
    loading: boolean,
    statusOption: ComboType[]
}

const ToDoFormStateDefault: ToDoFormState = {
    loading: true,
    statusOption: []
};

const TodoAddForm = forwardRef((prop: Prop, ref: any) => {
    const [todoFormState, setTodoFromState] = useStateWithCallbackLazy<ToDoFormState>(ToDoFormStateDefault);
    const { errors, control, getValues, trigger, handleSubmit } = useForm({ defaultValues });
    const TextArea = <Input.TextArea allowClear />;

    useImperativeHandle(
        ref,
        () => ({
            getFormsValue
        }),
    );

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
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
                statusCode: _.get(valuesForm, 'statusId.value')
            };
        }
    };

    const handleSave = async (data: any) => {
        try {
            setTodoFromState({
                ...todoFormState,
                loading: true
            }, undefined);

            const dataPost = {
                name: data.name,
                statusCode: _.get(data, 'statusId.value')
            };
            const response = await AppUtils.Axios.post(addTodoApi, dataPost);
            const success = _.get(response, 'data.success', false);

            if (success) {
                setTodoFromState({
                    ...todoFormState,
                    loading: false
                }, () => {
                    prop.onCloseModal();
                    prop.reLoadListTodo();
                });
            }

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
                        as={TextArea}
                        name="name"
                        control={control}
                        defaultValue=""
                        placeholder="type name todo..."
                        rules={{
                            required: true,
                        }}
                    />
                    {
                        errors.name && <div style={{ color: 'red' }}>
                            <p>This is required</p>
                        </div>
                    }
                    <label htmlFor="statusId">Status</label>
                    <Controller
                        name="statusId"
                        as={Select}
                        options={todoFormState.statusOption}
                        control={control}
                        rules={{
                            required: true
                        }}
                    />
                    {
                        errors.statusId && <div style={{ color: 'red' }}>
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