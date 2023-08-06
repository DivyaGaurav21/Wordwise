import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:9000';
// const STATIC_DATA = [
//     {
//         "cityName": "Lisbon",
//         "country": "Portugal",
//         "emoji": "🇨🇷",
//         "date": "2027-10-31T15:59:59.138Z",
//         "notes": "My favorite city so far!",
//         "position": {
//             "lat": 38.727881642324164,
//             "lng": -9.140900099907554
//         },
//         "id": 73930385
//     },
//     {
//         "cityName": "Madrid",
//         "country": "Spain",
//         "emoji": "🇪🇸",
//         "date": "2027-07-15T08:22:53.976Z",
//         "notes": "",
//         "position": {
//             "lat": 40.46635901755316,
//             "lng": -3.7133789062500004
//         },
//         "id": 17806751
//     },
//     {
//         "cityName": "Berlin",
//         "country": "Germany",
//         "emoji": "🇩🇪",
//         "date": "2027-02-12T09:24:11.863Z",
//         "notes": "Amazing 😃",
//         "position": {
//             "lat": 52.53586782505711,
//             "lng": 13.376933665713324
//         },
//         "id": 98443197
//     },
//     {
//         "cityName": "Nijar",
//         "country": "Spain",
//         "emoji": "🇪🇸",
//         "date": "2023-04-03T07:47:59.202Z",
//         "notes": "",
//         "position": {
//             "lat": "36.967508314568164",
//             "lng": "-2.13128394200588"
//         },
//         "id": 98443198
//     }
// ]

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [currentCity, setCurrentCity] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchCities = async () => {
            try {
                setIsLoading(true)
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
                // setCities(STATIC_DATA);
            } catch {
                alert("there was an error in fetching data")
            } finally {
                setIsLoading(false)
            }
        }
        fetchCities()
    }, [])

    const getCity = async (id) => {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data)
            // console.log(data)
        } catch {
            alert("there was an error in fetching data by id")
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                getCity,
                currentCity

            }}
        >{children}</CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error("CityContext was used outside of the PostProvider");
    return context;
}

export { CitiesProvider, useCities }