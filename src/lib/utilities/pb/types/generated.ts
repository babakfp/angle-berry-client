/*
 * NOTE: This file is auto-generated by https://npmjs.com/package/pocketbase-types.
 * IMPORTANT: Do not edit this file manually.
 */

import type PocketBase from "pocketbase"
import type { RecordService } from "pocketbase"

export type BaseModel = {
    id: string
    created: string
    updated: string
}

export type ViewModel = {
    id: string
    collectionId: string
    collectionName: keyof typeof COLLECTIONS
}

export type RecordModel<T = never> = BaseModel & {
    collectionId: string
    collectionName: keyof typeof COLLECTIONS
    expand?: T
}

export type AuthModel<T = never> = RecordModel<T> & {
    username: string
    email: string
    emailVisibility: boolean
    verified: boolean
}

export const COLLECTIONS = {
    "users": "users",
    "events": "events",
    "messages": "messages",
    "tiers": "tiers",
    "videos": "videos",
} as const

export type UsersRecord = {
    retainedTiers: string[]
    invitedUsers?: string[]
    invitedBy?: string
    isAdmin?: boolean
}

export type EventsRecord = {
    user: string
    inviter?: string
    inviterInvites?: number
}

export type MessagesRecord = {
    content: string
    user: string
    repliedTo?: string
}

export const TIERS_RECORD_VISIBILITY_OPTIONS = {
    "public": "public",
    "private": "private",
} as const

export type TiersRecord = {
    name: string
    price?: number
    invites?: number
    visibility: keyof typeof TIERS_RECORD_VISIBILITY_OPTIONS
    videos?: string[]
}

export const VIDEOS_RECORD_FILE_MIME_TYPES = {
    "video/mp4": "video/mp4",
    "video/x-matroska": "video/x-matroska",
} as const

export type VideosRecord = {
    file: string
}

export type CollectionRecords = {
    users: UsersRecord
    events: EventsRecord
    messages: MessagesRecord
    tiers: TiersRecord
    videos: VideosRecord
}

export type UsersResponse<TExpand = unknown> = Required<UsersRecord> & AuthModel<TExpand>
export type EventsResponse<TExpand = unknown> = Required<EventsRecord> & RecordModel<TExpand>
export type MessagesResponse<TExpand = unknown> = Required<MessagesRecord> & RecordModel<TExpand>
export type TiersResponse<TExpand = unknown> = Required<TiersRecord> & RecordModel<TExpand>
export type VideosResponse<TExpand = unknown> = Required<VideosRecord> & RecordModel<TExpand>

export type CollectionResponses = {
    users: UsersResponse
    events: EventsResponse
    messages: MessagesResponse
    tiers: TiersResponse
    videos: VideosResponse
}

export type PocketBaseType = PocketBase & {
    collection<TExpand = unknown>(idOrName: "users"): RecordService<UsersResponse<TExpand>>
    collection<TExpand = unknown>(idOrName: "events"): RecordService<EventsResponse<TExpand>>
    collection<TExpand = unknown>(idOrName: "messages"): RecordService<MessagesResponse<TExpand>>
    collection<TExpand = unknown>(idOrName: "tiers"): RecordService<TiersResponse<TExpand>>
    collection<TExpand = unknown>(idOrName: "videos"): RecordService<VideosResponse<TExpand>>
}
