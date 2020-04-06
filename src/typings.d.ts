// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;
declare var OAuth: any;

//following declarations for fixing ng test errors
declare var beforeEachProviders: any;

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
