/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    posts: Post;
    communities: Community;
    comments: Comment;
    media: Media;
    roles: Role;
    hostRoles: HostRole;
    followCommunity: FollowCommunity;
    communityUsersBans: CommunityUsersBan;
    communityUsersMutes: CommunityUsersMute;
    likePost: LikePost;
    hostUsersMutes: HostUsersMute;
    hostUsersBans: HostUsersBan;
    hostCommunitiesMutes: HostCommunitiesMute;
    hostCommunitiesBans: HostCommunitiesBan;
    search: Search;
    redirects: Redirect;
    'payload-jobs': PayloadJob;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {
    users: {
      hostRoles: 'hostRoles';
      communitiesRoles: 'roles';
      communitiesBans: 'communityUsersBans';
      communitiesMutes: 'communityUsersMutes';
      posts: 'posts';
      bookmarks: 'posts';
      followCommunities: 'followCommunity';
      ownerCommunities: 'communities';
      postsLikes: 'likePost';
      commentsLikes: 'comments';
    };
    posts: {
      comments: 'comments';
      likes: 'likePost';
    };
    communities: {
      roles: 'roles';
      followers: 'followCommunity';
      bans: 'communityUsersBans';
      mutes: 'communityUsersMutes';
      posts: 'posts';
      comments: 'comments';
    };
    comments: {
      childrenComments: 'comments';
    };
  };
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    posts: PostsSelect<false> | PostsSelect<true>;
    communities: CommunitiesSelect<false> | CommunitiesSelect<true>;
    comments: CommentsSelect<false> | CommentsSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    roles: RolesSelect<false> | RolesSelect<true>;
    hostRoles: HostRolesSelect<false> | HostRolesSelect<true>;
    followCommunity: FollowCommunitySelect<false> | FollowCommunitySelect<true>;
    communityUsersBans: CommunityUsersBansSelect<false> | CommunityUsersBansSelect<true>;
    communityUsersMutes: CommunityUsersMutesSelect<false> | CommunityUsersMutesSelect<true>;
    likePost: LikePostSelect<false> | LikePostSelect<true>;
    hostUsersMutes: HostUsersMutesSelect<false> | HostUsersMutesSelect<true>;
    hostUsersBans: HostUsersBansSelect<false> | HostUsersBansSelect<true>;
    hostCommunitiesMutes: HostCommunitiesMutesSelect<false> | HostCommunitiesMutesSelect<true>;
    hostCommunitiesBans: HostCommunitiesBansSelect<false> | HostCommunitiesBansSelect<true>;
    search: SearchSelect<false> | SearchSelect<true>;
    redirects: RedirectsSelect<false> | RedirectsSelect<true>;
    'payload-jobs': PayloadJobsSelect<false> | PayloadJobsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    'host-settings': HostSetting;
    'sidebar-navigation': SidebarNavigation;
  };
  globalsSelect: {
    'host-settings': HostSettingsSelect<false> | HostSettingsSelect<true>;
    'sidebar-navigation': SidebarNavigationSelect<false> | SidebarNavigationSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: {
      schedulePublish: TaskSchedulePublish;
      inline: {
        input: unknown;
        output: unknown;
      };
    };
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  name: string;
  avatar?: (number | null) | Media;
  banner?: (number | null) | Media;
  description?: string | null;
  tableInfo?:
    | {
        label: string;
        value: string;
        id?: string | null;
      }[]
    | null;
  hostRoles?: {
    docs?: (number | HostRole)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  communitiesRoles?: {
    docs?: (number | Role)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  communitiesBans?: {
    docs?: (number | CommunityUsersBan)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  communitiesMutes?: {
    docs?: (number | CommunityUsersMute)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  posts?: {
    docs?: (number | Post)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  followers?: (number | User)[] | null;
  follow?: (number | User)[] | null;
  followCommunities?: {
    docs?: (number | FollowCommunity)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  ownerCommunities?: {
    docs?: (number | Community)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  postsLikes?: {
    docs?: (number | LikePost)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  commentsLikes?: {
    docs?: (number | Comment)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  bookmarks?: {
    docs?: (number | Post)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    square?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    small?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    medium?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    large?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    xlarge?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    og?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hostRoles".
 */
export interface HostRole {
  id: number;
  name: string;
  badge?: (number | null) | Media;
  color?: string | null;
  users?: (number | User)[] | null;
  COMMUNITY_ROLES_MANAGEMENT?: boolean | null;
  HOST_USER_BAN?: boolean | null;
  HOST_USER_MUTE?: boolean | null;
  HOST_COMMUNITY_POST_DELETE?: boolean | null;
  HOST_COMMUNITY_POST_REMOVE_FROM_PUBLICATION?: boolean | null;
  HOST_COMMUNITY_COMMENTS_DELETE?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "roles".
 */
export interface Role {
  id: number;
  name: string;
  badge?: (number | null) | Media;
  color?: string | null;
  community: number | Community;
  users?: (number | User)[] | null;
  COMMUNITY_ROLES_MANAGEMENT?: boolean | null;
  COMMUNITY_USER_BAN?: boolean | null;
  COMMUNITY_USER_MUTE?: boolean | null;
  COMMUNITY_POST_DELETE?: boolean | null;
  COMMUNITY_POST_REMOVE_FROM_PUBLICATION?: boolean | null;
  COMMUNITY_COMMENTS_DELETE?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "communities".
 */
export interface Community {
  id: number;
  logo?: (number | null) | Media;
  banner?: (number | null) | Media;
  title: string;
  contacts?: string | null;
  description?: string | null;
  tableInfo?:
    | {
        label: string;
        value: string;
        id?: string | null;
      }[]
    | null;
  owner: number | User;
  moderators?: (number | User)[] | null;
  roles?: {
    docs?: (number | Role)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  rules?:
    | {
        communityNameRule?: string | null;
        communityDescriptionRule?: string | null;
        id?: string | null;
      }[]
    | null;
  followers?: {
    docs?: (number | FollowCommunity)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  bans?: {
    docs?: (number | CommunityUsersBan)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  mutes?: {
    docs?: (number | CommunityUsersMute)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  posts?: {
    docs?: (number | Post)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  comments?: {
    docs?: (number | Comment)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  COMMUNITY_HAS_BANNED?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "followCommunity".
 */
export interface FollowCommunity {
  id: number;
  user: number | User;
  community: number | Community;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "communityUsersBans".
 */
export interface CommunityUsersBan {
  id: number;
  user: number | User;
  community: number | Community;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "communityUsersMutes".
 */
export interface CommunityUsersMute {
  id: number;
  user: number | User;
  community: number | Community;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: number;
  title: string;
  heroImage?: (number | null) | Media;
  content:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  comments?: {
    docs?: (number | Comment)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  relatedPost?: (number | null) | Post;
  community: number | Community;
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
  };
  author?: (number | null) | User;
  likes?: {
    docs?: (number | LikePost)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  bookmarks?: (number | User)[] | null;
  publishedAt?: string | null;
  hasDeleted?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "comments".
 */
export interface Comment {
  id: number;
  parentPost: number | Post;
  community: number | Community;
  author: number | User;
  content: string;
  media?: (number | null) | Media;
  hasDeleted?: boolean | null;
  parentComment?: (number | null) | Comment;
  childrenComments?: {
    docs?: (number | Comment)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  likes?: (number | User)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "likePost".
 */
export interface LikePost {
  id: number;
  user: number | User;
  post: number | Post;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hostUsersMutes".
 */
export interface HostUsersMute {
  id: number;
  user: number | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hostUsersBans".
 */
export interface HostUsersBan {
  id: number;
  user: number | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hostCommunitiesMutes".
 */
export interface HostCommunitiesMute {
  id: number;
  community: number | Community;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hostCommunitiesBans".
 */
export interface HostCommunitiesBan {
  id: number;
  community: number | Community;
  updatedAt: string;
  createdAt: string;
}
/**
 * This is a collection of automatically created search results. These results are used by the global site search and will be updated automatically as documents in the CMS are created or updated.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "search".
 */
export interface Search {
  id: number;
  title?: string | null;
  priority?: number | null;
  doc: {
    relationTo: 'posts';
    value: number | Post;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects".
 */
export interface Redirect {
  id: number;
  from: string;
  to?: {
    type?: ('reference' | 'custom') | null;
    reference?: {
      relationTo: 'posts';
      value: number | Post;
    } | null;
    url?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-jobs".
 */
export interface PayloadJob {
  id: number;
  /**
   * Input data provided to the job
   */
  input?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  taskStatus?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  completedAt?: string | null;
  totalTried?: number | null;
  /**
   * If hasError is true this job will not be retried
   */
  hasError?: boolean | null;
  /**
   * If hasError is true, this is the error that caused it
   */
  error?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  /**
   * Task execution log
   */
  log?:
    | {
        executedAt: string;
        completedAt: string;
        taskSlug: 'inline' | 'schedulePublish';
        taskID: string;
        input?:
          | {
              [k: string]: unknown;
            }
          | unknown[]
          | string
          | number
          | boolean
          | null;
        output?:
          | {
              [k: string]: unknown;
            }
          | unknown[]
          | string
          | number
          | boolean
          | null;
        state: 'failed' | 'succeeded';
        error?:
          | {
              [k: string]: unknown;
            }
          | unknown[]
          | string
          | number
          | boolean
          | null;
        id?: string | null;
      }[]
    | null;
  taskSlug?: ('inline' | 'schedulePublish') | null;
  queue?: string | null;
  waitUntil?: string | null;
  processing?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'posts';
        value: number | Post;
      } | null)
    | ({
        relationTo: 'communities';
        value: number | Community;
      } | null)
    | ({
        relationTo: 'comments';
        value: number | Comment;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'roles';
        value: number | Role;
      } | null)
    | ({
        relationTo: 'hostRoles';
        value: number | HostRole;
      } | null)
    | ({
        relationTo: 'followCommunity';
        value: number | FollowCommunity;
      } | null)
    | ({
        relationTo: 'communityUsersBans';
        value: number | CommunityUsersBan;
      } | null)
    | ({
        relationTo: 'communityUsersMutes';
        value: number | CommunityUsersMute;
      } | null)
    | ({
        relationTo: 'likePost';
        value: number | LikePost;
      } | null)
    | ({
        relationTo: 'hostUsersMutes';
        value: number | HostUsersMute;
      } | null)
    | ({
        relationTo: 'hostUsersBans';
        value: number | HostUsersBan;
      } | null)
    | ({
        relationTo: 'hostCommunitiesMutes';
        value: number | HostCommunitiesMute;
      } | null)
    | ({
        relationTo: 'hostCommunitiesBans';
        value: number | HostCommunitiesBan;
      } | null)
    | ({
        relationTo: 'search';
        value: number | Search;
      } | null)
    | ({
        relationTo: 'redirects';
        value: number | Redirect;
      } | null)
    | ({
        relationTo: 'payload-jobs';
        value: number | PayloadJob;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  avatar?: T;
  banner?: T;
  description?: T;
  tableInfo?:
    | T
    | {
        label?: T;
        value?: T;
        id?: T;
      };
  hostRoles?: T;
  communitiesRoles?: T;
  communitiesBans?: T;
  communitiesMutes?: T;
  posts?: T;
  followers?: T;
  follow?: T;
  followCommunities?: T;
  ownerCommunities?: T;
  postsLikes?: T;
  commentsLikes?: T;
  bookmarks?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts_select".
 */
export interface PostsSelect<T extends boolean = true> {
  title?: T;
  heroImage?: T;
  content?: T;
  comments?: T;
  relatedPost?: T;
  community?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
      };
  author?: T;
  likes?: T;
  bookmarks?: T;
  publishedAt?: T;
  hasDeleted?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "communities_select".
 */
export interface CommunitiesSelect<T extends boolean = true> {
  logo?: T;
  banner?: T;
  title?: T;
  contacts?: T;
  description?: T;
  tableInfo?:
    | T
    | {
        label?: T;
        value?: T;
        id?: T;
      };
  owner?: T;
  moderators?: T;
  roles?: T;
  rules?:
    | T
    | {
        communityNameRule?: T;
        communityDescriptionRule?: T;
        id?: T;
      };
  followers?: T;
  bans?: T;
  mutes?: T;
  posts?: T;
  comments?: T;
  COMMUNITY_HAS_BANNED?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "comments_select".
 */
export interface CommentsSelect<T extends boolean = true> {
  parentPost?: T;
  community?: T;
  author?: T;
  content?: T;
  media?: T;
  hasDeleted?: T;
  parentComment?: T;
  childrenComments?: T;
  likes?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        square?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        small?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        medium?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        large?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        xlarge?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        og?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "roles_select".
 */
export interface RolesSelect<T extends boolean = true> {
  name?: T;
  badge?: T;
  color?: T;
  community?: T;
  users?: T;
  COMMUNITY_ROLES_MANAGEMENT?: T;
  COMMUNITY_USER_BAN?: T;
  COMMUNITY_USER_MUTE?: T;
  COMMUNITY_POST_DELETE?: T;
  COMMUNITY_POST_REMOVE_FROM_PUBLICATION?: T;
  COMMUNITY_COMMENTS_DELETE?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hostRoles_select".
 */
export interface HostRolesSelect<T extends boolean = true> {
  name?: T;
  badge?: T;
  color?: T;
  users?: T;
  COMMUNITY_ROLES_MANAGEMENT?: T;
  HOST_USER_BAN?: T;
  HOST_USER_MUTE?: T;
  HOST_COMMUNITY_POST_DELETE?: T;
  HOST_COMMUNITY_POST_REMOVE_FROM_PUBLICATION?: T;
  HOST_COMMUNITY_COMMENTS_DELETE?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "followCommunity_select".
 */
export interface FollowCommunitySelect<T extends boolean = true> {
  user?: T;
  community?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "communityUsersBans_select".
 */
export interface CommunityUsersBansSelect<T extends boolean = true> {
  user?: T;
  community?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "communityUsersMutes_select".
 */
export interface CommunityUsersMutesSelect<T extends boolean = true> {
  user?: T;
  community?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "likePost_select".
 */
export interface LikePostSelect<T extends boolean = true> {
  user?: T;
  post?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hostUsersMutes_select".
 */
export interface HostUsersMutesSelect<T extends boolean = true> {
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hostUsersBans_select".
 */
export interface HostUsersBansSelect<T extends boolean = true> {
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hostCommunitiesMutes_select".
 */
export interface HostCommunitiesMutesSelect<T extends boolean = true> {
  community?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hostCommunitiesBans_select".
 */
export interface HostCommunitiesBansSelect<T extends boolean = true> {
  community?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "search_select".
 */
export interface SearchSelect<T extends boolean = true> {
  title?: T;
  priority?: T;
  doc?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects_select".
 */
export interface RedirectsSelect<T extends boolean = true> {
  from?: T;
  to?:
    | T
    | {
        type?: T;
        reference?: T;
        url?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-jobs_select".
 */
export interface PayloadJobsSelect<T extends boolean = true> {
  input?: T;
  taskStatus?: T;
  completedAt?: T;
  totalTried?: T;
  hasError?: T;
  error?: T;
  log?:
    | T
    | {
        executedAt?: T;
        completedAt?: T;
        taskSlug?: T;
        taskID?: T;
        input?: T;
        output?: T;
        state?: T;
        error?: T;
        id?: T;
      };
  taskSlug?: T;
  queue?: T;
  waitUntil?: T;
  processing?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "host-settings".
 */
export interface HostSetting {
  id: number;
  title?: string | null;
  slogan?: string | null;
  logo?: (number | null) | Media;
  banner?: (number | null) | Media;
  authBanner?: (number | null) | Media;
  owner: number | User;
  contacts?: string | null;
  description?: string | null;
  rules?:
    | {
        nameRule?: string | null;
        descriptionRule?: string | null;
        id?: string | null;
      }[]
    | null;
  FIRST_SETTNGS?: boolean | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sidebar-navigation".
 */
export interface SidebarNavigation {
  id: number;
  items?:
    | {
        post?: (number | null) | Post;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "host-settings_select".
 */
export interface HostSettingsSelect<T extends boolean = true> {
  title?: T;
  slogan?: T;
  logo?: T;
  banner?: T;
  authBanner?: T;
  owner?: T;
  contacts?: T;
  description?: T;
  rules?:
    | T
    | {
        nameRule?: T;
        descriptionRule?: T;
        id?: T;
      };
  FIRST_SETTNGS?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sidebar-navigation_select".
 */
export interface SidebarNavigationSelect<T extends boolean = true> {
  items?:
    | T
    | {
        post?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TaskSchedulePublish".
 */
export interface TaskSchedulePublish {
  input: {
    type?: ('publish' | 'unpublish') | null;
    locale?: string | null;
    doc?: {
      relationTo: 'posts';
      value: number | Post;
    } | null;
    global?: string | null;
    user?: (number | null) | User;
  };
  output?: unknown;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}