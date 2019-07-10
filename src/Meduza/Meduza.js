import React from 'react';
import nanoid from 'nanoid';

import './Meduza.css';

const Meduza = ({
    primaryColor,
    secondaryColor,
    currentSkills,
    currentLevels,
    levels,
    onSkillChange,
    onLevelChange,
    editable = true,
}) => {
    const id = nanoid();

    return (
        <div className="octo">
            <div
                className="octo-body"
                style={{ background: primaryColor }}
            >
            </div>

            {currentSkills.map((skill, skillKey) => (
                <>
                    <input
                        className={`skills ${(!editable || skillKey !== currentSkills.length - 1) ? 'skills_disabled' : ''}`}
                        type="text"
                        name={`skill${skillKey}`}
                        value={skill || ''}
                        placeholder={'Впишите свой навык для оценки...'}
                        readOnly={skillKey !== currentSkills.length - 1}
                        onChange={event => {
                            if (!onSkillChange) {
                                return;
                            }
                            const target = event.target || event.currentTarget;
                            onSkillChange(currentSkills.map((iterSkill, iterSkillKey) => {
                                return iterSkillKey === skillKey ? target.value : iterSkill;
                            }))
                        }}

                        maxLength="40"
                    />
                    <div className={`octo-legs octo-leg${skillKey}`}>
                        {levels.reduceRight((result, level, levelKey) => {
                            const name = `leg${id}-${skillKey}`;
                            const radioId = `leg${id}-${skillKey}-${levelKey}`;
                            return result.concat([(
                                <>
                                    <input
                                        type="radio"
                                        className={`leg${skillKey}-${levelKey}`}
                                        name={name}
                                        id={radioId}
                                        value={levelKey}
                                        checked={currentLevels[skillKey] === levelKey ? 'checked' : ''}
                                        onChange={() => {
                                            if (!onLevelChange) {
                                                return;
                                            }
                                            onLevelChange(currentLevels.map((iterLevelKey, iterSkillKey) => {
                                                return iterSkillKey === skillKey ? levelKey : iterLevelKey;
                                            }));
                                        }}
                                    />
                                    <label htmlFor={radioId} title={level}/>
                                </>
                            )])
                        }, [])}
                        <div className="progessbar" style={{
                            background: (currentLevels[skillKey] >= levels.length - 3) ?
                                    `linear-gradient(to right, ${secondaryColor} 0%, ${primaryColor} 85%)` :
                                    `${primaryColor}`
                        }} />
                    </div>
                </>
            ))}
        </div>
    );
};

export default Meduza;
