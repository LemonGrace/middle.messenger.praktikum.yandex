import './Button.scss';

// language=hbs
export default `
    <button
            class='button-icon'
            data-type={{ type }}
    >
        <img src='{{ generateImgUrl (buttonIconRender type) }}' alt='icon' class='button-icon__img'>
    </button>
`;
