import {expect} from "jsr:@std/expect"
import { render } from "@testing-library/preact"
import TextInput from "./TextInput.tsx";
import setupDOM from "../../../utils/test/setup.ts";

/**
 * Deno.test にはブラウザの document がないので、DOM のテストができない
 * なのでブラウザ環境をエミュレートするために DOM のセットアップをする
 */ 
setupDOM()

Deno.test("value に渡した値が入力される", () => {
  // .tsx ではなく .ts でファイルを作ったから JSX が認識できずに render でずっとエラーが表示される罠を踏んだのでコメントを残しておく。
  // 名前付き export があるのでそれを使う。※使わなければ variableName.container. というような指定の仕方になって冗長。
  const text: string = "hogehoge"
  const {container} = render(<TextInput 
    id="1"
    placeholder=""
    value={text}
    onChange={() => {}}
    onBlur={() => {}}
  />);
    
  expect(container.textContent).toBe(text)
})
