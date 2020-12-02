import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal } from 'antd';

const ModalComponent = forwardRef((props: any, ref: any): JSX.Element => {
    const [visible, setVisible] = useState<boolean>(false);
    const [dataChildren, setDataChildren] = useState<JSX.Element>(<></>);

    useImperativeHandle(
        ref,
        () => ({
            setVisible,
            setDataChildren
        }),
    );

    return (
        <Modal
            title="Add Todo"
            visible={visible}
            footer={null}
            destroyOnClose
        >
            {dataChildren}
        </Modal>
    );
});

export default ModalComponent;