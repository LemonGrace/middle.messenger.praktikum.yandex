const rules: Array<(value: string) => string> = [
	/** удаляем все символы пробелов */
	(_value) => _value.replace(/\s/g, ''),
	/** заменяем запятую на точку */
	(_value) => _value.replace(/,/g, '.'),
	/** извлекаем число из строки */
	(_value) => _value.replace(/^.*?(-)?([0-9]+)?(\.?[0-9]+).*$/, '$1$2$3'),
	/**
     * добавляем 0 перед .
     * "-456" 		-> "-456"
     * "-.1231"		-> "-0.1231"
     * ".4564"		-> ".4564"
     * "4545"		-> "4545"
     */
	(_value) => _value.replace(/^((-)?\.)/, '$20.'),
];

export const ParseNumber: IParseNumber = (value) => {
	if (typeof value === 'string') {
		for (const rule of rules) {
			value = rule(value);
			if (value === '') {
				return null;
			}
			const valueNumber = Number(value);
			if (!Number.isNaN(valueNumber)) {
				value = valueNumber;
				break;
			}
		}
	}
	if (typeof value !== 'number') {
		return null;
	}
	if (Number.isNaN(value)) {
		return null;
	}
	if (!Number.isFinite(value)) {
		return null;
	}
	return value;
};

export type IParseNumber = (value: string | number | undefined | null) => number | null;
