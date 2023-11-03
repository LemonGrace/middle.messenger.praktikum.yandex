// language=hbs
export default `
    <div class='auth__container'>
        {{{ Header }}}
        <div class='auth__form'>
            {{{ Form }}}
        </div>
        {{{ SignButtons }}}
        <div>
            <h2 style='color: white'>
                Для тестирования в первом спринте ссылке на все сверстанные макеты
            </h2>
            <nav>
                <ul>
                    {{#each Link}}
                        <li>
                            {{{ this }}}
                        </li>
                    {{/each}}
                </ul>
            </nav>
        </div>
    </div>
`;
