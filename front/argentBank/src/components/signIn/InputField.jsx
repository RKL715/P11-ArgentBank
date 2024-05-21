const InputField = ({ id, label, type, value, onChange, error }) => {
    return (
        <div className="input-wrapper">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default InputField;