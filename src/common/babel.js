import Babel from 'babel-standalone';

export default function (code) {
  Babel.transform(code, {
    presets: ['es2015', 'stage-0']
  });
}