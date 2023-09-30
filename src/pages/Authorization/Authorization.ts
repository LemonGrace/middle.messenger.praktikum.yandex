import './Authorization.scss';

// language=hbs
export default `
    <main class='layout layout__wrapper layout-center' xmlns='http://www.w3.org/1999/html'>
        <div class='auth__container'>
            {{>Header title='Добро пожаловать!' }}
            <div class='auth__form'>
                {{>Form }}
            </div>
            {{>SignButtons
                    submitButtonText='Войти'
                    linkButtonText='Создать пользователя'
                    linkUrl='/registration'
            }}
            <div>
                <h2 style='color: white'>
                    Для тестирования в первом спринте ссылке на все сверстанные макеты
                </h2>
                <div>
                    {{>Link url='/' text='Вход'}} <br>
                    {{>Link url='/registration' text='Регистрация'}} <br>
                    {{>Link url='/main' text='Лента сообщений'}} <br>
                    {{>Link url='/profile' text='Профиль пользователя'}}<br>
                    {{>Link url='/profile-edit' text='Профиль пользователя редактируемый'}}<br>
                    {{>Link url='/not-found' text='Страница 404'}}<br>
                    {{>Link url='/error' text='Страницы 5**'}}<br>
                </div>
            </div>
        </div>
    </main>
`;
