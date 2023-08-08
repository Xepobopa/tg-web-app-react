import React, {ChangeEvent, SyntheticEvent, useCallback, useEffect, useState} from 'react';
import {useTelegram} from "./hooks/useTelegram";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Container, Form, FormControl, FormGroup, FormLabel, FormSelect, Row, Stack} from "react-bootstrap";

function App() {
    const {tg} = useTelegram();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [subject, setSubject] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [date, setDate] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [title, setTitle] = useState<string>('');
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
    }, [tg])

    useEffect(() => {
        tg?.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg?.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, tg])

    useEffect(() => {
        if (images && date && title && subject) {
            tg?.MainButton?.show();
        } else {
            tg?.MainButton?.hide();
        }
    }, [subject, date, title, images, tg?.MainButton])

    useEffect(() => {
        tg?.MainButton?.setParams({
            text: 'Отправить данные'
        })
    }, [tg?.MainButton])

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
        setImages(e.target.files);
    }

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                    <Row>
                        <span>Выбранные файлы:</span>
                        <ul style={{'listStyle': 'none'}}>
                            {Array.from(images ? images : []).map(image => <li>{image.name}</li>)}
                        </ul>
                    </Row>
                </Stack>
            </Form>
        </Container>
    );
}

export default App;
