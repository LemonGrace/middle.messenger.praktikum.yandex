// language=hbs
export default `
    <input 
			type="{{ type }}" 
			id="{{ name }}" 
			name="{{ name }}" 
			placeholder="{{ placeholder }}" 
			value="{{ value }}"
			class='form-control__input {{#if isError}} form-control__input-error{{/if}}'
	>
`;
