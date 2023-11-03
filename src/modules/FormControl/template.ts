// language=hbs
export default `
    <div class='form-control'>
        <label
                for="{{ name }}"
                class='form-control__label'
        >
            {{ label }}
        </label>
        {{{ Input }}}
        {{{ ErrorLabel }}}
    </div>
`;
