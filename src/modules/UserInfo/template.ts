// language=hbs
export default `
    <ul class='user-info-block'>
		{{#each Information}}
   			 <li>
        		{{{ this }}}
			 </li>
		{{/each}}
    </ul>
`;
