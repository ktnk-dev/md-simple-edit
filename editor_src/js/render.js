const Context = {
    get_text: () => input.value,
    save_note: async () => {
        kv.set('noteid', noteid)
        if (Context.get_text().trim().length > 0) 
            noteid = await db.save(noteid, Context.get_text())
    },
    fix_latex_newline: text => {
        return text.replaceAll('\\\\', '\\\\\\\\')
    },
    generate_html: text => {
        return marked.use(markedAlert()).parse(text)
    },
    inject_css: () => {
        const css = get_css()
        const v = () => document.querySelector('#cssinject').outerHTML = '<style id="cssinject">'+css+'</style>'
        try {
            v()
        } catch (error) {
            document.head.innerHTML += `<style id="cssinject"></style>`
            v()
        }
    },
    translate_alerts: () => {
        const translate = {
            'Note': 'Запомни',
            'Tip': 'На заметку',
            'Important': 'Важно',
            'Warning': 'Внимание',
            'Caution': 'Осторожнее'
        }
        document.querySelectorAll('.markdown-alert-title').forEach(e => {
            Object.keys(translate).map(
                k => e.innerHTML = e.innerHTML.replace(k, translate[k])
            )
        })
    },
    resolve_image_alt_styles: () => {
        const resolve = str => {
            if (str.includes('%'))  return `max-width: ${str} !important`
            if (str.includes('px')) return `max-width: ${str} !important`
            if (str == 'center') return `margin: 0 auto`
        }

        document.querySelectorAll('img').forEach(e => {
            const style = e.getAttribute('alt')
            if (!style || style.trim().length < 1) return
            e.setAttribute(`style`,
                style.split(' ').map(resolve).join(';')
            )
        })
    },
    render_latex: () => renderMathInElement(document.body, {
        delimiters: [
            {left: '$$', right: '$$', display: false},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: false}
        ],
        throwOnError : false
    }),
    get_html: (inner = false) => inner ? le_preview.innerHTML : le_preview.outerHTML,
    get_css: () => inject_css.join()

}

const update = async () => {
    Context.save_note()

    var text = Context.get_text()
    text = Context.fix_latex_newline(text)
    text = Context.generate_html(text)
    le_preview.innerHTML = text

    Context.inject_css()
    Context.translate_alerts()
    Context.resolve_image_alt_styles()
}  
