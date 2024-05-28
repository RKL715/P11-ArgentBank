const SubmitButton = ({ loading }) => {
    return (
        <button
            type="submit"
            className="sign-in-button">
            {loading ? "Loading..." : "Sign In"}
        </button>
    );
}

export default SubmitButton;