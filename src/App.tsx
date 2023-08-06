import React, {useEffect} from 'react';
import {useTelegram} from "./hooks/useTelegram";
import Dropdown from "react-bootstrap/Dropdown";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    const {tg, } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg])

    return (
        <div className="App">
            {/*<Header />*/}
            {/*<button onClick={onToggleButton}>Toggle</button>*/}
            <Dropdown className={'border-0'}>
                <Dropdown.Toggle>Предмет</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href={"#"}>test</Dropdown.Item>
                    <Dropdown.Item href={"#"}>test1</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default App;
