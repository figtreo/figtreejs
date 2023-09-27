import React from "react";
/**
 * This is an HOC that creates a linear gradient def and returns this def and the wrapped component with the def
 * applied.
 * @param WrappedContainer
 * @return {function(*): *}
 */
declare const withLinearGradient: (WrappedContainer: React.ComponentType<any>) => (props: any) => React.JSX.Element;
export default withLinearGradient;
