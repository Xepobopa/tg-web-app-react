import React, {useEffect} from 'react';
import './App.css';

const tg = (window as any).Telegram.WebApp;
function App() {

    useEffect(() => {
        tg.ready();
    }, [])

    const onClose = () => {
        tg.close();
    }

    return (
        <div className="App">
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default App;
