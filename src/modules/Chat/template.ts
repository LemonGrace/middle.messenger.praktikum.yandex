// language=hbs
export default `
	<div class='chat'>
		<div class='chat__list__wrapper'>
            <ul class='chat__list'>
                {{#each Messages}}
                    <li>
                        {{{ this }}}
                    </li>
                {{/each}}
            </ul>
		</div>
        <div class='chat__menu'>
            {{{ AvatarNameButton }}}
            {{{ IconButtonSettings }}}
        </div>
        <div class='chat__input'>
            {{{ IconButtonAttach }}}
            {{{ FormControl }}}
            {{{ IconButtonSend }}}
        </div>
	</div>
`;
