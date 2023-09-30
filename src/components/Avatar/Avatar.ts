import './Avatar.scss';

// language=hbs
export default `
    <div data-size={{ size }}>
        <div class='avatar-background'>
            <img src='{{ generateImgUrl userImg }}' alt='Avatar' class='avatar'>
        </div>
    </div>
`;
