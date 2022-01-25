import { Clue } from "./clue";
import { Row, RowState } from "./Row";
import { maxGuesses } from "./util";

export function About() {
  return (
    <div className="App-about">
      <p>
        <i>ourdl</i> is a fork of
        <a href="https://hellowordl.net/">@chordbug's variation</a> of
        <a href="https://www.powerlanguage.co.uk/wordle/">
          Josh's original
        </a>.
        You can <a href="https://github.com/mbrubeck/hello-wordl">fork it at GitHub</a> too!
      </p>
    </div>
  );
}
