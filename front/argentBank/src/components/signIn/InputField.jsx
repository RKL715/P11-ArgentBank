const InputField = ({ id, label, type, value, onChange, error, showPassword, toggleShowPassword }) => {
    const isPasswordField = type === "password" || (type === "text" && showPassword);
    return (
        <div className="input-wrapper">
            <label htmlFor={id}>{label}</label>
            <div className="input-group">
            <input
                type={isPasswordField ? (showPassword ? "text" : "password") : type}
                id={id}
                value={value}
                onChange={onChange}
            />
            {isPasswordField && (
                <button
                    type="button"
                    onClick={toggleShowPassword}>
                    <i className="fa fa-eye"></i>
                    {showPassword ? "" : ""}
                </button>
            )}
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default InputField;