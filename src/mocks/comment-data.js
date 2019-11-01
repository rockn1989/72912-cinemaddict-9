const getComment = () => ({
  img: [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ][Math.floor(Math.random() * 4)],
  text: [
    `Interesting setting and a good cast`,
    `uctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in`,
    `Lorem ipsum`
  ][Math.floor(Math.random() * 3)],
  author: [
    `Tim Macoveev`,
    `Vadim Macoveev`,
    `Slava Macoveev`
  ][Math.floor(Math.random() * 3)],
  date: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000
});


export const getComments = (count) => {
  let commentsArray = [];
  for (let i = 0; i < count; i++) {
    commentsArray.push(getComment());
  }
  return commentsArray;
};
