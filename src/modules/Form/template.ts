// language=hbs
export default `
    <form class='form'>
        {{# if Controls }}
            <ul class='form__fields'>
                {{# each Controls }}
                    {{{ this }}}
                {{/ each }}
            </ul>
        {{/if}}
    </form>
`;
