import { Handlers } from "$fresh/server.ts"
export const handler: Handlers = {
  // カードの追加
  async POST(req) {
    const request = (await req.json())
    const cardQ = request.question as string
    const cardA = request.answer as string
    const deckName = request.deckName as string
    if (!cardQ || !cardA || !deckName) {
      return new Response(null, { status: 400 })
    }
    const cardStore = await Deno.openKv()
    // 一意にするために cardQ もキーに含める
    await cardStore.set(["card", deckName, cardQ], [cardQ, cardA])
    return new Response(null, { status: 201 })
  },
  // カードの削除
  async DELETE(req) {
    const request = (await req.json())
    console.log(request)
    const cardQ = request.question as string
    const deckName = request.deckName as string
    if (!cardQ || !deckName) {
      return new Response(null, { status: 400 })
    }
    const cardStore = await Deno.openKv()
    await cardStore.delete(["card", deckName, cardQ])
    return new Response(null, { status: 204 })
  },
  // カードの更新
  async PUT(req) {
    const request = (await req.json())
    console.log(request)
    const cardQ = request.question as string
    const cardA = request.answer as string
    const deckName = request.deckName as string
    if (!cardQ || !cardA || !deckName) {
      return new Response(null, { status: 400 })
    }
    const cardStore = await Deno.openKv()
    await cardStore.set(["card", deckName, cardQ], [cardQ, cardA])
    return new Response(null, { status: 204 })
  },
  // カードの取得
  // TODO: 今はすべてのカードを一気に取得しているが、ページネーションを実装する
  async GET(req) {
    const deckName = (new URL(req.url)).searchParams.get("deckName") as string
    // const offset = (new URL(req.url)).searchParams.get("offset") as string
    const cardStore = await Deno.openKv()
    const cards = await cardStore.list({prefix: ["card", deckName]})
    const cardList: {cardQ: string, cardA: string}[] = []
    for await (const card of cards) {
      const cardQ = (card.value as string[])[0] as string
      const cardA = (card.value as string[])[1] as string
      cardList.push({cardQ: cardQ as string, cardA: cardA})
    }
    return new Response(JSON.stringify(cardList), { status: 200 })
  },
}