import { Clue } from "./clue";
import { Row, RowState } from "./Row";
import { maxGuesses } from "./util";

export function About() {
  return (
    <div className="App-about">
      <p>
        <i>QWRTL</i> is a fork of <a href="https://hellowordl.net/">Lynn's variation</a> of <a href="https://www.powerlanguage.co.uk/wordle/">Josh's original</a>.  Now you can play without using that most common glyph of all!
      </p>
      <p>
        You can <a href="https://github.com/mbrubeck/hello-wordl">fork it at GitHub</a> too!
      </p>
    </div>
  );
}
