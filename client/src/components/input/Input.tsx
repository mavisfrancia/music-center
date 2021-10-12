import styles from './Input.module.scss';
import classcat from 'classcat';
import React from 'react';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ label, className, required, disabled, error, id, ...rest }, ref) => {
    const inputId = id || `${label}-input`;
    return (
      <div className={styles.container}>
        <div
          className={classcat([
            styles.input__container,
            { [styles['input__container--disabled']]: disabled },
            { [styles['input__container--error']]: error },
          ])}
        >
          <input
            id={inputId}
            ref={ref}
            placeholder={label}
            className={classcat([styles.input, className])}
            required={required}
            disabled={disabled}
            {...rest}
          />
          <label htmlFor={inputId} className={styles.input__label}>
            {label}
          </label>
        </div>
        {error && <div className={styles['input__error-label']}>{error}</div>}
        {required && !error && (
          <div className={styles['input__required-label']}>Required</div>
        )}
      </div>
    );
  }
);

export default Input;
