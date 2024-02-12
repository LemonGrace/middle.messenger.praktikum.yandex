// language=hbs
export default `
	<div class='user-card'>
        <div class='user-card-avatar'>
            {{{ Avatar }}}
        </div>
        <div class='user-card-title'>
            {{ name }}
        </div>
        {{{ IconButton }}}
	</div>
`;

