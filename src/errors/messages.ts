/**
 * djs-2 -- Like Discord.js, but better!
 * Copyright (C) 2020  BadBoyHaloCat
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

import { register } from './DJS2Error';

const messages: { [key: string]: string | ((...args: any[]) => string) } = {
    TOKEN_INVALID: 'An invalid token was provided.',
    DISALLOWED_INTENTS:
        'Privileged intent provided is not enabled or whitelisted.',

    UNKNOWN_CLIENT_ERROR: (error) =>
        `An unknown client error was thrown: ${error}`
};

// @ts-ignore
for (const [key, val] of Object.entries(messages)) {
    register(key, val);
}
