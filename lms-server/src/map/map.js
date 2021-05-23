export default function MapLoader () { 
    return new Promise((resolve, reject) => {
        if (window.AMap) {
            resolve(window.AMap)
        } else {
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            // &callback=initAMap
            script.src = 'https://webapi.amap.com/maps?v=1.4.15&callback=initAMap&key=b8988df794539f915dcbea99a5d91481&plugin=AMap.Geocoder'
            script.onerror = reject
            document.head.appendChild(script)
        }
        window.initAMap = () => {
            resolve(window.AMap)
        }
    })
}
