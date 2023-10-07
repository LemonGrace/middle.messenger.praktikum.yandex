import './UserInfoBlock.scss';

// language=hbs
export default `
    <ul class='user-info-block'>
        {{# each infoData}}
            <li class='user-info-block__row'>
                {{>UserInfo this}}
            </li>
        {{/each}}
    </ul>
`;
