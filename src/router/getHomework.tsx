import React, {ChangeEvent, SyntheticEvent, useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../hooks/useTelegram";
import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    FormSelect,
    ListGroup,
    ListGroupItem,
    Row,
    Stack
} from "react-bootstrap";
import {toast, ToastContainer, TypeOptions} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Homework} from "../type/homework";
import HomeworkElement from "../components/HomeworkElement/HomeworkElement";
import axios from "axios";
import {Subject} from "../type/enum/subject";

const GetHomework = () => {
    const {tg} = useTelegram();
    const [date, setDate] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [HWList, setHWList] = useState<Array<Homework>>(null!);
    const [selectedHW, setSelectedHW] = useState<number>(0);
    const [subject, setSubject] = useState<string>('');
    const notify = (notifyText: string, type: TypeOptions) => toast(notifyText, {type: type});

    const getHomeworkFromDb = async (title: string, date: Date, subject: Subject) => {
        return (await axios.get('https://localhost:5000/get', {
            params: {
                title,
                subject,
                date
            }
        })).data;
    }

    useEffect(() => {
        tg.ready();
    }, [tg])

    const onSendData = useCallback(async () => {

    }, []);

    useEffect(() => {
        tg?.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg?.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, tg])

    useEffect(() => {
        if (selectedHW) {
            tg?.MainButton?.show();
        } else {
            tg?.MainButton?.hide();
        }
    }, [tg?.MainButton, selectedHW])

    useEffect(() => {
        tg?.MainButton?.setParams({
            text: 'Получить Домашние Задание'
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

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value);
    }

    const handleSearch = async () => {
        if (subject && (date || title)) {
            await getHomeworkFromDb(subject, new Date(date), title as Subject);
        } else {
            notify("Введите данные для поиска!", "error")
        }
    }

    return (
        <Stack gap={4}>
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

                </Stack>
            </Form>

            <Container>
                <ListGroup>
                    {HWList?.map(value =>
                        <ListGroupItem action onClick={e => console.log(e.currentTarget.className)} key={value.id}>
                            <HomeworkElement hw={value}/>
                        </ListGroupItem>
                    )}
                </ListGroup>
            </Container>

            <Stack direction="horizontal" gap={2} className="justify-content-end">
                <Button onClick={handleSearch}>Поиск 🔍</Button>
            </Stack>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Stack>
    );
};

export default GetHomework;