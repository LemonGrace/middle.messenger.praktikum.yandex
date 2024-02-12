// language=hbs
export default `
    <div class='dialog-card {{#if isSelected}}dialog-card-selected{{/if}}'>
        {{{ Avatar }}}
		<div class='dialog-card__user'>
			<div class='dialog-card__user__name'>
				{{ title }}
			</div>
            <span class='dialog-card__text dialog-card__user__message'>
                {{ last_message.content }}
            </span>
		</div>
		<div class='dialog-card__info'>
            {{#if unread_count }}
                <div class='dialog-card__info__count'>
					<span class='dialog-card__info__text'>
					</span>
					{{ unread_count }}
				</div>
            {{/if}}
			<span class='dialog-card__info__text'>
				{{ last_message.time }}
			</span>
		</div>
    </div>
`;
