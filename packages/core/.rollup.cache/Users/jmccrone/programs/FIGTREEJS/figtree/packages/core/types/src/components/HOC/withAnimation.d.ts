import React from "react";
/**
 * This is a HOC that wraps a bauble and applies a string to it's visible attributes if the animation is true.
 * @param WrappedComponent
 * @returns
 */
declare const withAnimation: (WrappedComponent: React.ComponentType<any>) => (props: any) => React.JSX.Element;
export default withAnimation;
