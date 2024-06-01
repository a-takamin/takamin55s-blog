import { Signal, useSignal } from "@preact/signals";
import { Button } from '../components/Button.tsx';
import { InputWithLabel } from "../components/InputWithLabel.tsx";
import { CheckboxWithLabel } from "../components/CheckboxWithLabel.tsx";

export function App() {
  let isRealInterpretation = useSignal(false);
  let isMeans = useSignal(false);
  let factors: Signal<string[]> = useSignal([]);
  const summary = useSignal("");
  const getChecked = (id: string) :boolean => {
    const checkbox = document.getElementById(id) as HTMLInputElement;
    return checkbox.checked; 
  }

  const q1="望ましくない今の状態とは？"
  const q1p="例: 子どもが勉強しない"
  const q2="どんな状態になればイイ感じ？"
  const q2p="例: 子どもが自主的に勉強する"
  const q3="理想と現実のギャップをまとめると？"
  const q3p="例: 自主的に勉強してほしいがしていない"
  const q4="今の状態が事実ではなく解釈かも"
  const q4p="そうかも"
  const q5="望ましくない今の状態の「事実」は？"
  const q5p="例: 子どもの1日の勉強量が1時間未満"
  const q6="理想が目的ではなく手段かも"
  const q6p="そうかも"
  const q7="本当に達成したいこと（目的）は？"
  const q7p="例: 子どもが志望高校に合格する"
  const q8="理想実現に必要な要素は？（カンマか読点区切り）"
  const q8p="例: 志望校の明確化、判定の把握、"
  const q9="に対してのアクションは？"
  

  return (
    <form class="mt-8">
      <p class="mb-3 text-gray-700 text-lg">第1段階</p>
      <InputWithLabel id="q1" label={q1} placeholder={q1p} />
      <InputWithLabel id="q2" label={q2} placeholder={q2p} />
      <InputWithLabel id="q3" label={q3} placeholder={q3p} />
      <br />

      <p class="mb-3 text-gray-700 text-lg">第2段階</p>
      <CheckboxWithLabel id="q4" q={q4} label={q4p} onClick={() => {
        isRealInterpretation.value = getChecked("q4")
      }}/>
      <div class="ml-4" hidden={!isRealInterpretation.value}>
        <InputWithLabel id="q5" label={q5} placeholder={q5p} />
      </div>
      <CheckboxWithLabel id="q6" q={q6} label={q6p} onClick={() => {
        isMeans.value = getChecked("q6")
      }}/>
      <div class="ml-4" hidden={!isMeans.value}>
        <InputWithLabel id="q7" label={q7} placeholder={q7p} />
      </div>
      <br />

      <p class="mb-3 text-gray-700 text-lg">第3段階</p>
      <InputWithLabel id="q8" label={q8} placeholder={q8p} onBlur={() => {
        const factor = document.getElementById("q8") as HTMLInputElement;
        factors.value = factor.value.split(/,|、/).map((f) => f.trim());
      }} ></InputWithLabel>
     
      <div class="ml-3">
        {factors.value.map((factor, index) => 
          <div>
            <InputWithLabel id={"q9"+index} label={factor+" "+q9} />
          </div>
          )
        } 
      </div>
      <br />
      <div class="flex justify-center">
        <Button type="button"
          onClick={function() {
            const real = document.getElementById("q1") as HTMLInputElement;
            const ideal = document.getElementById("q2") as HTMLInputElement;
            const gap = document.getElementById("q3") as HTMLInputElement;
            const factofreal = document.getElementById("q5") as HTMLInputElement;
            const trueideal = document.getElementById("q7") as HTMLInputElement;
            const factor = document.getElementById("q8") as HTMLInputElement;



            let md = `
            ## ${q1}
            ${real.value}

            ## ${q2}
            ${ideal.value}

            ## ${q3}
            ${gap.value}

            `

            if (isRealInterpretation.value) {
              md +=`## ${q5}
              ${factofreal.value}
              
              `
            }

            if (isMeans.value) {
              md +=`## ${q7}
              ${trueideal.value}
              
              `
            }
            
            md +=`## ${q8}
            ${factor.value}
            
            `

            factors.value.forEach((f, index) => {
              const action = document.getElementById("q9"+index) as HTMLInputElement;
              md +=`### ${f} ${q9}
              ${action.value}
              
              `
            })
            const formatted = md.replace(/\n/g, "<br>")
            summary.value = formatted
          }} >
            まとめ生成
        </Button>
      </div>
      <div
        dangerouslySetInnerHTML={{
        __html: summary.value
      }}
      />
      </form>
  )
}
