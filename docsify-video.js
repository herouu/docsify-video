function plugin(hook, vm) {
    hook.beforeEach(function (content) {
        const lines = content.match(/- (Bilibili|Youtube)>>(.*)/g);
        console.log(lines);
        if (lines) {
            lines.forEach((item) => {
                const sp = item.split(">>")
                let iframe = ''
                const video = sp[1].trim()
                const platform = sp[0].match(/- (\w+)/)[1]
                const frameStyle = `width: 100%;height: 100%;`
                if (platform === "Bilibili") {
                    iframe = `<iframe style="${frameStyle}" src="//player.bilibili.com/player.html?isOutside=true&${video}&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>`
                } else if (platform === "Youtube") {
                    iframe = `<iframe style="${frameStyle}" src="https://www.youtube.com/embed/${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
                }
                let replaceValue = `<div style="width:80%;height: auto;max-width: 720px; min-width: 240px;flex-grow: 0;margin: 10px;aspect-ratio: 16 / 9;">${iframe}</div>`;
                replaceValue = `<div id="bilibili_new_content" style="display: flex;flex-wrap: wrap; justify-content: flex-start; align-items: stretch; ">${replaceValue}</div>`
                content = content.replace(item, replaceValue)
            })
        }
        return content;
    });
}

window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);