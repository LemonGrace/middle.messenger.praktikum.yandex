// language=hbs
export default `
	<div class='message__wrapper {{#if isOuterMessage}}outer{{/if}}'>
		<div class='message__container {{#if isOuterMessage}}outer{{/if}}'>
            <div class='message {{#if isOuterMessage}}outer{{/if}}'>
                <div class='message__text'>
                    {{ text }}
				</div>
                <div class='message__time'>
                    {{ time }}
                </div>
                <div class='message__triangle {{#if isOuterMessage}}outer{{/if}}'></div>
            </div>
			{{{ Avatar }}}
		</div>
	</div>
`;
