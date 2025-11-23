const toolbox = document.getElementById("toolbox");
const groups = {}; // cache of created groups
let ticking = false;
let currentlyOpen = null;

function getGroup(name) {
    if (!name) return toolbox;

    if (groups[name]) return groups[name].content;

    // --- create group ---
    const group = document.createElement("div");
    group.className = "tool-group";

    const header = document.createElement("div");
    header.className = "tool-group-header";
    header.innerText = name;

    const content = document.createElement("div");
    content.className = "tool-group-content";

    // default: collapsed except the first created
    if (!currentlyOpen) {
        content.style.display = "block";
        currentlyOpen = name;
    } else {
        content.style.display = "none";
    }

    header.onclick = () => openGroup(name);

    group.appendChild(header);
    group.appendChild(content);
    toolbox.appendChild(group);

    groups[name] = { group, header, content };
    return content;
}

function openGroup(name) {
    for (const g in groups) {
        const content = groups[g].content;
        if (g === name) {
            content.style.display = "block";
            currentlyOpen = name;
        } else {
            content.style.display = "none";
        }
    }
}

function toolButton(label, func, groupName) {
    const group = getGroup(groupName);

    const b = document.createElement("button");
    b.innerHTML = label;
    b.onclick = () => {
        if (ticking)
            console.error("Something else is already running!")
        else
            func();
    }
    group.appendChild(b);
}

function toolInput(onchange, groupName) {
    const group = getGroup(groupName);

    const i = document.createElement("input");
    i.onchange = (e) => onchange(e);
    group.appendChild(i);
}
