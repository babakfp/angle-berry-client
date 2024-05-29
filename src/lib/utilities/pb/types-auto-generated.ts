/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Events = "events",
	Messages = "messages",
	Tiers = "tiers",
	Users = "users",
	Videos = "videos",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type EventsRecord = {
	inviter?: RecordIdString
	inviterInvites?: number
	user: RecordIdString
}

export type MessagesRecord = {
	content: HTMLString
	repliedTo?: RecordIdString
	user: RecordIdString
}

export enum TiersVisibilityOptions {
	"public" = "public",
	"private" = "private",
}
export type TiersRecord = {
	invites?: number
	name: string
	price?: number
	videos?: RecordIdString[]
	visibility: TiersVisibilityOptions
}

export type UsersRecord = {
	invitedBy?: RecordIdString
	invitedUsers?: RecordIdString[]
	isAdmin?: boolean
	retainedTiers: RecordIdString[]
}

export type VideosRecord = {
	file: string
}

// Response types include system fields and match responses from the PocketBase API
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> & BaseSystemFields<Texpand>
export type MessagesResponse<Texpand = unknown> = Required<MessagesRecord> & BaseSystemFields<Texpand>
export type TiersResponse<Texpand = unknown> = Required<TiersRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type VideosResponse<Texpand = unknown> = Required<VideosRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	events: EventsRecord
	messages: MessagesRecord
	tiers: TiersRecord
	users: UsersRecord
	videos: VideosRecord
}

export type CollectionResponses = {
	events: EventsResponse
	messages: MessagesResponse
	tiers: TiersResponse
	users: UsersResponse
	videos: VideosResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'events'): RecordService<EventsResponse>
	collection(idOrName: 'messages'): RecordService<MessagesResponse>
	collection(idOrName: 'tiers'): RecordService<TiersResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'videos'): RecordService<VideosResponse>
}
