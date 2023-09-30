import './AvatarNameButton.scss';

// language=hbs
export default `
    <div class='avatar-name-button'>
        {{>Avatar}}
        <div class='avatar-name-button__name'>
            {{ username }}
        </div>
    </div>

`;
