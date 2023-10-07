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
                <nav>
                    <ul>
                        <li>{{>Link url='/' text='Вход'}} <br></li>
                        <li>{{>Link url='/registration' text='Регистрация'}} <br></li>
                        <li>{{>Link url='/main' text='Лента сообщений'}} <br></li>
                        <li>{{>Link url='/profile' text='Профиль пользователя'}}<br></li>
                        <li>{{>Link url='/profile-edit' text='Профиль пользователя редактируемый'}}<br></li>
                        <li>{{>Link url='/not-found' text='Страница 404'}}<br></li>
                        <li>{{>Link url='/error' text='Страницы 5**'}}<br></li>
                    </ul>
                </nav>
            </div>
        </div>
    </main>
`;
