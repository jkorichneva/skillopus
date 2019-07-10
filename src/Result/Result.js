import React from 'react';

import randomColor from 'randomcolor';
import arrayShuffle from 'array-shuffle';

import LEVELS from '../constants/levels';

import './Result.css';

import Meduza from '../Meduza/Meduza';

const Result = ({ values }) => {
console.log(arrayShuffle(values));
console.log(arrayShuffle(values));
    return (
        <>
            <h1 className="results-heading">Оценка вклада человека в медузках</h1>
            <div className="results">
                {values.map(({
                    skills,
                    ...values,
                }) => (
                    <div className="result">
                        <React.Fragment>
                            {/*{JSON.stringify(skills)}*/}
                            <Meduza
                                editable={false}
                                {...values}
                                currentSkills={Object.keys(skills)}
                                currentLevels={Object.values(skills)}
                                levels={[...LEVELS]}
                            />
                        </React.Fragment>
                    </div>
                ))}
            </div>
            <div className="reviews reviews_positive">
                {arrayShuffle(values).map(({ answers: { positive: { text } } }) => (
                    <>
                        {text && (<p style={{ color: randomColor({ hue: 'green', luminosity: 'dark' }) }}>{text}</p>)}
                    </>
                ))}
            </div>
            <div className="reviews reviews_negative">
                {arrayShuffle(values).map(({ answers: { negative: { text } } }) => (
                    <>
                        {text && (<p style={{ color: randomColor({ hue: 'orange', luminosity: 'dark' }) }}>{text}</p>)}
                    </>
                ))}
            </div>
        </>
    );
};

export default Result;
