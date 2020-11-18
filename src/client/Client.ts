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

import * as discord from 'discord.js';
import { EventEmitter } from 'events';

// Interface for the events
interface ClientEvents {
    a: [string];
}

// Base class
class Client extends EventEmitter {
    public constructor(token: string) {
        super();
        this.token = token;
        this.client = new discord.Client();
    }

    public token: string;
    public client: discord.Client;

    /**
     * Logs in to the Discord API to begin
     * getting events.
     * @function
     * @returns {Promise<void>}
     */
    public async login(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client
                .login()
                .then(() => {
                    resolve();
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

    // ===== EVENTS =====
    public on<K extends keyof ClientEvents>(
        eventName: K,
        listener: (...args: ClientEvents[K]) => void
    ): this {
        // @ts-ignore
        super.on(eventName, listener);
        return this;
    }

    public once<K extends keyof ClientEvents>(
        eventName: K,
        listener: (...args: ClientEvents[K]) => void
    ): this {
        // @ts-ignore
        super.once(eventName, listener);
        return this;
    }
    public off<K extends keyof ClientEvents>(
        eventName: K,
        listener: (...args: ClientEvents[K]) => void
    ): this {
        // @ts-ignore
        super.off(eventName, listener);
        return this;
    }
    public emit<K extends keyof ClientEvents>(
        eventName: K,
        ...args: ClientEvents[K]
    ): boolean {
        return super.emit(eventName, ...args);
    }
}

// Export
export { ClientEvents, Client };
