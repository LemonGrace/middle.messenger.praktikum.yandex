import './Form.scss';

// language=hbs
export default `
    <form class='form'>
        {{# if fields }}
            <ul class='form__fields'>
                {{# each fields }}
                    {{>Field
                            label=this.label
                            type=this.type
                            name=this.name
                            placeholder=this.placeholder
                    }}
                {{/ each }}
            </ul>
        {{/if}}
    </form>
`;
