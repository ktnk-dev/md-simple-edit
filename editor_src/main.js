const get_css = () => inject_css.join()
const update = async () => {
    var text = input.value
    if (text.trim().length > 0) {
        noteid = await db.save(noteid, text)
    }

    text = marked.use(markedAlert()).parse(text)
    le_preview.innerHTML = text
    

    const css = get_css()
    const v = () => document.querySelector('#cssinject').outerHTML = '<style id="cssinject">'+css+'</style>'
    try {
        v()
    } catch (error) {
        document.head.innerHTML += `<style id="cssinject"></style>`
        v()
    }
    const translate = {
        'Note': 'Запомни',
        'Tip': 'На заметку',
        'Important': 'Важно',
        'Warning': 'Внимание',
        'Caution': 'Осторожнее'
    }
    document.querySelectorAll('.markdown-alert-title').forEach(e => {
        Object.keys(translate).map(k => e.innerHTML = e.innerHTML.replace(k, translate[k]))
    })

    renderMathInElement(document.body, {
        // customised options
        // • auto-render specific keys, e.g.:
        delimiters: [
            {left: '$$', right: '$$', display: false},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: false}
        ],
        // • rendering keys, e.g.:
        throwOnError : false
    });
    
}  

var theme_id = Number.parseInt(localStorage.getItem('themeid_'))
if (theme_id == NaN) {
    theme_id = -1
    toggletheme()
}

const themes = {
    background_id: ['10', '230'],
    color: ['#fff', '#222']
}
const toggletheme = () => {
    localStorage.setItem('themeid_', theme_id+1)
    settheme()
}
const settheme = () => {
    theme_id = Number.parseInt(localStorage.getItem('themeid_'))
    theme_value = theme_id%2
    const rootElement = document.documentElement;
    Object.keys(themes).map(key => {
        rootElement.style.setProperty(`--${key}`, themes[key][theme_value])
    })
}

function copyToClipboard(text) {
  // 1. Create a temporary textarea
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // 2. Ensure it's not visible or disruptive
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "0";
  document.body.appendChild(textArea);
  
  // 3. Select and copy
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    console.log(successful ? 'Copied!' : 'Copy failed');
  } catch (err) {
    console.error('Unable to copy', err);
  }
  
  // 4. Clean up
  document.body.removeChild(textArea);
}


const copyhtml = () => {
    copyToClipboard(
        `
<style>${get_css()}</style>
${le_preview.outerHTML}
<script>
window.addEventListener('load', () => document.head.innerHTML += \`<style>${get_css()}</style>${inject_to_head}\`)
</script>
`
    )
}

const copyprompt = () => copyToClipboard(prompt_text)
const paste = async () => {
    // input.focus()
    input.value = await navigator.clipboard.readText()
    update()
}

const rerendermenu = async () => {
    menu.innerHTML = `
    <div class="list">
        <button onclick="newnote()">Новая заметка</button>
        <button onclick="menu.classList.toggle('hidden')">Закрыть</button>
    </div>
    `
    const rs = await db.load()
    rs.forEach((e,i) => {
        menu.innerHTML += `
        <div class="note" onclick="loadnote(${i})">
            <span>${e.content}</span>
            <svg onclick="delnote(${i})" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </div>
            `
    })
}

var lockedid = -1
const menuopen = async () => {
    menu.classList.remove('hidden')
    rerendermenu()
    lockedid = -1
}
const newnote = () => {
    input.value = ''
    noteid = null
    le_preview.innerHTML = ''
    input.focus()
    menu.classList.add('hidden')
}

const delnote = async index => {
    console.warn(index)
    lockedid = index
    await db.delete((await db.load()).at(index).id)
    rerendermenu()
}
const loadnote = async index => {
    if (lockedid == index) return
    
    const out = (await db.load()).at(index)
    noteid = out.id
    input.value = out.content
    update()
    menu.classList.add('hidden')
}