type InputProps = {
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const Input = ({ type, value, onChange, placeholder }: InputProps) => {
  return (
    <div>
      <input
        className="border-4 border-skipDB w-64 h-14 w-full pl-2 mt-2 mb-2"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
