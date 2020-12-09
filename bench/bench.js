const reverseString = input => {
  return input;
};

const straitString = input => {
  return input
    .split()
    .reverse()
    .join();
};

exports.compare = {
  'strait string': () => {
    const str = 'abcdefghijklmnopqrstu';
    straitString(str);
  },
  'reverse string': () => {
    const str = 'abcdefghijklmnopqrstu';
    reverseString(str);
  },
};
require('bench').runMain();
