import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
//crear el context
export const CategoriasContext = createContext();

//Provider es donde se encuentra las funciones y state
const CategoriasProvider =(props) => {
    //crear el state del context
    const  [categorias, guardarCategorias] = useState([]);

    //ejecutar el llamado a la API
    useEffect(()=>{
        const obtenerCategorias = async () =>{
            //consulta a la API
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            //Pasamos los datos obtenidos a la variable
            const categorias = await axios.get(url);
            //Guardamos los datos useState de categorias
            guardarCategorias(categorias.data.drinks);
        }
        obtenerCategorias();
    },[]);

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    );
}
export default CategoriasProvider;