import './Profile.scss';

// language=hbs
export default `
    <main class='layout layout__wrapper layout-center'>
        <div class='profile__wrapper'>
            {{>Avatar size=120 }}
            {{>Header title=(toUpperCase username) }}
            {{>UserInfoBlock}}
            <div class='profile__buttons'>
                {{>IconButton type='edit'}}
                {{>Button text='Выйти из профиля'}}
            </div>
        </div>
    </main>
`;
