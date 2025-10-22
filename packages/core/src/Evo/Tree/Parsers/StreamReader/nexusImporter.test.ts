import { ImmutableTree } from "../../NormalizedTree"
import { NexusImporter } from "./NexusImporter"
import { describe, it, expect } from 'vitest';
function stringToReadableStream(str: string) {
  return new ReadableStream({
    start(controller: any) {
      // Convert the string to a Uint8Array and enqueue it
      const encoder = new TextEncoder()
      const chunk = encoder.encode(str)
      controller.enqueue(chunk)
      controller.close()
    },
  })
}

describe("Testing nexus importer", () => {
  it("parse  Nexus", async function () {
    const nexusString = `#NEXUS
        Begin trees;
        tree tree1 = (((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2;
        End;`

    const nexusStream = stringToReadableStream(nexusString)

    const trees = new NexusImporter(nexusStream).getTrees()
    let i = 0
    for await (const tree of trees) {
      expect(tree).toBeInstanceOf(ImmutableTree)
      expect(tree.getExternalNodeCount()).toBe(5)
      expect(tree.getInternalNodeCount()).toBe(4)
      i++
    }
    expect(i).toBe(1)
  });
    it("parse  Nexus multiple trees", async function () {
      const nexusString = `#NEXUS
      Begin trees;
      tree tree1 = (((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2;
      tree tree2 = (((Tip7:0.04873764378778993,(Tip8:0.6532000878000133,Tip6:0.1321456687110038):0.042190933211748174):0.6632395745455513,Tip5:0.07721466870767527):0.023945361546555622,Tip0:0.013537352040642556,(Tip3:0.13083726861861736,(((Tip9:0.048159442284509385,Tip4:0.0727658295569952):0.03481552263500266,Tip2:0.0821610870291415):0.13059030569905986,Tip1:0.03707788908419223):0.04920278810640517):0.0011230070183312782);
      End;`

      const nexusStream = stringToReadableStream(nexusString)

      const trees = new NexusImporter(nexusStream).getTrees()
      let i = 0
      let lastTree
      for await (const tree of trees) {
        expect(tree).toBeInstanceOf(ImmutableTree)
        lastTree = tree
        i++
      }
      expect(i).toBe(2)
      expect(lastTree?.getTaxonCount()).toBe(15) //has taxa available from all trees
    });
  it("parse  Nexus - treeannotations", async function () {
    const nexusString = `#NEXUS
    Begin trees;
    tree tree1 = (((virus1[&test="A",height=90]:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2;
    End;`

    const nexusStream = stringToReadableStream(nexusString)

    const trees = new NexusImporter(nexusStream).getTrees()
    let i = 0
    for await (const tree of trees) {
      expect(tree).toBeInstanceOf(ImmutableTree)
      i++
    }
    expect(i).toBe(1)
    
  }),
    it("parse  Nexus multiple trees, taxa", async function () {
      const nexusString = `#NEXUS
    Begin taxa;
      Dimensions ntax=5;
      TaxLabels Tip0 Tip1 Tip2 Tip3 Tip4;
    End;
    Begin trees;
      tree 1 = ((Tip3:0.005683055909367637,(Tip4:0.028897909268250865,Tip2:0.17725578701486128):0.15953222892967397):0.0015945469810341964,Tip0:0.16482157194489672,Tip1:0.06558413486573018);
      tree 2 = (Tip3:0.07895643336574805,Tip0:0.09039621608818542,(Tip2:0.12447554684923097,(Tip4:0.016569217859539333,Tip1:0.04529906914098861):0.4270260158852053):0.5512862407921115);
      tree 3 = ((Tip4:0.15573112107230094,Tip2:0.10434839467828654):0.10910110483363722,Tip0:0.009239519001625887,(Tip3:0.4614463596422172,Tip1:0.087294319045952):0.22603324870135144);
    End;`

      const nexusStream = stringToReadableStream(nexusString)

      const trees = new NexusImporter(nexusStream).getTrees()
      let i = 0
      let lastTree
      for await (const tree of trees) {
        expect(tree).toBeInstanceOf(ImmutableTree)
        lastTree = tree
        i++
      }
      expect(i).toBe(3)
      expect(lastTree?.getTaxonCount()).toBe(5) //has taxa available from all trees
    })
})
