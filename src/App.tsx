import React, {ChangeEvent, SyntheticEvent, useCallback, useEffect, useState} from 'react';
import {useTelegram} from "./hooks/useTelegram";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Container, Form, FormControl, FormGroup, FormLabel, FormSelect, Row, Stack} from "react-bootstrap";

function App() {
    const {tg, onToggleButton} = useTelegram();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [subject, setSubject] = useState<string>(null!);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [date, setDate] = useState<string>(null!);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [title, setTitle] = useState<string>(null!);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [images, setImages] = useState<FileList | null>(null);

    const onSendData = useCallback(() => {
        const data = {
            subject,
            date,
            title,
            images
        }
        tg.sendData(JSON.stringify(data));
    }, [date, images, subject, tg, title]);

    useEffect(() => {
        tg.ready();
        onToggleButton();
    }, [onToggleButton, tg])

    useEffect(() => {
        // eslint-disable-next-line
        tg.WebApp.onEvent('mainButtonClicked', onSendData);
        return () => {
            // eslint-disable-next-line
            tg.WebApp.offEvent('mainButtonClicked', onSendData);
        }
    }, [onSendData, tg.WebApp])

    useEffect(() => {
        if (images && date && title && subject)
            onToggleButton();
        else
            onToggleButton();
    }, [subject, date, title, images, onToggleButton])

    const handleSelectSubject = (e: SyntheticEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setSubject(e.currentTarget.value);
    }

    const handleSelectDate = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setDate(e.currentTarget.value);
    }

    const handleChangeFiles = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e.target.files)
        setImages(e.target.files);
    }

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setTitle(e.currentTarget.value);
    }

    return (
        <Container className={'my-4'}>
            <Form>
                <Stack gap={3}>
                    <Row>
                        <Col>
                            <FormGroup className={'col-md-6'} controlId={'subject'}>
                                <FormLabel>Предмет</FormLabel>
                                <FormSelect onChange={handleSelectSubject}>
                                    <option>-</option>
                                    <option>Математика</option>
                                    <option>Укр Мова</option>
                                </FormSelect>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup className={'col-md-6'} controlId={'date'}>
                                <FormLabel>Когда задали дз</FormLabel>
                                <FormControl required name={'date'} type={'date'} onSelect={handleSelectDate}
                                             max={new Date().toISOString().split("T")[0]}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group controlId="markdown">
                            <Form.Label>Название задания</Form.Label>
                            <Form.Control required as="textarea" name="body" rows={2} onChange={handleChangeTitle}/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="files">
                            <Form.Label>Фото</Form.Label>
                            <Form.Control required type={'file'} name="file" onChange={handleChangeFiles} multiple/>
                        </Form.Group>
                    </Row>
                </Stack>
            </Form>
        </Container>
    );
}

export default App;
