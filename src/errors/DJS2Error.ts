/**
 * djs-2 -- Like Discord.js, but better!
 * Copyright (C) <year>  <name of author>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// Heavily inspired by Discord.js' errors system.

const messages = new Map();

/**
 * Extend a sort of error into a DJS2Error.
 * @function
 * @param {Error} Base Base error to extend
 * @returns {DJS2Error} The error output
 */
function makeError(Base: any) {
    return class DJS2Error extends Base {
        constructor(
            key: string,
            ...args: string[] | ((...args: any[]) => string)[]
        ) {
            super(message(key, args));
            this.code = key;
            // @ts-ignore
            if (Error.captureStackTrace) {
                // @ts-ignore
                Error.captureStackTrace(this, DJS2Error);
            }
        }

        get name() {
            return `${super.name} [${this.code}]`;
        }
    };
}

/**
 * Format the error message.
 * @function
 * @param {String} key Error key
 * @param {string[]|((...args: any[])=>void)[]} args The arguments to pass to the error message
 * @returns {String} Formatted string
 */
function message(
    key: string,
    args: string[] | ((...args: any[]) => string)[]
): string {
    const msg = messages.get(key);
    if (!msg) {
        throw new Error(`An invalid error message key was used: ${key}`);
    }

    if (typeof msg === 'function') {
        return msg(...args);
    }
    if (args === undefined || arguments.length === 0) {
        return msg;
    }
    args.unshift(msg);
    return String(...args);
}

/**
 * Register an error code and message.
 * @function
 * @param {String} key Unique error code
 * @param {*} val Error value
 */
function register(
    key: string,
    val: string | ((...args: any[]) => string)
): void {
    messages.set(key, typeof val === 'function' ? val : String(val));
}

// Export
const _Error = makeError(Error);
const _TypeError = makeError(TypeError);
const _RangeError = makeError(RangeError);

export {
    register,
    _Error as Error,
    _TypeError as TypeError,
    _RangeError as RangeError
};
