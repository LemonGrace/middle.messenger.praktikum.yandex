// language=hbs
export default `
	<div class='user-settings'>
        {{#if users.length}}
            <div class='user-settings-title'>
                Участники:
            </div>
            <div class='user-settings-users__wrapper'>
                <ul class='user-settings-users'>
                    {{#each Users}}
                        <li>
                            {{{ this }}}
                        </li>
                    {{/each}}
                </ul>
            </div>
        {{/if}}
        {{{ Input }}}
	</div>
`;

