/**
 * Creates a new unique ID
 * @param string [xxxx-xxxx-xxxx-xxxx] replaces any 'x' found in this string with a random character. Otherwise returns a uniuqe string
 * @returns {string} a randomly generated unique ID
 */
export function createUUID(string='xxxx-xxxx-xxxx-xxxx') {
    let dt = new Date().getTime();
    const uuid = string.replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}


export function openMenu(navigation) {
    navigation.openDrawer();
}