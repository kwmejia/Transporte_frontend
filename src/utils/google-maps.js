let googleMapsScriptInyectado = false

const inyectarGoogleMapsApiScript = (options = {}) => {
    if (googleMapsScriptInyectado) {
        throw new Error('Google Maps ya está cargado')
    }

    const parametrosQueryUrl = Object.keys(options)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`)
        .join('&')

    const url = `https://maps.googleapis.com/maps/api/js?${parametrosQueryUrl}`

    const script = document.createElement('script')

    script.setAttribute('src', url)
    script.setAttribute('async', '')
    script.setAttribute('defer', '')

    document.head.appendChild(script)

    googleMapsScriptInyectado = true
}

const cargarUnaSolaVez = (fn) => {
    let called = false
    let returnValue

    return () => {
        if (!called) {
            called = true
            returnValue = fn()
        }

        return returnValue
    }
}

const iniciarGoogleMaps = (key, opciones = {}) => cargarUnaSolaVez(
    () => new Promise((resolve, reject) => {
        try {
            window.onGoogleMapsApiLoaded = resolve

            inyectarGoogleMapsApiScript({
                key,
                callback: 'onGoogleMapsApiLoaded',
                ...opciones,
            })
        } catch (error) {
            reject(error)
        }
    }).then(() => window.google.maps),
)

export const initialGoogleMaps = iniciarGoogleMaps('AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg', { libraries: 'places' })
