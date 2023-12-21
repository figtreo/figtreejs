import { AnnotationType } from '@figtreejs/core';
import treeReducer from './treeSlice';
  
  describe('tree reducer', () => {
    const initialState: any = {
        tree:{nodes:{
            byId:{node0:{
                id:'node0',
                children:['node1','node2'],
                parent:null,
                label:'root',
                height:0.1,
                divergence:0,
                name:null,
            length:null},
            node1:{
                id:'node1',
                children:[],
                parent:'node0',
                label:'A',
                length:0.1,
                height:0,
                divergence:0.1,
                name:null

            },
            node2:{
                id:'node2',
                children:[],
                parent:'node0',
                label:'B',
                length:0.1,
                height:0,
                divergence:0.1,
                name:null

            }
            },
            allIds:["node0"],
            byLabel:{root:'node0',A:'node1',B:'node2'},
            byName:{}
        },
        rootNode:'node0',
        annotations:{
            'node1':{location:'A',rate:0.1},
            'node2':{location:'B',rate:0.2}
        },
        annotationTypes:{location:AnnotationType.DISCRETE,rate:AnnotationType.CONTINUOUS},
      },
      status: 'idle'
    };

    const realInitialState: any = {
      tree:{
        nodes:{
            byId:{},
            allIds:[],
            byName:{},
            byLabel:{}
        },
        rootNode:null,
        annotations:{},
        annotationTypes:{},
      },
        status: 'idle',
    }
    it('should handle initial state', () => {
      expect(treeReducer(undefined, { type: 'unknown' })).toEqual(realInitialState)
    });
  
    it('should rotate', () => {
      const actual = treeReducer(initialState, rotate('node0'));
      expect(actual.tree.nodes.byId.node0.children).toEqual(['node2','node1']);
    });
    it('should rotate with fake tree', () => {
        const actual = treeReducer(initialState, rotate('node0'));
        expect(actual.tree.nodes.byId.node0.children).toEqual(['node2','node1']);
      });
  });
  