


const themes = {
    background_id: ['10', '230'],
    color: ['#fff', '#222']
}
const toggletheme = () => {
    kv.set('themeid_', Number.parseInt(kv.get('themeid_', 0))+1)
    settheme()
}
const settheme = () => {
    theme_id = Number.parseInt(kv.get('themeid_', 0))
    theme_value = theme_id%2
    const rootElement = document.documentElement;
    Object.keys(themes).map(key => {
        rootElement.style.setProperty(`--${key}`, themes[key][theme_value])
    })
}

const togglewrap = () => {
    const wrap = (Number.parseInt(kv.get('wrap', 0))%2)+ 1
    kv.set('wrap', wrap)
    setwrap()
    
}
const setwrap = () => {
    const svg = [
        `<svg ? xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-160v-640h80v640h-80Zm498-178-56-57 45-45H320v-80h327l-45-45 56-57 142 142-142 142ZM480-160v-200h80v200h-80Zm0-440v-200h80v200h-80Z"/></svg>`,
        `<svg ? xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-160v-640h80v640h-80Zm560 0v-640h80v640h-80Zm-296-98L282-400l142-141 56 56-45 45h85q33 0 56.5-23.5T600-520q0-33-23.5-56.5T520-600H280v-80h240q66 0 113 47t47 113q0 66-47 113t-113 47h-85l45 45-56 57Z"/></svg>`
    ][(Number.parseInt(kv.get('wrap', 0))+0 )%2]
    try{document.querySelector('#wrapicon').remove()}catch{}
    document.querySelector('#buttons > .icons').innerHTML+=svg.replace('?', 'onclick="togglewrap()" id="wrapicon"')
    input.setAttribute('wrap', Number.parseInt(kv.get('wrap', 0))%2?'soft':'off')
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
<style>${Context.get_css()}</style>
${Context.get_html()}
<script>
window.addEventListener(
    'load', () => 
        document.head.innerHTML += \`
<style>${Context.get_css()}</style>
${inject_to_head}\`
    )
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
            <span>${e.content.trim().slice(0, 100).split('<')[0]}</span>
            <svg onclick="delnote(${i})" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </div>
            `
    })
    lockedid = -1
}

var lockedid = -1
const menuopen = async () => {
    menu.classList.remove('hidden')
    rerendermenu()
    
}
const newnote = () => {
    input.value = ''
    noteid = null
    le_preview.innerHTML = ''
    input.focus()
    menu.classList.add('hidden')
    update()
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
const loadnotefromnoteid = async () => {
    (await db.load()).forEach(e => {
        if (e.id != noteid) return
        input.value = e.content
        update()
    })
}