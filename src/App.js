import React, { useState } from 'react';

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
    const [currentLevel, setLevel] = useState(LEVELS.map(() => Math.round(Math.random() * LEVELS.length) - 1));
    console.log(currentLevel);

    return (
        <div className="wrapper">
            <h1>Медузка навыков человеков</h1>
            <p>Как себя проявляет Алексей Титов на ваш взгляд:</p>

            <div className="octo">
                <div className="octo-body octo-body-1"/>

                {SKILLS.map((skill, skillKey) => (
                    <>
                        <input
                            className={`skills ${!!skill ? 'skills_disabled' : ''}`}
                            type="text"
                            name={`skill${skillKey}`}
                            value={skill || 'Впишите свое...'}
                            readOnly={!!skill}
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
                            <div className="progessbar"/>
                        </div>
                    </>
                ))}

            </div>
        </div>
    );
};

export default App;
