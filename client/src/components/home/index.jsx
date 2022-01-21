
import * as Yup from "yup";
import { Formik } from "formik";
import { Row, Col,Typography } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Form, Input, SubmitButton, FormItem } from "formik-antd";
import {socket} from '../../lib/socketPeer'

const { Title } = Typography;

const Home = () => {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const initialValues = { username: "", room: "" };

  const validateSchema = () =>
    Yup.object({
      username: Yup.string().required("اسم المستخدم مطلوب"),
      room: Yup.string().required("غرفة المحادثة مطلوبة"),
    });

  const submitForm = (values, { setSubmitting }) => {

    setSubmitting(false);

    setLoading(true);

    console.log(values);

    setLoading(false);

    navigate(`${values.room}/${values.username}`);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={submitForm}
    >
      {(formik) => (
        <Row justify="center" gutter={{ xs: 8, sm: 16 }} wrap={true}>
          <Col >
            <Form>
            <Title level={2}>انشاء غرفة محادثة</Title>
              <FormItem
                name="username"
                hasFeedback={true}
                showValidateSuccess={true}
              >
                <Input name="username" autoFocus placeholder={"اسم المستخدم"} />
              </FormItem>
              <FormItem
                name="room"
                hasFeedback={true}
                showValidateSuccess={true}
              >
                <Input name="room" placeholder={"غرفة المحادثة"} />
              </FormItem>

              <SubmitButton
                name="push"
                className="btn text-center"
                loading={loading}
                disabled={false}
              >
                تسجيل الدخول
              </SubmitButton>
            </Form>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default Home;
