"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
class BaseException extends Error {
    constructor(message = '') {
        super(message);
    }
}
exports.BaseException = BaseException;
class UnknownException extends Error {
    constructor(message) { super(message); }
}
exports.UnknownException = UnknownException;
// Exceptions
class FileDoesNotExistException extends BaseException {
    constructor(path) { super(`Path "${path}" does not exist.`); }
}
exports.FileDoesNotExistException = FileDoesNotExistException;
class FileAlreadyExistException extends BaseException {
    constructor(path) { super(`Path "${path}" already exist.`); }
}
exports.FileAlreadyExistException = FileAlreadyExistException;
class PathIsDirectoryException extends BaseException {
    constructor(path) { super(`Path "${path}" is a directory.`); }
}
exports.PathIsDirectoryException = PathIsDirectoryException;
class PathIsFileException extends BaseException {
    constructor(path) { super(`Path "${path}" is a file.`); }
}
exports.PathIsFileException = PathIsFileException;
class ContentHasMutatedException extends BaseException {
    constructor(path) {
        super(`Content at path "${path}" has changed between the start and the end of an update.`);
    }
}
exports.ContentHasMutatedException = ContentHasMutatedException;
class InvalidUpdateRecordException extends BaseException {
    constructor() { super(`Invalid record instance.`); }
}
exports.InvalidUpdateRecordException = InvalidUpdateRecordException;
class MergeConflictException extends BaseException {
    constructor(path) {
        super(`A merge conflicted on path "${path}".`);
    }
}
exports.MergeConflictException = MergeConflictException;
class UnimplementedException extends BaseException {
    constructor() { super('This function is unimplemented.'); }
}
exports.UnimplementedException = UnimplementedException;
class UnsupportedPlatformException extends BaseException {
    constructor() { super('This platform is not supported by this code path.'); }
}
exports.UnsupportedPlatformException = UnsupportedPlatformException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9uLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9jb3JlL3NyYy9leGNlcHRpb24vZXhjZXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsbUJBQTJCLFNBQVEsS0FBSztJQUN0QyxZQUFZLE9BQU8sR0FBRyxFQUFFO1FBQ3RCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFKRCxzQ0FJQztBQUdELHNCQUE4QixTQUFRLEtBQUs7SUFDekMsWUFBWSxPQUFlLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqRDtBQUZELDRDQUVDO0FBR0QsYUFBYTtBQUNiLCtCQUF1QyxTQUFRLGFBQWE7SUFDMUQsWUFBWSxJQUFZLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN2RTtBQUZELDhEQUVDO0FBQ0QsK0JBQXVDLFNBQVEsYUFBYTtJQUMxRCxZQUFZLElBQVksSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3RFO0FBRkQsOERBRUM7QUFDRCw4QkFBc0MsU0FBUSxhQUFhO0lBQ3pELFlBQVksSUFBWSxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdkU7QUFGRCw0REFFQztBQUNELHlCQUFpQyxTQUFRLGFBQWE7SUFDcEQsWUFBWSxJQUFZLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbEU7QUFGRCxrREFFQztBQUNELGdDQUF3QyxTQUFRLGFBQWE7SUFDM0QsWUFBWSxJQUFZO1FBQ3RCLEtBQUssQ0FBQyxvQkFBb0IsSUFBSSwyREFBMkQsQ0FBQyxDQUFDO0lBQzdGLENBQUM7Q0FDRjtBQUpELGdFQUlDO0FBQ0Qsa0NBQTBDLFNBQVEsYUFBYTtJQUM3RCxnQkFBZ0IsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3JEO0FBRkQsb0VBRUM7QUFDRCw0QkFBb0MsU0FBUSxhQUFhO0lBQ3ZELFlBQVksSUFBWTtRQUN0QixLQUFLLENBQUMsK0JBQStCLElBQUksSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNGO0FBSkQsd0RBSUM7QUFFRCw0QkFBb0MsU0FBUSxhQUFhO0lBQ3ZELGdCQUFnQixLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDNUQ7QUFGRCx3REFFQztBQUVELGtDQUEwQyxTQUFRLGFBQWE7SUFDN0QsZ0JBQWdCLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM5RTtBQUZELG9FQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5leHBvcnQgY2xhc3MgQmFzZUV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSA9ICcnKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgVW5rbm93bkV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7IHN1cGVyKG1lc3NhZ2UpOyB9XG59XG5cblxuLy8gRXhjZXB0aW9uc1xuZXhwb3J0IGNsYXNzIEZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IocGF0aDogc3RyaW5nKSB7IHN1cGVyKGBQYXRoIFwiJHtwYXRofVwiIGRvZXMgbm90IGV4aXN0LmApOyB9XG59XG5leHBvcnQgY2xhc3MgRmlsZUFscmVhZHlFeGlzdEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcpIHsgc3VwZXIoYFBhdGggXCIke3BhdGh9XCIgYWxyZWFkeSBleGlzdC5gKTsgfVxufVxuZXhwb3J0IGNsYXNzIFBhdGhJc0RpcmVjdG9yeUV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcpIHsgc3VwZXIoYFBhdGggXCIke3BhdGh9XCIgaXMgYSBkaXJlY3RvcnkuYCk7IH1cbn1cbmV4cG9ydCBjbGFzcyBQYXRoSXNGaWxlRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykgeyBzdXBlcihgUGF0aCBcIiR7cGF0aH1cIiBpcyBhIGZpbGUuYCk7IH1cbn1cbmV4cG9ydCBjbGFzcyBDb250ZW50SGFzTXV0YXRlZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgQ29udGVudCBhdCBwYXRoIFwiJHtwYXRofVwiIGhhcyBjaGFuZ2VkIGJldHdlZW4gdGhlIHN0YXJ0IGFuZCB0aGUgZW5kIG9mIGFuIHVwZGF0ZS5gKTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIEludmFsaWRVcGRhdGVSZWNvcmRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7IHN1cGVyKGBJbnZhbGlkIHJlY29yZCBpbnN0YW5jZS5gKTsgfVxufVxuZXhwb3J0IGNsYXNzIE1lcmdlQ29uZmxpY3RFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IocGF0aDogc3RyaW5nKSB7XG4gICAgc3VwZXIoYEEgbWVyZ2UgY29uZmxpY3RlZCBvbiBwYXRoIFwiJHtwYXRofVwiLmApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVbmltcGxlbWVudGVkRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcignVGhpcyBmdW5jdGlvbiBpcyB1bmltcGxlbWVudGVkLicpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBVbnN1cHBvcnRlZFBsYXRmb3JtRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcignVGhpcyBwbGF0Zm9ybSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgY29kZSBwYXRoLicpOyB9XG59XG4iXX0=