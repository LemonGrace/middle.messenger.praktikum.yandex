import './Registration.scss';

// language=hbs
export default `
    <main class='layout layout__wrapper layout-center'>
        <div class='auth__container'>
            {{>Header title='Регистрация' }}
            <div class='auth__form'>
                {{>Form}}
            </div>
            {{>SignButtons
                    submitButtonText='Создать пользователя'
                    linkButtonText='Уже зарегистрированы?'
                    linkUrl='/'
            }}
        </div>
    </main>
`;
