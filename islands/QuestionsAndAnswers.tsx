import { Button } from '../components/Button.tsx';
import { Signal,ReadonlySignal, computed, useSignal } from "@preact/signals";
import { InputWithLabel } from "../components/InputWithLabel.tsx";
import { useEffect } from "preact/hooks";

export function App() {
  let deckNames: Signal<string[]> = useSignal(["選択してください"])
  let deckCreateMode = useSignal(false)
  let cardCreateMode = useSignal(false)

  let cardList: Signal<{cardQ: string, cardA: string}[]> = useSignal([])
  let cardListOffset = useSignal(0) // FIXME: クラス化したい
  let cardListLength: ReadonlySignal<number> = computed(() => {
    return cardList.value.length
  })
  
  let hideCardA = useSignal(false)

  useEffect(() => {
    const url = window.location.origin + "/api/qanda/deck/list"
    fetch(url)
    .then((response) => response.json())
    .then((data: string[]) => {
      if (data && data.length > 0) {
        data.unshift("選択してください")
        deckNames.value = data
      }
    })
    .catch((error) => {
      alert(error)
    })
  }
  ,[])
  
    const question = useSignal("")
    const answer = useSignal("")

  return (
    <div >
      <div>
        <div class="mb-4">
          <p><label for="select" class="ml-1 text-sm text-gray-700">デッキを選択</label></p>
          <select class="border rounded-lg p-2 h-10 w-full" id="select" name="select" onChange={() => {
            const url = window.location.origin + "/api/qanda/card"
            const deckSelect = document.getElementById("select") as HTMLSelectElement
            const dechName = deckSelect.selectedOptions[0].value
            fetch(url + "?deckName=" + dechName + "&offset=" + cardListOffset.value)
            .then((response) => response.json())
            .then((data: {cardQ: string, cardA: string}[]) => {
              if (data && data.length > 0) {
                cardList.value = data
              }
            })
            .catch((error) => {
              alert(error)
            })
          }}>
            {deckNames.value.map((option, index) => <option key={index} class="" value={option}>{option}</option>)}
          </select>
        </div>
        <div class="flex justify-center">
          <Button type="button" onClick={() => {
            const url = window.location.origin + "/api/qanda/deck"
            const deckSelect = document.getElementById("select") as HTMLSelectElement
            const dechName = deckSelect.selectedOptions[0].value
            fetch(url, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                deckName: dechName
              })
            }).catch((error) => {
              alert(error)
            })
            
          }}>デッキを削除</Button>
        </div>
      </div>
      <div>
        {/* 押したら入力が出るようにする */}
        <p class="mt-3 cursor-pointer hover:underline" onClick={() => {
          deckCreateMode.value = !deckCreateMode.value
        }}>+ デッキを追加</p>
        <div hidden={!deckCreateMode.value}> 
          <InputWithLabel id="adddeck" label="" type="text" placeholder="デッキ名を入力" onChange={() => {}} />
          <div class="flex justify-center">
            <Button type="button" onClick={() => {
              const url = window.location.origin + "/api/qanda/deck"
              const input = document.getElementById("adddeck") as HTMLInputElement
              fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  deckName: input.value
                })
              }).catch((error) => {
                alert(error)
              })
              deckCreateMode.value = false
            }}>デッキを追加</Button>
          </div>
        </div>
      </div>
      <div>
        {/* 押したら入力が出るようにする */}
        <p class="mt-3 cursor-pointer hover:underline" onClick={() => {
          cardCreateMode.value = !cardCreateMode.value
        }}>+ カードを追加</p>
        <div class="mt-2" hidden={!cardCreateMode.value}> 
          <InputWithLabel id="cardAddQ" label="質問を入力" type="text" placeholder="1+1 は？" onChange={() => {}} />
          <InputWithLabel id="cardAddA" label="回答を入力" type="text" placeholder="2" onChange={() => {}} />
          <div class="flex justify-center">
            <Button type="button" onClick={() => {
              const url = window.location.origin + "/api/qanda/card"
              const deckSelect = document.getElementById("select") as HTMLSelectElement
              const dechName = deckSelect.selectedOptions[0].value
              const cardQ = document.getElementById("cardAddQ") as HTMLInputElement
              const cardA = document.getElementById("cardAddA") as HTMLInputElement

              fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  deckName: dechName,
                  question: cardQ.value,
                  answer: cardA.value
                })
              }).catch((error) => {
                alert(error)
              })
            }}>カードを追加</Button>
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center gap-2"> 
        <textarea id="cardQ" class="text-lg text-center resize-none border-none h-20 w-2/3">{question}</textarea>
        <textarea id="cardA" class={`${hideCardA.value ? "invisible" : "visible"} hid text-lg text-center resize-none border-none h-48 w-2/3`}>{answer}</textarea>
        <div class="flex justify-center gap-2">
          <Button type="button" onClick={() => {
            // カードを削除
            const url = window.location.origin + "/api/qanda/card"
            const deckSelect = document.getElementById("select") as HTMLSelectElement
            const dechName = deckSelect.selectedOptions[0].value
            const cardQ = document.getElementById("cardQ") as HTMLInputElement
            fetch(url, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                deckName: dechName,
                question: cardQ.value
              })
            }).catch((error) => {
              alert(error)
            })
          }}>削除</Button>
          <Button type="button" onClick={() => {
            // カードを更新
            const url = window.location.origin + "/api/qanda/card"
            const deckSelect = document.getElementById("select") as HTMLSelectElement
            const dechName = deckSelect.selectedOptions[0].value
            const cardQ = document.getElementById("cardQ") as HTMLInputElement
            const cardA = document.getElementById("cardA") as HTMLInputElement
            fetch(url, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                deckName: dechName,
                question: cardQ.value,
                answer: cardA.value
              })
            }).catch((error) => {
              alert(error)
            })
          }}>更新</Button>
          <Button type="button" onClick={() => {
            // 出題はランダムで
            if (hideCardA.value) {
              hideCardA.value = false
              return
            }

            const randomIndex = Math.floor(Math.random() * cardListLength.value)
            question.value = cardList.value[randomIndex].cardQ
            answer.value = cardList.value[randomIndex].cardA
            hideCardA.value = true

          }}>次のカードへ進む</Button>
        </div>
      </div>      
    </div>
  )
}