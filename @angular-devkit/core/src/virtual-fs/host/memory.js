"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const rxjs_1 = require("rxjs");
const exception_1 = require("../../exception");
const path_1 = require("../path");
class SimpleMemoryHost {
    constructor() {
        this._cache = new Map();
        this._watchers = new Map();
        this._cache.set(path_1.normalize('/'), this._newDirStats());
    }
    _newDirStats() {
        return {
            inspect() { return '<Directory>'; },
            isFile() { return false; },
            isDirectory() { return true; },
            size: 0,
            atime: new Date(),
            ctime: new Date(),
            mtime: new Date(),
            birthtime: new Date(),
            content: null,
        };
    }
    _newFileStats(content, oldStats) {
        return {
            inspect() { return `<File size(${content.byteLength})>`; },
            isFile() { return true; },
            isDirectory() { return false; },
            size: content.byteLength,
            atime: oldStats ? oldStats.atime : new Date(),
            ctime: new Date(),
            mtime: new Date(),
            birthtime: oldStats ? oldStats.birthtime : new Date(),
            content,
        };
    }
    _toAbsolute(path) {
        return path_1.isAbsolute(path) ? path : path_1.normalize('/' + path);
    }
    _updateWatchers(path, type) {
        const time = new Date();
        let currentPath = path;
        let parent = null;
        if (this._watchers.size == 0) {
            // Nothing to do if there's no watchers.
            return;
        }
        const maybeWatcher = this._watchers.get(currentPath);
        if (maybeWatcher) {
            maybeWatcher.forEach(watcher => {
                const [options, subject] = watcher;
                subject.next({ path, time, type });
                if (!options.persistent && type == 2 /* Deleted */) {
                    subject.complete();
                    this._watchers.delete(currentPath);
                }
            });
        }
        do {
            currentPath = parent !== null ? parent : currentPath;
            parent = path_1.dirname(currentPath);
            const maybeWatcher = this._watchers.get(currentPath);
            if (maybeWatcher) {
                maybeWatcher.forEach(watcher => {
                    const [options, subject] = watcher;
                    if (!options.recursive) {
                        return;
                    }
                    subject.next({ path, time, type });
                    if (!options.persistent && type == 2 /* Deleted */) {
                        subject.complete();
                        this._watchers.delete(currentPath);
                    }
                });
            }
        } while (parent != currentPath);
    }
    get capabilities() {
        return { synchronous: true };
    }
    /**
     * List of protected methods that give direct access outside the observables to the cache
     * and internal states.
     */
    _write(path, content) {
        path = this._toAbsolute(path);
        const old = this._cache.get(path);
        if (old && old.isDirectory()) {
            throw new exception_1.PathIsDirectoryException(path);
        }
        // Update all directories. If we find a file we know it's an invalid write.
        const fragments = path_1.split(path);
        let curr = path_1.normalize('/');
        for (const fr of fragments) {
            curr = path_1.join(curr, fr);
            const maybeStats = this._cache.get(fr);
            if (maybeStats) {
                if (maybeStats.isFile()) {
                    throw new exception_1.PathIsFileException(curr);
                }
            }
            else {
                this._cache.set(curr, this._newDirStats());
            }
        }
        // Create the stats.
        const stats = this._newFileStats(content, old);
        this._cache.set(path, stats);
        this._updateWatchers(path, old ? 0 /* Changed */ : 1 /* Created */);
    }
    _read(path) {
        path = this._toAbsolute(path);
        const maybeStats = this._cache.get(path);
        if (!maybeStats) {
            throw new exception_1.FileDoesNotExistException(path);
        }
        else if (maybeStats.isDirectory()) {
            throw new exception_1.PathIsDirectoryException(path);
        }
        else if (!maybeStats.content) {
            throw new exception_1.PathIsDirectoryException(path);
        }
        else {
            return maybeStats.content;
        }
    }
    _delete(path) {
        path = this._toAbsolute(path);
        if (this._isDirectory(path)) {
            for (const [cachePath] of this._cache.entries()) {
                if (path.startsWith(cachePath + path_1.NormalizedSep)) {
                    this._cache.delete(cachePath);
                }
            }
        }
        else {
            this._cache.delete(path);
        }
        this._updateWatchers(path, 2 /* Deleted */);
    }
    _rename(from, to) {
        from = this._toAbsolute(from);
        to = this._toAbsolute(to);
        if (!this._cache.has(from)) {
            throw new exception_1.FileDoesNotExistException(from);
        }
        else if (this._cache.has(to)) {
            throw new exception_1.FileAlreadyExistException(to);
        }
        if (this._isDirectory(from)) {
            for (const path of this._cache.keys()) {
                if (path.startsWith(from + path_1.NormalizedSep)) {
                    const content = this._cache.get(path);
                    if (content) {
                        // We don't need to clone or extract the content, since we're moving files.
                        this._cache.set(path_1.join(to, path_1.NormalizedSep, path.slice(from.length)), content);
                    }
                }
            }
        }
        else {
            const content = this._cache.get(from);
            if (content) {
                const fragments = path_1.split(to);
                const newDirectories = [];
                let curr = path_1.normalize('/');
                for (const fr of fragments) {
                    curr = path_1.join(curr, fr);
                    const maybeStats = this._cache.get(fr);
                    if (maybeStats) {
                        if (maybeStats.isFile()) {
                            throw new exception_1.PathIsFileException(curr);
                        }
                    }
                    else {
                        newDirectories.push(curr);
                    }
                }
                for (const newDirectory of newDirectories) {
                    this._cache.set(newDirectory, this._newDirStats());
                }
                this._cache.delete(from);
                this._cache.set(to, content);
            }
        }
        this._updateWatchers(from, 3 /* Renamed */);
    }
    _list(path) {
        path = this._toAbsolute(path);
        if (this._isFile(path)) {
            throw new exception_1.PathIsFileException(path);
        }
        const fragments = path_1.split(path);
        const result = new Set();
        if (path !== path_1.NormalizedRoot) {
            for (const p of this._cache.keys()) {
                if (p.startsWith(path + path_1.NormalizedSep)) {
                    result.add(path_1.split(p)[fragments.length]);
                }
            }
        }
        else {
            for (const p of this._cache.keys()) {
                if (p.startsWith(path_1.NormalizedSep) && p !== path_1.NormalizedRoot) {
                    result.add(path_1.split(p)[1]);
                }
            }
        }
        return [...result];
    }
    _exists(path) {
        return !!this._cache.get(this._toAbsolute(path));
    }
    _isDirectory(path) {
        const maybeStats = this._cache.get(this._toAbsolute(path));
        return maybeStats ? maybeStats.isDirectory() : false;
    }
    _isFile(path) {
        const maybeStats = this._cache.get(this._toAbsolute(path));
        return maybeStats ? maybeStats.isFile() : false;
    }
    _stat(path) {
        const maybeStats = this._cache.get(this._toAbsolute(path));
        if (!maybeStats) {
            return null;
        }
        else {
            return maybeStats;
        }
    }
    _watch(path, options) {
        path = this._toAbsolute(path);
        const subject = new rxjs_1.Subject();
        let maybeWatcherArray = this._watchers.get(path);
        if (!maybeWatcherArray) {
            maybeWatcherArray = [];
            this._watchers.set(path, maybeWatcherArray);
        }
        maybeWatcherArray.push([options || {}, subject]);
        return subject.asObservable();
    }
    write(path, content) {
        return new rxjs_1.Observable(obs => {
            this._write(path, content);
            obs.next();
            obs.complete();
        });
    }
    read(path) {
        return new rxjs_1.Observable(obs => {
            const content = this._read(path);
            obs.next(content);
            obs.complete();
        });
    }
    delete(path) {
        return new rxjs_1.Observable(obs => {
            this._delete(path);
            obs.next();
            obs.complete();
        });
    }
    rename(from, to) {
        return new rxjs_1.Observable(obs => {
            this._rename(from, to);
            obs.next();
            obs.complete();
        });
    }
    list(path) {
        return new rxjs_1.Observable(obs => {
            obs.next(this._list(path));
            obs.complete();
        });
    }
    exists(path) {
        return new rxjs_1.Observable(obs => {
            obs.next(this._exists(path));
            obs.complete();
        });
    }
    isDirectory(path) {
        return new rxjs_1.Observable(obs => {
            obs.next(this._isDirectory(path));
            obs.complete();
        });
    }
    isFile(path) {
        return new rxjs_1.Observable(obs => {
            obs.next(this._isFile(path));
            obs.complete();
        });
    }
    // Some hosts may not support stat.
    stat(path) {
        return new rxjs_1.Observable(obs => {
            obs.next(this._stat(path));
            obs.complete();
        });
    }
    watch(path, options) {
        return this._watch(path, options);
    }
}
exports.SimpleMemoryHost = SimpleMemoryHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb3J5LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9jb3JlL3NyYy92aXJ0dWFsLWZzL2hvc3QvbWVtb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsK0JBQTJDO0FBQzNDLCtDQUt5QjtBQUN6QixrQ0FVaUI7QUFnQmpCO0lBcUNFO1FBcENVLFdBQU0sR0FBRyxJQUFJLEdBQUcsRUFBc0MsQ0FBQztRQUN6RCxjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQXVELENBQUM7UUFvQ2pGLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQW5DUyxZQUFZO1FBQ3BCLE1BQU0sQ0FBQztZQUNMLE9BQU8sS0FBSyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUVuQyxNQUFNLEtBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUIsV0FBVyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksRUFBRSxDQUFDO1lBRVAsS0FBSyxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ2pCLEtBQUssRUFBRSxJQUFJLElBQUksRUFBRTtZQUNqQixLQUFLLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDakIsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO1lBRXJCLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQztJQUNKLENBQUM7SUFDUyxhQUFhLENBQUMsT0FBbUIsRUFBRSxRQUF1QztRQUNsRixNQUFNLENBQUM7WUFDTCxPQUFPLEtBQUssTUFBTSxDQUFDLGNBQWMsT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUUxRCxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7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QUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxJQUFJLENBQUMsSUFBVTtRQUNiLE1BQU0sQ0FBQyxJQUFJLGlCQUFVLENBQW1CLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBVSxFQUFFLE9BQTBCO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0Y7QUE3VUQsNENBNlVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgRmlsZUFscmVhZHlFeGlzdEV4Y2VwdGlvbixcbiAgRmlsZURvZXNOb3RFeGlzdEV4Y2VwdGlvbixcbiAgUGF0aElzRGlyZWN0b3J5RXhjZXB0aW9uLFxuICBQYXRoSXNGaWxlRXhjZXB0aW9uLFxufSBmcm9tICcuLi8uLi9leGNlcHRpb24nO1xuaW1wb3J0IHtcbiAgTm9ybWFsaXplZFJvb3QsXG4gIE5vcm1hbGl6ZWRTZXAsXG4gIFBhdGgsXG4gIFBhdGhGcmFnbWVudCxcbiAgZGlybmFtZSxcbiAgaXNBYnNvbHV0ZSxcbiAgam9pbixcbiAgbm9ybWFsaXplLFxuICBzcGxpdCxcbn0gZnJvbSAnLi4vcGF0aCc7XG5pbXBvcnQge1xuICBGaWxlQnVmZmVyLFxuICBIb3N0LFxuICBIb3N0Q2FwYWJpbGl0aWVzLFxuICBIb3N0V2F0Y2hFdmVudCxcbiAgSG9zdFdhdGNoRXZlbnRUeXBlLFxuICBIb3N0V2F0Y2hPcHRpb25zLFxuICBTdGF0cyxcbn0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2ltcGxlTWVtb3J5SG9zdFN0YXRzIHtcbiAgcmVhZG9ubHkgY29udGVudDogRmlsZUJ1ZmZlciB8IG51bGw7XG59XG5cbmV4cG9ydCBjbGFzcyBTaW1wbGVNZW1vcnlIb3N0IGltcGxlbWVudHMgSG9zdDx7fT4ge1xuICBwcm90ZWN0ZWQgX2NhY2hlID0gbmV3IE1hcDxQYXRoLCBTdGF0czxTaW1wbGVNZW1vcnlIb3N0U3RhdHM+PigpO1xuICBwcml2YXRlIF93YXRjaGVycyA9IG5ldyBNYXA8UGF0aCwgW0hvc3RXYXRjaE9wdGlvbnMsIFN1YmplY3Q8SG9zdFdhdGNoRXZlbnQ+XVtdPigpO1xuXG4gIHByb3RlY3RlZCBfbmV3RGlyU3RhdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluc3BlY3QoKSB7IHJldHVybiAnPERpcmVjdG9yeT4nOyB9LFxuXG4gICAgICBpc0ZpbGUoKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgIGlzRGlyZWN0b3J5KCkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICAgIHNpemU6IDAsXG5cbiAgICAgIGF0aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgY3RpbWU6IG5ldyBEYXRlKCksXG4gICAgICBtdGltZTogbmV3IERhdGUoKSxcbiAgICAgIGJpcnRodGltZTogbmV3IERhdGUoKSxcblxuICAgICAgY29udGVudDogbnVsbCxcbiAgICB9O1xuICB9XG4gIHByb3RlY3RlZCBfbmV3RmlsZVN0YXRzKGNvbnRlbnQ6IEZpbGVCdWZmZXIsIG9sZFN0YXRzPzogU3RhdHM8U2ltcGxlTWVtb3J5SG9zdFN0YXRzPikge1xuICAgIHJldHVybiB7XG4gICAgICBpbnNwZWN0KCkgeyByZXR1cm4gYDxGaWxlIHNpemUoJHtjb250ZW50LmJ5dGVMZW5ndGh9KT5gOyB9LFxuXG4gICAgICBpc0ZpbGUoKSB7IHJldHVybiB0cnVlOyB9LFxuICAgICAgaXNEaXJlY3RvcnkoKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgIHNpemU6IGNvbnRlbnQuYnl0ZUxlbmd0aCxcblxuICAgICAgYXRpbWU6IG9sZFN0YXRzID8gb2xkU3RhdHMuYXRpbWUgOiBuZXcgRGF0ZSgpLFxuICAgICAgY3RpbWU6IG5ldyBEYXRlKCksXG4gICAgICBtdGltZTogbmV3IERhdGUoKSxcbiAgICAgIGJpcnRodGltZTogb2xkU3RhdHMgPyBvbGRTdGF0cy5iaXJ0aHRpbWUgOiBuZXcgRGF0ZSgpLFxuXG4gICAgICBjb250ZW50LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9jYWNoZS5zZXQobm9ybWFsaXplKCcvJyksIHRoaXMuX25ld0RpclN0YXRzKCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF90b0Fic29sdXRlKHBhdGg6IFBhdGgpIHtcbiAgICByZXR1cm4gaXNBYnNvbHV0ZShwYXRoKSA/IHBhdGggOiBub3JtYWxpemUoJy8nICsgcGF0aCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3VwZGF0ZVdhdGNoZXJzKHBhdGg6IFBhdGgsIHR5cGU6IEhvc3RXYXRjaEV2ZW50VHlwZSkge1xuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCBjdXJyZW50UGF0aCA9IHBhdGg7XG4gICAgbGV0IHBhcmVudDogUGF0aCB8IG51bGwgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuX3dhdGNoZXJzLnNpemUgPT0gMCkge1xuICAgICAgLy8gTm90aGluZyB0byBkbyBpZiB0aGVyZSdzIG5vIHdhdGNoZXJzLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1heWJlV2F0Y2hlciA9IHRoaXMuX3dhdGNoZXJzLmdldChjdXJyZW50UGF0aCk7XG4gICAgaWYgKG1heWJlV2F0Y2hlcikge1xuICAgICAgbWF5YmVXYXRjaGVyLmZvckVhY2god2F0Y2hlciA9PiB7XG4gICAgICAgIGNvbnN0IFtvcHRpb25zLCBzdWJqZWN0XSA9IHdhdGNoZXI7XG4gICAgICAgIHN1YmplY3QubmV4dCh7IHBhdGgsIHRpbWUsIHR5cGUgfSk7XG5cbiAgICAgICAgaWYgKCFvcHRpb25zLnBlcnNpc3RlbnQgJiYgdHlwZSA9PSBIb3N0V2F0Y2hFdmVudFR5cGUuRGVsZXRlZCkge1xuICAgICAgICAgIHN1YmplY3QuY29tcGxldGUoKTtcbiAgICAgICAgICB0aGlzLl93YXRjaGVycy5kZWxldGUoY3VycmVudFBhdGgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBkbyB7XG4gICAgICBjdXJyZW50UGF0aCA9IHBhcmVudCAhPT0gbnVsbCA/IHBhcmVudCA6IGN1cnJlbnRQYXRoO1xuICAgICAgcGFyZW50ID0gZGlybmFtZShjdXJyZW50UGF0aCk7XG5cbiAgICAgIGNvbnN0IG1heWJlV2F0Y2hlciA9IHRoaXMuX3dhdGNoZXJzLmdldChjdXJyZW50UGF0aCk7XG4gICAgICBpZiAobWF5YmVXYXRjaGVyKSB7XG4gICAgICAgIG1heWJlV2F0Y2hlci5mb3JFYWNoKHdhdGNoZXIgPT4ge1xuICAgICAgICAgIGNvbnN0IFtvcHRpb25zLCBzdWJqZWN0XSA9IHdhdGNoZXI7XG4gICAgICAgICAgaWYgKCFvcHRpb25zLnJlY3Vyc2l2ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdWJqZWN0Lm5leHQoeyBwYXRoLCB0aW1lLCB0eXBlIH0pO1xuXG4gICAgICAgICAgaWYgKCFvcHRpb25zLnBlcnNpc3RlbnQgJiYgdHlwZSA9PSBIb3N0V2F0Y2hFdmVudFR5cGUuRGVsZXRlZCkge1xuICAgICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgdGhpcy5fd2F0Y2hlcnMuZGVsZXRlKGN1cnJlbnRQYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gd2hpbGUgKHBhcmVudCAhPSBjdXJyZW50UGF0aCk7XG4gIH1cblxuICBnZXQgY2FwYWJpbGl0aWVzKCk6IEhvc3RDYXBhYmlsaXRpZXMge1xuICAgIHJldHVybiB7IHN5bmNocm9ub3VzOiB0cnVlIH07XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiBwcm90ZWN0ZWQgbWV0aG9kcyB0aGF0IGdpdmUgZGlyZWN0IGFjY2VzcyBvdXRzaWRlIHRoZSBvYnNlcnZhYmxlcyB0byB0aGUgY2FjaGVcbiAgICogYW5kIGludGVybmFsIHN0YXRlcy5cbiAgICovXG4gIHByb3RlY3RlZCBfd3JpdGUocGF0aDogUGF0aCwgY29udGVudDogRmlsZUJ1ZmZlcik6IHZvaWQge1xuICAgIHBhdGggPSB0aGlzLl90b0Fic29sdXRlKHBhdGgpO1xuICAgIGNvbnN0IG9sZCA9IHRoaXMuX2NhY2hlLmdldChwYXRoKTtcbiAgICBpZiAob2xkICYmIG9sZC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICB0aHJvdyBuZXcgUGF0aElzRGlyZWN0b3J5RXhjZXB0aW9uKHBhdGgpO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBhbGwgZGlyZWN0b3JpZXMuIElmIHdlIGZpbmQgYSBmaWxlIHdlIGtub3cgaXQncyBhbiBpbnZhbGlkIHdyaXRlLlxuICAgIGNvbnN0IGZyYWdtZW50cyA9IHNwbGl0KHBhdGgpO1xuICAgIGxldCBjdXJyOiBQYXRoID0gbm9ybWFsaXplKCcvJyk7XG4gICAgZm9yIChjb25zdCBmciBvZiBmcmFnbWVudHMpIHtcbiAgICAgIGN1cnIgPSBqb2luKGN1cnIsIGZyKTtcbiAgICAgIGNvbnN0IG1heWJlU3RhdHMgPSB0aGlzLl9jYWNoZS5nZXQoZnIpO1xuICAgICAgaWYgKG1heWJlU3RhdHMpIHtcbiAgICAgICAgaWYgKG1heWJlU3RhdHMuaXNGaWxlKCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgUGF0aElzRmlsZUV4Y2VwdGlvbihjdXJyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fY2FjaGUuc2V0KGN1cnIsIHRoaXMuX25ld0RpclN0YXRzKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSB0aGUgc3RhdHMuXG4gICAgY29uc3Qgc3RhdHM6IFN0YXRzPFNpbXBsZU1lbW9yeUhvc3RTdGF0cz4gPSB0aGlzLl9uZXdGaWxlU3RhdHMoY29udGVudCwgb2xkKTtcbiAgICB0aGlzLl9jYWNoZS5zZXQocGF0aCwgc3RhdHMpO1xuICAgIHRoaXMuX3VwZGF0ZVdhdGNoZXJzKHBhdGgsIG9sZCA/IEhvc3RXYXRjaEV2ZW50VHlwZS5DaGFuZ2VkIDogSG9zdFdhdGNoRXZlbnRUeXBlLkNyZWF0ZWQpO1xuICB9XG4gIHByb3RlY3RlZCBfcmVhZChwYXRoOiBQYXRoKTogRmlsZUJ1ZmZlciB7XG4gICAgcGF0aCA9IHRoaXMuX3RvQWJzb2x1dGUocGF0aCk7XG4gICAgY29uc3QgbWF5YmVTdGF0cyA9IHRoaXMuX2NhY2hlLmdldChwYXRoKTtcbiAgICBpZiAoIW1heWJlU3RhdHMpIHtcbiAgICAgIHRocm93IG5ldyBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uKHBhdGgpO1xuICAgIH0gZWxzZSBpZiAobWF5YmVTdGF0cy5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICB0aHJvdyBuZXcgUGF0aElzRGlyZWN0b3J5RXhjZXB0aW9uKHBhdGgpO1xuICAgIH0gZWxzZSBpZiAoIW1heWJlU3RhdHMuY29udGVudCkge1xuICAgICAgdGhyb3cgbmV3IFBhdGhJc0RpcmVjdG9yeUV4Y2VwdGlvbihwYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1heWJlU3RhdHMuY29udGVudDtcbiAgICB9XG4gIH1cbiAgcHJvdGVjdGVkIF9kZWxldGUocGF0aDogUGF0aCk6IHZvaWQge1xuICAgIHBhdGggPSB0aGlzLl90b0Fic29sdXRlKHBhdGgpO1xuICAgIGlmICh0aGlzLl9pc0RpcmVjdG9yeShwYXRoKSkge1xuICAgICAgZm9yIChjb25zdCBbY2FjaGVQYXRoXSBvZiB0aGlzLl9jYWNoZS5lbnRyaWVzKCkpIHtcbiAgICAgICAgaWYgKHBhdGguc3RhcnRzV2l0aChjYWNoZVBhdGggKyBOb3JtYWxpemVkU2VwKSkge1xuICAgICAgICAgIHRoaXMuX2NhY2hlLmRlbGV0ZShjYWNoZVBhdGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NhY2hlLmRlbGV0ZShwYXRoKTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlV2F0Y2hlcnMocGF0aCwgSG9zdFdhdGNoRXZlbnRUeXBlLkRlbGV0ZWQpO1xuICB9XG4gIHByb3RlY3RlZCBfcmVuYW1lKGZyb206IFBhdGgsIHRvOiBQYXRoKTogdm9pZCB7XG4gICAgZnJvbSA9IHRoaXMuX3RvQWJzb2x1dGUoZnJvbSk7XG4gICAgdG8gPSB0aGlzLl90b0Fic29sdXRlKHRvKTtcbiAgICBpZiAoIXRoaXMuX2NhY2hlLmhhcyhmcm9tKSkge1xuICAgICAgdGhyb3cgbmV3IEZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24oZnJvbSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jYWNoZS5oYXModG8pKSB7XG4gICAgICB0aHJvdyBuZXcgRmlsZUFscmVhZHlFeGlzdEV4Y2VwdGlvbih0byk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2lzRGlyZWN0b3J5KGZyb20pKSB7XG4gICAgICBmb3IgKGNvbnN0IHBhdGggb2YgdGhpcy5fY2FjaGUua2V5cygpKSB7XG4gICAgICAgIGlmIChwYXRoLnN0YXJ0c1dpdGgoZnJvbSArIE5vcm1hbGl6ZWRTZXApKSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuX2NhY2hlLmdldChwYXRoKTtcbiAgICAgICAgICBpZiAoY29udGVudCkge1xuICAgICAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCB0byBjbG9uZSBvciBleHRyYWN0IHRoZSBjb250ZW50LCBzaW5jZSB3ZSdyZSBtb3ZpbmcgZmlsZXMuXG4gICAgICAgICAgICB0aGlzLl9jYWNoZS5zZXQoam9pbih0bywgTm9ybWFsaXplZFNlcCwgcGF0aC5zbGljZShmcm9tLmxlbmd0aCkpLCBjb250ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuX2NhY2hlLmdldChmcm9tKTtcbiAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgIGNvbnN0IGZyYWdtZW50cyA9IHNwbGl0KHRvKTtcbiAgICAgICAgY29uc3QgbmV3RGlyZWN0b3JpZXMgPSBbXTtcbiAgICAgICAgbGV0IGN1cnI6IFBhdGggPSBub3JtYWxpemUoJy8nKTtcbiAgICAgICAgZm9yIChjb25zdCBmciBvZiBmcmFnbWVudHMpIHtcbiAgICAgICAgICBjdXJyID0gam9pbihjdXJyLCBmcik7XG4gICAgICAgICAgY29uc3QgbWF5YmVTdGF0cyA9IHRoaXMuX2NhY2hlLmdldChmcik7XG4gICAgICAgICAgaWYgKG1heWJlU3RhdHMpIHtcbiAgICAgICAgICAgIGlmIChtYXliZVN0YXRzLmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBQYXRoSXNGaWxlRXhjZXB0aW9uKGN1cnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdEaXJlY3Rvcmllcy5wdXNoKGN1cnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IG5ld0RpcmVjdG9yeSBvZiBuZXdEaXJlY3Rvcmllcykge1xuICAgICAgICAgIHRoaXMuX2NhY2hlLnNldChuZXdEaXJlY3RvcnksIHRoaXMuX25ld0RpclN0YXRzKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NhY2hlLmRlbGV0ZShmcm9tKTtcbiAgICAgICAgdGhpcy5fY2FjaGUuc2V0KHRvLCBjb250ZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVXYXRjaGVycyhmcm9tLCBIb3N0V2F0Y2hFdmVudFR5cGUuUmVuYW1lZCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2xpc3QocGF0aDogUGF0aCk6IFBhdGhGcmFnbWVudFtdIHtcbiAgICBwYXRoID0gdGhpcy5fdG9BYnNvbHV0ZShwYXRoKTtcbiAgICBpZiAodGhpcy5faXNGaWxlKHBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgUGF0aElzRmlsZUV4Y2VwdGlvbihwYXRoKTtcbiAgICB9XG5cbiAgICBjb25zdCBmcmFnbWVudHMgPSBzcGxpdChwYXRoKTtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgU2V0PFBhdGhGcmFnbWVudD4oKTtcbiAgICBpZiAocGF0aCAhPT0gTm9ybWFsaXplZFJvb3QpIHtcbiAgICAgIGZvciAoY29uc3QgcCBvZiB0aGlzLl9jYWNoZS5rZXlzKCkpIHtcbiAgICAgICAgaWYgKHAuc3RhcnRzV2l0aChwYXRoICsgTm9ybWFsaXplZFNlcCkpIHtcbiAgICAgICAgICByZXN1bHQuYWRkKHNwbGl0KHApW2ZyYWdtZW50cy5sZW5ndGhdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IHAgb2YgdGhpcy5fY2FjaGUua2V5cygpKSB7XG4gICAgICAgIGlmIChwLnN0YXJ0c1dpdGgoTm9ybWFsaXplZFNlcCkgJiYgcCAhPT0gTm9ybWFsaXplZFJvb3QpIHtcbiAgICAgICAgICByZXN1bHQuYWRkKHNwbGl0KHApWzFdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbLi4ucmVzdWx0XTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZXhpc3RzKHBhdGg6IFBhdGgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLl9jYWNoZS5nZXQodGhpcy5fdG9BYnNvbHV0ZShwYXRoKSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9pc0RpcmVjdG9yeShwYXRoOiBQYXRoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbWF5YmVTdGF0cyA9IHRoaXMuX2NhY2hlLmdldCh0aGlzLl90b0Fic29sdXRlKHBhdGgpKTtcblxuICAgIHJldHVybiBtYXliZVN0YXRzID8gbWF5YmVTdGF0cy5pc0RpcmVjdG9yeSgpIDogZmFsc2U7XG4gIH1cbiAgcHJvdGVjdGVkIF9pc0ZpbGUocGF0aDogUGF0aCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG1heWJlU3RhdHMgPSB0aGlzLl9jYWNoZS5nZXQodGhpcy5fdG9BYnNvbHV0ZShwYXRoKSk7XG5cbiAgICByZXR1cm4gbWF5YmVTdGF0cyA/IG1heWJlU3RhdHMuaXNGaWxlKCkgOiBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3RhdChwYXRoOiBQYXRoKTogU3RhdHM8U2ltcGxlTWVtb3J5SG9zdFN0YXRzPiB8IG51bGwge1xuICAgIGNvbnN0IG1heWJlU3RhdHMgPSB0aGlzLl9jYWNoZS5nZXQodGhpcy5fdG9BYnNvbHV0ZShwYXRoKSk7XG5cbiAgICBpZiAoIW1heWJlU3RhdHMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWF5YmVTdGF0cztcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3dhdGNoKHBhdGg6IFBhdGgsIG9wdGlvbnM/OiBIb3N0V2F0Y2hPcHRpb25zKTogT2JzZXJ2YWJsZTxIb3N0V2F0Y2hFdmVudD4ge1xuICAgIHBhdGggPSB0aGlzLl90b0Fic29sdXRlKHBhdGgpO1xuXG4gICAgY29uc3Qgc3ViamVjdCA9IG5ldyBTdWJqZWN0PEhvc3RXYXRjaEV2ZW50PigpO1xuICAgIGxldCBtYXliZVdhdGNoZXJBcnJheSA9IHRoaXMuX3dhdGNoZXJzLmdldChwYXRoKTtcbiAgICBpZiAoIW1heWJlV2F0Y2hlckFycmF5KSB7XG4gICAgICBtYXliZVdhdGNoZXJBcnJheSA9IFtdO1xuICAgICAgdGhpcy5fd2F0Y2hlcnMuc2V0KHBhdGgsIG1heWJlV2F0Y2hlckFycmF5KTtcbiAgICB9XG5cbiAgICBtYXliZVdhdGNoZXJBcnJheS5wdXNoKFtvcHRpb25zIHx8IHt9LCBzdWJqZWN0XSk7XG5cbiAgICByZXR1cm4gc3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHdyaXRlKHBhdGg6IFBhdGgsIGNvbnRlbnQ6IEZpbGVCdWZmZXIpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8dm9pZD4ob2JzID0+IHtcbiAgICAgIHRoaXMuX3dyaXRlKHBhdGgsIGNvbnRlbnQpO1xuICAgICAgb2JzLm5leHQoKTtcbiAgICAgIG9icy5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVhZChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxGaWxlQnVmZmVyPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPEZpbGVCdWZmZXI+KG9icyA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5fcmVhZChwYXRoKTtcbiAgICAgIG9icy5uZXh0KGNvbnRlbnQpO1xuICAgICAgb2JzLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGUocGF0aDogUGF0aCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTx2b2lkPihvYnMgPT4ge1xuICAgICAgdGhpcy5fZGVsZXRlKHBhdGgpO1xuICAgICAgb2JzLm5leHQoKTtcbiAgICAgIG9icy5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuYW1lKGZyb206IFBhdGgsIHRvOiBQYXRoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPHZvaWQ+KG9icyA9PiB7XG4gICAgICB0aGlzLl9yZW5hbWUoZnJvbSwgdG8pO1xuICAgICAgb2JzLm5leHQoKTtcbiAgICAgIG9icy5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbGlzdChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxQYXRoRnJhZ21lbnRbXT4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxQYXRoRnJhZ21lbnRbXT4ob2JzID0+IHtcbiAgICAgIG9icy5uZXh0KHRoaXMuX2xpc3QocGF0aCkpO1xuICAgICAgb2JzLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBleGlzdHMocGF0aDogUGF0aCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPihvYnMgPT4ge1xuICAgICAgb2JzLm5leHQodGhpcy5fZXhpc3RzKHBhdGgpKTtcbiAgICAgIG9icy5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkocGF0aDogUGF0aCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPihvYnMgPT4ge1xuICAgICAgb2JzLm5leHQodGhpcy5faXNEaXJlY3RvcnkocGF0aCkpO1xuICAgICAgb2JzLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBpc0ZpbGUocGF0aDogUGF0aCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPihvYnMgPT4ge1xuICAgICAgb2JzLm5leHQodGhpcy5faXNGaWxlKHBhdGgpKTtcbiAgICAgIG9icy5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gU29tZSBob3N0cyBtYXkgbm90IHN1cHBvcnQgc3RhdC5cbiAgc3RhdChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxTdGF0czx7fT4gfCBudWxsPiB8IG51bGwge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxTdGF0czx7fT4gfCBudWxsPihvYnMgPT4ge1xuICAgICAgb2JzLm5leHQodGhpcy5fc3RhdChwYXRoKSk7XG4gICAgICBvYnMuY29tcGxldGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHdhdGNoKHBhdGg6IFBhdGgsIG9wdGlvbnM/OiBIb3N0V2F0Y2hPcHRpb25zKTogT2JzZXJ2YWJsZTxIb3N0V2F0Y2hFdmVudD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fd2F0Y2gocGF0aCwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==