export const getUserStatus = (countWatchedFilms) => {
  if (countWatchedFilms > 0 && countWatchedFilms <= 4) {
    return `Noob`;
  } else if (countWatchedFilms > 5 && countWatchedFilms <= 7) {
    return `Movie Buff`;
  } else {
    return `Master Cinema`;
  }
};
