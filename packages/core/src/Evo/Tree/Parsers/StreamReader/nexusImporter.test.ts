import { ImmutableTree } from "../../NormalizedTree";
import { NexusImporter } from "./NexusImporter";

function stringToReadableStream(str:string) {
    return new ReadableStream({
      start(controller:any) {
        // Convert the string to a Uint8Array and enqueue it
        const encoder = new TextEncoder();
        const chunk = encoder.encode(str);
        controller.enqueue(chunk);
        controller.close();
      }
    });
  }


describe("Testing nexus importer", () => {
    it('parse  Nexus',async function(){
        const nexusString = `#NEXUS
        Begin trees;
        tree tree1 = (((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2;
        End;`

        const nexusStream = stringToReadableStream(nexusString);

        const trees = new NexusImporter(nexusStream).getTrees();
        let i = 0;
         for  await (const tree of trees){
            expect(tree).toBeInstanceOf(ImmutableTree);

            i++;
        }
        expect(i).toBe(1);
    }),
    it('parse  Nexus multiple trees',async function(){
      const nexusString = `#NEXUS
      Begin trees;
      tree tree1 = (((virus1:0.1,virus2:0.12):0.08,(virus3:0.011,virus4:0.0087):0.15):0.03,virus5:0.21):0.2;
      tree tree2 = (((Tip7:0.04873764378778993,(Tip8:0.6532000878000133,Tip6:0.1321456687110038):0.042190933211748174):0.6632395745455513,Tip5:0.07721466870767527):0.023945361546555622,Tip0:0.013537352040642556,(Tip3:0.13083726861861736,(((Tip9:0.048159442284509385,Tip4:0.0727658295569952):0.03481552263500266,Tip2:0.0821610870291415):0.13059030569905986,Tip1:0.03707788908419223):0.04920278810640517):0.0011230070183312782);
      End;`

      const nexusStream = stringToReadableStream(nexusString);

      const trees = new NexusImporter(nexusStream).getTrees();
      let i = 0;
      let lastTree;
       for  await (const tree of trees){
          expect(tree).toBeInstanceOf(ImmutableTree);
          lastTree = tree;
          i++;
      }
      expect(i).toBe(2);
      expect(lastTree?.getTaxonCount()).toBe(15); //has taxa available from all trees
  })
});