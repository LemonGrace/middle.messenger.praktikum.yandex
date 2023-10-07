import './UserInfo.scss';

// language=hbs
export default `
    <div class='user-info__wrapper'>
        <div class='user-info__container'>
            {{>Label label=this.label }}
            <div class='user-info__container__data'>
                {{ value }}
            </div>
        </div>
        {{>Line }}
    </div>
`;
