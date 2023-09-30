import './Field.scss';
//TODO error
// language=hbs
export default `
    <div class='field'>
        <label
                for="{{ name }}"
                class='field__label'
        >
            {{ label }}
        </label>
        <input type="{{ type }}" id="{{ name }}" name="{{ name }}" placeholder="{{ placeholder }}" class='field__input'>
    </div>
`;
