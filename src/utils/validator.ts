export type Validator = (value: any) => null | Record<string, string>;

export const requiredValidator: Validator = (value: any): null | Record<string, string> => {
	if (!value) {
		return {
			requiredError: 'Поле не должно быть пустым',
		};
	}
	return null;
};


export const loginValidator: Validator = (value: string): null | Record<string, string> => {
	if (!value) {
		return null;
	}
	if (value.length < 3) {
		return {
			lengthError: 'Длина логина должна быть не менее 3 символов',
		};
	}
	if (value.length > 20) {
		return {
			lengthError: 'Длина логина должна быть не больше 20 символов',
		};
	}
	if (!/^(?=.*[a-zA-Z])/.test(value)) {
		return {
			letterError: 'Логин должен содержать хотя бы одну букву',
		};
	}
	if (!/^[a-zA-Z0-9_-]{3,20}$/.test(value)) {
		return {
			symbolError: 'Логин может состоять из цифр, латиницы, дефиса и нижнего подчёркивания',
		};
	}
	return null;
};

export const passwordValidator: Validator = (value: string): null | Record<string, string> => {
	if (!value) {
		return null;
	}
	if (value.length < 8) {
		return {
			lengthError: 'Длина пароля должна быть не менее 8 символов',
		};
	}
	if (value.length > 40) {
		return {
			lengthError: 'Длина логина должна быть не больше 40 символов',
		};
	}
	if (!/(?=.*\d)/.test(value)) {
		return {
			digitError: 'Пароль должен содержать хотя бы одну цифру',
		};
	}
	if (!/(?=.*[A-Z])/.test(value)) {
		return {
			letterError: 'Пароль должен содержать хотя бы одну заглавную букву',
		};
	}
	return null;
};

export const phoneValidator: Validator = (value: string): null | Record<string, string> => {
	if (!value) {
		return null;
	}
	if (!/^\+?\d{10,15}$/.test(value)) {
		return {
			phoneError: 'Проверьте введенный номер телефона',
		};
	}
	return null;
};

export const nameValidator: Validator = (value: string): null | Record<string, string> => {
	if (!value) {
		return null;
	}
	if (!/^[A-ZА-ЯЁ]/.test(value)) {
		return {
			uppercaseError: 'В начале отсутствует заглавная буква',
		};
	}
	if (!/^[A-ZА-ЯЁ][a-zа-яё-]+$/.test(value)) {
		return {
			nameError: 'Использованы недопустимые символы',
		};
	}
	return null;
};

export const emailValidator: Validator = (value: string): null | Record<string, string> => {
	if (!value) {
		return null;
	}
	// eslint-disable-next-line max-len
	const pattern = /^[!#$%&'*+/=?^_`{|}~a-zA-Z0-9-]+((\.)?[!#$%&'*+/=?^_`{|}~a-zA-Z0-9-]+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	if (!pattern.test(value)) {
		return {
			emailError: 'Указан некорректный адрес электронной почты',
		};
	}
	return null;
};
