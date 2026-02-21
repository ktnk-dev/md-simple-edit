const get_css = () => inject_css.join()
const update = async () => {
    var text = input.value

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

    //renderMathInElement(le_preview)
}  

var theme_id = 0
const themes = {
    background_id: ['10', '240'],
    color: ['#fff', '#222']
}
const toggletheme = () => {
    theme_id += 1
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