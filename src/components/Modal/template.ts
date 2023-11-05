// language=hbs
export default `
    <div class="modal-content-container">
        <div class="modal-content">
            <div class="modal-content-close">
                {{{ IconButton }}}
            </div>
            <div class="modal-content-main">
                <header class="modal-content-row modal-content-title">
                    {{ title }}
                </header>
                <section class="modal-content-row text">
                    {{ text }}
                </section>
                <section class="modal-content-row modal-content-row_content-custom">
                    {{#each Content}}
                        {{{ this }}}
                    {{/each}}
                </section>
                <footer class="modal-content-row">
                    {{#each Button}}
                        {{{ this }}}
                    {{/each}}
                </footer>
            </div>
        </div>
    </div>
`;
