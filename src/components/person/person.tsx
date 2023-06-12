import React,
{
    useEffect,
    useState
} from 'react';

import axios from 'axios';

import {
    ButtonBack,
    ButtonContainer,
    ButtonNext,
    Container,
    Item,
    List,
    PersonName,
    ListItem,
    Loader
} from './personStyle';

export const Person: React.FC = () => {

    const [personData, setPersonData] = useState({

        name: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        homeworld: '',
        films: [] as string[],
        species: [] as string[],
        vehicles: [] as string[],
        starships: [] as string[],
        created: '',
        edited: '',

    });

    const [number, setNumber] = useState(1);
    const [numberHistory, setNumberHistory] = useState([1]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const starWarsData = async () => {

            try {

                setIsLoading(true);

                const response = await axios.get(`https://swapi.dev/api/people/${number}/`);
                const data = response.data;

                setPersonData(prevData => ({

                    ...prevData,
                    name: data.name,
                    height: data.height,
                    mass: data.mass,
                    hair_color: data.hair_color,
                    skin_color: data.skin_color,
                    eye_color: data.eye_color,
                    birth_year: data.birth_year,
                    gender: data.gender,
                    created: data.created,
                    edited: data.edited,

                }));

                const homeworldResponse = await axios.get(data.homeworld);
                const homeworldData = homeworldResponse.data;

                setPersonData(prevData => ({
                    ...prevData,
                    homeworld: homeworldData.name,
                }))

                const filmsData = await Promise.all(data.films.map((filmsUrl: string) => axios.get(filmsUrl)));
                const filmsResult = filmsData.map(filmsResponse => filmsResponse.data);

                setPersonData(prevData => ({
                    ...prevData,
                    films: filmsResult,
                }));

                const speciesData = await Promise.all(data.species.map((speciesUrl: string) => axios.get(speciesUrl)));
                const speciesResult = speciesData.map(speciesResponse => speciesResponse.data);

                setPersonData(prevData => ({
                    ...prevData,
                    species: speciesResult,
                }));

                const vehiclesData = await Promise.all(data.vehicles.map((vehiclesUrl: string) => axios.get(vehiclesUrl)));
                const vehiclesResult = vehiclesData.map(vehiclesResponse => vehiclesResponse.data);

                setPersonData(prevData => ({
                    ...prevData,
                    vehicles: vehiclesResult,
                }));

                const starshipsData = await Promise.all(data.starships.map((starshipsUrl: string) => axios.get(starshipsUrl)));
                const starshipsResult = starshipsData.map(starshipsResponse => starshipsResponse.data);

                setPersonData(prevData => ({
                    ...prevData,
                    starships: starshipsResult,
                }));

                setIsLoading(false);

            } catch (error) {

                setIsLoading(false);
                console.error(error);
            }
        };


        starWarsData();

    }, [number]);

    const handleButtonClick = () => {

        const newNumber = number + 1;
        setNumber(newNumber);
        setNumberHistory(prevHistory => [...prevHistory, newNumber]);
    };

    const handleGoBack = () => {

        const previousNumber = numberHistory.length > 1 ? numberHistory[numberHistory.length - 2] : number;
        setNumber(previousNumber);
        setNumberHistory(prevHistory => prevHistory.slice(0, prevHistory.length - 1));
    };

    return (
        <>

            {isLoading ? (

                <Loader />

            ) : (
                <Container>

                    <PersonName>

                        {personData.name || 'Unknown'}

                    </PersonName>

                    <Item>

                        Height: {personData.height || 'Unknown'}

                    </Item>

                    <Item>

                        Mass: {personData.mass || 'Unknown'}

                    </Item>

                    <Item>

                        Hair color: {personData.hair_color || 'Unknown'}

                    </Item>

                    <Item>

                        Skin color: {personData.skin_color || 'Unknown'}

                    </Item>

                    <Item>

                        Eye color: {personData.eye_color || 'Unknown'}

                    </Item>

                    <Item>

                        Birth year: {personData.birth_year || 'Unknown'}

                    </Item>

                    <Item>

                        Gender: {personData.gender || 'Unknown'}

                    </Item>

                    <Item>

                        Homeworld: {personData.homeworld || 'Unknown'}

                    </Item>

                    <Item>

                        Films:

                        <List>

                            {personData.films.map((film: any, index: number) => (

                                <ListItem key={index}>

                                    {index + 1}. {film.title || 'Unknown'}

                                </ListItem>

                            ))}

                            {personData.films.length === 0 && <ListItem>Unknown</ListItem>}

                        </List>

                    </Item>

                    <Item>

                        Species:

                        <List>

                            {personData.species.map((species: any, index: number) => (

                                <ListItem key={index}>

                                    {index + 1}. {species.name || 'Unknown'}

                                </ListItem>

                            ))}

                            {personData.species.length === 0 && <ListItem>Unknown</ListItem>}

                        </List>

                    </Item>

                    <Item>

                        Vehicles:

                        <List>

                            {personData.vehicles.map((vehicle: any, index: number) => (

                                <ListItem key={index}>

                                    {index + 1}. {vehicle.name || 'Unknown'}

                                </ListItem>

                            ))}

                            {personData.vehicles.length === 0 && <ListItem>Unknown</ListItem>}

                        </List>

                    </Item>

                    <Item>

                        Starships:

                        <List>

                            {personData.starships.map((starship: any, index: number) => (

                                <ListItem key={index}>

                                    {index + 1}. {starship.name || 'Unknown'}

                                </ListItem>

                            ))}

                            {personData.starships.length === 0 && <ListItem>Unknown</ListItem>}

                        </List>

                    </Item>

                    <Item>

                        Created: {personData.created || 'Unknown'}

                    </Item>

                    <Item>

                        Edited: {personData.edited || 'Unknown'}

                    </Item>


                    <ButtonContainer>

                        <ButtonNext
                            onClick={handleGoBack}
                            disabled={numberHistory.length <= 1}
                        >
                            Back
                            
                        </ButtonNext>

                        <ButtonBack
                            onClick={handleButtonClick}
                        >
                            Next

                        </ButtonBack>

                    </ButtonContainer>

                </Container>

            )}

        </>
    );
};
