// language=hbs
export default `
    <div class='alert__container'>
        {{#if url}}
            {{{ Link }}}
        {{else}}
            <div class='alert__text'>
                {{ text }}
            </div>
        {{/if}}
    </div>
`;
