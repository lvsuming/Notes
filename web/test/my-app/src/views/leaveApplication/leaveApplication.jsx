import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input  } from 'antd';
//import Form from 'antd/lib/form';
//import Input from 'antd/lib/input';
import 'antd/lib/form/style/index.css';
import 'antd/lib/input/style/index.css';

const FormItem = Form.Item;
let str = '测试';

class LeaveApplication extends React.Component{
    handleSubmit(){

    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
                lg: { span: 3 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
                lg: { span: 6 }
            },
        };
        return <Form layout="horizontal" onSubmit={this.handleSubmit}>{str}
            <FormItem
                {...formItemLayout}
                label="E-mail"
                hasFeedback
            >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                        required: true, message: 'Please input your E-mail!',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
        </Form>
    }
}
const LeaveApplicationPage = Form.create()(LeaveApplication);

export default LeaveApplicationPage;