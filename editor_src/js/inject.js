const inject_css = [
`#le_preview {
    .katex, .katex * {text-wrap: nowrap !important;}
    font-family:  'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    >* {
        margin: 0 0 10px !important;
    }
    blockquote {
        border-left: solid 2px #999;
        margin: 0;
        padding: 15px 20px;
        font-family: 'Times New Roman', Times, serif;
        font-style: italic;

        p {
            margin: 0;
        }
    }

    table {
        width: 100%;
        border-spacing: 0px;
        display: block;   /* Allows the overflow property to work directly on the table */
        overflow-x: auto; /* Adds the horizontal scrollbar */
        white-space: nowrap; /* Prevents text from wrapping within cells */
        width: 100%; 
        * {
            text-wrap: wrap;
        }
        thead {
            tr {
                gap: 0;
                th {
                    border-bottom: solid 2px #999;
                    padding: 4px 8px;
                }
            }
        }
        tbody {
            tr {
                td {
                    max-width: 220px;
                    padding: 5px 10px;
                    border-bottom: solid 1px #888;
                }
            }
        }
    }
    .markdown-alert-note {
        /* --c: 184; */
        --c: -230;
        --mdc: hsl(130, 60%, 52%);
        --mdb: hsl(184, 50%, 20%, .9);
        --mde: hsla(184, 60%, 21%, .6);
    }
    .markdown-alert-tip {
        --c: 214;
        --mdc: hsl(214, 93%, 62%);
    }
    .markdown-alert-important {
        --c: 264;
        --mdc: hsl(262, 90%, 73%);
    }
    .markdown-alert-warning {
        --c: 35;
        --mdc: hsl(35, 72%, 48%);
    }
    .markdown-alert-caution {
        --c: 10;
        --mdc: hsl(3, 93%, 63%);
    }
    
    .markdown-alert {
        /* --text: hsla(var(--c), 100%, 90%);
        --br: hsla(var(--c), 80%, 60%);
        --bg1: hsla(var(--c), 60%, 30%, .9);
        --bg2: hsla(var(--c), 60%, 30%, .7); */

        --text: hsla(var(--c), 90%, 15%);
        --br: hsla(var(--c), 80%, 60%);
        --bg1: hsla(var(--c), 90%, 77%, .95);
        --bg2: hsla(calc(var(--c) - 40), 60%, 70%, .8);

        background: linear-gradient(
            145deg,
            var(--bg1),
            var(--bg2)
        );
        color: var(--text);
        display: flex;
        flex-direction: column;
        padding: 15px 15px 15px;
        gap: 10px;
        
        /* border-left: solid 3px var(--br); */
        /* border-radius: 0 15px 15px 0 ; */
        border-radius: 15px;

        .markdown-alert-title {
            display: flex;
            align-items: center;
            gap: 7px;
            margin: 0;
            font-weight: 500;
            color: var(--text);
            svg {
                fill: var(--text) !important;
                width: 16px !important;
                height: 16px !important;
                margin: 0 !important;
            }
            
        }
        p:not(.markdown-alert-title) {
            margin: 0;
        }
    }

    img {
        width: 100%;
        border-radius: 15px;
    }

    hr {
        opacity: 0;
        margin: 20px 0 !important;
    }
    pre {
        padding: 15px;
        border-radius: 10px;
        background: linear-gradient(
            140deg,
            #333,
            #292929
        );
        color: #fff;
        font-size: 14px;
        user-select: all;
        overflow-x: auto;
        scrollbar-color: #999 #292929 ;
        code {
            font-weight: normal;
        }

    }
}`
]

const inject_to_head = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.28/dist/katex.min.css" integrity="sha384-Wsr4Nh3yrvMf2KCebJchRJoVo1gTU6kcP05uRSh5NV3sj9+a8IomuJoQzf3sMq4T" crossorigin="anonymous">`
