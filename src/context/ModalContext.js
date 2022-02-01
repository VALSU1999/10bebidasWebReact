import React,{createContext, useState, useEffect} from 'react';
import axios from 'axios';

//crearel context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    //state del provider
    const [idreceta, guardarIdReceta] = useState(null);
    const [informacion, guardarReceta] = useState({});

    //una vez que tenemos una receta, llamar la API
    useEffect(() =>{
        const obtnerReceta = async () => {
            //consultamos si esta vario
            if(!idreceta) return;

            //consultamos a la API para obtenter el detalle de la bebida
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

            const resultado = await axios.get(url);
            
            guardarReceta(resultado.data.drinks[0]);
        }

        obtnerReceta();
    },[idreceta])

    return(
        <ModalContext.Provider
            value={{
                informacion,
                guardarReceta,
                guardarIdReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;