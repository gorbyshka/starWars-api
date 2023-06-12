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
    PlanetName,
    ListItem,
    Loader
} from './planetsStyle';

export const Planets: React.FC = () => {

    const [planetData, setPlanetData] = useState({

        planet: '',
        resident: [] as string[],
        climate: '',
        created: '',
        diameter: '',
        edited: '',
        films: [] as string[],
        gravity: '',
        orbitalPeriod: '',
        population: '',
        rotationPeriod: '',
        surfaceWater: '',
        terrain: '',

    });

    const [number, setNumber] = useState(1);
    const [numberHistory, setNumberHistory] = useState([1]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const starWarsData = async () => {

            try {

                setIsLoading(true);

                const response = await axios.get(`https://swapi.dev/api/planets/${number}/`);
                const data = response.data;

                setPlanetData(prevData => ({
                    ...prevData,
                    planet: data.name,
                    climate: data.climate,
                    created: data.created,
                    diameter: data.diameter,
                    edited: data.edited,
                    gravity: data.gravity,
                    orbitalPeriod: data.orbital_period,
                    population: data.population,
                    rotationPeriod: data.rotation_period,
                    surfaceWater: data.surface_water,
                    terrain: data.terrain,
                }));

                const residentsData = await Promise.all(data.residents.map((residentUrl: string) => axios.get(residentUrl)));
                const residentsResult = residentsData.map(residentResponse => residentResponse.data.name);

                setPlanetData(prevData => ({
                    ...prevData,
                    resident: residentsResult,
                }));

                const filmsData = await Promise.all(data.films.map((filmUrl: string) => axios.get(filmUrl)));
                const filmsResult = filmsData.map(filmResponse => filmResponse.data.title);

                setPlanetData(prevData => ({
                    ...prevData,
                    films: filmsResult,
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

                    <PlanetName>

                        {planetData.planet || 'Unknown'}

                    </PlanetName>

                    <Item>

                        Resident:

                        <List>

                            {planetData.resident.map((resident, index) => (

                                <ListItem key={index}>

                                    {index + 1}. {resident}

                                </ListItem>
                            ))}

                            {planetData.resident.length === 0 && <ListItem>Unknown</ListItem>}

                        </List>

                    </Item>

                    <Item>

                        Climate: {planetData.climate || 'Unknown'}

                    </Item>

                    <Item>

                        Created: {planetData.created || 'Unknown'}

                    </Item>

                    <Item>

                        Diameter: {planetData.diameter || 'Unknown'}

                    </Item>

                    <Item>

                        Edited: {planetData.edited || 'Unknown'}

                    </Item>

                    <Item>

                        Films:

                        <List>

                            {planetData.films.map((film, index) => (

                                <ListItem key={index}>

                                    {index + 1}. {film}

                                </ListItem>
                            ))}

                            {planetData.films.length === 0 && <ListItem>Unknown</ListItem>}

                        </List>

                    </Item>

                    <Item>

                        Gravity: {planetData.gravity || 'Unknown'}

                    </Item>

                    <Item>

                        Orbital: {planetData.orbitalPeriod || 'Unknown'}

                    </Item>

                    <Item>

                        Population: {planetData.population || 'Unknown'}

                    </Item>

                    <Item>

                        Rotation: {planetData.rotationPeriod || 'Unknown'}

                    </Item>

                    <Item>

                        Surface: {planetData.surfaceWater || 'Unknown'}

                    </Item>

                    <Item>

                        Terrain: {planetData.terrain || 'Unknown'}

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
