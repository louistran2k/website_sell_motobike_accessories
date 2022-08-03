import { ChangeEvent } from 'react';
import styles from './style.module.scss';

type Props = {
  quantity: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
  handleChangeQuantity: (e: ChangeEvent<HTMLInputElement>) => void;
};

const QuantityInput = ({
  quantity,
  handleIncrease,
  handleDecrease,
  handleChangeQuantity,
}: Props) => {
  return (
    <>
      <span
        className={styles['input-number-decrement']}
        onClick={handleDecrease}
      >
        –
      </span>
      <input
        className={styles['input-number']}
        type="number"
        value={quantity}
        min="1"
        max="10"
        onChange={handleChangeQuantity}
      />
      <span
        className={styles['input-number-increment']}
        onClick={handleIncrease}
      >
        +
      </span>
    </>
  );
};

export default QuantityInput;
