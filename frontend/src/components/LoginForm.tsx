import { useState, useEffect } from "react";
import styled from "styled-components";

const LoginContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

type LoginFormProps = {
	onLogin: () => void;
};

export default function LoginForm({ onLogin }: LoginFormProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);

	const handleSubmit = () => {
		event?.preventDefault();
		if (email === "rasmus@iths.se" && password === "abc123") {
			onLogin(); // <- this tells the parent "we're logged in!"
		}
	};

	useEffect(() => {
		if (email.length > 1 && password.length > 1) {
			setIsDisabled(false);
		}
	}, [email, password]);

	return (
		<LoginContainer>
			<div className='login-form'>
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<label htmlFor='email'>Email</label>
					<input name='email' placeholder='rasmus@iths.se' type='email' onChange={(event) => setEmail(event.target.value)} />
					<label htmlFor='password'>Password</label>
					<input name='password' placeholder='abc123' type='password' onChange={(event) => setPassword(event.target.value)} />
					<button disabled={isDisabled} type='submit'>
						Login
					</button>
				</form>
			</div>
		</LoginContainer>
	);
}
