import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa'

import { Container, List } from './styles/App';

function App() {
    const [tecnologias, setTecnologia] = useState([]);
    const [novaTecnologia, setNovaTecnologia] = useState('');

    const salvarTecnologia = useCallback((evento) => {
        return setNovaTecnologia(evento.target.value)
    }, [])

    const imprimirTecnologia = useCallback(() => {
        setTecnologia([ ...tecnologias, novaTecnologia ]);
        setNovaTecnologia('');
    });

    function removerTecnologia(tecnologia) {
        const encontraTecnologia = tecnologias.indexOf(tecnologia);

        tecnologias.splice(encontraTecnologia, 1);

        setTecnologia([tecnologias])

    }

    // *** componentDidMount ***

    useEffect(() => {
        const tecnologiasArmazenadas = localStorage.getItem('tecnologias');

        if(tecnologiasArmazenadas) {
            setTecnologia(JSON.parse(tecnologiasArmazenadas));
        }
    }, []);


    // *** componentDidUpdate ***

    useEffect(() => {
        localStorage.setItem('tecnologias', JSON.stringify(tecnologias));

    }, [tecnologias]);

    return (
        <Container>
            <h1>React Hooks</h1>
            <div>
                <input
                    type="text"
                    placeholder="Digíte uma tecnologia..."
                    value={novaTecnologia}
                    onChange={evento => salvarTecnologia(evento)}
                />

                <button onClick={imprimirTecnologia}>
                    <FaPlus size={20} color="#FFF"/>
                </button>
            </div>

            <List>
                { tecnologias.map( tecnologia => (
                    <li key={tecnologia}>
                        {tecnologia}
                        <button onClick={() => removerTecnologia(tecnologia)}>
                            <FaTrash size={16} color="#7159C1"/>
                        </button>
                    </li>
                )) }
            </List>
        </Container>
    );
}

export default App;
