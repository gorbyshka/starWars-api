import React from 'react';

import { Planets } from './planets/planets';
import { Person } from './person/person';

import {
    StarWarsContainer,
    NameTitle
} from './starWarsStyle';

export const StarWars: React.FC = () => {
    return (
        <StarWarsContainer>

            <Planets />

            <NameTitle>
                StarWars Api
            </NameTitle>

            <Person />

        </StarWarsContainer>
    )
}
