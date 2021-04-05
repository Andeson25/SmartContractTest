export function isMetaMaskInstalled() {
    //Have to check the ethereum binding on the window object to see if it's installed
    return Boolean(window['ethereum'] && window['ethereum'].isMetaMask);
}
