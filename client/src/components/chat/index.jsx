import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../lib/socketPeer";
import { Card, Col, Row, Layout, Form, Button, Input } from "antd";
import { format } from "timeago.js";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const params = useParams();
  const scrollRef = useRef();

  useEffect(() => {
    socket.emit("join-room", { username: params.username, room: params.room });
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    console.log(format(Date.now(), "en_US"));
  }, [socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onFinish = (values) => {
    const data = {
      createAt: Date.now(),
      text: values.message,
      username: params.username,
      room: params.room,
      userID: socket.id,
    };

    // console.log(data);

    setMessages((prev) => [...prev, data]);

    socket.emit("chat", data);
  };

  return (
    <Layout>
      <Row justify="center" gutter={{ xs: 8, sm: 16 }} wrap={true}>
        <Col>
          <Form initialValues={{ remember: true }} onFinish={onFinish}>
            <Card type="inner" title={`${params.username} In ${params.room}`}>
              {messages.map((item, key) => (
                <div
                  ref={scrollRef}
                  className={
                    item.username === params.username
                      ? "message"
                      : "message right"
                  }
                  key={key}
                >
                  <p>{item.text}</p>
                  <span>{format(item.createAt)}</span>
                </div>
              ))}
            </Card>
            <Form.Item
              name="message"
              rules={[{ required: true, message: "الرجاء ادخال الرسالة" }]}
            >
              <Input placeholder="الرسالة" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              ارسال
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default Chat;
