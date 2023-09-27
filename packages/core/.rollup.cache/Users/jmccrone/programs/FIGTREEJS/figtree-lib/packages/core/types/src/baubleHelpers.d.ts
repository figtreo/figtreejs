/**
 * This function takes in an attributes object keyed by attributes that will be applied to the bauble.
 * It returns a function that takes a vertex or edge and returns the attributes for that dom element.
 *
 * This is needed to allow specifying the attribute as function.
 * the input of the function should be a node from a tree note the vertex
 *
 * @param attrs - values can be primitives or functions. if primitive it will apply the attribute to all baubles
 * @return {function(*=): {}}
 */
export declare function mapAttrsToProps(attrs: any): Function;
/**
 * This function does the same as mapping attrs to props but for interactions. the only difference is it can't
 * accept primatives as the values
 * @param {*} fs
 * @returns
 */
