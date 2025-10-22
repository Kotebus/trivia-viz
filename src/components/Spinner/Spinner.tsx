import type {CSSProperties} from 'react';
import { Loader } from 'react-feather';

import styles from './Spinner.module.css';

interface SpinnerProps {
    color?: string;
    size?: number;
    opacity?: number;
}
function Spinner({
  color = 'black',
  size = 24,
  opacity = 0.5,
}: SpinnerProps) {
  return (
    <span
      className={styles.wrapper}
      style={{
        opacity,
        width: size,
        height: size,
      } as CSSProperties}
    >
      <Loader color={color} size={size} />
    </span>
  );
}

export default Spinner;
