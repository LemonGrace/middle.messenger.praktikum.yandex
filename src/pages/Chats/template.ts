// language=hbs
export default `
	<div class='messages__wrapper'>
        <div class='messages__list'>
            <div class='messages__info'>
                <div class='messages__info__user'>
                    {{{ AvatarNameButton }}}
                    {{{ IconButton }}}
                </div>
                {{{ FormControl }}}
            </div>
            <div class='messages__list__wrapper'>
                {{#if chats }}
                    <ul class='messages__list__container'>
                        {{#each DialogCards }}
                            <li>
                                {{{ this }}}
                            </li>
                        {{/ each }}
                    </ul>
                {{/if}}
            </div>
        </div>
        <div class='messages__content'>
			{{{ Chat }}}
            <div class='messages__title'>
                {{{ Header }}}
            </div>
        </div>
	</div>
`;

