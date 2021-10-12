import classcat from 'classcat';
import React from 'react';
import styles from './Select.module.scss';

type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  label: string;
  error?: string;
};

const Select = React.forwardRef<HTMLSelectElement, Props>(
  (
    { children, label, className, required, disabled, error, value, id, ...rest },
    ref
  ) => {
    const selectId = id || `${label}-select`;
    return (
      <div className={styles.container}>
        <div
          className={classcat([
            styles.select__container,
            { [styles['select__container--disabled']]: disabled },
            { [styles['select__container--error']]: error },
          ])}
          onClick={() => {}}
        >
          <select
            id={selectId}
            ref={ref}
            className={classcat([
              styles.select,
              { [styles['select--empty']]: !value },
              className,
            ])}
            required={required}
            disabled={disabled}
            value={value}
            {...rest}
          >
            <option disabled value="" hidden>
              {label}
            </option>
            {children}
          </select>
          <label htmlFor={selectId} className={styles.select__label}>
            {label}
          </label>
        </div>
        {error && <div className={styles['select__error-label']}>{error}</div>}
        {required && !error && (
          <div className={styles['select__required-label']}>Required</div>
        )}
      </div>
    );
  }
);

export default Select;
