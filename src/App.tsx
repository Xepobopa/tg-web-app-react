import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import AddHomework from "./router/addHomework";
import GetHomework from "./router/getHomework";

function App() {


    return (
        <Container className={'my-4'}>
            <Routes>
                <Route index element={<AddHomework/>}/>
                <Route path={'get'} element={<GetHomework/>}/>
            </Routes>

        </Container>
    );
}

export default App;
