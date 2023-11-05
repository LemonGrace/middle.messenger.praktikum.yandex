// language=hbs
export default `
    <div class='profile__wrapper'>
        {{{ Avatar }}}
        {{{ Header }}}
		{{{ UserInfo }}}
        <div class='profile__buttons'>
            {{{ IconButton }}}
            {{{ ButtonLogout }}}
        </div>
        <div>
            {{{ ButtonBack }}}
        </div>
    </div>
`;
