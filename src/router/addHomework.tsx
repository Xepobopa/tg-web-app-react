import React, {ChangeEvent, SyntheticEvent, useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../hooks/useTelegram";
import axios from "axios";
import {Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Row, Stack} from "react-bootstrap";
import {Homework} from "../type/homework";
import {ConfigService} from "../config/configService";

const AddHomework = () => {
    const {tg} = useTelegram();
    const [subjects, setSubjects] = useState<string[]>(['-']);
    const [subject, setSubject] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [images, setImages] = useState<FileList | null>(null);

    const onSendData = useCallback(async () => {
        // send images and get their URLs
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subject', subject);
        formData.append('date', date);
        Array.from(images ? images : []).forEach(image => formData.append('images', image));
        const res = (await axios.post<Homework>(
                'http://localhost:5000/webData',
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}})
        ).data;

        console.log(res);

        tg.sendData(JSON.stringify(res));
    }, [date, images, subject, tg, title]);

    useEffect(() => {
        const a = new ConfigService();
        console.log(a.dtkddtu_2course.push('-'))
        setSubjects(a.dtkddtu_2course);
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
        setDate(e.currentTarget.valueAsDate?.toISOString()!);
    }

    const handleChangeFiles = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setImages(e.target.files);
    }

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value);
    }

    const handleOnClick = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subject', subject);
        formData.append('date', date);
        Array.from(images ? images : []).forEach(image => formData.append('images', image));
        axios.post(
            'http://localhost:5000/webData',
            formData,
            {headers: {'Content-Type': 'multipart/form-data'}})
            .then(value => console.log(value))
            .catch(reason => console.log(reason));
    }

    return (
        <div>
            <Form>
                <Stack gap={3}>
                    <Row>
                        <Col>
                            <FormGroup className={'col-md-6'} controlId={'subject'}>
                                <FormLabel>Предмет</FormLabel>
                                <FormSelect onChange={handleSelectSubject}>
                                    {subjects.map(value => <option key={value}>{value}</option>)}
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
                            {Array.from(images ? images : []).map(image => <li key={image.name}>{image.name}</li>)}
                        </ul>
                    </Row>
                </Stack>
            </Form>
            <button onClick={handleOnClick}>Save images</button>
        </div>
    );
};

export default AddHomework;