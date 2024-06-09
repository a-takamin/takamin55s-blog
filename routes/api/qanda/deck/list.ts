import { Handlers } from "$fresh/server.ts"
export const handler: Handlers = {
  // デッキ一覧の取得
  async GET() {
    const deckStore = await Deno.openKv()
    const decks = await deckStore.list({prefix: ["deck"]})
    const deckNames: string[] = []
    for await (const deck of decks) {
      deckNames.push(deck.key[1] as string)
    }
    return new Response(JSON.stringify(deckNames), { status: 200 })
  },

}