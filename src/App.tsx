import React, {useEffect, useState} from 'react';
import './App.css';

type BreedType = {
    id: string
    name: string
}

// Определите структуру данных информации о кошке
type CatInfo = {
    url: string;
    breeds: BreedType[]; // Массив объектов пород
    // Добавьте другие свойства, если они есть в данных API
}

// [{
//     "id":"ebv",
//     "url":"https://cdn2.thecatapi.com/images/ebv.jpg",
//     "width":176,"height":540,
//     "breeds":[],
//     "favourite":{}
// }]


// {
//     "id":"0XYvRd7oD",
//     "width":1204,"height":1445,
//     "url":"https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg",
//     "breeds":[{
//     "weight":{"imperial":"7  -  10","metric":"3 - 5"},
//     "id":"abys","name":"Abyssinian",
//     "temperament":"Active, Energetic, Independent, Intelligent, Gentle",
//     "origin":"Egypt",
//     "country_codes":"EG",
//     "country_code":"EG",
//     "life_span":"14 - 15",
//     "wikipedia_url":"https://en.wikipedia.org/wiki/Abyssinian_(cat)"
// }]


function App() {
    const [cat, setCat] = useState<CatInfo>({url: '', breeds: []});

    // Функция для загрузки данных о кошках, объявлена в области видимости компонента
    const fetchData = async () => {
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search', {
                headers: {
                    'x-api-key': 'live_312jcnsG2YlGvDxkZb6rfUIe2q2rKsBZSKvmXscTspvvMTZXPRCt9bR4mfDzNIYM' // Замените 'YOUR_API_KEY' на ваш ключ
                }
            });
            const result = await response.json();
            setCat(result[0]);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Вызываем функцию при монтировании компонента
    }, []);

    // Функция для загрузки новой кошки
    const getNewCat = () => {
        fetchData();
    };


    return (
        <div className="App">
            <header className="App-header">
                {cat.url ? (
                        <>
                            <img src={cat.url} alt="A random cat"/>
                            <h2>{cat.breeds.length > 0 ? cat.breeds[0].name : 'Неизвестная порода'}</h2>
                            <button onClick={getNewCat}>Это ваша кошка?</button>
                        </>
                    )
                    : (
                        <div>Loading...</div>
                    )}
            </header>
        </div>
    );
}



export default App;

