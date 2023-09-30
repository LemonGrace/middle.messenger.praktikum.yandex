import './EditProfile.scss';

//TODO добавить поле с аватаром
// language=hbs
export default `
    <main class='layout layout__wrapper layout-center'>
        <div class='edit-profile__wrapper'>
            {{>Header title='Редактирование данных' }}
            {{>Avatar size=120 }}
            {{>Form }}
            <div class='edit-profile__submit'>
                {{>Button text='Сохранить' }}
            </div>
        </div>
    </main>
`;
