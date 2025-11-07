/* eslint-disable */
import { ImmutableTree } from "../NormalizedTree/ImmutableTree";
import { parseNewick } from "./newickParsing";

//ONLY parses the first tree
export function  parseNexus(_tree:ImmutableTree,nexus:string,options={}):ImmutableTree{
throw new Error("Nexus parsing not implemented")

   // odd parts ensure we're not in a taxon label
   //TODO make this parsing more robust
   const nexusTokens = nexus.split(/\s*(?:\bBegin\s+|\bbegin\s+|\bBEGIN\s+|\bend\s*;|\bEnd\s*;|\bEND\s*;)\s*/).filter(d=> d!=="")
   if(nexusTokens.length===0||nexusTokens===undefined){
    throw new Error("No nexus tokens found in string. This may not be a nexus formated tree")
   }
   const firstToken = nexusTokens.shift()!.trim();
   if(firstToken.toLowerCase()!=='#nexus'){
        throw Error("File does not begin with #NEXUS is it a nexus file?")
    }
    for(const section of nexusTokens){
        const workingSection = section.replace(/^\s+|\s+$/g, '').split(/\n/);
        const sectionTitle = workingSection.shift()!;
        if(sectionTitle.toLowerCase().trim() ==="trees;"){
            let inTaxaMap=false;
            const tipNameMap = new Map();
            for(const token of workingSection){
                if(token.trim().toLowerCase()==="translate"){
                    inTaxaMap=true;
                }else{
                    if(inTaxaMap){
                        if(token.trim()===";"){
                            inTaxaMap=false;
                        }else{
                            const taxaData = token.trim().replace(",","").split(/\s*\s\s*/);
                            tipNameMap.set(taxaData[0],taxaData[1]);
                        }
                    }else{
                        const treeString = token.substring(token.indexOf("("));
                        if(tipNameMap.size>0) {
                            return parseNewick(treeString, { parseAnnotations: true,...options, tipNameMap: tipNameMap});

                        }else{
                            return parseNewick(treeString, {parseAnnotations: true,...options, tipNameMap: tipNameMap});
                            
                        }
                    }
                }
            }
        }
    }
    throw new Error("No tree section found in nexus file");
}

