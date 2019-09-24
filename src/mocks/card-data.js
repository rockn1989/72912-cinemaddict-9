export const getFilm = () => ({
  title: [
    `Звездные войны`,
    `Титаник`,
    `Аватар`,
    `День сурка`,
    `Охотники за привидениями`,
    `Кинг-Конг`,
    `Пролетая над гнездом кукушки`,
    `Северное сияние`,
    `Форсаж`,
    `Мгла`,
    `Джеймс Бонд`,
    `Хранители`,
    `Бэтмен`,
    `Джентельмены удачи`,
    `Кавказкая пленница`,
  ][Math.floor(Math.random() * 15)],
  imgName: [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ][Math.floor(Math.random() * 7)],
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  ][Math.floor(Math.random() * 3)],
  rating: (Math.random() * 10).toFixed(1),
  dateRelease: Date.now() + Math.floor(Math.random() * 24) * 24 * 60 * 60 * 1000,
  duration: Date.now() + Math.floor(Math.random() * 24) * 60 * 60 * 1000,
  genre: [
    `Comedy`,
    `Horror`,
    `Fantasy`,
    `Adventure`
  ].slice(0, Math.floor(Math.random() * 4)),
  commentsCount: Math.floor(Math.random() * 1000),
  hasWatchlist: Boolean(Math.round(Math.random() * 1)),
  hasWatched: Boolean(Math.round(Math.random() * 1)),
  isFavorite: Boolean(Math.round(Math.random() * 1)),
  writers: [
    `Anne Wigton`,
    `Heinz Herald`,
    `Richard Weil`
  ],
  actors: [
    `Erich von Stroheim`,
    `Mary Beth Hughes`,
    `Dan Duryea`
  ],
  country: [
    `USA`,
    `Germany`,
    `Russian`
  ][Math.floor(Math.random() * 3)]
});
