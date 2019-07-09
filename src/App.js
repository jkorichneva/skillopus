import React, { useState } from 'react';

import randomColor from 'randomcolor';

import './App.css';

const SKILLS = [
    'В коммуникациях',
    'В анализе и планировании задач',
    'В качестве кода и код-ревью',
    'При исполнении взятых обязательств',
    'В саморазвитии',
    '',
];
const LEVELS = [
    'Не могу оценить',
    'Безынициативно, но делает',
    'Так, как все коллеги вокруг',
    'Хорошо и берет на себя ответственность',
    'Помогает и другим вне своей ответственности',
    'Крутотеньски, быть лучше не может',
];

const App = ({ name, period, responseEmail }) => {
    const primaryColor = randomColor();
    const secondaryColor = randomColor({luminosity: 'bright'});

    const [isShowResults, showResults] = useState(false);

    const [currentLevels, setLevel] = useState(LEVELS.map(() => Math.round(Math.random() * (LEVELS.length - 1))));
    const [currentSkills, setSkills] = useState([...SKILLS]);
    const [answers, setAnswers] = useState({
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
    console.log(results);

    return (
        <div className="wrapper">
            <h1>{name}</h1>
            <p>Как себя проявил, на ваш взгляд, за последние {period} месяца/ев:</p>
            <p><em>Что такое <a href="https://fff.works/octopus/">осьминожка навыков</a>, двигайте ноги - ставьте баллы</em></p>

            <div className="octo">
                <div
                    className="octo-body"
                    style={{ background: primaryColor }}
                >
                    <div className="octo-body__skirt" style={{
                        background: `linear-gradient(to right, ${secondaryColor} 0%, ${primaryColor} 85%)`
                    }} />
                </div>

                {currentSkills.map((skill, skillKey) => (
                    <>
                        <input
                            className={`skills ${skillKey !== currentSkills.length - 1 ? 'skills_disabled' : ''}`}
                            type="text"
                            name={`skill${skillKey}`}
                            value={skill || ''}
                            placeholder={'Впишите свое...'}
                            readOnly={skillKey !== currentSkills.length - 1}
                            onChange={event => {
                                const target = event.target || event.currentTarget;
                                setSkills(currentSkills.map((iterSkill, iterSkillKey) => {
                                    return iterSkillKey === skillKey ? target.value : iterSkill;
                                }))
                            }}

                            maxlength="40"
                        />
                        <div className={`octo-legs octo-leg${skillKey}`}>
                            {LEVELS.reduceRight((result, level, levelKey) => {
                                return result.concat([(
                                    <>
                                        <input
                                            type="radio"
                                            name={`leg${skillKey}`}
                                            id={`leg${skillKey}-${levelKey}`}
                                            value={levelKey}
                                            checked={currentLevels[skillKey] === levelKey ? 'checked' : ''}
                                            onChange={() => setLevel(currentLevels.map((iterLevelKey, iterSkillKey) => {
                                                return iterSkillKey === skillKey ? levelKey : iterLevelKey;
                                            }))}
                                        />
                                        <label htmlFor={`leg${skillKey}-${levelKey}`} title={level}/>
                                    </>
                                )])
                            }, [])}
                            <div className="progessbar" style={{
                                background:
                                    (currentLevels[skillKey] >= LEVELS.length - 3) ?
                                        `linear-gradient(to right, ${secondaryColor} 0%, ${primaryColor} 85%)` :
                                        `${primaryColor}`
                            }} />
                        </div>
                    </>
                ))}
            </div>

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
                    maxlength="1500"
                    value={answers.positive.text}
                />
            </div>

            <div className="question">
                <h2>Что можно сделать было лучше?</h2>
                <textarea onChange={event => {
                        setAnswers({
                            ...answers,
                            negative: {
                                text: event.target.value,
                            },
                        })
                    }}
                    maxlength="1500"
                    value={answers.negative.text}
                />
            </div>

            <div className="send-form">
                <a
                    className="send"
                    href={getMailto(responseEmail, name, results)}
                >
                    Отправь результат
                </a>
                <span className="expand" onClick={() => showResults(true)}>или вручную</span>
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
    return (`Performance Review - ${name}`);
}

function getResponseBody(results) {
    // encodeURIComponent
    return (serializeResults(results));
}

function serializeResults(results) {
    return JSON.stringify(results);
}

export default App;
