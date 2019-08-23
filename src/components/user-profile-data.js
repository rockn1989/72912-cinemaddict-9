export const getUserStatus = (countWatchedFilms) => {
  if (countWatchedFilms === 0) {
    return ``;
  } else if (countWatchedFilms > 1 && countWatchedFilms <= 10) {
    return `Novice`;
  } else if (countWatchedFilms > 11 && countWatchedFilms <= 20) {
    return `Fan`;
  } else {
    return `Movie Buff`;
  }
};
