import { render as gfmRender } from "@deno/gfm";
import { Button } from '../components/Button.tsx';
import { Signal,ReadonlySignal, computed, useSignal } from "@preact/signals";

export function App() {
  let markdownMemo: Signal<string> = useSignal("## メモ帳\n\nクリックでメモを編集")
  let markdownParsed: ReadonlySignal<string> = computed(() => {
    return gfmRender(markdownMemo.value, {})
  })
  let isEditMode = useSignal(false)

  getMarkdownMemo().then((memo) => {
    if (memo) {
      markdownMemo.value = memo
    }
  }).catch((e) => {
    console.error(e)
    alert("保存済みのメモを取得できませんでした。")
  })

  return (
    <div >
      <form class="mt-8" hidden={!isEditMode.value}>
        <textarea id="markdownMemo" class="w-full h-60 border rounded-lg p-1">
          {markdownMemo}
        </textarea>
        <Button type="button"
        onClick={() => {
          const markdownMemoElement = document.getElementById("markdownMemo") as HTMLTextAreaElement
          // これ textarea をいじったら勝手に markdownMemo が更新されるようにリアクティブにできないのだろうか…？
          markdownMemo.value = markdownMemoElement.value
          isEditMode.value = false

          saveMarkdownMemo(markdownMemo.value)
            .then(() => {})
            .catch((e) => {
              console.error(e)
              alert("エラーが発生しました。メモは保存されません。")
          })
        }
        }>保存</Button>
      </form>
      <div
        class="mt-8 markdown-body"
        hidden={isEditMode.value}
        onClick={()=>{isEditMode.value = true}}
        dangerouslySetInnerHTML={{
          __html: markdownParsed.value,
        }}
      />
    </div>
  )
}


const openDB = (): Promise<IDBDatabase> => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const opendb = () => {
      const request = globalThis.indexedDB.open("SimpleToDoDB");
      request.onerror = (e) => {
        reject("エラーが発生しました。データベースを開けませんでした。")
      }
      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore("markdownMemo");
        resolve(db);
      }
    }

    if (globalThis.indexedDB) {
      opendb()
    } else {
      globalThis.addEventListener("load", opendb)
    }
  })
}

const getMarkdownMemo = () => {
  return new Promise<string>((resolve, reject) => {
    const simpleMemoObjectStore = "markdownMemo"
    openDB().then((db) => {
      const getPromise = db.transaction(simpleMemoObjectStore, "readonly")
        .objectStore(simpleMemoObjectStore)
        .get(simpleMemoObjectStore)

        getPromise.onsuccess = (event) => {
          resolve((event.target as IDBRequest).result)
        }
        getPromise.onerror = (e) => {
          reject(e)
        }
    }).catch((e) => {
      reject(e)
    })
  })
}

const saveMarkdownMemo = (markdownMemo: string) => {
  return new Promise<string>((resolve, reject) => {
    const simpleMemoObjectStore = "markdownMemo"
    openDB().then((db) => {
      const savePromise = db.transaction(simpleMemoObjectStore, "readwrite")
        .objectStore(simpleMemoObjectStore)
        .put(markdownMemo, simpleMemoObjectStore)

        savePromise.onsuccess = () => {
          resolve("success")
        }
        savePromise.onerror = (e) => {
          reject(e)
        }
    }).catch((e) => {
      reject(e)
    })
  })
}