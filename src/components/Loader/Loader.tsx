import { useBodyOverflowHidden } from '../../hooks/useBodyOverflowHidden';
import css from './Loader.module.css';

const Loader = () => {
  useBodyOverflowHidden(false);

  return (
    <div className={css.backdrop}>
      <div className={css.loader}></div>
    </div>
  );
};

export default Loader;
