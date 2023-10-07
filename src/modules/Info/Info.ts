import './Info.scss';

// language=hbs
export default `
    <div class='info__container'>
        {{#if isLink}}
            {{>Link }}
        {{else}}
            <div class='info__text'>
                {{ text }}
            </div>
        {{/if}}
    </div>
`;
