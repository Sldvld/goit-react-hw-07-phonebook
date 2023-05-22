import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function BigLoader() {
  return (
    <div className={css.wrapper}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="100"
        visible={true}
      />
    </div>
  );
}
