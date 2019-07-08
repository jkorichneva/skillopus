import React, { useState } from 'react';

import randomColor from './utils/randomColor';

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


const App = () => {
    const primaryColor = randomColor();
    const secondaryColor = randomColor({luminosity: 'bright'});

    const [currentLevel, setLevel] = useState(LEVELS.map(() => Math.round(Math.random() * LEVELS.length) - 1));
    const [currentSkills, setSkills] = useState([...SKILLS]);

    return (
        <div className="wrapper">
            <h1>Медузка навыков человеков</h1>
            <p>Как себя проявил Алексей Титов на ваш взгляд за последние 4 месяца:</p>

            <div className="octo">
                <div className="octo-body" style={{ background: primaryColor }}>
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
                                            checked={currentLevel[skillKey] === levelKey ? 'checked' : ''}
                                            onClick={() => setLevel(currentLevel.map((iterLevelKey, iterSkillKey) => {
                                                return iterSkillKey === skillKey ? levelKey : iterLevelKey;
                                            }))}
                                        />
                                        <label htmlFor={`leg${skillKey}-${levelKey}`} title={level}/>
                                    </>
                                )])
                            }, [])}
                            <div className="progessbar" style={{
                                background:
                                    (currentLevel[skillKey] >= LEVELS.length - 3) ?
                                        `linear-gradient(to right, ${secondaryColor} 0%, ${primaryColor} 85%)` :
                                        `${primaryColor}`
                            }} />
                        </div>
                    </>
                ))}

            </div>
        </div>
    );
};

export default App;
