import './Error.scss';

// language=hbs
export default `
    <main class='layout layout__wrapper layout-center'>
        <div class='error__wrapper'>
            {{>Info
                    text=(getErrorMessage type)
            }}
            {{>Info
                    text='Назад к сообщениям'
                    url='/main'
                    isLink=true
            }}
        </div>
    </main>
`;
