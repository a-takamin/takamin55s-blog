// props が長いので構造体を定義して切り分けてもよい。構造体と呼ばずインターフェースと呼ぶのかな
export default function TextInput(props: {
  id: string,
  placeholder: string, 
  value: string,
  onChange: (value: string) => void,
  onBlur: (value: string) => void
}) {

  return (
    <input 
      id={props.id}
      type="text"
      class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder={props.placeholder} 
      onChange={e => {
        const target = e.target as HTMLInputElement | null;
        if (target) {
          props.onChange(target.value);
        }
        }
      }
      onBlur={e => {
        const target = e.target as HTMLInputElement | null;
        if (target) {
          props.onBlur(target.value)
        }
      }
    }>
      {props.value}
    </input>
  )
}