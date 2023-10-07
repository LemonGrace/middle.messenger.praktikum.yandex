import './Messages.scss';

// language=hbs
export default `
    <main class='layout layout__wrapper messages__wrapper'>
        <div class='messages__list'>
            <div class='messages__info'>
                <div class='messages__info__user'>
                    {{>AvatarNameButton }}
                    {{>IconButton type='new_chat'}}
                </div>
                {{>Field
                        type='text'
                        name='message'
                        placeholder='Поиск'
                }}
            </div>
            {{>ListMessages}}
        </div>
        <div class='messages__title'>
            {{>Header title='Выберите чат, чтобы начать общение'}}
        </div>
    </main>
`;
