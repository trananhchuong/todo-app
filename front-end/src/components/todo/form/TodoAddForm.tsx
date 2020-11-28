import { Input } from 'antd';
import React from 'react';
import { Controller, useForm } from "react-hook-form";



const defaultValues = {
    name: "chuong",
};


const TodoAddForm = (prop: any) => {
    const { onSubmitForm } = prop;
    const { handleSubmit, errors, control, getValues } = useForm({ defaultValues });

    const TextArea = <Input.TextArea
        allowClear
    />;

    const onSubmit = (data: any) => {
        onSubmitForm && onSubmitForm(data);
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        errors.name && <div style={{ color: "red" }}>
                            <p>This is required</p>
                        </div>
                    }

                </div>
                <input type="submit" />
            </form>
        </div>
    )
}

export default TodoAddForm;