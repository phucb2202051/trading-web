//src/core/dataStore.js
export const getSelectedNick = () => {
  const id = localStorage.getItem("nick_id");
  return id ? Number(id) : null;
};
export const setSelectedNick = (id) => {
  localStorage.setItem("nick_id", id);
};
export const clearSelectedNick = () => {
  localStorage.removeItem("nick_id");
};