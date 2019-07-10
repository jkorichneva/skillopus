import React, { useState } from 'react';

import randomColor from 'randomcolor';

import LEVELS from '../constants/levels';

import Meduza from '../Meduza/Meduza';

import './App.css';

const SKILLS = [
    'В коммуникациях',
    'В анализе и планировании задач',
    'В качестве кода и код-ревью',
    'При исполнении взятых обязательств',
    'В саморазвитии',
    '',
];

const App = ({
    name = '?',
    period,
    responseEmail = '',
    primaryColor: defaultPrimaryColor,
    secondaryColor: defaultSeconaryColor,
    skills: defaultSkills,
    answers: defaultAnswers,
}) => {
    const primaryColor = defaultPrimaryColor || randomColor();
    const secondaryColor = defaultSeconaryColor || randomColor({luminosity: 'bright'});

    const [isShowResults, showResults] = useState(false);

    // очень зря разбил
    const [currentLevels, setLevel] = useState(
        defaultSkills ?
        Object.values(defaultSkills) :
        LEVELS.map(() => Math.round(Math.random() * (LEVELS.length - 1)))
    );
    const [currentSkills, setSkills] = useState(
        defaultSkills ? Object.keys(defaultSkills) : [...SKILLS]
    );
    const [answers, setAnswers] = useState(defaultAnswers || {
        positive: { text: '' },
        negative: { text: '' },
    });

    const results = {
        name,
        period,
        primaryColor,
        secondaryColor,
        skills: currentSkills.reduce((result, skill, key) => {
            return {
                ...result,
                [skill]: currentLevels[key],
            };
        }, {}),
        answers,
    };

    return (
        <div className="wrapper">
            <p><em>Что такое <a href="https://fff.works/octopus/">осьминожка навыков</a>, двигайте ноги - ставьте баллы</em></p>
            <h1>{name}</h1>
            <p>Как себя проявил, на ваш взгляд, за последние {period} месяца/ев:</p>

            <Meduza
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                currentSkills={currentSkills}
                currentLevels={currentLevels}
                levels={LEVELS}
                onSkillChange={setSkills}
                onLevelChange={setLevel}
                editable={true}
            />

            <div className="question">
                <h2>Что было важно?</h2>
                <textarea onChange={event => {
                    setAnswers({
                        ...answers,
                        positive: {
                            text: event.target.value,
                        },
                    });
                }}
                          maxLength="1500"
                          value={answers.positive.text}
                />
            </div>

            <div className="question">
                <h2>Что можно было сделать лучше?</h2>
                <textarea onChange={event => {
                    setAnswers({
                        ...answers,
                        negative: {
                            text: event.target.value,
                        },
                    })
                }}
                          maxLength="1500"
                          value={answers.negative.text}
                />
            </div>

            <div className="send-form">
                <a
                    className="send"
                    href={getMailto(responseEmail, name, results)}
                >
                    Открыть письмо в Outlook
                </a>
                <span className="expand" onClick={() => showResults(true)}>или, если это не сработает на нажатии, вручную</span>
            </div>

            {!!isShowResults && (
                <div className="results">
                    <h3>Скопируй и отправь на {responseEmail}</h3>
                    <textarea readOnly={true} onClick={event => event.target.select()} value={serializeResults(results)} />
                </div>
            )}
        </div>
    );
};

function getMailto(email, name, results) {
    return `mailto:${email}?subject=${getResponseSubject(name)}&body=${getResponseBody(results)}`;
}

function getResponseSubject(name) {
    // encodeURIComponent
    return (`Performance Review - ${name}`).replace(/ /g, '%20');
}

function getResponseBody(results) {
    // encodeURIComponent
    return (serializeResults(results)).replace(/ /g, '%20');
}

function serializeResults(results) {
    return JSON.stringify(results);
}

export default App;
