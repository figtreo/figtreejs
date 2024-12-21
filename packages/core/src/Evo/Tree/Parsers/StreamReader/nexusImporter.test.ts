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

         for  await (const tree of trees){
            expect(tree).toBeInstanceOf(ImmutableTree);
        }


    })
});