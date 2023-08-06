import React, {useEffect} from 'react';
import {useTelegram} from "./hooks/useTelegram";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Container, Form, FormControl, FormGroup, FormLabel, FormSelect, Row, Stack} from "react-bootstrap";

function App() {
    const {tg,} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg])

    return (
        <Container className={'my-4'}>
            {/*<Header />*/}
            {/*<button onClick={onToggleButton}>Toggle</button>*/}
            <Form>
                <Stack gap={3}>
                    <Row>
                        <Col>
                            <Form.Group controlId="title">
                                <Form.Label>Добавть домашнее задание</Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup className={'col-md-6'} controlId={'subject'}>
                                <FormLabel>Предмет</FormLabel>
                                <FormSelect>
                                    <option>-</option>
                                    <option value="1">Математика</option>
                                    <option value="2">Укр Мова</option>
                                </FormSelect>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup className={'col-md-6'} controlId={'date'}>
                                <FormLabel>Дата, когда задание было задано</FormLabel>
                                <FormControl required name={'date'} type={'date'}
                                             max={new Date().toISOString().split("T")[0]}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Stack>
            </Form>
        </Container>
    );
}

export default App;
