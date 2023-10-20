// language=hbs
export default `
    <div class='dialog-card {{#if isSelected}}dialog-card-selected{{/if}}'>
        {{{ Avatar }}}
		<div class='dialog-card__user'>
			<div class='dialog-card__user__name'>
				{{ username }}
			</div>
            <span class='dialog-card__text dialog-card__user__message'>
                {{ lastMessage }}
            </span>
		</div>
		<div class='dialog-card__info'>
            {{#if unreadMessages }}
                <div class='dialog-card__info__count'>
					<span class='dialog-card__info__text'>
					</span>
					{{ unreadMessages }}
				</div>
            {{/if}}
			<span class='dialog-card__info__text'>
				{{ time }}
			</span>
		</div>
    </div>
`;
