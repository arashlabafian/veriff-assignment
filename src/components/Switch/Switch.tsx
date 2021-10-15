import { useRef, useEffect, KeyboardEvent } from 'react';

import { SwitchAnswer } from '../../models';
import classes from './switch.module.css';

export interface SwitchProps {
  id: string;
  value?: SwitchAnswer;
  description: string;
  onChange: (id: string, value: SwitchAnswer) => void;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = (props) => {
  const { id, value, description, onChange, disabled } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    !ref.current?.previousElementSibling && ref.current?.focus();
  }, []);

  const handleSwitchKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case '1':
        handleSwitchChange(SwitchAnswer.YES);
        break;
      case '2':
        handleSwitchChange(SwitchAnswer.NO);
        break;
      case 'ArrowUp':
        if (ref.current?.previousElementSibling)
          (ref.current.previousElementSibling as HTMLDivElement).focus();
        break;
      case 'ArrowDown':
        if (ref.current?.nextElementSibling && value === SwitchAnswer.YES)
          (ref.current.nextElementSibling as HTMLDivElement).focus();
        break;
      default:
    }
  };
  const handleSwitchChange = (value: SwitchAnswer) => {
    !disabled && onChange(id, value);
  };

  return (
    <section
      className={[
        classes['switch_section'],
        disabled ? classes.disabled : classes.enabled,
      ].join(' ')}
      tabIndex={0}
      onKeyDown={handleSwitchKeyDown}
      ref={ref}
    >
      <p>{description}</p>

      <div className={classes.switch}>
        <button
          type='button'
          className={[
            classes.btn,
            value === SwitchAnswer.YES && classes.active,
          ].join(' ')}
          disabled={disabled}
          onClick={() => handleSwitchChange(SwitchAnswer.YES)}
        >
          Yes
        </button>
        <button
          type='button'
          className={[
            classes.btn,
            value === SwitchAnswer.NO && classes.active,
          ].join(' ')}
          disabled={disabled}
          onClick={() => handleSwitchChange(SwitchAnswer.NO)}
        >
          No
        </button>
      </div>
    </section>
  );
};

export default Switch;
