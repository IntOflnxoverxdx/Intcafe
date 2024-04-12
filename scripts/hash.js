function hash(obj) {
    return btoa(JSON.stringify(obj));
}
function unhash(hash) {
  return JSON.parse(atob(hash));
}
