/// <amd-module name="tsickle/src/modules_manifest" />
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="tsickle/src/modules_manifest" />
export interface FileMap<T> {
    [fileName: string]: T;
}
/** A class that maintains the module dependency graph of output JS files. */
export declare class ModulesManifest {
    /** Map of googmodule module name to file name */
    private moduleToFileName;
    /** Map of file name to arrays of imported googmodule module names */
    private referencedModules;
    addManifest(other: ModulesManifest): void;
    addModule(fileName: string, module: string): void;
    addReferencedModule(fileName: string, resolvedModule: string): void;
    readonly modules: string[];
    getFileNameFromModule(module: string): string;
    readonly fileNames: string[];
    getReferencedModules(fileName: string): string[];
}
