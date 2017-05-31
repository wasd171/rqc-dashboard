declare module '*.graphql' {
    import { DocumentNode, Location, DefinitionNode } from 'graphql';
    export const kind: 'Document';
    export const loc: Location | undefined;
    export const definitions: Array<DefinitionNode>;
}