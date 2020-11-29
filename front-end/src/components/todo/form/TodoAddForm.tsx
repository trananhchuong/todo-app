import { Input } from 'antd';
import _ from 'lodash';
import React, { forwardRef, useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { ComboType } from '../../../types/TypeConstants';

const defaultValues = {
    name: 'chuong',
    statusId: ''
};
interface Prop {
    onSubmitForm: () => void,
    statusOption: ComboType[],
}

const TodoAddForm = forwardRef((prop: Prop, ref: any) => {
    const { onSubmitForm, statusOption } = prop;
    const { handleSubmit, errors, control, getValues, trigger } = useForm({ defaultValues });

    useImperativeHandle(
        ref,
        () => ({
            getFormsValue
        }),
    );

    const TextArea = <Input.TextArea
        allowClear
    />;

    const getFormsValue = () => {
        if (trigger()) {
            const valuesForm = getValues();
            return {
                name: valuesForm.name,
                statusCode: _.get(valuesForm, 'statusId.value')
            };
        }
    };

    return (
        <div className="App">
            <form>
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
                        options={statusOption}
                        control={control}
                        rules={{
                            required: true
                        }}
                    />

                </div>
                <button>Add</button>
            </form>
        </div>
    );
});

export default TodoAddForm;