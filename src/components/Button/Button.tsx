import classes from './button.module.css';

interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { disabled, loading, type, onClick, children } = props;
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      className={classes.button}
      disabled={disabled || loading}
    >
      {loading ? 'loading' : children}
    </button>
  );
};

export default Button;
