import React from 'react';
import { Modal, Button, message } from 'antd';
import { CreatePostForm } from './CreatePostForm'
import { POST_KEY, TOKEN_KEY, API_ROOT, AUTH_HEADER, LOC_SHAKE } from '../Constants'
export class CreatePostButton extends React.Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }


    handleOk = () => {
        this.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                const { lat, lon } = JSON.parse(localStorage.getItem(POST_KEY));
                const token = localStorage.getItem(TOKEN_KEY);

                let formData = new FormData();

                // formData.set('lat', lat);
                // formData.set('lon', lon);

                formData.set('lat', lat + LOC_SHAKE * Math.random() * 2 - LOC_SHAKE);
                formData.set('lon', lon + LOC_SHAKE * Math.random() * 2 - LOC_SHAKE);

                formData.set('message', values.message);
                formData.set('image', values.image[0].originFileObj);

                this.setState({ confirmLoading: true });
                fetch(`${API_ROOT}/post`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `${AUTH_HEADER} ${token}`,
                    }
                })
                    .then((response) => {
                        if (response.ok) {
                            this.form.resetFields();
                            this.setState({
                                visible: false,
                                confirmLoading: false
                            });
                            return this.props.loadNearbyPosts();
                        }
                        throw new Error(response.statusText);
                    })
                    .then(() => message.success('Post created successfully!'))
                    .catch((e) => {
                        console.log(e);
                        this.setState({ confirmLoading: false });
                        message.error('Failed to create the post.');
                    });
            }
        });
    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    getFormRef = (formInstance) => {
        console.log(formInstance);
        this.form = formInstance;
    }
    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create New Post
        </Button>
                <Modal
                    title="Create New Post"
                    visible={visible}
                    onOk={this.handleOk}
                    okText='Create'
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <CreatePostForm ref={this.getFormRef} />
                </Modal>
            </div>
        );
    }
}
