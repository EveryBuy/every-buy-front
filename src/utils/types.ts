type LoginProps = {
	email: string;
	password: string;
	phone?: string;
};

type RegistrationProps = {
	email: string;
	password: string;
	phone: string;
	confirmPassword: string;
};

type LoginWrapperPros = {
	isOpen: boolean;
};