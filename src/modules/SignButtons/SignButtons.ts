import './SignButtons.scss';

// language=hbs
export default `
    <div class='sign__buttons'>
        {{>Button text=this.submitButtonText }}
        {{>Link text=this.linkButtonText url=this.linkUrl }}
    </div>
`;
